import { useCallback, useEffect, useState, ChangeEvent } from 'react';
import {
  Box,
  Divider,
  Typography,
  Menu,
  MenuItem,
  MenuList,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuProps,
} from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import { TimeCells, DaysOfWeek } from '~/shared/data';
import axios from 'axios';

import { allTimezones } from 'react-timezone-select';
import { convertToLoaclTimezone } from '~/utils/timezoneConverter';

console.log(allTimezones);

interface TimeSlot {
  startTime: number;
  endTime: number;
}

type DayTimes = TimeSlot[];

interface InvalidState {
  dayIndex: number;
  timesIndex: number;
}

type DayCheckboxValue = number;

const defaultTimeSlot: TimeSlot = {
  startTime: TimeCells.indexOf('09:00'),
  endTime: TimeCells.indexOf('17:00'),
};

const defaultTimes: DayTimes[] = [
  [{ ...defaultTimeSlot }],
  [{ ...defaultTimeSlot }],
  [{ ...defaultTimeSlot }],
  [{ ...defaultTimeSlot }],
  [{ ...defaultTimeSlot }],
  [],
  [],
];

const isValidSlot = (timeSlot: TimeSlot) => {
  return timeSlot.endTime > timeSlot.startTime;
};

const isOverlap = (prevSlot: TimeSlot, nextSlot: TimeSlot) => {
  return nextSlot.startTime > prevSlot.endTime;
};

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

interface PageProps {
  curUser: any;
  sendWeeklyTimes: (data: DayTimes[]) => void;
  hasError: (data: boolean) => void;
}

export default function Weekly({ curUser, sendWeeklyTimes, hasError }: PageProps) {
  const [availableTimes, setAvailableTimes] = useState<DayTimes[]>(defaultTimes);
  const [invalid, setInvalid] = useState<InvalidState[]>([]);
  const [originDay, setOriginDay] = useState<number | undefined>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    (async () => {
      const api = '/api/coach/getAvailTimes';
      const { data: res } = await axios.post(api, { coachID: curUser.id });

      if (res.weekly_avail.length > 0) {
        const temp: DayTimes[] = Array(7)
          .fill(null)
          .map(() => []);

        res.weekly_avail.forEach((item: any, index: number) => {
          temp[item.day_of_week].push({
            startTime: convertToLoaclTimezone(item.from_time, curUser.timezone),
            endTime: convertToLoaclTimezone(item.to_time, curUser.timezone),
          });
        });

        temp.forEach((dayTimes) => {
          dayTimes.sort((a, b) => {
            if (a.startTime < b.startTime) {
              return -1;
            } else if (a.startTime > b.startTime) {
              return 1;
            } else {
              return 0;
            }
          });
        });

        setAvailableTimes(temp);
      } else {
        setAvailableTimes(defaultTimes);
      }
    })();
  }, []);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAdd = useCallback(
    (dayIndex: number) => {
      const newTimes = availableTimes?.map((item, index) => {
        if (dayIndex === index) {
          if (item.length > 0) {
            const lastSlot = item[item.length - 1];
            const newSlot: TimeSlot = {
              startTime: lastSlot.endTime + 2,
              endTime: lastSlot.endTime + 4,
            };
            return [...item, newSlot];
          } else {
            return [...item, { ...defaultTimeSlot }];
          }
        } else {
          return item;
        }
      });
      setAvailableTimes(newTimes);
    },
    [availableTimes],
  );

  const handleDelete = (dayIndex: number, timesIndex: number) => {
    if (availableTimes) {
      const newTimes = [...availableTimes];
      const targetDay = newTimes[dayIndex];
      targetDay.splice(timesIndex, 1);
      setAvailableTimes(newTimes);
    }
  };

  const updateStartTimes = (dayIndex: number, timesIndex: number, value: number) => {
    const tempTimes = [...availableTimes];
    tempTimes[dayIndex][timesIndex].startTime = value;

    setAvailableTimes(tempTimes);
  };

  const updateEndTimes = (dayIndex: number, timesIndex: number, value: number) => {
    const tempTimes = [...availableTimes];
    tempTimes[dayIndex][timesIndex].endTime = value;

    setAvailableTimes(tempTimes);
  };

  const handleCheckbox = (event: ChangeEvent<HTMLInputElement>, dayIndex: number) => {
    const temp = [...availableTimes];
    temp[dayIndex] = event.target.checked ? [{ ...defaultTimeSlot }] : [];
    setAvailableTimes(temp);
  };

  const handleCopy = (event: React.MouseEvent<HTMLElement>, dayIndex: number) => {
    setAnchorEl(event.currentTarget);
    setOriginDay(dayIndex);
  };

  const handleCopyDates = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const checkedValues: DayCheckboxValue[] = formData.getAll('days').map((value) => Number(value) as DayCheckboxValue);
    if (originDay !== undefined) {
      const originTimes = availableTimes[originDay];
      const tempTimes = [...availableTimes];
      checkedValues.forEach((item) => {
        tempTimes[item] = originTimes.map((slot: TimeSlot) => ({ ...slot }));
      });
      setAvailableTimes(tempTimes);
    }
    handleClose();
  };

  // Validate the available times
  useEffect(() => {
    if (availableTimes.length <= 1) return;

    const temp: InvalidState[] = availableTimes.flatMap((day, dayIndex) =>
      day.flatMap((curSlot: TimeSlot, timesIndex: number) => {
        const issues: InvalidState[] = [];
        const nextSlot = day[timesIndex + 1];
        if (!isValidSlot(curSlot)) {
          issues.push({ dayIndex, timesIndex });
        }
        if (nextSlot && !isOverlap(curSlot, nextSlot)) {
          issues.push({ dayIndex, timesIndex: timesIndex + 1 });
        }
        return issues;
      }),
    );

    setInvalid(temp);
    sendWeeklyTimes(availableTimes);
  }, [availableTimes]);

  useEffect(() => {
    hasError(invalid.length > 0);
  }, [invalid]);

  return (
    <>
      <Box className="m-2 rounded border border-slate-300 px-2 md:px-4 pt-2 md:pt-4">
        <Typography className="my-3 font-semibold">Set your weekly hours</Typography>
        {availableTimes?.map((item: TimeSlot[], dayIndex) => (
          <>
            <Box className="flex py-3 items-start">
              {item.length > 0 ? (
                <>
                  <FormControlLabel
                    control={<Checkbox checked={true} onChange={(event) => handleCheckbox(event, dayIndex)} />}
                    label={DaysOfWeek[dayIndex]}
                    sx={{ width: 80 }}
                  />
                  <Box
                    sx={{
                      '& > *:not(:first-of-type)': {
                        marginTop: '10px',
                      },
                    }}
                  >
                    {item?.map(
                      ({ startTime, endTime }: TimeSlot, timesIndex: number) =>
                        endTime < 48 && (
                          <Box className="flex justify-between">
                            <FormControl
                              size="small"
                              className="w-24"
                              error={
                                !!invalid.find((item) => item.dayIndex === dayIndex && item.timesIndex === timesIndex)
                              }
                            >
                              <InputLabel>From</InputLabel>
                              <Select
                                value={startTime || defaultTimeSlot.startTime}
                                label="From"
                                onChange={(e) => updateStartTimes(dayIndex, timesIndex, e.target.value as number)}
                                inputProps={{ className: 'text-center' }}
                                MenuProps={SelectMenuProps as MenuProps}
                                error={
                                  !!invalid.find((item) => item.dayIndex === dayIndex && item.timesIndex === timesIndex)
                                }
                              >
                                {TimeCells.map((item, index) => (
                                  <MenuItem value={index}>{item}</MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                            <FormControl
                              size="small"
                              className="w-24 ml-2"
                              error={
                                !!invalid.find((item) => item.dayIndex === dayIndex && item.timesIndex === timesIndex)
                              }
                            >
                              <InputLabel>To</InputLabel>
                              <Select
                                value={endTime || defaultTimeSlot.endTime}
                                label="To"
                                onChange={(e) => updateEndTimes(dayIndex, timesIndex, e.target.value as number)}
                                inputProps={{ className: 'text-center' }}
                                MenuProps={SelectMenuProps as MenuProps}
                              >
                                {TimeCells.map((item, index) => (
                                  <MenuItem value={index}>{item}</MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                            <IconButton
                              aria-label="delete"
                              className="ml-4"
                              onClick={() => handleDelete(dayIndex, timesIndex)}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        ),
                    )}
                  </Box>
                </>
              ) : (
                <>
                  <FormControlLabel
                    control={<Checkbox checked={false} onChange={(event) => handleCheckbox(event, dayIndex)} />}
                    label={DaysOfWeek[dayIndex]}
                    sx={{ width: 80 }}
                  />
                  <Box className="flex justify-between pt-2">Unavailable</Box>
                </>
              )}
              <IconButton aria-label="add" className="ml-auto" onClick={() => handleAdd(dayIndex)}>
                <AddIcon fontSize="small" />
              </IconButton>
              <IconButton aria-label="add" className="ml-2" onClick={(event) => handleCopy(event, dayIndex)}>
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Box>
            {dayIndex !== availableTimes.length - 1 && <Divider className="mx-4" />}
          </>
        ))}
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <form action="#" onSubmit={handleCopyDates}>
          <Typography className="text-slate-500 text-sm ml-4 mt-2">Copy times to...</Typography>
          <MenuList sx={{ width: '150px' }}>
            {DaysOfWeek.map((item, index) => (
              <MenuItem className="py-0">
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      name="days"
                      value={index}
                      defaultChecked={index === originDay}
                      disabled={index === originDay}
                      sx={{ paddingRight: 0 }}
                    />
                  }
                  label={item}
                  labelPlacement="start"
                  sx={{
                    width: '100%',
                    marginLeft: 0,
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                />
              </MenuItem>
            ))}
          </MenuList>
          <Box className="px-2">
            <Button type="submit" variant="contained" size="small" fullWidth className="rounded-3xl bg-primary-600">
              Apply
            </Button>
          </Box>
        </form>
      </Menu>
    </>
  );
}
