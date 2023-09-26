import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  MenuProps,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import style from './rdp.module.scss';
import { formatDate } from '~/utils/utils';
import axios from 'axios';
import { TimeCells } from '~/shared/data';
import { toast } from 'react-toastify';

const SelectMenuProps = {
  PaperProps: {
    style: {
      maxHeight: '200px',
    },
  },
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'left',
  },
  transformOrigin: {
    vertical: 'top',
    horizontal: 'left',
  },
};

interface TimeSlot {
  startTime: number;
  endTime: number;
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

const defaultTimeSlot: TimeSlot = {
  startTime: TimeCells.indexOf('09:00'),
  endTime: TimeCells.indexOf('17:00'),
};

const isValidSlot = (timeSlot: TimeSlot) => {
  return timeSlot.endTime > timeSlot.startTime;
};

const isOverlap = (prevSlot: TimeSlot, nextSlot: TimeSlot) => {
  return nextSlot.startTime > prevSlot.endTime;
};

export default function Override({ curUser, sendOverrideTimes }: PageProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [availTimes, setAvailTimes] = useState<DayTime[]>([]);
  const [activeDay, setActiveDay] = useState<Date | undefined>();
  const [invalidTimes, setInvalidTimes] = useState<number[]>([]);
  const [times, setTimes] = useState<TimeSlot[]>([
    {
      startTime: TimeCells.indexOf('09:00'),
      endTime: TimeCells.indexOf('17:00'),
    },
  ]);
  const activeDayTimes = availTimes.find((item) => item.date.getDate() === activeDay?.getDate());

  useEffect(() => {
    const temp: number[] = [];
    times.forEach((currentSlot, index) => {
      const nextSlot = times[index + 1];
      if (!isValidSlot(currentSlot)) temp.push(index);
      if (nextSlot && !isOverlap(currentSlot, nextSlot)) temp.push(index);
    });
    setInvalidTimes(temp);
  }, [times]);

  useEffect(() => {
    (async () => {
      const api = '/api/coach/get-avail-times';
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
          if (a.startTime < b.startTime) return -1;
          if (a.startTime > b.startTime) return 1;
          return 0;
        }),
      }));
      setAvailTimes(result);
    })();
  }, []);

  const convertToTimeSlot = (item: any): TimeSlot => {
    return {
      startTime: item.from_time,
      endTime: item.to_time,
    };
  };

  const openDialog = () => {
    setInvalidTimes([]);
    setActiveDay(undefined);
    setTimes([
      {
        startTime: TimeCells.indexOf('09:00'),
        endTime: TimeCells.indexOf('17:00'),
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
      startTime: temp[temp.length - 1].endTime + 2,
      endTime: temp[temp.length - 1].endTime + 4,
    });
    setTimes(temp);
  };

  const updateStartTimes = (timesIndex: number, value: number) => {
    const temp = [...times];
    temp[timesIndex].startTime = value;
    setTimes(temp);
  };

  const updateEndTimes = (timesIndex: number, value: number) => {
    const temp = [...times];
    temp[timesIndex].endTime = value;
    setTimes(temp);
  };

  const deleteTimes = (timesIndex: number) => {
    const temp = [...times];
    temp.splice(timesIndex, 1);
    setTimes(temp);
  };

  const handleApply = () => {
    if (invalidTimes.length > 0) {
      toast.error('Please insert correct TimeSlots.');
    } else {
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
    }
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
                  {TimeCells[time.startTime]} - {TimeCells[time.endTime]}
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
          <Box display="flex" alignItems="flex-start">
            <Box
              sx={{
                '& > *:not(:first-of-type)': {
                  marginTop: '10px',
                },
              }}
            >
              {times.map(
                (item: TimeSlot, index: number) =>
                  item.endTime < 48 && (
                    <Box display="flex" justifyContent="space-between">
                      <FormControl size="small" className="w-24">
                        <InputLabel>From</InputLabel>
                        <Select
                          value={item.startTime || defaultTimeSlot.startTime}
                          label="From"
                          onChange={(e) => updateStartTimes(index, e.target.value as number)}
                          inputProps={{ className: 'text-center' }}
                          MenuProps={SelectMenuProps as MenuProps}
                          error={invalidTimes.indexOf(index) > -1}
                        >
                          {TimeCells.map((item, index) => (
                            <MenuItem value={index}>{item}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <FormControl size="small" className="w-24 ml-2">
                        <InputLabel>To</InputLabel>
                        <Select
                          value={item.endTime || defaultTimeSlot.endTime}
                          label="To"
                          onChange={(e) => updateEndTimes(index, e.target.value as number)}
                          inputProps={{ className: 'text-center' }}
                          MenuProps={SelectMenuProps as MenuProps}
                          error={invalidTimes.indexOf(index) > -1}
                        >
                          {TimeCells.map((item, index) => (
                            <MenuItem value={index}>{item}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <IconButton aria-label="delete" className="ml-4" onClick={() => deleteTimes(index)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  ),
              )}
            </Box>

            <IconButton aria-label="delete" className="ml-4" onClick={addTimes}>
              <AddIcon fontSize="small" />
            </IconButton>
          </Box>
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
