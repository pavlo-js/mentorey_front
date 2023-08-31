import { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import { CurrencyData } from "~/shared/CurrencyData";
import useCurrencyConverter from "~/hooks/useCurrencyConverter";
import currencyConverter from "~/utils/currencyConverter";
interface PageProps {
  lessonID: any;
  curUser: any;
  coach: any;
  selectedOption: any;
  sendOption: (data: any) => void;
}

interface LessonOption {
  lessonID: number;
  lessonType: string;
  lessonPack: number;
}

const LessonType = [
  { label: "30 min", value: "MIN30" },
  { label: "45 min", value: "MIN45" },
  { label: "60 min", value: "MIN60" },
  { label: "90 min", value: "MIN90" },
];

const activeStyle = {
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
  border: "1px solid #059669",
};

export default function LessonOption({
  lessonID,
  curUser,
  coach,
  selectedOption,
  sendOption,
}: PageProps) {
  const [lesson, setLesson] = useState<any>();
  const [convertedPrice, setConvertedPrice] = useState<number>();
  const [prices, setPrices] = useState<number[]>([]);
  const currencySymbol = CurrencyData[curUser.currency].symbol;

  const [activeOption, setActiveOption] =
    useState<LessonOption>(selectedOption);

  useEffect(() => {
    const api = "/api/common/getLesson";
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lessonID }),
    };
    fetch(api, request)
      .then((res) => res.json())
      .then((data) => setLesson(data.lesson));
  }, []);

  useEffect(() => {
    if (lesson) {
      Promise.resolve(
        currencyConverter(coach.currency, curUser.currency, lesson.price)
      ).then((value) => setConvertedPrice(value));
    }
  }, [lesson]);

  useEffect(() => {
    if (convertedPrice) {
      const temp = [
        convertedPrice * 0.5,
        convertedPrice * 0.75,
        convertedPrice,
        convertedPrice * 1.5,
      ];
      setPrices(temp);
    }
  }, [convertedPrice]);

  useEffect(() => {
    sendOption(activeOption);
  }, [activeOption]);

  return (
    <>
      {prices.length > 0 && (
        <div className="flex w-full flex-wrap">
          {LessonType.map((lessonType, index) => (
            <div key={index} className="w-1/2 px-2 text-center lg:w-1/4">
              <p className="text-2xl">{lessonType.label}</p>
              <Paper
                className="my-3 flex h-14 cursor-pointer items-center justify-between rounded-xl px-4 hover:shadow-md"
                onClick={() =>
                  setActiveOption({
                    lessonID,
                    lessonType: lessonType.value,
                    lessonPack: 1,
                  })
                }
                style={
                  JSON.stringify(activeOption) ===
                  JSON.stringify({
                    lessonID,
                    lessonType: lessonType.value,
                    lessonPack: 1,
                  })
                    ? activeStyle
                    : {}
                }
              >
                <p>1 Lesson</p>
                <p>{`${currencySymbol}  ${parseFloat(
                  prices[index].toFixed(2)
                )}`}</p>
              </Paper>
              {lesson && +lesson.pack > 1 && (
                <Paper
                  className="my-3 flex h-14 cursor-pointer items-center justify-between rounded-xl px-4 hover:shadow-md"
                  onClick={() =>
                    setActiveOption({
                      lessonID,
                      lessonType: lessonType.value,
                      lessonPack: lesson.pack,
                    })
                  }
                  style={
                    JSON.stringify(activeOption) ===
                    JSON.stringify({
                      lessonID,
                      lessonType: lessonType.value,
                      lessonPack: lesson.pack,
                    })
                      ? activeStyle
                      : {}
                  }
                >
                  <p> Lessons</p>
                  <div>
                    <p>{`${currencySymbol}  ${parseFloat(
                      (
                        (prices[index] * lesson.pack * (100 - lesson.disRate)) /
                        100
                      ).toFixed(2)
                    )}`}</p>
                    <p className="text-sm text-primary-500">
                      SAVE {lesson.disRate}%
                    </p>
                  </div>
                </Paper>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
