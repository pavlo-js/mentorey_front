import { useCallback, useEffect, useState } from "react";
import { Typography } from "@mui/material";
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

dayjs.extend(utc);
dayjs.extend(timezone);

const DAY_LABELS = ["MON", "TUE", "WED", "THR", "FRI", "SAT", "SUN"];
const defaultStartTime = dayjs().hour(9).minute(0);
const defaultEndTime = dayjs().hour(17).minute(0);

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

const defaultTimes: DayTimes[] = [
  {
    times: [
      {
        startTime: defaultStartTime,
        endTime: defaultEndTime,
      },
    ],
  },
  {
    times: [
      {
        startTime: defaultStartTime,
        endTime: defaultEndTime,
      },
    ],
  },
  {
    times: [
      {
        startTime: defaultStartTime,
        endTime: defaultEndTime,
      },
    ],
  },
  {
    times: [
      {
        startTime: defaultStartTime,
        endTime: defaultEndTime,
      },
    ],
  },
  {
    times: [
      {
        startTime: defaultStartTime,
        endTime: defaultEndTime,
      },
    ],
  },
  {
    times: [
      {
        startTime: defaultStartTime,
        endTime: defaultEndTime,
      },
    ],
  },
  {
    times: [
      {
        startTime: defaultStartTime,
        endTime: defaultEndTime,
      },
    ],
  },
];

export default function Weekly() {
  const [availableTimes, setAvailableTimes] = useState<any[]>([]);
  const [invalid, setInvalid] = useState<InvalidState[]>([]);
  const [flag, setFlag] = useState<Boolean>(false);

  const curUser = useSelector(selectAuthState);

  useEffect(() => {
    // fetch times from backend
    setAvailableTimes(defaultTimes);
  }, []);

  const handleAdd = useCallback(
    (dayIndex: number) => {
      const newTimes = availableTimes?.map((item, index) => {
        if (dayIndex === index) {
          console.log("selectedDay :", item);
          const times = item.times;
          const lastSlot = times[times.length - 1];
          console.log("lastSlot", lastSlot);
          const newSlot: TimeSlot = {
            startTime: lastSlot.endTime.add(1, "hour"),
            endTime: lastSlot.endTime.add(2, "hour"),
          };
          setFlag(!flag);
          return { ...item, times: [...times, newSlot] };
        } else {
          return item;
        }
      });
      setAvailableTimes(newTimes);
    },
    [availableTimes]
  );

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

  // const validateTimes = useCallback(() => {

  // }, [availableTimes]);

  useEffect(() => {
    console.log(availableTimes, "CheckFunc");
    if (availableTimes.length > 1) {
      const temp: InvalidState[] = [];
      availableTimes.map((day, index) => {
        const times = day.times;
        // Check the adjacent items
        for (let i = 0; i < times.length; i++) {
          if (times[i + 1]) {
            if (!isOverlap(times[i], times[i + 1])) {
              temp.push({ dayIndex: index, timesIndex: i + 1 });
            }
          }
          if (i && !isOverDate(times[0], times[i])) {
            temp.push({ dayIndex: index, timesIndex: i });
          }
        }
      });
      setInvalid(temp);
    }
  }, [availableTimes, flag]);

  useEffect(() => {
    console.log("Invalid state :", invalid);
  }, [invalid]);

  // const handleDelete = useCallback(
  //   (index: number, key: number) => {
  //     console.log(index, key);
  //     if (availableTimes) {
  //       const newTimes = [...availableTimes];
  //       const targetDay = newTimes[index];
  //       console.log(
  //         "Eat",
  //         targetDay,
  //         targetDay.times[key],
  //         targetDay.times.splice(key, 1),
  //         newTimes
  //       );
  //       // targetDay.times.splice(key, 1);
  //       setAvailableTimes(newTimes);
  //     }
  //   },
  //   [availableTimes]
  // );

  const handleDelete = (position: number, key: number) => {
    console.log(position, key);
    if (availableTimes) {
      // setAvailableTimes(
      //   availableTimes.map((item, pos) => {
      //     console.log("Check", item, pos, position);
      //     if (pos != position) return item;
      //     else {
      //       const arr = [];
      //       for (let i = 0; i < item.length; i++) {
      //         arr.push(item[i]);
      //       }
      //       return arr;
      //     }
      //   })
      // );
      const newTimes = [...availableTimes];
      const targetDay = newTimes[position];
      console.log(
        "Eat",
        targetDay,
        targetDay.times[key],
        targetDay.times.splice(key, 1),
        newTimes
      );
      // targetDay.times.splice(key, 1);
      setAvailableTimes([...newTimes]);
    }
  };

  const updateTimes = (
    dayIndex: number,
    key: number,
    value: DateRange<Dayjs>
  ) => {
    console.log(dayIndex, key, value);
    const tempTimes = [...availableTimes];
    tempTimes[dayIndex].times[key].startTime = value[0];
    tempTimes[dayIndex].times[key].endTime = value[1];
    setAvailableTimes(tempTimes);
  };

  useEffect(() => {
    console.log("Render Here", availableTimes);
  });

  return (
    <>
      <div className="m-2 rounded border border-slate-300">
        <Typography className="font-semibold text-slate-500 m-4">
          Set your weekly hours
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {availableTimes?.map(({ times }: DayTimes, index) => (
            <div key={index} className="flex px-2 md:px-4 items-baseline">
              <FormControlLabel
                control={
                  <Checkbox defaultChecked={index !== 5 && index !== 6} />
                }
                label={DAY_LABELS[index]}
                sx={{ width: 80 }}
              />
              <div>
                {times?.map(({ startTime, endTime }: TimeSlot, key: number) => (
                  <div className="flex justify-between my-4" key={key}>
                    <MultiInputTimeRangeField
                      onChange={(value) => updateTimes(index, key, value)}
                      defaultValue={[startTime, endTime]}
                      timezone={curUser.timezone}
                      sx={
                        invalid.find(
                          (item) =>
                            item.dayIndex === index && item.timesIndex === key
                        )
                          ? {
                              ".MuiOutlinedInput-notchedOutline": {
                                borderColor: "red",
                              },
                            }
                          : null
                      }
                      ampm={false}
                      slotProps={{
                        textField: ({ position }) => ({
                          label: position === "start" ? "From" : "To",
                          size: "small",
                          sx: { width: 100 },
                        }),
                      }}
                    />
                    <IconButton
                      aria-label="delete"
                      className="ml-4"
                      onClick={() => handleDelete(index, key)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </div>
                ))}
              </div>
              <IconButton
                aria-label="add"
                className="ml-auto"
                onClick={() => handleAdd(index)}
              >
                <AddIcon />
              </IconButton>
            </div>
          ))}
        </LocalizationProvider>
      </div>
    </>
  );
}
