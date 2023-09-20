import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { Typography } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

export default function Tabs({ coach }: { coach: any }) {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box className="w-full text-sm md:mt-4">
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            sx={{
              "& .Mui-selected": {
                fontWeight: 700,
              },
            }}
          >
            <Tab label="About me" value="1" className="py-1" />
            <Tab label="Me as a Teacher" value="2" />
            <Tab label="My teaching & lesson style" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1" className="px-0 py-2">
          <Typography className="py-4 text-sm text-slate-700 md:text-base">
            {coach.profile}
          </Typography>
        </TabPanel>
        <TabPanel value="2" className="px-0 py-2">
          <Typography className="py-4 text-sm text-slate-700 md:text-base">
            {coach.MAT}
          </Typography>
        </TabPanel>
        <TabPanel value="3" className="px-0 py-2">
          <Typography className="py-4 text-sm text-slate-700 md:text-base">
            {coach.LS}
          </Typography>
        </TabPanel>
      </TabContext>
    </Box>
  );
}
