import React, { useEffect, useState } from "react";
import { enUS } from "date-fns/locale";
import { format, parse, startOfWeek, getDay } from "date-fns";

import { useSelector } from "react-redux";
import { selectAuthState } from "~/slices/authSlice";
import {
  Calendar as BigCalendar,
  dateFnsLocalizer,
  SlotInfo,
  Views,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ScheduleAddModal from "./ScheduleAddModal";
import { Box } from "@mui/material";
const locales = {
  "en-US": enUS,
};

interface PageProps {
  coach: any;
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

type Event = {
  id: number;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  resource?: any;
  desc?: string;
};

const init: Event[] = [];

const styles = {
  container: {
    height: "60vh",
    margin: "2em",
  },
};

const calendarStyle = {
  "& .rbc-events-container": {
    marginRight: "0px !important",
  },
  "& .rbc-event": {
    backgroundColor: "#32b189 !important",
    border: "1px solid #36c499 !important",
    borderRadius: "0px !Important",
    "&:focus": {
      border: "2px solid black !important",
    },
    "&:hover": {
      border: "2px solid black !important",
    },
    "&:focus-within": {
      border: "2px solid black !important",
    },
    "&:focus-visible": {
      border: "2px solid black !important",
    },
    "&:active": {
      border: "2px solid black !important",
    },
    "&:target": {
      border: "2px solid black !important",
    },
  },
  "& .rbc-allday-cell": {
    display: "none !important",
  },
  "& .rbc-header": {
    height: "50px",
    justifyContent: "center",
    display: "flex",
    "& span": {
      color: "#125a45 !important",
      display: "flex",
      alignItems: "center",
    },
  },
  "& .rbc-time-content": {
    "& .rbc-time-column:nth-child(2),.rbc-time-column:nth-child(8)": {
      background: "#fbf1f1 !important",
    },
  },
  "& .rbc-btn-group": {
    mb: 1,
    "& button": {
      backgroundColor: "#059669 !important",
      color: "white !important",
      border: "0px !important",
      "&:hover": {
        backgroundColor: "#139e72 !important",
      },
    },
    "& .rbc-active": {
      backgroundColor: "#23bb8b !important",
      "&:hover": {
        backgroundColor: "#23bb8b !important",
      },
    },
  },
  "& .rbc-agenda-table": {
    "& .rbc-header": {
      display: "table-cell !Important",
      textAlign: "center",
      color: "#125a45",
    },
  },
};

export default function Availability({ coach }: PageProps) {
  const [times, setTimes] = useState<any>({});
  const curUser = useSelector(selectAuthState);
  const [events, setEvents] = React.useState(init);
  const [uid, setUid] = React.useState<number>(0);

  useEffect(() => {
    getAvails();
  }, []);

  const ulid = () => {
    setUid(uid + 1);
    return uid;
  };

  useEffect(() => {
    const arr = [];
    if (times.weekly_avail) {
      for (let i = 0; i < times.weekly_avail.length; i++) {
        arr.push({
          id: arr.length,
          title: "avail",
          start: new Date(times.weekly_avail[i].from_time),
          end: new Date(times.weekly_avail[i].to_time),
        });
      }
    }

    if (times.override_avail) {
      for (let i = 0; i < times.override_avail.length; i++) {
        arr.push({
          id: arr.length,
          title: "override",
          start: new Date(times.override_avail[i].from_time),
          end: new Date(times.override_avail[i].to_time),
        });
      }
    }
    setEvents(arr);
  }, [times]);

  function getAvails() {
    const api = "/api/coach/getAvailTimes";
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ coachID: coach.id }),
    };
    fetch(api, request)
      .then((res) => res.json())
      .then((data) => {
        setTimes(data);
      })
      .catch((err) => console.error(err));
  }

  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState<string>("");
  const [current, setCurrent] = React.useState<any>({});

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const setTitleName = (val: string) => setTitle(val);

  const handleSelectSlot = ({ start, end }: SlotInfo) => {
    if (typeof start === "string") {
      start = new Date(start);
    }

    if (typeof end === "string") {
      end = new Date(end);
    }

    for (let i = 0; i < events.length; i++) {
      const tempSt = events[i].start;
      const tempEn = events[i].end;
      if (end > tempSt && start < tempEn) {
        alert("You can't schedule with that time range as it is taken.");
        return;
      }
    }
    handleOpen();
    setCurrent({ st: start, en: end });

    setEvents([
      ...events,
      {
        id: ulid(),
        start: new Date(start), //new Date(start.getDay(), start.getHours(), start.getMinutes()),
        end: new Date(end), //new Date(end.getDay(), end.getHours(), end.getMinutes()),
        title: "",
      },
    ]);
  };

  const handleSelect = (event: any) => {
    // const { start, end } = event;
    console.log(event);

    // const del = window.confirm(
    //   `Delete availability on ${format(start, "EEEE")} from ${format(
    //     start,
    //     "h:mma"
    //   )} to ${format(end, "h:mm")}?`
    // );
    // if (del) {
    //   const index = events.findIndex((e) => e.id == event.id);
    //   setEvents([...events.slice(0, index), ...events.slice(index + 1)]);
    // }
  };

  useEffect(() => {
    setEvents((prevEvents) => {
      if (prevEvents.length === 0) return [];
      const updatedEvents = [...prevEvents];
      title !== "none"
        ? (updatedEvents[updatedEvents.length - 1].title = title)
        : updatedEvents.pop();
      return updatedEvents;
    });
  }, [title]);

  useEffect(() => {
    open && setTitle("");
  }, [open]);

  useEffect(() => {
    console.log("Se", events);
  }, [events]);

  return (
    <Box style={styles.container} sx={calendarStyle}>
      <BigCalendar
        selectable
        localizer={localizer}
        events={events}
        defaultView={Views.WEEK}
        views={[Views.WEEK]}
        defaultDate={new Date()}
        onSelectSlot={handleSelectSlot}
        // onSelectEvent={handleSelect}
        // onClick={(e: any) => {
        //   console.log(e);
        // }}
        style={{
          height: "100%",
        }}
        timeslots={2} // number of per section
      />
    </Box>
  );
}
