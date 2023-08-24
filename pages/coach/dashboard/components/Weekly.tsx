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
import dayjs from "dayjs";

const DAY_LABELS = ["MON", "TUE", "WED", "THR", "FRI", "SAT", "SUN"];
const defaultStartTime = dayjs().hour(9).minute(0);
const defaultEndTime = dayjs().hour(19).minute(0);

export default function Weekly() {
  const [availableTimes, setAvailableTimes] = useState<any[] | undefined>();

  useEffect(() => {
    // fetch times from backend
    const defaultTimes = [
      {
        day: 0,
        times: [
          {
            startTime: defaultStartTime,
            endTime: defaultEndTime,
          },
        ],
      },
      {
        day: 1,
        times: [
          {
            startTime: defaultStartTime,
            endTime: defaultEndTime,
          },
        ],
      },
      {
        day: 2,
        times: [
          {
            startTime: defaultStartTime,
            endTime: defaultEndTime,
          },
        ],
      },
      {
        day: 3,
        times: [
          {
            startTime: defaultStartTime,
            endTime: defaultEndTime,
          },
        ],
      },
      {
        day: 4,
        times: [
          {
            startTime: defaultStartTime,
            endTime: defaultEndTime,
          },
        ],
      },
      {
        day: 5,
        times: [
          {
            startTime: defaultStartTime,
            endTime: defaultEndTime,
          },
        ],
      },
      {
        day: 6,
        times: [
          {
            startTime: defaultStartTime,
            endTime: defaultEndTime,
          },
        ],
      },
    ];
    setAvailableTimes(defaultTimes);
  }, []);

  const handleAdd = useCallback(
    (_day: number) => {
      const startTime = defaultStartTime;
      const endTime = defaultEndTime;
      const time = { startTime, endTime };
      const newTimes = availableTimes?.map((item) => {
        console.log(item);
        const { day, times } = item;
        if (_day === day) {
          // const time = {
          //   startTime: times.startTime.add(1, "hour"),
          //   endTime: times.endTime.add(2, "hour"),
          // };
          return {
            ...item,
            times: [...times, time],
          };
        } else {
          return item;
        }
      });
      setAvailableTimes(newTimes);
    },
    [availableTimes]
  );

  return (
    <>
      <div className="m-2 rounded border border-slate-300">
        <Typography className="font-semibold text-slate-500 m-4">
          Set your weekly hours
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {availableTimes?.map(({ day, times }: any) => (
            <div className="flex px-2 md:px-4 items-baseline">
              <FormControlLabel
                control={<Checkbox defaultChecked={day !== 5 && day !== 6} />}
                label={DAY_LABELS[day]}
                sx={{ width: 80 }}
              />
              <div>
                {times?.map(({ startTime, endTime }: any) => (
                  <div className="flex justify-between my-4">
                    <MultiInputTimeRangeField
                      onChange={(value) => console.log(value)}
                      defaultValue={[startTime, endTime]}
                      ampm={false}
                      slotProps={{
                        textField: ({ position }) => ({
                          label: position === "start" ? "From" : "To",
                          size: "small",
                          sx: { width: 100 },
                        }),
                      }}
                    />
                    <IconButton aria-label="delete" className="ml-4">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </div>
                ))}
              </div>
              <IconButton
                aria-label="add"
                className="ml-auto"
                onClick={() => handleAdd(day)}
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
