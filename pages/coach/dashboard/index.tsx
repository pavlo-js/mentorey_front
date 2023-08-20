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
// Tab Contents
import MyLessons from "./MyLessons";

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
            centered
          >
            <Tab
              value="lessons"
              label="My Lessons"
              icon={<CastForEducationIcon />}
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
        <TabPanel value="lessons">
          <MyLessons />
        </TabPanel>
        <TabPanel value="students">Item Two</TabPanel>
        <TabPanel value="schedule">Item Three</TabPanel>
        <TabPanel value="analysis">Item Three</TabPanel>
      </TabContext>
    </InsideLayout>
  );
};

export default CoachDashboard;
