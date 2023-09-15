import {
  Avatar,
  Box,
  Paper,
  Typography,
  Tooltip,
  Badge,
  Button,
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

import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

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

export default function LessonBookingCheckout() {
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

  const { data: price } = useQuery({
    queryKey: [
      "calcPrice",
      lessonID,
      lessonPack,
      lessonType,
      lesson,
      curUser,
      coach,
    ],
    queryFn: async () => {
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
          return parseFloat(
            (
              lessonPack *
              lessonTypeSet[lessonType as LessonType] *
              ((initialPrice * (100 - lesson.disRate)) / 100)
            ).toFixed(2)
          );
        } else if (lessonPack === 1) {
          return parseFloat(
            (lessonTypeSet[lessonType as LessonType] * initialPrice).toFixed(2)
          );
        }
      }
    },
    enabled: !!lesson,
  });

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

  const sendPaymentRequest = async () => {
    const api = "/api/payment/lessonBookingCheckout";
    try {
      const res = await axios.post(api);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    lesson && (
      <BlankLayout>
        <Paper
          className="max-w-xl w-fit mx-auto my-4 py-4 px-2 lg:py-6 lg:px-3"
          sx={{ minWidth: 350 }}
        >
          <Box display={"flex"} alignItems={"center"}>
            <Box>
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
            </Box>
            <Box marginLeft={"20px"}>
              <Typography className="first-letter:capitalize text-lg font-semibold">
                {`${coach.first_name} ${coach.last_name}`}
              </Typography>
              <Typography className="text-slate-600 text-sm">
                {coach.title || ""}
              </Typography>
            </Box>
          </Box>
          <Button
            onClick={sendPaymentRequest}
            variant="contained"
            className="bg-primary-600 w-full max-w-lg mx-auto my-3 lg:my-5 text-lg block"
          >
            Checkout {`${currencySymbol}${price}`}
          </Button>
          <DetailComponent caption="Category" content={category.label} />
          <DetailComponent
            caption="Lesson Type"
            content={LessonTypeLabels[lessonType as LessonType]}
          />
          <DetailComponent caption="Description" content={lesson.description} />
          <DetailComponent caption="Aimed at" content={lesson.purpose} />
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
