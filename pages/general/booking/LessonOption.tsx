import { useEffect, useState } from "react";
import { Paper } from "@mui/material";
interface PageProps {
  lessonID: any;
}

const LessonType = [
  { label: "30 min", value: "MIN30" },
  { label: "45 min", value: "MIN45" },
  { label: "60 min", value: "MIN60" },
  { label: "90 min", value: "MIN90" },
];

export default function LessonOption({ lessonID }: PageProps) {
  const [lesson, setLesson] = useState<any>();
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
      .then((data) => setLesson(lesson));
  }, []);

  return (
    <>
      <div className="flex w-full flex-wrap">
        {LessonType.map((lessonType, index) => (
          <div className="w-1/2 px-2 text-center lg:w-1/4">
            <p className="text-2xl">{lessonType.label}</p>
            <Paper className="my-3 flex h-14 cursor-pointer items-center justify-between rounded-xl px-4 hover:shadow-md">
              <p>1 Lesson</p>
              <p>$ 14.86</p>
            </Paper>
            {lesson && +lesson.pack > 1 && (
              <Paper className="my-3 flex h-14 cursor-pointer items-center justify-between rounded-xl px-4 hover:shadow-md">
                <p> Lessons</p>
                <div>
                  <p>$ 124.86</p>
                  <p className="text-sm text-primary-500">SAVE 10%</p>
                </div>
              </Paper>
            )}
          </div>
        ))}

        <div className="w-1/2 px-2 text-center lg:w-1/4">
          <p className="text-2xl">45min</p>
          <Paper className="my-3 flex h-14 cursor-pointer items-center justify-between rounded-xl px-4 hover:shadow-md">
            <p>1 Lesson</p>
            <p>$ 14.86</p>
          </Paper>
          <Paper className="my-3 flex h-14 cursor-pointer items-center justify-between rounded-xl px-4 hover:shadow-md">
            <p>10 Lessons</p>
            <div>
              <p>$ 124.86</p>
              <p className="text-sm text-primary-500">SAVE 10%</p>
            </div>
          </Paper>
        </div>
        <div className="w-1/2 px-2 text-center lg:w-1/4">
          <p className="text-2xl">60min</p>
          <Paper className="my-3 flex h-14 cursor-pointer items-center justify-between rounded-xl px-4 hover:shadow-md">
            <p>1 Lesson</p>
            <p>$ 14.86</p>
          </Paper>
          <Paper className="my-3 flex h-14 cursor-pointer items-center justify-between rounded-xl px-4 hover:shadow-md">
            <p>10 Lessons</p>
            <div>
              <p>$ 124.86</p>
              <p className="text-sm text-primary-500">SAVE 10%</p>
            </div>
          </Paper>
        </div>
        <div className="w-1/2 px-2 text-center lg:w-1/4">
          <p className="text-2xl">90min</p>
          <Paper className="my-3 flex h-14 cursor-pointer items-center justify-between rounded-xl px-4 hover:shadow-md">
            <p>1 Lesson</p>
            <p>$ 14.86</p>
          </Paper>
          <Paper className="my-3 flex h-14 cursor-pointer items-center justify-between rounded-xl px-4 hover:shadow-md">
            <p>10 Lessons</p>
            <div>
              <p>$ 124.86</p>
              <p className="text-sm text-primary-500">SAVE 10%</p>
            </div>
          </Paper>
        </div>
      </div>
    </>
  );
}
