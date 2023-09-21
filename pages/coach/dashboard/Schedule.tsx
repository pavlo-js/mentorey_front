import React, { useState } from 'react';
import { Paper, Typography, Tabs, Tab, Box, useMediaQuery, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectAuthState } from '~/slices/authSlice';
import Weekly from './components/Weekly';
import Override from './components/Override';
// Date
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { formatDate } from '~/utils/utils';
// Toast
import { toast } from 'react-toastify';

dayjs.extend(utc);
dayjs.extend(timezone);

interface TimeSlot {
  startTime: Dayjs;
  endTime: Dayjs;
}

type DayTimes = TimeSlot[];

interface OverrideTimes {
  date: Date;
  times: TimeSlot[];
}

interface WeeklyData {
  coach_id: any;
  dayOfWeek: number;
  from: string;
  to: string;
}

interface OverrideData {
  coach_id: any;
  date: string;
  from: string;
  to: string;
}

export default function Schedule() {
  const curUser = useSelector(selectAuthState);
  const isMobile = useMediaQuery('(max-width: 768px)');
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
          item.forEach((time: TimeSlot) => {
            temp.push({
              coach_id: curUser.id,
              dayOfWeek: dayIndex,
              from: time.startTime.toISOString(),
              to: time.endTime.toISOString(),
            });
          });
        });
      }

      const api = '/api/coach/save-weekly-times';
      const request = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ weeklyAvailTimes: temp }),
      };

      fetch(api, request)
        .then((res) => res.json())
        .then((data) => console.log(data));
    } else {
      toast.error('Please fix the override times');
    }
  };

  const saveOverrideTimes = () => {
    const temp: OverrideData[] = [];
    overrideTimes.forEach((item: OverrideTimes) => {
      item.times.forEach((times) => {
        temp.push({
          coach_id: curUser.id,
          date: formatDate(item.date)!,
          from: times.startTime.toISOString(),
          to: times.endTime.toISOString(),
        });
      });
    });
    const api = '/api/coach/save-override-times';
    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ overrideTimes: temp, coachID: curUser.id }),
    };
    fetch(api, request)
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  const handleSave = () => {
    saveWeeklyTimes();
    saveOverrideTimes();
  };

  const WeeklyAvail = <Weekly curUser={curUser} sendWeeklyTimes={setWeeklyTimes} hasError={setWeeklyError} />;

  const OverrideAvail = <Override curUser={curUser} sendOverrideTimes={setOverrideTimes} />;

  return (
    <Paper className="max-w-4xl mx-auto">
      <Typography className="text-lg font-semibold p-5 text-slate-500">Your Timezone: {curUser.timezone}</Typography>
      {isMobile ? (
        <>
          <Tabs value={tabValue} onChange={handleChange} variant="fullWidth">
            <Tab label="Weekly hours" />
            <Tab label="Date override" />
          </Tabs>
          <Box p={3}>
            {tabValue === 0 && WeeklyAvail}
            {tabValue === 1 && OverrideAvail}
          </Box>
        </>
      ) : (
        <div className="flex">
          <div className="w-full md:w-7/12">{WeeklyAvail}</div>
          <div className="w-full md:w-5/12">{OverrideAvail}</div>
        </div>
      )}
      <Button onClick={handleSave} variant="contained" className="bg-primary-600 ml-auto block mb-2 mr-2">
        Save
      </Button>
    </Paper>
  );
}
