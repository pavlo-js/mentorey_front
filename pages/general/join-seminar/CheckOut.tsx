import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';
import { selectAuthState } from '~/slices/authSlice';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import useCurrencyConverter from '~/hooks/useCurrencyConverter';
import axios from 'axios';
import { toast } from 'react-toastify';
import { CurrencyData } from '~/shared/CurrencyData';

const stripePromise = loadStripe('pk_test_gktDH2EZfKhkRYLkJGwjQQuQ00O15ZHjaO');

const SeminarTypes: any = {
  MIN30: { value: 0.5, label: '30 min' },
  MIN60: { value: 1, label: '60 min' },
  MIN90: { value: 1.5, label: '90 min' },
};

export default function SeminarCheckOut({ seminar }: { seminar: any }) {
  const [clientSecret, setClientSecret] = useState<string>();
  const curUser = useSelector(selectAuthState);
  const currencySymbol = CurrencyData[curUser.currency].symbol;
  const { data: coach } = useQuery({
    queryKey: ['getCoach'],
    queryFn: async () => {
      const { data: res } = await axios.post('/api/common/get-user-by-id', { userID: seminar.coach_id });
      return res.user;
    },
  });

  const originPrice = seminar.price * SeminarTypes[seminar.duration].value;

  const price = useCurrencyConverter(seminar.currency, curUser.currency, originPrice);

  useEffect(() => {
    if (price) {
      (async () => {
        try {
          const api = '/api/payment/create-payment-intent';
          const params = {
            amount: price,
            currency: curUser.currency,
          };
          const { data: response } = await axios.post(api, params);
          setClientSecret(response.client_secret);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [price]);

  return (
    <>
      {clientSecret && price && originPrice && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm symbol={currencySymbol} amount={price} originPrice={originPrice} clientSecret={clientSecret} />
        </Elements>
      )}
    </>
  );
}

const CheckoutForm = ({
  symbol,
  amount,
  clientSecret,
  originPrice,
}: {
  symbol: string;
  amount: number;
  clientSecret: string;
  originPrice: number;
}) => {
  const [isPaying, setIsPaying] = useState<boolean>(false);

  const curUser = useSelector(selectAuthState);

  const router = useRouter();

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsPaying(true);

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:3000/payment/ConfirmPayment',
      },
      redirect: 'if_required',
    });
    if (result.error) {
      setIsPaying(false);
      if (result.error.code === 'card_declined') toast.error('Sorry! Your card has been declined.');
      if (result.error.code === 'expired_card') toast.error('Sorry! Your card has been expired.');
      if (result.error.code === 'incorrect_cvc') toast.error('Sorry! Please insert valid CVC.');
      if (result.error.code === 'incorrect_number') toast.error('Sorry! Please insert valid card number.');
      if (result.error.code === 'processing_error')
        toast.error('Sorry! Something went wrong. Check your card information again.');
    } else {
      const api = '/api/common/save-lesson-booking';
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <Button
        type="submit"
        disabled={!stripe && !isPaying}
        variant="contained"
        className="bg-primary-600 w-full max-w-lg mx-auto my-3 lg:my-5 text-lg block"
      >
        Checkout {`${symbol}${amount}`}
      </Button>
    </form>
  );
};
