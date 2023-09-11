import * as React from "react";
import InsideLayout from "~/layouts/InsideLayout";
import { Box, Button, Paper, Typography } from "@mui/material";
import Banner from "./components/banner";
import Grid from "@mui/material/Unstable_Grid2";
import VideoPlayer from "./components/videoPlayer";
import PersonPinCircleIcon from "@mui/icons-material/PersonPinCircle";
import Overview from "./components/overview";
import StackBar from "./components/stackbar";
import Tabs from "./components/tabs";
import Availability from "./components/availabilty";
import Review from "./components/review";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import ScheduleSendIcon from "@mui/icons-material/ScheduleSend";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
// const VideoPlayer = dynamic(() => import('../components/videoPlayer'), { ssr: false });

export default function Profile() {
  const router = useRouter();
  const coachID = router.query.coach_id;

  const { data: coach } = useQuery({
    queryKey: ["getCoach", coachID],
    queryFn: () => {
      if (coachID) {
        const api = "/api/common/getUser";
        const request = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userID: coachID }),
        };
        return fetch(api, request)
          .then((res) => res.json())
          .then((data) => data.user);
      } else {
        return null;
      }
    },
  });

  // const { data: coach } = useQuery("getCoach", () => {
  //   if (coachID) {
  //     const api = "/api/common/getUser";
  //     const request = {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ userID: coachID }),
  //     };
  //     return fetch(api, request)
  //       .then((res) => res.json())
  //       .then((data) => data.user);
  //   } else {
  //     return null;
  //   }
  // });

  return (
    coach && (
      <InsideLayout>
        <div className="max-w-5xl mx-auto">
          <Paper elevation={2} className="relative mb-4 rounded-lg lg:m-4">
            <Banner coach={coach} />
            <Typography className="text-center text-4xl md:pt-6 md:text-5xl lg:pt-2">
              {`${coach.first_name} ${coach.last_name}`}
            </Typography>
            <div className="px-4 md:px-8 lg:px-12">
              <Overview />
              <Box display={"flex"} margin={"auto"} width={"fit-content"}>
                <Button
                  startIcon={<ScheduleSendIcon />}
                  size="large"
                  variant="contained"
                  className="bg-primary-600 mr-2"
                >
                  Book Trial
                </Button>
                <Button
                  startIcon={<ConnectWithoutContactIcon />}
                  size="large"
                  variant="contained"
                  className="bg-primary-600 ml-2"
                >
                  Contact
                </Button>
              </Box>
              <Grid container spacing={2} className="py-4">
                <Grid xs={12} md={6}>
                  <StackBar />
                  <p className="mb-2 mt-4 flex items-center text-sm font-semibold text-slate-500">
                    <PersonPinCircleIcon
                      sx={{ color: "#facc15" }}
                      className="mr-1"
                    />{" "}
                    Location :
                  </p>
                  <p className="pl-2 text-sm">74 Moricho, Kyoto City, Japan</p>
                </Grid>
                <Grid xs={12} md={6}>
                  <VideoPlayer />
                </Grid>
              </Grid>
              <Tabs />
            </div>
          </Paper>
          <Availability />
          <Review />
        </div>
      </InsideLayout>
    )
  );
}
