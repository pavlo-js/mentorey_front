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
import { useQuery } from "react-query";
import axios from "axios";
import { countries } from "~/shared/data";

const Review = ({ coachID }: { coachID: any }) => {
  const { data: lessons } = useQuery({
    queryKey: ["getCompletedLessons"],
    queryFn: async () => {
      const api = "/api/coach/get-completed-lessons";
      const { data: res } = await axios.post(api, { coachID });
      return res.lessons;
    },
  });

  return (
    lessons && (
      <Paper className="mt-4 rounded-lg p-2 py-4 md:py-8 lg:m-4">
        <Typography className="mb-3 text-center text-lg font-bold md:mb-4 md:text-2xl">
          Reviews
        </Typography>
        <Grid container rowSpacing={2}>
          {lessons.map((lesson: any, index: number) => (
            <Grid key={index} xs={12} sm={6} md={4} lg={3} className="p-1">
              <div className="rounded-lg bg-slate-200 px-1 py-2">
                <div className="flex items-center">
                  <Badge
                    className="rounded-full border-2 border-white shadow-md"
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    badgeContent={
                      <>
                        <Tooltip
                          title={
                            countries.find(
                              (country) => country.code === lesson.country
                            )?.label!
                          }
                        >
                          <div>
                            <ReactCountryFlag
                              countryCode={
                                countries.find(
                                  (country) => country.code === lesson.country
                                )?.code!
                              }
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
                      alt={`${lesson.first_name} ${lesson.last_name}`}
                      className="h-10 w-10"
                      src={lesson.avatar}
                    />
                  </Badge>
                  <div className="ml-2">
                    <Typography className="text-sm font-bold text-slate-500">
                      {`${lesson.first_name} ${lesson.last_name}`}
                    </Typography>
                    <Typography className="text-xs text-slate-500">
                      {lesson.lesson_title}
                    </Typography>
                  </div>
                </div>
                <Typography className="m-2 text-xs text-slate-500">
                  {lesson.feedback}
                </Typography>
                <Typography className="mx-2 text-right text-xs font-semibold text-slate-500">
                  May 6, 2023
                </Typography>
              </div>
            </Grid>
          ))}
        </Grid>
        <Button
          variant="outlined"
          className="mx-auto mt-6 block w-fit hover:bg-primary-600 hover:text-white"
        >
          Show more
        </Button>
      </Paper>
    )
  );
};

export default Review;
