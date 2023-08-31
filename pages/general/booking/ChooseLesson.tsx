import React, { useEffect, useState } from "react";
import {
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
  Paper,
  Divider,
  Chip,
  Card,
} from "@mui/material";
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
}

export default function ChooseLesson({
  curUser,
  coach,
  selectedLessonID,
  sendLessonID,
}: PageProps) {
  const [lessonType, setLessonType] = React.useState("");
  const [lessons, setLessons] = useState<any[]>();
  const [categories, setCategories] = useState<any[]>();
  const [activeLesson, setActiveLesson] = useState<any>(selectedLessonID);
  const currencySymbol = CurrencyData[curUser.currency].symbol;
  const [prices, setPrices] = useState<any[]>([]);

  const trialPrice = useCurrencyConverter(
    coach.currency,
    curUser.currency,
    coach.trial_price
  );

  const handleChange = (event: SelectChangeEvent) => {
    setLessonType(event.target.value);
  };

  function getCategories() {
    const api = "/api/common/getCoachCategory";
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ coachID: coach.id }),
    };
    fetch(api, request)
      .then((res) => res.json())
      .then((data) => setCategories(data.categories))
      .catch((err) => console.error(err));
  }

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

  async function updatePrices() {}

  useEffect(() => {
    getLessons();
    // getCategories();
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
      <div className="mx-auto max-w-2xl">
        <h3 className="mb-3 text-center text-xl">Choose lesson</h3>
        {/* <FormControl className="w-60" size="small">
          <InputLabel id="lessonTypeLabel">Lesson type</InputLabel>
          <Select
            labelId="lessonTypeLabel"
            id="lessonType"
            value={lessonType}
            label="Lesson type"
            onChange={handleChange}
          >
            {categories?.map((item, index) => (
              <MenuItem key={index} value={item.id}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}
        <Card
          className="my-4 rounded-lg hover:shadow-lg"
          onClick={() => setActiveLesson("trial")}
          style={activeLesson === "trial" ? activeStyle : {}}
        >
          <div className="flex cursor-pointer border p-4">
            <div className="w-10/12">
              <h4 className="truncate text-lg text-slate-600">Trial Lesson</h4>
              <Divider />
              <p className="mt-1 text-sm">382 lessons</p>
            </div>
            <div className="flex w-2/12 items-center justify-end">
              <Chip
                label={`${currencySymbol} ${trialPrice}`}
                className="bg-primary-100 px-4 font-semibold text-primary-500"
              />
            </div>
          </div>
        </Card>
        {lessons &&
          lessons.map((lesson, index) => (
            <Card
              key={index}
              className="my-4 rounded-lg hover:shadow-lg"
              onClick={() => setActiveLesson(lesson.id)}
              style={lesson.id === activeLesson ? activeStyle : {}}
            >
              <div className="flex cursor-pointer rounded-lg border p-4">
                <div className="w-10/12">
                  <h4 className="truncate text-lg text-slate-600">
                    {lesson.title}
                  </h4>
                  <Divider />
                  <p className="mt-1 text-sm">General 382 lessons</p>
                </div>
                <div className="flex w-2/12 items-center justify-end">
                  <Chip
                    label={`${currencySymbol} ${prices[index]}`}
                    className="bg-pink-100 px-4 font-semibold text-pink-500"
                  />
                </div>
              </div>
            </Card>
          ))}
      </div>
    </>
  );
}
