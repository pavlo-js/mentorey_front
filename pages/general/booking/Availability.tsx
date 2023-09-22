import { Box, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(weekOfYear);
dayjs.extend(isSameOrBefore);

const labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'];

export default function Availability() {
  const today = dayjs();
  const curYear = today.year();
  const curWeek = today.week();
  const [weekDays, setWeekDays] = useState<Dayjs[]>(getDaysOfWeek(curYear, curWeek));
  const [activeWeek, setActiveWeek] = useState();
  const [activeYear, setActiveYear] = useState();

  function getDaysOfWeek(year: number, week: number): Dayjs[] {
    const startOfWeek = dayjs().year(year).week(week).startOf('week');

    const days: Dayjs[] = [];

    for (let i = 0; i < 7; i++) {
      const day = startOfWeek.add(i, 'day');
      days.push(day);
    }

    return days;
  }

  return (
    <Paper>
      <Box className="flex">
        <Box className="w-20"></Box>

        <Box className="flex-grow flex justify-around">
          {weekDays.map((item, index) => (
            <Box className="select-none">
              <Typography component={'p'} align="center" className="block">
                {labels[index]}
              </Typography>
              <Typography className="block" align="center">
                {item.date()}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
      <Box>
        <Box className="w-20"></Box>
      </Box>
    </Paper>
  );
}
