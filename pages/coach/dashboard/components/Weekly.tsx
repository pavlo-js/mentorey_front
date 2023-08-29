import { useCallback, useEffect, useState, ChangeEvent } from "react";
import { Box, Divider, Typography } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
// Timepicker
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MultiInputTimeRangeField } from "@mui/x-date-pickers-pro/MultiInputTimeRangeField";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { DateRange } from "@mui/x-date-pickers-pro/internals/models/range";
// Redux
import { useSelector } from "react-redux";
import { selectAuthState } from "~/slices/authSlice";
import { log } from "console";

dayjs.extend(utc);
dayjs.extend(timezone);

interface TimeSlot {
  startTime: Dayjs;
  endTime: Dayjs;
}

interface DayTimes {
  times: TimeSlot[];
}

interface InvalidState {
  dayIndex: number;
  timesIndex: number;
}

const DAY_LABELS = ["MON", "TUE", "WED", "THR", "FRI", "SAT", "SUN"];
const defaultStartTime = dayjs().hour(9).minute(0);
const defaultEndTime = dayjs().hour(17).minute(0);

const defaultTimeSlot: TimeSlot = {
  startTime: defaultStartTime,
  endTime: defaultEndTime,
};

const defaultTimes: DayTimes[] = [
  {
    times: [defaultTimeSlot],
  },
  {
    times: [defaultTimeSlot],
  },
  {
    times: [defaultTimeSlot],
  },
  {
    times: [defaultTimeSlot],
  },
  {
    times: [defaultTimeSlot],
  },
  {
    times: [],
  },
  {
    times: [],
  },
];

const isOverlap = (prevSlot: TimeSlot, lastSlot: TimeSlot) => {
  return lastSlot.startTime.isAfter(prevSlot.endTime);
};

const isOverDate = (primary: TimeSlot, temp: TimeSlot) => {
  const pri_H = primary.startTime.hour();
  const pri_D = primary.startTime.day();
  const tem_H = temp.startTime.hour();
  const tem_D = temp.startTime.day();
  if (tem_D > pri_D && tem_H > pri_H) return false;
  return true;
};

export default function Weekly() {
  const [availableTimes, setAvailableTimes] = useState<any[]>(defaultTimes);
  const [invalid, setInvalid] = useState<InvalidState[]>([]);
  const curUser = useSelector(selectAuthState);

  const handleAdd = useCallback(
    (dayIndex: number) => {
      const newTimes = availableTimes?.map((item, index) => {
        if (dayIndex === index) {
          const times = item.times;
          if (times.length > 0) {
            const lastSlot = times[times.length - 1];
            const newSlot: TimeSlot = {
              startTime: lastSlot.endTime.add(1, "hour"),
              endTime: lastSlot.endTime.add(2, "hour"),
            };
            return { ...item, times: [...times, newSlot] };
          } else {
            return { ...item, times: [...times, defaultTimeSlot] };
          }
        } else {
          return item;
        }
      });
      setAvailableTimes(newTimes);
    },
    [availableTimes]
  );

  // Validate the available times
  useEffect(() => {
    if (availableTimes.length <= 1) return;

    const temp: InvalidState[] = availableTimes.flatMap((day, dayIndex) => {
      return day.times.flatMap((times: TimeSlot, timesIndex: number) => {
        let issues = [];
        if (
          day.times[timesIndex + 1] &&
          !isOverlap(times, day.times[timesIndex + 1])
        ) {
          issues.push({ dayIndex, timesIndex: timesIndex + 1 });
        }
        if (timesIndex && !isOverDate(day.times[0], times)) {
          issues.push({ dayIndex, timesIndex });
        }
        return issues;
      });
    });

    setInvalid(temp);
  }, [availableTimes]);

  const handleDelete = (dayIndex: number, timesIndex: number) => {
    if (availableTimes) {
      const newTimes = [...availableTimes];
      const targetDay = newTimes[dayIndex];
      targetDay.times.splice(timesIndex, 1);
      setAvailableTimes(newTimes);
    }
  };

  const updateTimes = (
    dayIndex: number,
    timesIndex: number,
    value: DateRange<Dayjs>
  ) => {
    console.log(dayIndex, timesIndex);
    const tempTimes = [...availableTimes];
    tempTimes[dayIndex].times[timesIndex].startTime = value[0];
    tempTimes[dayIndex].times[timesIndex].endTime = value[1];

    console.log("UpdateTimes :", tempTimes);
    setAvailableTimes(tempTimes);
  };

  const handleCheckbox = (
    event: ChangeEvent<HTMLInputElement>,
    dayIndex: number
  ) => {
    const temp = [...availableTimes];
    temp[dayIndex].times = event.target.checked ? [defaultTimeSlot] : [];
    setAvailableTimes(temp);
  };

  return (
    <>
      <Box className="m-2 rounded border border-slate-300">
        <Typography className="font-semibold text-slate-500 m-4">
          Set your weekly hours
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {availableTimes?.map(({ times }: DayTimes, dayIndex) => (
            <>
              <Box
                key={dayIndex}
                className="flex px-2 md:px-4 py-3 items-start"
              >
                {times.length > 0 ? (
                  <>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked
                          onChange={(event) => handleCheckbox(event, dayIndex)}
                        />
                      }
                      label={DAY_LABELS[dayIndex]}
                      sx={{ width: 80 }}
                    />
                    <Box
                      sx={{
                        "& > *:not(:first-child)": {
                          marginTop: "10px",
                        },
                      }}
                    >
                      {times?.map(
                        (
                          { startTime, endTime }: TimeSlot,
                          timesIndex: number
                        ) => (
                          <Box
                            className="flex justify-between"
                            key={timesIndex}
                          >
                            <MultiInputTimeRangeField
                              onChange={(value) =>
                                updateTimes(dayIndex, timesIndex, value)
                              }
                              value={[startTime, endTime]}
                              timezone={curUser.timezone}
                              ampm={false}
                              slotProps={{
                                textField: ({ position }) => ({
                                  label: position === "start" ? "From" : "To",
                                  size: "small",
                                  sx: { width: 100 },
                                  error: !!invalid.find(
                                    (item) =>
                                      item.dayIndex === dayIndex &&
                                      item.timesIndex === timesIndex
                                  ),
                                }),
                              }}
                            />
                            <IconButton
                              aria-label="delete"
                              className="ml-4"
                              onClick={() => handleDelete(dayIndex, timesIndex)}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        )
                      )}
                    </Box>
                  </>
                ) : (
                  <>
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={(event) => handleCheckbox(event, dayIndex)}
                        />
                      }
                      label={DAY_LABELS[dayIndex]}
                      sx={{ width: 80 }}
                    />
                    <Box className="flex justify-between pt-2">Unavailable</Box>
                  </>
                )}
                <IconButton
                  aria-label="add"
                  className="ml-auto"
                  onClick={() => handleAdd(dayIndex)}
                >
                  <AddIcon />
                </IconButton>
              </Box>
              <Divider />
            </>
          ))}
        </LocalizationProvider>
      </Box>
    </>
  );
}
