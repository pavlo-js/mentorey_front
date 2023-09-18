import {
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Select,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import InsideLayout from "~/layouts/InsideLayout";
import { selectAuthState } from "~/slices/authSlice";
import ReactCountryFlag from "react-country-flag";
import { countries } from "~/shared/data";
import { useState } from "react";

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
  const [filterOption, setFilterOption] = useState<FilterOption>({
    type: "all",
    category: "all",
    status: "all",
  });

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
                fullWidth
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
                fullWidth
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
                fullWidth
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
                className="flex mx-auto mb-2 w-full justify-between items-center lg:px-3 lg:py-2"
              >
                <Box>
                  <Typography className="text-lg lg:text-xl">
                    {item.lesson_title}
                  </Typography>
                  <Divider className="my-1" />
                  <Box className="flex items-center">
                    <Badge
                      overlap="circular"
                      className="rounded-full shadow-md"
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
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
                <Box>
                  <Typography>{`${
                    lessonTypeLabel[item.lesson_type as LessonType]
                  } / ${item.lesson_pack}lesson(s)`}</Typography>
                  <LessonDescription
                    label="Category : "
                    content={item.category_label}
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
                <Box>
                  <Button
                    variant="contained"
                    href={item[item.channel]}
                    className="block w-fit bg-primary-600"
                    size="small"
                  >
                    Go to lesson
                  </Button>
                  <Button
                    href={item[item.channel]}
                    variant="outlined"
                    className="block w-fit"
                    size="small"
                  >
                    Contact
                  </Button>
                </Box>
              </Paper>
            ))}
          </Box>
        </Container>
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
