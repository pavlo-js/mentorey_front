import { Box, ButtonGroup, Button, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { TimeCells } from '~/shared/data';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectAuthState } from '~/slices/authSlice';
import classnames from 'classnames';
import { DateTime } from 'luxon';
import { getWeekDates, weeklyAvailConverter, overAvailConverter } from '~/utils/timeHandler';

const labels = ['Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat', 'Sun'];

type Status = 'bookedByMe' | 'bookedByOther' | 'avail' | 'blank';
interface TimeSlot {
  slotIndex: number;
  status: Status;
}
interface Schedule {
  date: DateTime;
  timeSlots: TimeSlot[];
}

export default function Availability({ coach }: { coach: any }) {
  const curUser: any = useSelector(selectAuthState);
  const curYear = DateTime.local().year;
  const curWeekNum = DateTime.local().weekNumber;
  const curWeekDays = getWeekDates(curYear, curWeekNum);
  const [availTimes, setAvailTimes] = useState<any>();
  const [activeYear, setActiveYear] = useState<number>(curYear);
  const [activeWeekNum, setActiveWeekNum] = useState<number>(curWeekNum);
  const [activeWeekDays, setActiveWeekDays] = useState<DateTime[]>(curWeekDays);
  const [schedule, setSchedule] = useState<Schedule[]>();

  useEffect(() => {
    setActiveWeekDays(getWeekDates(activeYear, activeWeekNum));
  }, [activeYear, activeWeekNum]);

  useEffect(() => {
    if (activeWeekDays.length > 0) {
      (async () => {
        const { data: res } = await axios.post('/api/coach/get-avail-times', { coachID: coach.id });

        const weeklyAvail: any[] = [];

        res.weekly_avail.map((item: any) => {
          const temp = weeklyAvailConverter(coach.timezone, curUser.timezone, item, activeWeekDays);
          weeklyAvail.push(temp);
        });

        const overrideAvail: any[] = [];
        res.override_avail.map((item: any) => {
          const temp = overAvailConverter(coach.timezone, curUser.timezone, item);
          overrideAvail.push(temp);
        });

        setAvailTimes({ weeklyAvail: weeklyAvail.flat(), overrideAvail: overrideAvail.flat() });
      })();
    }
  }, []);

  const { data: coachLessonBookings } = useQuery({
    queryKey: ['getCoachBookings'],
    queryFn: async () => {
      const { data: res } = await axios.post('/api/coach/get-coach-bookings', { coachID: coach.id });
      return res.coach_bookings;
    },
  });

  const { data: buyerLessonBookings } = useQuery({
    queryKey: ['getBuyerBookings'],
    queryFn: async () => {
      const { data: res } = await axios.post('/api/common/get-buyer-bookings', { buyerID: curUser.id });
      return res.buery_bookings;
    },
  });

  useEffect(() => {
    if (availTimes && coachLessonBookings && buyerLessonBookings) {
      const temp: Schedule[] = activeWeekDays.map((day, wdIndex) => {
        const blankSlots: TimeSlot[] = Array.from({ length: TimeCells.length }, (_, index) => ({
          slotIndex: index,
          status: 'blank' as Status,
        }));

        const x: Schedule = {
          date: day,
          timeSlots: blankSlots,
        };

        const weeklyAvailTimesOfDay = availTimes.weeklyAvail.filter((item: any) => item.day_of_week === wdIndex);

        if (weeklyAvailTimesOfDay.length > 0) {
          weeklyAvailTimesOfDay.forEach((item: any) => {
            let i = item.from_time;
            let j = item.to_time;
            for (i; i < j; i++) {
              x.timeSlots[i].status = 'avail';
            }
          });
        }

        const blankSlotsOne: TimeSlot[] = Array.from({ length: TimeCells.length }, (_, index) => ({
          slotIndex: index,
          status: 'blank' as Status,
        }));

        const overrideAvailTimesOfDay = availTimes.overrideAvail.filter(
          (item: any) => item.date === day.toFormat('yyyy-MM-dd'),
        );
        if (overrideAvailTimesOfDay.length > 0) {
          x.timeSlots = blankSlotsOne;
          overrideAvailTimesOfDay.forEach((item: any) => {
            let i = item.from_time;
            let j = item.to_time;
            for (i; i < j; i++) {
              x.timeSlots[i].status = 'avail';
            }
          });
        }

        return x;
      });

      setSchedule(temp);
    }
  }, [availTimes, coachLessonBookings, buyerLessonBookings]);

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
                {`${item.month}/${item.day}`}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
      <Box className="h-80 overflow-scroll border-t flex justify-between">
        <Box className="w-20 border-r select-none">
          {TimeCells.map((item, index) => (
            <Box className="flex justify-center items-center h-8 border-b">
              {index === TimeCells.length - 1 ? (
                <Typography className="text-xs">{`${item}-24:00`}</Typography>
              ) : (
                <Typography className="text-xs">{`${item}-${TimeCells[index + 1]}`}</Typography>
              )}
            </Box>
          ))}
        </Box>
        <Box className="flex justify-around flex-grow">
          {schedule?.map((day, dayIndex) => (
            <Box className="flex-1">
              {day.timeSlots.map((slot, slotIndex) => (
                <Box
                  className={classnames('w-full', 'h-8', 'border', 'box-border', {
                    'bg-primary-500': slot.status === 'avail',
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
