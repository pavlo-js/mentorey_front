import * as React from "react";
import {
  Box,
  Button,
  Paper,
  Tooltip,
  Typography,
  Badge,
  Avatar,
} from "@mui/material";
import ReactCountryFlag from "react-country-flag";
import Grid from "@mui/material/Unstable_Grid2";

const Review = () => {
  // const [screenWidth, setScreenWidth] = React.useState<number>(getCurrentVision());
  // function getCurrentVision() {
  // 	return window.innerWidth;
  // }

  // React.useEffect(() => {
  // 	const updateVision = () => {
  // 		setScreenWidth(getCurrentVision());
  // 		console.log(screenWidth);
  // 	};
  // 	window.addEventListener('resize', updateVision);
  // 	return () => {
  // 		window.removeEventListener('resize', updateVision);
  // 	};
  // }, [screenWidth]);

  return (
    <>
      <Paper className="mt-4 rounded-lg p-2 py-4 md:py-8 lg:m-4">
        <Typography className="mb-1 text-center text-lg font-bold md:mb-3 md:text-2xl">
          Reviews
        </Typography>
        <Grid container rowSpacing={2}>
          <Grid xs={12} sm={6} md={4} lg={3} className="p-1">
            <div className="rounded-lg bg-slate-200 px-1 py-2">
              <div className="flex items-center">
                <Badge
                  className="rounded-full border-2 border-white shadow-md"
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  badgeContent={
                    <>
                      <Tooltip title="Austria">
                        <div>
                          <ReactCountryFlag
                            countryCode="at"
                            svg
                            style={{
                              width: 15,
                              height: 15,
                              border: "1px solid white",
                              borderRadius: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      </Tooltip>
                    </>
                  }
                >
                  <Avatar
                    alt="Travis Howard"
                    className="h-10 w-10"
                    src="https://plus.unsplash.com/premium_photo-1688350808212-4e6908a03925?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80"
                  />
                </Badge>
                <div className="ml-2">
                  <Typography className="text-sm font-bold text-slate-500">
                    Best Wing
                  </Typography>
                  <Typography className="text-xs text-slate-500">
                    247 Fitness Lessons
                  </Typography>
                </div>
              </div>
              <Typography className="m-2 text-xs text-slate-500">
                Mourad teaches our 10 year old son. He is very patient and
                engages him in the french language. He customizes the lesson
                plans to fit my sons language needs. Mourad has great
                communication and my son enjoys the lessons.
              </Typography>
              <Typography className="mx-2 text-right text-xs font-semibold text-slate-500">
                May 6, 2023
              </Typography>
            </div>
          </Grid>
          <Grid xs={12} sm={6} md={4} lg={3} className="p-1">
            <div className="rounded-lg bg-slate-200 px-1 py-2">
              <div className="flex items-center">
                <Badge
                  className="rounded-full border-2 border-white shadow-md"
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  badgeContent={
                    <>
                      <Tooltip title="Austria">
                        <div>
                          <ReactCountryFlag
                            countryCode="at"
                            svg
                            style={{
                              width: 15,
                              height: 15,
                              border: "1px solid white",
                              borderRadius: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      </Tooltip>
                    </>
                  }
                >
                  <Avatar
                    alt="Travis Howard"
                    className="h-10 w-10"
                    src="https://plus.unsplash.com/premium_photo-1688350808212-4e6908a03925?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80"
                  />
                </Badge>
                <div className="ml-2">
                  <Typography className="text-sm font-bold text-slate-500">
                    Best Wing
                  </Typography>
                  <Typography className="text-xs text-slate-500">
                    247 Fitness Lessons
                  </Typography>
                </div>
              </div>
              <Typography className="m-2 text-xs text-slate-500">
                Mourad teaches our 10 year old son. He is very patient and
                engages him in the french language. He customizes the lesson
                plans to fit my sons language needs. Mourad has great
                communication and my son enjoys the lessons.
              </Typography>
              <Typography className="mx-2 text-right text-xs font-semibold text-slate-500">
                May 6, 2023
              </Typography>
            </div>
          </Grid>
          <Grid xs={12} sm={6} md={4} lg={3} className="p-1">
            <div className="rounded-lg bg-slate-200 px-1 py-2">
              <div className="flex items-center">
                <Badge
                  className="rounded-full border-2 border-white shadow-md"
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  badgeContent={
                    <>
                      <Tooltip title="Austria">
                        <div>
                          <ReactCountryFlag
                            countryCode="at"
                            svg
                            style={{
                              width: 15,
                              height: 15,
                              border: "1px solid white",
                              borderRadius: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      </Tooltip>
                    </>
                  }
                >
                  <Avatar
                    alt="Travis Howard"
                    className="h-10 w-10"
                    src="https://plus.unsplash.com/premium_photo-1688350808212-4e6908a03925?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80"
                  />
                </Badge>
                <div className="ml-2">
                  <Typography className="text-sm font-bold text-slate-500">
                    Best Wing
                  </Typography>
                  <Typography className="text-xs text-slate-500">
                    247 Fitness Lessons
                  </Typography>
                </div>
              </div>
              <Typography className="m-2 text-xs text-slate-500">
                Mourad teaches our 10 year old son. He is very patient and
                engages him in the french language. He customizes the lesson
                plans to fit my sons language needs. Mourad has great
                communication and my son enjoys the lessons.
              </Typography>
              <Typography className="mx-2 text-right text-xs font-semibold text-slate-500">
                May 6, 2023
              </Typography>
            </div>
          </Grid>
          <Grid xs={12} sm={6} md={4} lg={3} className="p-1">
            <div className="rounded-lg bg-slate-200 px-1 py-2">
              <div className="flex items-center">
                <Badge
                  className="rounded-full border-2 border-white shadow-md"
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  badgeContent={
                    <>
                      <Tooltip title="Austria">
                        <div>
                          <ReactCountryFlag
                            countryCode="at"
                            svg
                            style={{
                              width: 15,
                              height: 15,
                              border: "1px solid white",
                              borderRadius: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      </Tooltip>
                    </>
                  }
                >
                  <Avatar
                    alt="Travis Howard"
                    className="h-10 w-10"
                    src="https://plus.unsplash.com/premium_photo-1688350808212-4e6908a03925?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80"
                  />
                </Badge>
                <div className="ml-2">
                  <Typography className="text-sm font-bold text-slate-500">
                    Best Wing
                  </Typography>
                  <Typography className="text-xs text-slate-500">
                    247 Fitness Lessons
                  </Typography>
                </div>
              </div>
              <Typography className="m-2 text-xs text-slate-500">
                Mourad teaches our 10 year old son. He is very patient and
                engages him in the french language. He customizes the lesson
                plans to fit my sons language needs. Mourad has great
                communication and my son enjoys the lessons.
              </Typography>
              <Typography className="mx-2 text-right text-xs font-semibold text-slate-500">
                May 6, 2023
              </Typography>
            </div>
          </Grid>
          <Grid xs={12} sm={6} md={4} lg={3} className="p-1">
            <div className="rounded-lg bg-slate-200 px-1 py-2">
              <div className="flex items-center">
                <Badge
                  className="rounded-full border-2 border-white shadow-md"
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  badgeContent={
                    <>
                      <Tooltip title="Austria">
                        <div>
                          <ReactCountryFlag
                            countryCode="at"
                            svg
                            style={{
                              width: 15,
                              height: 15,
                              border: "1px solid white",
                              borderRadius: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      </Tooltip>
                    </>
                  }
                >
                  <Avatar
                    alt="Travis Howard"
                    className="h-10 w-10"
                    src="https://plus.unsplash.com/premium_photo-1688350808212-4e6908a03925?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80"
                  />
                </Badge>
                <div className="ml-2">
                  <Typography className="text-sm font-bold text-slate-500">
                    Best Wing
                  </Typography>
                  <Typography className="text-xs text-slate-500">
                    247 Fitness Lessons
                  </Typography>
                </div>
              </div>
              <Typography className="m-2 text-xs text-slate-500">
                Mourad teaches our 10 year old son. He is very patient and
                engages him in the french language. He customizes the lesson
                plans to fit my sons language needs. Mourad has great
                communication and my son enjoys the lessons.
              </Typography>
              <Typography className="mx-2 text-right text-xs font-semibold text-slate-500">
                May 6, 2023
              </Typography>
            </div>
          </Grid>
          <Grid xs={12} sm={6} md={4} lg={3} className="p-1">
            <div className="rounded-lg bg-slate-200 px-1 py-2">
              <div className="flex items-center">
                <Badge
                  className="rounded-full border-2 border-white shadow-md"
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  badgeContent={
                    <>
                      <Tooltip title="Austria">
                        <div>
                          <ReactCountryFlag
                            countryCode="at"
                            svg
                            style={{
                              width: 15,
                              height: 15,
                              border: "1px solid white",
                              borderRadius: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      </Tooltip>
                    </>
                  }
                >
                  <Avatar
                    alt="Travis Howard"
                    className="h-10 w-10"
                    src="https://plus.unsplash.com/premium_photo-1688350808212-4e6908a03925?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80"
                  />
                </Badge>
                <div className="ml-2">
                  <Typography className="text-sm font-bold text-slate-500">
                    Best Wing
                  </Typography>
                  <Typography className="text-xs text-slate-500">
                    247 Fitness Lessons
                  </Typography>
                </div>
              </div>
              <Typography className="m-2 text-xs text-slate-500">
                Mourad teaches our 10 year old son. He is very patient and
                engages him in the french language. He customizes the lesson
                plans to fit my sons language needs. Mourad has great
                communication and my son enjoys the lessons.
              </Typography>
              <Typography className="mx-2 text-right text-xs font-semibold text-slate-500">
                May 6, 2023
              </Typography>
            </div>
          </Grid>
          <Grid xs={12} sm={6} md={4} lg={3} className="p-1">
            <div className="rounded-lg bg-slate-200 px-1 py-2">
              <div className="flex items-center">
                <Badge
                  className="rounded-full border-2 border-white shadow-md"
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  badgeContent={
                    <>
                      <Tooltip title="Austria">
                        <div>
                          <ReactCountryFlag
                            countryCode="at"
                            svg
                            style={{
                              width: 15,
                              height: 15,
                              border: "1px solid white",
                              borderRadius: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      </Tooltip>
                    </>
                  }
                >
                  <Avatar
                    alt="Travis Howard"
                    className="h-10 w-10"
                    src="https://plus.unsplash.com/premium_photo-1688350808212-4e6908a03925?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80"
                  />
                </Badge>
                <div className="ml-2">
                  <Typography className="text-sm font-bold text-slate-500">
                    Best Wing
                  </Typography>
                  <Typography className="text-xs text-slate-500">
                    247 Fitness Lessons
                  </Typography>
                </div>
              </div>
              <Typography className="m-2 text-xs text-slate-500">
                Mourad teaches our 10 year old son. He is very patient and
                engages him in the french language. He customizes the lesson
                plans to fit my sons language needs. Mourad has great
                communication and my son enjoys the lessons.
              </Typography>
              <Typography className="mx-2 text-right text-xs font-semibold text-slate-500">
                May 6, 2023
              </Typography>
            </div>
          </Grid>
          <Grid xs={12} sm={6} md={4} lg={3} className="p-1">
            <div className="rounded-lg bg-slate-200 px-1 py-2">
              <div className="flex items-center">
                <Badge
                  className="rounded-full border-2 border-white shadow-md"
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  badgeContent={
                    <>
                      <Tooltip title="Austria">
                        <div>
                          <ReactCountryFlag
                            countryCode="at"
                            svg
                            style={{
                              width: 15,
                              height: 15,
                              border: "1px solid white",
                              borderRadius: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      </Tooltip>
                    </>
                  }
                >
                  <Avatar
                    alt="Travis Howard"
                    className="h-10 w-10"
                    src="https://plus.unsplash.com/premium_photo-1688350808212-4e6908a03925?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80"
                  />
                </Badge>
                <div className="ml-2">
                  <Typography className="text-sm font-bold text-slate-500">
                    Best Wing
                  </Typography>
                  <Typography className="text-xs text-slate-500">
                    247 Fitness Lessons
                  </Typography>
                </div>
              </div>
              <Typography className="m-2 text-xs text-slate-500">
                Mourad teaches our 10 year old son. He is very patient and
                engages him in the french language. He customizes the lesson
                plans to fit my sons language needs. Mourad has great
                communication and my son enjoys the lessons.
              </Typography>
              <Typography className="mx-2 text-right text-xs font-semibold text-slate-500">
                May 6, 2023
              </Typography>
            </div>
          </Grid>
        </Grid>
        <Button
          variant="outlined"
          className="mx-auto mt-6 block w-fit hover:bg-primary-600 hover:text-white"
        >
          Show more
        </Button>
      </Paper>
    </>
  );
};

export default Review;
