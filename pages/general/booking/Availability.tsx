import { Box, ButtonGroup, Button, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { TimeCells } from '~/shared/data';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectAuthState } from '~/slices/authSlice';
import classnames from 'classnames';
import { DateTime } from 'luxon';
import { weeklyAvailConverter, overAvailConverter } from '~/utils/timeHandler';
import getSchedule, { getWeekDates } from './getSchedule';

const labels = ['Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat', 'Sun'];

export default function Availability({ coach }: { coach: any }) {
  const curUser: any = useSelector(selectAuthState);
  const curYear = DateTime.local().year;
  const curWeekNum = DateTime.local().weekNumber;
  const curWeekDates = getWeekDates(curYear, curWeekNum, curUser.timezone);
  const [availTimes, setAvailTimes] = useState<any>();
  const [activeYear, setActiveYear] = useState<number>(curYear);
  const [activeWeekNum, setActiveWeekNum] = useState<number>(curWeekNum);
  const [activeWeekDays, setActiveWeekDays] = useState<string[]>(curWeekDates);
  const [schedule, setSchedule] = useState<any[]>();

  const [activeWeekDates, setActiveWeekDates] = useState<DateTime[]>();

  useEffect(() => {
    (async () => {
      const schedule = await getSchedule(curUser, coach, curWeekDates);
      setSchedule(schedule);
    })();
  }, []);

  return (
    <Paper>
      <ButtonGroup size="small" className="m-2">
        <Button onClick={() => setActiveWeekNum(activeWeekNum - 1)}>Prev</Button>
        <Button>Today</Button>
        <Button onClick={() => setActiveWeekNum(activeWeekNum + 1)}>Next</Button>
      </ButtonGroup>
      <Box className="flex">
        <Box className="w-20"></Box>
        <Box className="flex-grow flex justify-around">
          {activeWeekDays.map((item, index) => (
            <Box className="select-none">
              <Typography component={'p'} align="center" className="block">
                {labels[index]}
              </Typography>
              <Typography className="block" align="center">
                {/* {`${item.month}/${item.day}`} */}
                {item}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
      <Box className="h-80 overflow-scroll border-t flex justify-between">
        <Box className="w-20 border-r select-none">
          {TimeCells.map((item, index) => (
            <>
              {index < 48 ? (
                <Box className="flex justify-center items-center h-8 border-b">
                  {TimeCells[index + 1] && (
                    <Typography className="text-xs">{`${item}-${TimeCells[index + 1]}`}</Typography>
                  )}
                </Box>
              ) : null}
            </>
          ))}
        </Box>
        <Box className="flex justify-around flex-grow">
          {schedule?.map((day, dayIndex) => (
            <Box className="flex-1">
              {day.timeSlots.map((slot: any) => (
                <Box
                  className={classnames('w-full', 'h-8', 'border', 'box-border', {
                    'bg-primary-500': slot === 'avail',
                  })}
                ></Box>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </Paper>
  );
}
