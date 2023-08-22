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

const LessonData = [
  {
    id: "1",
    type: "English",
    title: "Trial Lesson",
  },
];

export default function ChooseLesson({ coach }: { coach: any }) {
  const [lessonType, setLessonType] = React.useState("");
  const [lessons, setLessons] = useState<any[]>();
  const [categories, setCategories] = useState<any[]>();
  const currencySymbol = CurrencyData[coach.currency].symbol;

  const handleChange = (event: SelectChangeEvent) => {
    setLessonType(event.target.value);
  };

  useEffect(() => {
    getLessons();
    // getCategories();
  }, []);

  useEffect(() => {
    console.log(categories);
  }, [categories]);

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
        <Card className="my-4 rounded-lg hover:shadow-lg">
          <div className="flex cursor-pointer border p-4">
            <div className="w-10/12">
              <h4 className="truncate text-lg text-slate-600">Trial Lesson</h4>
              <Divider />
              <p className="mt-1 text-sm">382 lessons</p>
            </div>
            <div className="flex w-2/12 items-center justify-end">
              <Chip
                label={`${currencySymbol} ${coach.trial_price}`}
                className="bg-primary-100 px-4 font-semibold text-primary-500"
              />
            </div>
          </div>
        </Card>
        {lessons &&
          lessons.map((lesson, index) => (
            <Card key={index} className="my-4 rounded-lg hover:shadow-lg">
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
                    label={`${currencySymbol} ${lesson.price}`}
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