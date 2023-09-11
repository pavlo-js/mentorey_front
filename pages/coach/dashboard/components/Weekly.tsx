import { useCallback, useEffect, useState, ChangeEvent } from "react";
import {
  Box,
  Divider,
  Typography,
  Menu,
  MenuItem,
  MenuList,
  Button,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
// Timepicker
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MultiInputTimeRangeField } from "@mui/x-date-pickers-pro/MultiInputTimeRangeField";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { DateRange } from "@mui/x-date-pickers-pro/internals/models/range";

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.utc();
interface TimeSlot {
  startTime: Dayjs;
  endTime: Dayjs;
}

type DayTimes = TimeSlot[];

interface InvalidState {
  dayIndex: number;
  timesIndex: number;
}

type DayCheckboxValue = number;

const DAY_LABELS = ["MON", "TUE", "WED", "THR", "FRI", "SAT", "SUN"];
const FULL_DAY_LABELS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const defaultTimeSlot: TimeSlot = {
  startTime: dayjs().hour(9).minute(0),
  endTime: dayjs().hour(17).minute(0),
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
  return timeSlot.endTime.isAfter(timeSlot.startTime);
};

const isOverlap = (prevSlot: TimeSlot, nextSlot: TimeSlot) => {
  return nextSlot.startTime.isAfter(prevSlot.endTime);
};

const isOverDate = (primary: TimeSlot, temp: TimeSlot) => {
  const pri_H = primary.startTime.hour();
  const pri_D = primary.startTime.day();
  const tem_H = temp.startTime.hour();
  const tem_D = temp.startTime.day();
  if (tem_D > pri_D && tem_H > pri_H) return false;
  return true;
};

interface PageProps {
  curUser: any;
  sendWeeklyTimes: (data: DayTimes[]) => void;
  hasError: (data: boolean) => void;
}

export default function Weekly({
  curUser,
  sendWeeklyTimes,
  hasError,
}: PageProps) {
  const [availableTimes, setAvailableTimes] = useState<DayTimes[]>([]);
  const [invalid, setInvalid] = useState<InvalidState[]>([]);
  const [originDay, setOriginDay] = useState<number | undefined>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const api = "/api/coach/getAvailTimes";
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        coachID: curUser?.id,
      }),
    };
    fetch(api, request)
      .then((res) => res.json())
      .then((data) => {
        if (data.weekly_avail.length > 0) {
          const temp: DayTimes[] = Array(7)
            .fill(null)
            .map(() => []);

          data.weekly_avail.forEach((item: any, index: number) => {
            temp[item.day_of_week].push({
              startTime: dayjs(item.from_time),
              endTime: dayjs(item.to_time),
            });
          });

          setAvailableTimes(temp);
        } else {
          setAvailableTimes(defaultTimes);
        }
      });
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
              startTime: lastSlot.endTime.add(1, "hour"),
              endTime: lastSlot.endTime.add(2, "hour"),
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
    [availableTimes]
  );
  const handleDelete = (dayIndex: number, timesIndex: number) => {
    if (availableTimes) {
      const newTimes = [...availableTimes];
      const targetDay = newTimes[dayIndex];
      targetDay.splice(timesIndex, 1);
      setAvailableTimes(newTimes);
    }
  };

  const updateTimes = (
    dayIndex: number,
    timesIndex: number,
    value: DateRange<Dayjs>
  ) => {
    const tempTimes = [...availableTimes];
    tempTimes[dayIndex][timesIndex].startTime = value[0]!;
    tempTimes[dayIndex][timesIndex].endTime = value[1]!;

    setAvailableTimes(tempTimes);
  };

  const handleCheckbox = (
    event: ChangeEvent<HTMLInputElement>,
    dayIndex: number
  ) => {
    const temp = [...availableTimes];
    temp[dayIndex] = event.target.checked ? [{ ...defaultTimeSlot }] : [];
    setAvailableTimes(temp);
  };

  const handleCopy = (
    event: React.MouseEvent<HTMLElement>,
    dayIndex: number
  ) => {
    setAnchorEl(event.currentTarget);
    setOriginDay(dayIndex);
  };

  const handleCopyDates = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const checkedValues: DayCheckboxValue[] = formData
      .getAll("days")
      .map((value) => Number(value) as DayCheckboxValue);
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

        if (timesIndex && !isOverDate(day[0], curSlot)) {
          issues.push({ dayIndex, timesIndex });
        }

        return issues;
      })
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
        <Typography className="my-3 font-semibold">
          Set your weekly hours
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {availableTimes?.map((item: TimeSlot[], dayIndex) => (
            <>
              <Box key={dayIndex} className="flex py-3 items-start">
                {item.length > 0 ? (
                  <>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={true}
                          onChange={(event) => handleCheckbox(event, dayIndex)}
                        />
                      }
                      label={DAY_LABELS[dayIndex]}
                      sx={{ width: 80 }}
                    />
                    <Box
                      sx={{
                        "& > *:not(:first-of-type)": {
                          marginTop: "10px",
                        },
                      }}
                    >
                      {item?.map(
                        (
                          { startTime, endTime }: TimeSlot,
                          timesIndex: number
                        ) => (
                          <Box
                            className="flex justify-between"
                            key={dayIndex + timesIndex}
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
                                  sx: { width: 80 },
                                  error: !!invalid.find(
                                    (item) =>
                                      item.dayIndex === dayIndex &&
                                      item.timesIndex === timesIndex
                                  ),
                                  inputProps: {
                                    style: { textAlign: "center" },
                                  },
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
                          checked={false}
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
                  <AddIcon fontSize="small" />
                </IconButton>
                <IconButton
                  aria-label="add"
                  className="ml-2"
                  onClick={(event) => handleCopy(event, dayIndex)}
                >
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </Box>
              {dayIndex !== availableTimes.length - 1 && (
                <Divider className="mx-4" />
              )}
            </>
          ))}
        </LocalizationProvider>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <form action="#" onSubmit={handleCopyDates}>
          <Typography className="text-slate-500 text-sm ml-4 mt-2">
            Copy times to...
          </Typography>
          <MenuList sx={{ width: "150px" }}>
            {FULL_DAY_LABELS.map((item, index) => (
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
                    width: "100%",
                    marginLeft: 0,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                />
              </MenuItem>
            ))}
          </MenuList>
          <Box className="px-2">
            <Button
              type="submit"
              variant="contained"
              size="small"
              fullWidth
              className="rounded-3xl bg-primary-600"
            >
              Apply
            </Button>
          </Box>
        </form>
      </Menu>
    </>
  );
}
