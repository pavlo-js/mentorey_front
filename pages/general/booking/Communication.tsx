import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
interface PageProps {
  coach: any;
  channel: any;
  sendChannel: (data: any) => void;
}

export default function Communication({
  coach,
  channel,
  sendChannel,
}: PageProps) {
  const [activeChannel, setActiveChannel] = useState<any>(channel);

  useEffect(() => {
    sendChannel(activeChannel);
  }, [activeChannel]);

  return (
    <>
      <h5 className="text-center text-slate-500 mt-8">
        Your teacher can use any of the these communication tools. Which
        communication tool would you like to use for your lesson?
      </h5>
      <Box className="mt-4 flex justify-center">
        {coach.skype && (
          <Box
            className={`cursor-pointer py-4 hover:shadow-md hover:bg-primary-100 w-20 mx-2 bg-white shadow-sm rounded-xl ${
              activeChannel === "skype" ? "border border-primary-500" : ""
            }`}
            onClick={() => setActiveChannel("skype")}
          >
            <Box sx={{ width: 35, height: 35, margin: "auto" }}>
              <img src="/img/skype_logo.svg" alt="skype_logo" />
            </Box>
          </Box>
        )}
        {coach.zoom && (
          <Box
            className={`cursor-pointer py-4 hover:shadow-md hover:bg-primary-100 w-20 mx-2 bg-white shadow-sm rounded-xl ${
              activeChannel === "zoom" ? "border border-primary-500" : ""
            }`}
            onClick={() => setActiveChannel("zoom")}
          >
            <Box sx={{ width: 35, height: 35, margin: "auto" }}>
              <img src="/img/zoom_logo.svg" alt="zoom" />
            </Box>
          </Box>
        )}
        {coach.discord && (
          <Box
            className={`cursor-pointer py-4 hover:shadow-md hover:bg-primary-100 w-20 mx-2 bg-white shadow-sm rounded-xl ${
              activeChannel === "discord" ? "border border-primary-500" : ""
            }`}
            onClick={() => setActiveChannel("discord")}
          >
            <Box sx={{ width: 35, height: 35, margin: "auto" }}>
              <img src="/img/discord_logo.svg" alt="discord_logo" />
            </Box>
          </Box>
        )}
        {coach.slack && (
          <Box
            className={`cursor-pointer py-4 hover:shadow-md hover:bg-primary-100 w-20 mx-2 bg-white shadow-sm rounded-xl ${
              activeChannel === "slack" ? "border border-primary-500" : ""
            }`}
            onClick={() => setActiveChannel("slack")}
          >
            <Box sx={{ width: 35, height: 35, margin: "auto" }}>
              <img src="/img/slack_logo.svg" alt="slack_logo" />
            </Box>
          </Box>
        )}
        {coach.hangouts && (
          <Box
            className={`cursor-pointer py-4 hover:shadow-md hover:bg-primary-100 w-20 mx-2 bg-white shadow-sm rounded-xl ${
              activeChannel === "hangouts" ? "border border-primary-500" : ""
            }`}
            onClick={() => setActiveChannel("hangouts")}
          >
            <Box sx={{ width: 35, height: 35, margin: "auto" }}>
              <img src="/img/hangouts_logo.svg" alt="hangouts_logo" />
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
}
