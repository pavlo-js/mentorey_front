import React, { useEffect } from "react";
import { enUS } from "date-fns/locale";
import { format, parse, startOfWeek, getDay } from "date-fns";

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

const init: Event[] = [
  {
    id: 0,
    title: "All Day Event very long title",
    allDay: true,
    start: new Date(2023, 7, 0),
    end: new Date(2023, 7, 1),
  },
  {
    id: 1,
    title: "Long Event",
    start: new Date(2023, 7, 7),
    end: new Date(2023, 7, 10),
  },

  {
    id: 2,
    title: "Dating",
    start: new Date(2023, 8, 1, 0, 0, 0),
    end: new Date(2023, 8, 1, 0, 0, 0),
  },

  {
    id: 3,
    title: "Meeting with Girlfriend",
    start: new Date(2023, 8, 6, 0, 0, 0),
    end: new Date(2023, 8, 8, 22, 0, 0),
  },

  {
    id: 4,
    title: "Some Event",
    start: new Date(2023, 7, 29, 0, 0, 0),
    end: new Date(2023, 7, 29, 1, 0, 0),
  },
  {
    id: 5,
    title: "Conference",
    start: new Date(2023, 7, 11),
    end: new Date(2023, 7, 13),
    desc: "Big conference for important people",
  },
  {
    id: 6,
    title: "Meeting",
    start: new Date(2023, 8, 12, 10, 30, 0, 0),
    end: new Date(2023, 8, 12, 12, 30, 0, 0),
    desc: "Pre-meeting meeting, to prepare for the meeting",
  },

  {
    id: 7,
    title: "Today",
    start: new Date(new Date().setHours(new Date().getHours() - 3)),
    end: new Date(new Date().setHours(new Date().getHours() + 3)),
  },
];

const styles = {
  container: {
    height: "60vh",
    margin: "2em",
  },
};

export default function CalendarDemo() {
  const [events, setEvents] = React.useState(init);
  const [uid, setUid] = React.useState<number>(10);
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState<string>("");
  const [current, setCurrent] = React.useState<any>({});

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const setTitleName = (val: string) => setTitle(val);

  const ulid = () => {
    setUid(uid + 1);
    return uid;
  };

  const handleSelectSlot = ({ start, end }: SlotInfo) => {
    if (typeof start === "string") {
      start = new Date(start);
    }

    if (typeof end === "string") {
      end = new Date(end);
    }

    console.log(events, start, end);

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

  const handleSelect = (event: Event) => {
    const { start, end } = event;
    const del = window.confirm(
      `Delete availability on ${format(start, "EEEE")} from ${format(
        start,
        "h:mma"
      )} to ${format(end, "h:mm")}?`
    );
    if (del) {
      const index = events.findIndex((e) => e.id == event.id);
      setEvents([...events.slice(0, index), ...events.slice(index + 1)]);
    }
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

  return (
    <Box
      style={styles.container}
      sx={{
        "& .rbc-events-container": {
          marginRight: "0px !important",
        },
        "& .rbc-event": {
          backgroundColor: "#32b189 !important",
          border: "1px solid #36c499 !important",
          borderRadius: "0px !Important",
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
      }}
    >
      <BigCalendar
        selectable
        localizer={localizer}
        events={events}
        defaultView={Views.WEEK}
        views={[
          Views.DAY,
          Views.WEEK,
          Views.MONTH,
          Views.AGENDA,
          Views.WORK_WEEK,
        ]}
        defaultDate={new Date()}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelect}
        style={{
          height: "100%",
        }}
        timeslots={2} // number of per section
      />
      <ScheduleAddModal
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        title={title}
        setTitle={setTitleName}
      />
    </Box>
  );
}
