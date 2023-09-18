import {
  Avatar,
  Box,
  Paper,
  Typography,
  Tooltip,
  Badge,
  Button,
  TextField,
} from "@mui/material";
import BlankLayout from "~/layouts/BlankLayout";
import { useSelector } from "react-redux";
import { selectAuthState } from "~/slices/authSlice";
import { selectLessonBookingState } from "~/slices/lessonBookingSlice";
import ReactCountryFlag from "react-country-flag";
import { countries } from "~/shared/data";
import axios from "axios";
import { useQuery } from "react-query";
import currencyConverter from "~/utils/currencyConverter";
import { CurrencyData } from "~/shared/CurrencyData";
import styled from "@emotion/styled";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const stripePromise = loadStripe("pk_test_gktDH2EZfKhkRYLkJGwjQQuQ00O15ZHjaO");

const StyledCaption = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #383838;
`;

type LessonType = "MIN30" | "MIN60" | "MIN90";

const lessonTypeSet = {
  MIN30: 0.5,
  MIN60: 1,
  MIN90: 1.5,
};

const LessonTypeLabels = {
  MIN30: "30 minutes",
  MIN60: "60 minutes",
  MIN90: "90 minutes",
};

const trialLesson = {
  description: "",
  purpose: "",
  isTrialLesson: true,
};

const testPromoCode = "123456";

export default function LessonBookingCheckout() {
  const [price, setPrice] = useState<number>();
  const [promocode, setPromocode] = useState<string>("");

  const { coach, lessonID, lessonPack, lessonType, timeline, channel } =
    useSelector(selectLessonBookingState) || {};
  const curUser = useSelector(selectAuthState);
  const country = countries.find((item) => item.code === coach.country);
  const currencySymbol = CurrencyData[curUser.currency].symbol;

  const { data: lesson } = useQuery({
    queryKey: ["getLessonByID", lessonID],
    queryFn: async () => {
      if (lessonID === "trial") {
        return trialLesson;
      } else {
        const api = "/api/common/getLessonByID";
        const { data: response } = await axios.post(api, { lessonID });
        return { ...response.lesson, isTrialLesson: false };
      }
    },
    enabled: !!lessonID,
  });

  useEffect(() => {
    const getPrice = async () => {
      if (lesson) {
        if (lesson.isTrialLesson) {
          const trialPrice = await currencyConverter(
            coach.currency,
            curUser.currency,
            coach.trial_price
          );
          setPrice(trialPrice);
        } else {
          const initialPrice = await currencyConverter(
            coach.currency,
            curUser.currency,
            lesson.price
          );
          if (lessonPack > 1) {
            setPrice(
              parseFloat(
                (
                  lessonPack *
                  lessonTypeSet[lessonType as LessonType] *
                  ((initialPrice * (100 - lesson.disRate)) / 100)
                ).toFixed(2)
              )
            );
          } else if (lessonPack === 1) {
            setPrice(
              parseFloat(
                (
                  lessonTypeSet[lessonType as LessonType] * initialPrice
                ).toFixed(2)
              )
            );
          }
        }
      }
    };

    getPrice();
  }, [lesson]);

  // const { data: price } = useQuery({
  //   queryKey: [
  //     "calcPrice",
  //     lessonID,
  //     lessonPack,
  //     lessonType,
  //     lesson,
  //     curUser,
  //     coach,
  //   ],
  //   queryFn: async () => {
  //     if (lesson.isTrialLesson) {
  //       const trialPrice = await currencyConverter(
  //         coach.currency,
  //         curUser.currency,
  //         coach.trial_price
  //       );
  //       return trialPrice;
  //     } else {
  //       const initialPrice = await currencyConverter(
  //         coach.currency,
  //         curUser.currency,
  //         lesson.price
  //       );
  //       if (lessonPack > 1) {
  //         return parseFloat(
  //           (
  //             lessonPack *
  //             lessonTypeSet[lessonType as LessonType] *
  //             ((initialPrice * (100 - lesson.disRate)) / 100)
  //           ).toFixed(2)
  //         );
  //       } else if (lessonPack === 1) {
  //         return parseFloat(
  //           (lessonTypeSet[lessonType as LessonType] * initialPrice).toFixed(2)
  //         );
  //       }
  //     }
  //   },
  //   enabled: !!lesson,
  // });

  const { data: category = { label: "Trial Lesson" } } = useQuery({
    queryKey: ["getLessonCategoryByID", lesson],
    queryFn: async () => {
      if (!lesson.isTrialLesson) {
        const api = "/api/common/getCategoryByID";
        try {
          const { data: res } = await axios.post(api, {
            categoryID: lesson.categoryID,
          });
          return res.category;
        } catch (error) {
          console.log(error);
        }
      }
    },
    enabled: !!lesson,
  });

  const { data: clientSecret } = useQuery({
    queryKey: ["getStripeClientSecret", price],
    queryFn: async () => {
      try {
        const api = "/api/payment/create-payment-intent";
        const params = {
          amount: price,
          currency: curUser.currency,
        };
        const { data: response } = await axios.post(api, params);
        return response.client_secret;
      } catch (error) {
        console.log(error);
      }
    },
    enabled: !!price,
  });

  const options = {
    clientSecret: clientSecret,
  };

  const checkPromoCode = () => {
    if (promocode === testPromoCode && price) {
      setPrice(price * 0.8);
    }
  };

  return (
    lesson &&
    clientSecret &&
    price && (
      <BlankLayout>
        <Paper
          className="max-w-2xl w-fit mx-2 md:mx-auto my-4 py-4 px-2 lg:py-6 lg:px-4 flex flex-wrap"
          sx={{ minWidth: 350 }}
        >
          <Box className="w-full md:w-1/2">
            <Box display={"flex"} alignItems={"center"}>
              <Tooltip title={country?.label}>
                <Badge
                  overlap="circular"
                  className="rounded-full shadow-md"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  badgeContent={
                    <ReactCountryFlag
                      countryCode={coach.country}
                      svg
                      style={{
                        width: "15px",
                        height: "15px",
                        border: "1px solid white",
                        borderRadius: "20px",
                        objectFit: "cover",
                      }}
                    />
                  }
                >
                  <Avatar
                    sx={{ width: "55px", height: "55px" }}
                    alt={coach.first_name + " " + coach.last_name}
                    src={coach.avatar}
                  />
                </Badge>
              </Tooltip>
              <Box marginLeft={"20px"}>
                <Typography className="first-letter:capitalize text-lg font-semibold">
                  {`${coach.first_name} ${coach.last_name}`}
                </Typography>
                <Typography className="text-slate-600 text-sm">
                  {coach.title || ""}
                </Typography>
              </Box>
            </Box>

            <DetailComponent caption="Category" content={category.label} />
            <DetailComponent
              caption="Lesson Type"
              content={`${
                LessonTypeLabels[lessonType as LessonType]
              } / ${lessonPack}lessons`}
            />
            <DetailComponent
              caption="Description"
              content={lesson.description}
            />
            <DetailComponent caption="Aimed at" content={lesson.purpose} />
          </Box>
          <Box className="w-full md:w-1/2 lg:p-4">
            <Box className="flex justify-between items-center my-2">
              <TextField
                placeholder="promo code"
                size="small"
                value={promocode}
                onChange={(e) => setPromocode(e.target.value)}
              />
              <Button
                type="button"
                onClick={checkPromoCode}
                variant="outlined"
                className="ml-2"
              >
                Redeem
              </Button>
            </Box>
            <Elements stripe={stripePromise} options={options}>
              <CheckoutForm symbol={currencySymbol} amount={price} />
            </Elements>
          </Box>
        </Paper>
      </BlankLayout>
    )
  );
}

function DetailComponent({
  caption,
  content,
}: {
  caption: string;
  content: string;
}) {
  return (
    <Box className="break-words">
      <Typography className="my-3 text-sm font-medium text-gray-400">
        <StyledCaption>{caption}</StyledCaption> : {content}
      </Typography>
    </Box>
  );
}

const CheckoutForm = ({
  symbol,
  amount,
}: {
  symbol: string;
  amount: number;
}) => {
  const [isPaying, setIsPaying] = useState<boolean>(false);

  const curUser = useSelector(selectAuthState);
  const { coach, lessonID, lessonPack, lessonType, timeline, channel } =
    useSelector(selectLessonBookingState) || {};

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
        return_url: "http://localhost:3000/payment/ConfirmPayment",
      },
      redirect: "if_required",
    });
    if (result.error) {
      setIsPaying(false);
      if (result.error.code === "card_declined")
        toast.error("Sorry! Your card has been declined.");
      if (result.error.code === "expired_card")
        toast.error("Sorry! Your card has been expired.");
      if (result.error.code === "incorrect_cvc")
        toast.error("Sorry! Please insert valid CVC.");
      if (result.error.code === "incorrect_number")
        toast.error("Sorry! Please insert valid card number.");
      if (result.error.code === "processing_error")
        toast.error(
          "Sorry! Something went wrong. Check your card information again."
        );
    } else {
      const api = "/api/common/save-lesson-booking";
      const params = {
        buyerID: curUser.id,
        coachID: coach.id,
        lessonID,
        lessonPack,
        lessonType,
        timeline,
        channel,
      };
      const res = await axios.post(api, params);

      router.push("/payment/ConfirmPayment");
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