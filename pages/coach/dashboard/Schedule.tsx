import React, { useState } from 'react';
import { Paper, Typography, Tabs, Tab, Box, useMediaQuery, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectAuthState } from '~/slices/authSlice';
import Weekly from './components/Weekly';
import Override from './components/Override';
import { toast } from 'react-toastify';
import { formatDate } from '~/utils/utils';
import axios from 'axios';

interface TimeSlot {
  startTime: number;
  endTime: number;
}

type DayTimes = TimeSlot[];

interface OverrideTimes {
  date: Date;
  times: TimeSlot[];
}

interface WeeklyData {
  coach_id: any;
  dayOfWeek: number;
  from: number;
  to: number;
}

interface OverrideData {
  coach_id: any;
  date: string;
  from: number;
  to: number;
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

  const saveWeeklyTimes = async () => {
    if (!weeklyError) {
      const temp: any[] = [];
      if (weeklyTimes) {
        weeklyTimes.forEach((item: DayTimes, wdIndex: number) => {
          item.forEach((time: TimeSlot) => {
            temp.push({
              coach_id: curUser.id,
              dayOfWeek: wdIndex,
              from: time.startTime,
              to: time.endTime,
            });
          });
        });
      }

      const api = '/api/coach/save-weekly-times';
      await axios.post(api, { weeklyAvailTimes: temp });
      toast.success('Okay');
    } else {
      toast.error('Please fix the override times');
    }
  };

  const saveOverrideTimes = async () => {
    const temp: OverrideData[] = [];
    overrideTimes.forEach((item: OverrideTimes) => {
      item.times.forEach((time) => {
        temp.push({
          coach_id: curUser.id,
          date: formatDate(item.date),
          from: time.startTime,
          to: time.endTime,
        });
      });
    });
    const api = '/api/coach/save-override-times';
    await axios.post(api, { overrideTimes: temp, coachID: curUser.id });
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
