import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import style from "./rdp.module.scss";
// Timepicker
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MultiInputTimeRangeField } from "@mui/x-date-pickers-pro/MultiInputTimeRangeField";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { DateRange } from "@mui/x-date-pickers-pro/internals/models/range";
interface TimeSlot {
  startTime: Dayjs;
  endTime: Dayjs;
}

interface DayTime {
  date: Dayjs;
  times: TimeSlot[];
}

const defaultTimeSlot: TimeSlot = {
  startTime: dayjs().hour(9).minute(0),
  endTime: dayjs().hour(17).minute(0),
};

export default function Override(curUser: any) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [availTimes, setAvailTimes] = useState<DayTime[]>([]);
  const [days, setDays] = useState<Date[] | undefined>([]);
  const [times, setTimes] = useState<TimeSlot[]>([
    {
      startTime: dayjs().hour(9).minute(0),
      endTime: dayjs().hour(17).minute(0),
    },
  ]);

  const openDialog = () => {
    setTimes([
      {
        startTime: dayjs().hour(9).minute(0),
        endTime: dayjs().hour(17).minute(0),
      },
    ]);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDays([]);
    setDialogOpen(false);
  };

  const handleApply = useCallback(() => {
    if (days) {
      console.log("applytimes", times);
      const tempTimes: DayTime[] = [...availTimes];
      days.forEach((day) => {
        if (!tempTimes.some((item) => item.date === dayjs(day))) {
          tempTimes.push({
            date: dayjs(day),
            times: [...times],
          });
        }
      });
      setAvailTimes(tempTimes);
    }
    closeDialog();
  }, [days]);

  const addTimes = () => {
    const temp = [...times];
    temp.push({
      startTime: temp[temp.length - 1].endTime.add(1, "hour"),
      endTime: temp[temp.length - 1].endTime.add(2, "hour"),
    });
    console.log("temp:", temp);
    setTimes(temp);
  };

  const updateTimes = (timesIndex: number, value: DateRange<Dayjs>) => {
    const temp = [...times];
    temp[timesIndex].startTime = value[0]!;
    temp[timesIndex].endTime = value[1]!;
    setTimes(temp);
  };

  useEffect(() => {
    console.log("AvailTimes :", availTimes);
  }, [availTimes]);

  return (
    <>
      <Box className="m-2 rounded border border-slate-300 px-2 md:px-4 pt-2 md:pt-4">
        <Typography className="my-3 font-semibold">
          Add date overrides
        </Typography>
        <Typography className="text-slate-600 text-sm">
          Add dates when your availability changes from your weekly hours
        </Typography>
        <Button
          variant="outlined"
          fullWidth
          className="rounded-2xl my-3"
          onClick={openDialog}
        >
          Add a date override
        </Button>
        {availTimes.map((item, dateIndex) => (
          <Box
            key={dateIndex}
            display="flex"
            alignItems="flex-start"
            justifyContent="space-between"
            className={
              dateIndex != availTimes.length - 1 ? "border-b py-2" : "py-2"
            }
          >
            <Typography sx={{ marginTop: "10px" }}>
              {item.date.format("DD MMM YYYY")}
            </Typography>
            <Box>
              {item.times.map((time, timeIndex) => (
                <Typography
                  key={timeIndex}
                  sx={{ marginTop: "10px", fontSize: "14px" }}
                >
                  {time.startTime.format("HH:mm")} -{" "}
                  {time.endTime.format("HH:mm")}
                </Typography>
              ))}
            </Box>
            <IconButton aria-label="delete" className="ml-4">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}
      </Box>

      <Dialog
        open={dialogOpen}
        onClose={closeDialog}
        sx={{ ".MuiDialog-paper": { width: 350, textAlign: "center" } }}
      >
        <DialogTitle id="alert-dialog-title">
          Select the date(s) you want to assign specific hours
        </DialogTitle>
        <DialogContent className="d-flex justify-center">
          <DayPicker
            captionLayout="dropdown-buttons"
            mode="multiple"
            showOutsideDays
            fixedWeeks
            selected={days}
            onSelect={setDays}
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
                  "& > *:not(:first-of-type)": {
                    marginTop: "10px",
                  },
                }}
              >
                {days && days.length > 0
                  ? times.map(({ startTime, endTime }, timesIndex) => (
                      <Box display="flex" justifyContent="space-between">
                        <MultiInputTimeRangeField
                          timezone={curUser.timezone}
                          ampm={false}
                          onChange={(value) => updateTimes(timesIndex, value)}
                          value={[startTime, endTime]}
                          slotProps={{
                            textField: ({ position }) => ({
                              label: position === "start" ? "From" : "To",
                              size: "small",
                              sx: { width: 80 },
                              inputProps: {
                                style: { textAlign: "center" },
                              },
                            }),
                          }}
                        />
                        <IconButton aria-label="delete" className="ml-4">
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    ))
                  : null}
              </Box>

              <IconButton
                aria-label="delete"
                className="ml-4"
                onClick={addTimes}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </Box>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleApply}
            autoFocus
            variant="contained"
            className="bg-primary-600"
          >
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
