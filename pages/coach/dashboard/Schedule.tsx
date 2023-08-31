import React, { useState } from "react";
import {
  Paper,
  Typography,
  Tabs,
  Tab,
  Box,
  useMediaQuery,
  Button,
} from "@mui/material";
import { useSelector } from "react-redux";
import { selectAuthState } from "~/slices/authSlice";
import Weekly from "./components/Weekly";
import Override from "./components/Override";
// Date
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

interface TimeSlot {
  startTime: Dayjs;
  endTime: Dayjs;
}

interface DayTimes {
  times: TimeSlot[];
}

interface OverrideTimes {
  date: Dayjs;
  times: TimeSlot[];
}

interface WeeklyData {
  coach_id: number;
  dayOfWeek: number;
  from: string;
  to: string;
}

interface OverrideData {
  coach_id: number;
  date: string;
  from: string;
  to: string;
}

export default function Schedule() {
  const curUser = useSelector(selectAuthState);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [tabValue, setTabValue] = useState(0);
  const [weeklyTimes, setWeeklyTimes] = useState<DayTimes[]>([]);
  const [weeklyError, setWeeklyError] = useState<boolean>(false);
  const [overrideTimes, setOverrideTimes] = useState<OverrideTimes[]>([]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const saveWeeklyTimes = () => {
    if (!weeklyError) {
      const temp: WeeklyData[] = [];
      if (weeklyTimes) {
        weeklyTimes.forEach((item: DayTimes, dayIndex: number) => {
          item.times.forEach((time: TimeSlot) => {
            temp.push({
              coach_id: curUser.id,
              dayOfWeek: dayIndex,
              from: time.startTime.toISOString(),
              to: time.endTime.toISOString(),
            });
          });
        });
      }

      const api = "/api/coach/setWeeklyAvailTimes";
      const request = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ weeklyAvailTimes: temp }),
      };
      fetch(api, request)
        .then((res) => res.json())
        .then((data) => console.log(data));
    }
  };

  const saveOverrideTimes = () => {
    const temp: OverrideData[] = [];
    overrideTimes.forEach((item: OverrideTimes) => {
      item.times.forEach((times) => {
        temp.push({
          coach_id: curUser.id,
          date: item.date.format("YYYY-MM-DD"),
          from: times.startTime.toISOString(),
          to: times.endTime.toISOString(),
        });
      });
    });
    const api = "/api/coach/setOverrideTimes";
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ overrideTimes: temp }),
    };
    fetch(api, request)
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  const handleSave = () => {
    // saveWeeklyTimes();
    saveOverrideTimes();
  };

  return (
    <Paper className="max-w-4xl mx-auto">
      <Typography className="text-lg font-semibold p-5 text-slate-500">
        Your Timezone: {curUser.timezone}
      </Typography>
      {isMobile ? (
        <>
          <Tabs value={tabValue} onChange={handleChange} variant="fullWidth">
            <Tab label="Weekly hours" />
            <Tab label="Date override" />
          </Tabs>
          <Box p={3}>
            {tabValue === 0 && (
              <Weekly
                curUser={curUser}
                sendWeeklyTimes={setWeeklyTimes}
                hasError={setWeeklyError}
              />
            )}
            {tabValue === 1 && (
              <Override
                curUser={curUser}
                sendOverrideTimes={setOverrideTimes}
              />
            )}
          </Box>
        </>
      ) : (
        <div className="flex">
          <div className="w-full md:w-7/12">
            <Weekly
              curUser={curUser}
              sendWeeklyTimes={setWeeklyTimes}
              hasError={setWeeklyError}
            />
          </div>
          <div className="w-full md:w-5/12">
            <Override curUser={curUser} sendOverrideTimes={setOverrideTimes} />
          </div>
        </div>
      )}
      <Button
        onClick={handleSave}
        variant="contained"
        className="bg-primary-600 ml-auto block mb-2 mr-2"
      >
        Save
      </Button>
    </Paper>
  );
}
