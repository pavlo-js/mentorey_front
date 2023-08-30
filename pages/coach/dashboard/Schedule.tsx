import React, { useState } from "react";
import {
  Paper,
  Typography,
  Tabs,
  Tab,
  Box,
  useMediaQuery,
} from "@mui/material";
import { useSelector } from "react-redux";
import { selectAuthState } from "~/slices/authSlice";
import Weekly from "./components/Weekly";
import Override from "./components/Override";

export default function Schedule() {
  const curUser = useSelector(selectAuthState);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Paper className="max-w-4xl mx-auto">
      <Typography className="text-lg font-semibold p-5 text-slate-500">
        Your Timezone: {curUser.timezone}
      </Typography>

      {isMobile ? (
        <>
          <Tabs value={tabValue} onChange={handleChange} variant="fullWidth">
            <Tab label="Weekly hours" />
            <Tab label="Date override" />
          </Tabs>

          <Box p={3}>
            {tabValue === 0 && <Weekly />}
            {tabValue === 1 && <Override />}
          </Box>
        </>
      ) : (
        <div className="flex">
          <div className="w-full md:w-7/12">
            <Weekly curUser={curUser} />
          </div>
          <div className="w-full md:w-5/12">
            <Override curUser={curUser} />
          </div>
        </div>
      )}
    </Paper>
  );
}
