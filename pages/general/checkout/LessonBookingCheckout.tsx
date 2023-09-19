import {
  Avatar,
  Box,
  Paper,
  Typography,
  Tooltip,
  Badge,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
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
import Link from "next/link";

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
  const [originPrice, setOriginPrice] = useState<number>();
  const [promocode, setPromocode] = useState<string>();
  const [clientSecret, setClientSecret] = useState<string>();

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

  const getPrice = async () => {
    if (lesson) {
      if (lesson.isTrialLesson) {
        const trialPrice = await currencyConverter(
          coach.currency,
          curUser.currency,
          coach.trial_price
        );
        return trialPrice;
      } else {
        const initialPrice = await currencyConverter(
          coach.currency,
          curUser.currency,
          lesson.price
        );
        if (lessonPack > 1) {
          setOriginPrice(
            parseFloat(
              (
                lessonPack *
                lessonTypeSet[lessonType as LessonType] *
                ((initialPrice * (100 - lesson.disRate)) / 100)
              ).toFixed(2)
            )
          );
          return parseFloat(
            (
              (lessonPack *
                lessonTypeSet[lessonType as LessonType] *
                ((initialPrice * (100 - lesson.disRate)) / 100)) /
                0.97 +
              1
            ).toFixed(2)
          );
        } else if (lessonPack === 1) {
          setOriginPrice(
            parseFloat(
              (lessonTypeSet[lessonType as LessonType] * initialPrice).toFixed(
                2
              )
            )
          );
          return parseFloat(
            (
              (lessonTypeSet[lessonType as LessonType] * initialPrice) / 0.97 +
              1
            ).toFixed(2)
          );
        }
      }
    }
  };

  useEffect(() => {
    if (promocode) {
      (async () => {
        const tempPrice = await getPrice();
        if (tempPrice) {
          if (checkPromocode(promocode)) {
            setPrice(parseFloat((tempPrice * 0.95).toFixed(2)));
          } else {
            setPrice(tempPrice);
          }
        }
      })();
    }
  }, [promocode]);

  const checkPromocode = (code: string) => {
    return code === testPromoCode;
  };

  useEffect(() => {
    if (price) {
      (async () => {
        try {
          const api = "/api/payment/create-payment-intent";
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

  return (
    <>
      <PromoModal sendPromocode={setPromocode} />
      {lesson && (
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
              {clientSecret && price && originPrice && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <CheckoutForm
                    symbol={currencySymbol}
                    amount={price}
                    originPrice={originPrice}
                    clientSecret={clientSecret}
                  />
                </Elements>
              )}
            </Box>
          </Paper>
        </BlankLayout>
      )}
    </>
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

      const param: any = {};
      param.buyerID = curUser.id;
      param.coachID = coach.id;
      param.lessonID = lessonID === "trial" ? 0 : lessonID;
      param.lessonPack = lessonPack;
      param.lessonType = lessonType;
      param.timeline = timeline;
      param.channel = channel;
      param.amount = amount;
      param.currency = curUser.currency;
      param.clientSecret = clientSecret;
      param.originPrice = originPrice;

      try {
        await axios.post(api, param);
        router.push("/payment/ConfirmPayment");
      } catch (err) {
        toast.error("Sorry! Something went wrong. Please try again.");
        console.log(err);
      }
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

interface ModalProps {
  sendPromocode: (data: any) => void;
}

function PromoModal({ sendPromocode }: ModalProps) {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [code, setCode] = useState<string>("");
  const handleClose = () => {
    if (code) {
      sendPromocode(code);
    } else {
      sendPromocode("not_defined");
    }
    setIsOpen(false);
  };
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Promocode</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Mentorey provides promo code to help students. If you have got one,
          please insert below. <br />
          <strong>
            But please note that the promo code is usable for only one time.
          </strong>{" "}
          <br />
          You can check your promocode on your{" "}
          <Link
            href={"/pupil/dashboard"}
            className="font-semibold text-primary-700"
          >
            dashboard
          </Link>{" "}
          page.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Promo code"
          type="text"
          fullWidth
          variant="standard"
          helperText="123456 for test"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={handleClose}
          variant="contained"
          className="bg-primary-600"
        >
          Redeem
        </Button>
      </DialogActions>
    </Dialog>
  );
}
