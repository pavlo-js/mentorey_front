import React, { useState, useEffect, useCallback } from 'react';
import { Box, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import style from './rdp.module.scss';
// Timepicker
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MultiInputTimeRangeField } from '@mui/x-date-pickers-pro/MultiInputTimeRangeField';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { DateRange } from '@mui/x-date-pickers-pro/internals/models/range';
import { formatDate } from '~/utils/utils';
import axios from 'axios';

dayjs.extend(utc);
dayjs.extend(timezone);

interface TimeSlot {
  startTime: Dayjs;
  endTime: Dayjs;
}

interface DayTime {
  date: Date;
  times: TimeSlot[];
}

interface PageProps {
  curUser: any;
  sendOverrideTimes: (data: any) => void;
  hasError?: (data: boolean) => void;
}

export default function Override({ curUser, sendOverrideTimes }: PageProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [availTimes, setAvailTimes] = useState<DayTime[]>([]);
  const [activeDay, setActiveDay] = useState<Date | undefined>();
  const [times, setTimes] = useState<TimeSlot[]>([
    {
      startTime: dayjs().hour(9).minute(0),
      endTime: dayjs().hour(17).minute(0),
    },
  ]);
  const activeDayTimes = availTimes.find((item) => item.date.getDate() === activeDay?.getDate());

  useEffect(() => {
    (async () => {
      const api = '/api/coach/getAvailTimes';
      const { data: res } = await axios.post(api, { coachID: curUser.id });
      const temp = res.override_avail;

      const result: DayTime[] = Object.values(
        temp.reduce((acc: { [date: string]: DayTime }, item: any) => {
          if (!acc[item.date]) {
            acc[item.date] = {
              date: new Date(item.date),
              times: [],
            };
          }
          acc[item.date].times.push(convertToTimeSlot(item));
          return acc;
        }, {}),
      ).map((group: any) => ({
        date: group.date,
        times: group.times.sort((a: any, b: any) => {
          if (a.startTime.isBefore(b.startTime)) return -1;
          if (a.startTime.isAfter(b.startTime)) return 1;
          return 0;
        }),
      }));
      setAvailTimes(result);
    })();
  }, []);

  const convertToTimeSlot = (item: any): TimeSlot => {
    return {
      startTime: dayjs(item.from_time),
      endTime: dayjs(item.to_time),
    };
  };

  const openDialog = () => {
    setActiveDay(undefined);
    setTimes([
      {
        startTime: dayjs().hour(9).minute(0),
        endTime: dayjs().hour(17).minute(0),
      },
    ]);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const addTimes = () => {
    const temp = [...times];
    temp.push({
      startTime: temp[temp.length - 1].endTime.add(1, 'hour'),
      endTime: temp[temp.length - 1].endTime.add(2, 'hour'),
    });
    setTimes(temp);
  };

  const updateTimes = (timesIndex: number, value: DateRange<Dayjs>) => {
    const temp = [...times];
    temp[timesIndex].startTime = value[0]!;
    temp[timesIndex].endTime = value[1]!;
    setTimes(temp);
  };

  const deleteTimes = (timesIndex: number) => {
    const temp = [...times];
    temp.splice(timesIndex, 1);
    setTimes(temp);
  };

  const handleApply = () => {
    const temp = [...availTimes];
    if (activeDay && !!activeDayTimes) {
      const index = availTimes.findIndex((item) => item.date.getDate() === activeDay.getDate());
      temp[index] = {
        date: activeDay,
        times: times,
      };
      temp.sort((a, b) => a.date.getTime() - b.date.getTime());

      setAvailTimes(temp);
    } else if (activeDay && !!!activeDayTimes) {
      temp.push({
        date: activeDay,
        times: times,
      });
      temp.sort((a, b) => a.date.getTime() - b.date.getTime());

      setAvailTimes(temp);
    }
    closeDialog();
  };

  useEffect(() => {
    if (!!activeDayTimes) {
      setTimes(activeDayTimes.times);
    }
  }, [activeDay]);

  useEffect(() => {
    sendOverrideTimes(availTimes);
  }, [availTimes]);

  const deleteDayTimes = (dateIndex: number) => {
    const temp = [...availTimes];
    temp.splice(dateIndex, 1);
    setAvailTimes(temp);
  };

  return (
    <>
      <Box className="m-2 rounded border border-slate-300 px-2 md:px-4 pt-2 md:pt-4">
        <Typography className="my-3 font-semibold">Add date overrides</Typography>
        <Typography className="text-slate-600 text-sm">
          Add dates when your availability changes from your weekly hours
        </Typography>
        <Button variant="outlined" fullWidth className="rounded-2xl my-3" onClick={openDialog}>
          Add a date override
        </Button>
        {availTimes.map((item, dateIndex) => (
          <Box
            key={dateIndex}
            display="flex"
            alignItems="flex-start"
            justifyContent="space-between"
            className={dateIndex != availTimes.length - 1 ? 'border-b py-2' : 'py-2'}
          >
            <Typography sx={{ marginTop: '10px' }}>{formatDate(item.date)}</Typography>
            <Box>
              {item.times.map((time, timeIndex) => (
                <Typography key={dateIndex + timeIndex} sx={{ marginTop: '10px', fontSize: '14px' }}>
                  {time.startTime.format('HH:mm')} - {time.endTime.format('HH:mm')}
                </Typography>
              ))}
            </Box>
            <IconButton aria-label="delete" className="ml-4" onClick={() => deleteDayTimes(dateIndex)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}
      </Box>

      <Dialog open={dialogOpen} onClose={closeDialog} sx={{ '.MuiDialog-paper': { width: 350, textAlign: 'center' } }}>
        <DialogTitle id="alert-dialog-title">Select the date(s) you want to assign specific hours</DialogTitle>
        <DialogContent className="d-flex justify-center">
          <DayPicker
            captionLayout="dropdown-buttons"
            mode="single"
            showOutsideDays
            selected={activeDay}
            fixedWeeks
            onSelect={(selectedDay) => {
              setActiveDay(selectedDay);
            }}
            disabled={{ before: new Date() }}
            modifiersClassNames={{
              selected: style.selected,
              today: style.today,
            }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box display="flex" alignItems="flex-start">
              <Box
                sx={{
                  '& > *:not(:first-of-type)': {
                    marginTop: '10px',
                  },
                }}
              >
                {times.map((item: TimeSlot, index: number) => (
                  <Box key={`times_${index}`} display="flex" justifyContent="space-between">
                    <MultiInputTimeRangeField
                      timezone={curUser.timezone}
                      ampm={false}
                      onChange={(value) => updateTimes(index, value)}
                      value={[item.startTime, item.endTime]}
                      slotProps={{
                        textField: ({ position }) => ({
                          label: position === 'start' ? 'From' : 'To',
                          size: 'small',
                          sx: { width: 80 },
                          inputProps: {
                            style: { textAlign: 'center' },
                          },
                        }),
                      }}
                    />
                    <IconButton aria-label="delete" className="ml-4" onClick={() => deleteTimes(index)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
              </Box>

              <IconButton aria-label="delete" className="ml-4" onClick={addTimes}>
                <AddIcon fontSize="small" />
              </IconButton>
            </Box>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleApply} autoFocus variant="contained" className="bg-primary-600">
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
