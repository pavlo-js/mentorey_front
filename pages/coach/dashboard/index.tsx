import InsideLayout from "~/layouts/InsideLayout";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Button } from "@mui/material";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import SchoolIcon from "@mui/icons-material/School";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
// Tab Contents
import MyLessons from "./MyLessons";
import Schedule from "./Schedule";
import BookedLessons from "./BookedLessons";

const CoachDashboard = () => {
  const [value, setValue] = React.useState("lessons");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <InsideLayout>
      <TabContext value={value}>
        <Box className="mx-auto mt-2 w-fit bg-slate-50">
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            sx={{
              justifyContent: "center",
              overflowX: "auto",
              maxWidth: "100%", // or some other width you prefer
              "& .MuiTabs-scroller": {
                display: "flex",
                justifyContent: "center",
              },
            }}
          >
            <Tab
              value="lessons"
              label="My Lessons"
              icon={<CastForEducationIcon />}
              iconPosition="start"
              sx={{ minHeight: "45px", width: 180 }}
            />
            <Tab
              value="booking"
              label="Booked Lessons to me"
              icon={<EmojiPeopleIcon />}
              iconPosition="start"
              sx={{ minHeight: "45px", width: 180 }}
            />
            <Tab
              value="students"
              label="My students"
              icon={<SchoolIcon />}
              iconPosition="start"
              sx={{ minHeight: "45px", width: 180 }}
            />
            <Tab
              value="schedule"
              label="Schedule"
              icon={<CalendarMonthIcon />}
              iconPosition="start"
              sx={{ minHeight: "45px", width: 180 }}
            />
            <Tab
              value="Analysis"
              label="Analysis"
              icon={<AnalyticsIcon />}
              iconPosition="start"
              sx={{ minHeight: "45px", width: 180 }}
            />
          </Tabs>
        </Box>
        <TabPanel sx={{ padding: 0, marginTop: "16px" }} value="lessons">
          <MyLessons />
        </TabPanel>
        <TabPanel sx={{ padding: 0, marginTop: "16px" }} value="booking">
          <BookedLessons />
        </TabPanel>
        <TabPanel sx={{ padding: 0, marginTop: "16px" }} value="students">
          Item Two
        </TabPanel>
        <TabPanel sx={{ padding: 0, marginTop: "16px" }} value="schedule">
          <Schedule />
        </TabPanel>
        <TabPanel sx={{ padding: 0, marginTop: "16px" }} value="analysis">
          Item Three
        </TabPanel>
      </TabContext>
    </InsideLayout>
  );
};

export default CoachDashboard;
