import React from "react";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";

const Calendar = dynamic(() => import("@toast-ui/react-calendar"), {
  ssr: false,
});

import "@toast-ui/calendar/dist/toastui-calendar.min.css";

const calendarOptions = {
  // sort of option properties.
};

export default function CalendarDemo() {
  const calendars = [{ id: "cal1", name: "Personal" }];
  const initialEvents = [
    {
      id: "1",
      calendarId: "cal1",
      title: "Lunch",
      category: "time",
      start: "2023-08-28T12:00:00",
      end: "2023-08-28T13:30:00",
    },
    {
      id: "2",
      calendarId: "cal1",
      title: "Coffee Break",
      category: "time",
      start: "2023-09-01T15:00:00",
      end: "2023-09-01T15:30:00",
    },
  ];

  // const onAfterRenderEvent = (event) => {
  //   console.log(event.title);
  // };

  const calendarRef = React.useRef<any>();

  const handleClickNextButton = () => {
    console.log(calendarRef.current.getInstance());
    // const calendarInstance = calendarRef.current.getInstance();
    // calendarInstance.next();
  };

  return (
    <>
      <Box id="calendar" sx={{ height: "800px" }}>
        <Calendar
          view="week"
          week={{}}
          month={{
            dayNames: ["S", "M", "T", "W", "T", "F", "S"],
            visibleWeeksCount: 5,
          }}
          events={initialEvents}
          ref={calendarRef}
          {...calendarOptions}
          // onAfterRenderEvent={onAfterRenderEvent}
        />
        <button onClick={handleClickNextButton}>Go next!</button>
      </Box>
    </>
  );
}
