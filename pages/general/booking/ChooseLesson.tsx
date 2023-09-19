import React, { useEffect, useState } from "react";
import { Box, Chip, Card, Typography, Divider } from "@mui/material";
import { CurrencyData } from "~/shared/CurrencyData";
import useCurrencyConverter from "~/hooks/useCurrencyConverter";
import currencyConverter from "~/utils/currencyConverter";

const activeStyle = {
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
  border: "1px solid #059669",
};

interface PageProps {
  curUser: any;
  coach: any;
  selectedLessonID: any;
  sendLessonID: (data: any) => void;
  lessons?: any[];
}

export default function Page({
  curUser,
  coach,
  selectedLessonID,
  sendLessonID,
}: PageProps) {
  const [lessons, setLessons] = useState<any[]>();
  const [activeLesson, setActiveLesson] = useState<any>(selectedLessonID);
  const currencySymbol = CurrencyData[curUser.currency].symbol;
  const [prices, setPrices] = useState<any[]>([]);

  const trialPrice = useCurrencyConverter(
    coach.currency,
    curUser.currency,
    coach.trial_price
  );

  function getLessons() {
    const api = "/api/coach/my_lessons";
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID: coach.id,
      }),
    };
    fetch(api, request)
      .then((res) => res.json())
      .then((data) => setLessons(data.lessons));
  }

  useEffect(() => {
    getLessons();
  }, []);

  useEffect(() => {
    if (lessons)
      Promise.all(
        lessons.map((item) => {
          return currencyConverter(
            coach.currency,
            curUser.currency,
            item.price
          ).catch(() => null);
        })
      ).then((_values) => {
        const values = _values.filter((item) => item);
        setPrices(values);
      });
  }, [lessons]);

  useEffect(() => {
    sendLessonID(activeLesson);
  }, [activeLesson]);

  return (
    <>
      <Box className="mx-auto">
        <Typography variant="h3" className="mb-3 text-center text-2xl">
          Choose lesson
        </Typography>
        <Card
          className="my-4 rounded-lg hover:shadow-lg"
          onClick={() => setActiveLesson("trial")}
          style={activeLesson === "trial" ? activeStyle : {}}
        >
          <Box className="flex cursor-pointer border p-4">
            <Box className="flex-grow mr-4">
              <Typography
                variant="h4"
                className="truncate text-lg text-slate-600"
              >
                Trial Lesson
              </Typography>
              <Divider />
              <Typography className="mt-1 text-sm">382 lessons</Typography>
            </Box>
            <Box className="flex w-32 items-center justify-end">
              <Chip
                label={`${currencySymbol} ${(trialPrice / 0.97 + 1).toFixed(
                  2
                )} / 30mins`}
                className="bg-primary-100 text-center font-semibold text-primary-500 w-full"
              />
            </Box>
          </Box>
        </Card>
        {lessons &&
          lessons.map((lesson, index) => (
            <Card
              key={index}
              className="my-4 rounded-lg hover:shadow-lg"
              onClick={() => setActiveLesson(lesson.id)}
              style={lesson.id === activeLesson ? activeStyle : {}}
            >
              <Box className="flex cursor-pointer rounded-lg border p-4">
                <Box className="flex-grow mr-2 md:mr-4">
                  <Typography className="truncate text-lg text-slate-600">
                    {lesson.title}
                  </Typography>
                  <Divider />
                  <Typography className="mt-1 text-sm">
                    General 382 lessons
                  </Typography>
                </Box>
                <Box className="flex w-24 md:w-32 items-center justify-end">
                  <Chip
                    label={`${currencySymbol} ${(
                      prices[index] / 0.97 +
                      1
                    ).toFixed(2)} /hr`}
                    className="bg-pink-100 w-full text-center font-semibold text-pink-500"
                  />
                </Box>
              </Box>
            </Card>
          ))}
      </Box>
    </>
  );
}
