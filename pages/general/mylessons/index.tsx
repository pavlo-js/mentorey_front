import {
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Select,
  Typography,
  FormControl,
  InputLabel,
  IconButton,
  MenuItem,
  Rating,
  TextField,
  Chip,
} from "@mui/material";
import axios from "axios";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import InsideLayout from "~/layouts/InsideLayout";
import { selectAuthState } from "~/slices/authSlice";
import ReactCountryFlag from "react-country-flag";
import { countries } from "~/shared/data";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";

type LessonType = "MIN30" | "MIN60" | "MIN90";

interface FilterOption {
  type: string;
  category: string;
  status: string;
}

const lessonTypeLabel = {
  MIN30: "30 minutes",
  MIN60: "60 minutes",
  MIN90: "90 minutes",
};

export default function MyLessons() {
  const [open, setOpen] = useState<boolean>(false);
  const [filterOption, setFilterOption] = useState<FilterOption>({
    type: "all",
    category: "all",
    status: "all",
  });

  const [relevance, setRelevance] = useState<number>(0);
  const [interaction, setInteraction] = useState<number>(0);
  const [expertise, setExpertise] = useState<number>(0);
  const [attendance, setAttendance] = useState<number>(0);
  const [kindness, setKindness] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");
  const [feedbackValid, setFeedbackValid] = useState<boolean>(true);
  const [activeLesson, setActiveLesson] = useState<number>();

  const curUser = useSelector(selectAuthState);

  const { data: lessons } = useQuery({
    queryKey: ["getMyLessons", curUser],

    queryFn: async () => {
      const api = "/api/common/get-my-lessons";
      const userID = curUser.id;
      const { data: res } = await axios.post(api, { userID });
      return res.lessons;
    },

    enabled: !!curUser,
  });

  const formatDate = (date: Date) => {
    const datePart = new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);

    const timePart = date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });

    return `${datePart}/${timePart}`;
  };

  const closeDialog = () => {
    setFeedbackValid(true);
    setOpen(false);
  };

  const completeLesson = async () => {
    if (feedback.length > 1) {
      const api = "/api/common/complete-lesson";
      const params = {
        lessonBookingID: activeLesson,
        relevance,
        expertise,
        interaction,
        attendance,
        kindness,
        feedback,
      };
      try {
        await axios.post(api, params);
        setOpen(false);
      } catch (err) {
        toast.error("Sorry! Something went wrong. Please try again.");
        console.log(err);
      } finally {
        setOpen(false);
      }
    } else {
      toast.warning("Please provide some feedback.");
      setFeedbackValid(false);
    }
  };

  return (
    lessons && (
      <InsideLayout>
        <Container className="flex justify-between max-w-4xl">
          <Paper className="w-1/4 px-2 py-4">
            <Typography className="mb-2">Filter Options</Typography>
            <FormControl fullWidth size="small" className="my-3">
              <InputLabel id="type-filter">Lesson Type</InputLabel>
              <Select
                labelId="type-filter"
                id="type_filter"
                value={filterOption.type}
                // onChange={}
                label="Lesson Type"
              >
                <MenuItem value="all">All lesson types</MenuItem>
                <MenuItem value={10}>One Time Lesson</MenuItem>
                <MenuItem value={21}>Multi lesson package</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth size="small" className="my-3">
              <InputLabel id="category-filter">Category</InputLabel>
              <Select
                labelId="category-filter"
                id="category_filter"
                value={filterOption.category}
                // onChange={}
                label="Category"
              >
                <MenuItem value="all">All Categories</MenuItem>
                <MenuItem value={10}>Cooking</MenuItem>
                <MenuItem value={21}>Business</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth size="small" className="my-3">
              <InputLabel id="status-filter">Lesson Status</InputLabel>
              <Select
                labelId="status-filter"
                id="status_filter"
                value={filterOption.status}
                // onChange={}
                label="Lesson Status"
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="active">Active</MenuItem>
              </Select>
            </FormControl>
          </Paper>
          <Box className="w-3/4 pl-2">
            {lessons.map((item: any, index: number) => (
              <Paper
                key={index}
                className="mx-auto mb-2 w-full justify-between items-center p-2 lg:px-3 lg:py-2"
              >
                <Typography className="text-lg lg:text-xl">
                  {item.lesson_id === 0 ? "Trial Lesson" : item.lesson_title}
                </Typography>
                <Divider className="my-1" />
                <Box className="flex flex-wrap justify-between">
                  <Box className="w-full md:w-3/12">
                    <Box className="flex items-center">
                      <Badge
                        overlap="circular"
                        className="rounded-full shadow-md"
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        badgeContent={
                          <ReactCountryFlag
                            countryCode={
                              countries.find(
                                (country) => country.code === item.country
                              )?.code!
                            }
                            svg
                            style={{
                              width: "20px",
                              height: "20px",
                              border: "1px solid white",
                              borderRadius: "20px",
                              objectFit: "cover",
                            }}
                          />
                        }
                      >
                        <Avatar alt="Travis Howard" src={item.avatar} />
                      </Badge>
                      <Box className="ml-2">
                        <Typography>{`${item.first_name} ${item.last_name}`}</Typography>
                        <Typography className="text-sm text-gray-400">
                          {item.coach_title}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Box className="w-full md:w-5/12">
                    <Typography>{`${
                      lessonTypeLabel[item.lesson_type as LessonType]
                    } / ${item.lesson_pack} lesson(s)`}</Typography>
                    <LessonDescription
                      label="Category : "
                      content={
                        item.lesson_id === 0
                          ? "Trial lesson"
                          : item.category_label
                      }
                    />
                    {item.lesson_pack === 1 && (
                      <>
                        <LessonDescription
                          label="Start Time : "
                          content={`${formatDate(
                            new Date(JSON.parse(item.timeline).startTime)
                          )}`}
                        />
                        <LessonDescription
                          label="End Time : "
                          content={`${formatDate(
                            new Date(JSON.parse(item.timeline).endTime)
                          )}`}
                        />
                      </>
                    )}
                    <LessonDescription
                      label="Channel : "
                      content={`${item.channel}`}
                    />
                  </Box>
                  <Box className="w-full md:w-3/12">
                    {item.is_completed === "completed" ? (
                      <Chip
                        label="Completed"
                        className="w-full text-center select-none"
                        color="primary"
                      />
                    ) : (
                      <>
                        <Button
                          variant="contained"
                          href={item[item.channel]}
                          fullWidth
                          className="block bg-primary-600 mb-1 text-center"
                          size="small"
                          disabled={item.is_completed != "incomplete"}
                        >
                          Go to lesson
                        </Button>
                        <Button
                          onClick={() => {
                            setActiveLesson(item.lesson_booking_id);
                            setOpen(true);
                          }}
                          color={
                            item.is_completed === "pending"
                              ? "secondary"
                              : "primary"
                          }
                          variant="outlined"
                          fullWidth
                          className="block text-center"
                          size="small"
                        >
                          Mark As Complete
                        </Button>
                      </>
                    )}
                  </Box>
                </Box>
              </Paper>
            ))}
          </Box>
        </Container>
        <Dialog
          onClose={closeDialog}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Leave a Feedback
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={closeDialog}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers sx={{ minWidth: 400 }}>
            <Box className="w-full">
              <Typography component="legend">
                Content Relevance & Accuracy
              </Typography>
              <Rating
                name="simple-controlled"
                value={relevance}
                onChange={(event, value) => {
                  setRelevance(value!);
                }}
              />
              <Typography component="legend">
                Engagement & Interaction
              </Typography>
              <Rating
                name="simple-controlled"
                value={interaction}
                onChange={(event, value) => {
                  setInteraction(value!);
                }}
              />
              <Typography component="legend">
                Mentor's Delivery & Expertise
              </Typography>
              <Rating
                name="simple-controlled"
                value={expertise}
                onChange={(event, value) => {
                  setExpertise(value!);
                }}
              />
              <Typography component="legend">Mentor's Attendance</Typography>
              <Rating
                name="simple-controlled"
                value={attendance}
                onChange={(event, value) => {
                  setAttendance(value!);
                }}
              />
              <Typography component="legend">Kindness</Typography>
              <Rating
                name="simple-controlled"
                value={kindness}
                onChange={(event, value) => {
                  setKindness(value!);
                }}
              />
            </Box>
            <Box className="w-full mt-4">
              <Typography>Feedback</Typography>
              <TextField
                minRows={5}
                fullWidth
                multiline
                value={feedback}
                onChange={(e: any) => {
                  setFeedbackValid(true);
                  setFeedback(e.target.value);
                }}
                error={!feedbackValid}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={completeLesson}>Complete Lesson</Button>
          </DialogActions>
        </Dialog>
      </InsideLayout>
    )
  );
}

function LessonDescription({
  label,
  content,
}: {
  label: string;
  content: any;
}) {
  return (
    <Box className="flex">
      <Typography className="text-sm font-semibold text-gray-500">
        {label}
      </Typography>
      <Typography className="overflow-hidden text-sm text-gray-400 ml-1 first-letter:capitalize">
        {content}
      </Typography>
    </Box>
  );
}
