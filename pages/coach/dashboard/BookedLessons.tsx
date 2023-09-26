import { Box, Container, Divider, Paper, Typography, Avatar, Badge, Button } from '@mui/material';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { selectAuthState } from '~/slices/authSlice';
import ReactCountryFlag from 'react-country-flag';
import { countries } from '~/shared/data';

type LessonType = 'MIN30' | 'MIN60' | 'MIN90';

const lessonTypeLabel = {
  MIN30: '30 minutes',
  MIN60: '60 minutes',
  MIN90: '90 minutes',
};

export default function BookedLessons() {
  const curUser = useSelector(selectAuthState);
  const { data: lessons } = useQuery({
    queryKey: ['getBookedLessons', curUser],
    queryFn: async () => {
      const api = '/api/coach/get-booked-lessons-to-coach';
      try {
        const { data: response } = await axios.post(api, {
          coachID: curUser.id,
        });
        return response.lessons;
      } catch (error) {
        console.log(error);
      }
    },
    enabled: !!curUser,
  });

  const formatDate = (date: Date) => {
    const datePart = new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(date);

    const timePart = date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    });

    return `${datePart}/${timePart}`;
  };

  const sendCompleteRequest = async (lb_id: any) => {
    const api = '/api/common/set-lesson-booking-status';
    try {
      const { data: res } = await axios.post(api, {
        lessonBookingID: lb_id,
        status: 'pending',
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    lessons && (
      <Container className="max-w-3xl">
        {lessons.map((item: any, index: number) => (
          <Paper key={index} className="my-2 flex justify-between px-2 py-3 items-center flex-wrap">
            <Box className="w-full md:w-3/12">
              <Typography className="text-lg">{item.lesson_title}</Typography>
              <Divider className="my-1" />
              <Box className="flex">
                <Box className="flex items-center">
                  <Badge
                    overlap="circular"
                    className="rounded-full shadow-md"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                      <ReactCountryFlag
                        countryCode={countries.find((country) => country.code === item.country)?.code!}
                        svg
                        style={{
                          width: '20px',
                          height: '20px',
                          border: '1px solid white',
                          borderRadius: '20px',
                          objectFit: 'cover',
                        }}
                      />
                    }
                  >
                    <Avatar alt="Travis Howard" src={item.avatar} />
                  </Badge>
                  <Typography className="ml-2">{`${item.first_name} ${item.last_name}`}</Typography>
                </Box>
              </Box>
            </Box>
            <Box className="w-full md:w-5/12">
              <Typography className="text-gray-400">{item.category_label}</Typography>
              <Typography className="text-gray-400">{`${lessonTypeLabel[item.lesson_type as LessonType]} / ${
                item.lesson_pack
              } lesson(s)`}</Typography>
              {item.lesson_pack === 1 && (
                <>
                  <LessonDescription
                    label="Start Time : "
                    content={`${formatDate(new Date(JSON.parse(item.timeline).startTime))}`}
                  />
                  <LessonDescription
                    label="End Time : "
                    content={`${formatDate(new Date(JSON.parse(item.timeline).endTime))}`}
                  />
                </>
              )}
            </Box>
            <Box className="w-full md:w-3/12">
              <Button
                variant="contained"
                size="small"
                className="block text-center my-1 md:mt-0 md:mb-1"
                href={`${curUser[item.channel]}`}
              >
                Go to lesson
              </Button>
              {item.is_completed === 'incomplete' && (
                <Button
                  variant="outlined"
                  size="small"
                  className="block text-center w-full"
                  onClick={() => sendCompleteRequest(item.lesson_booking_id)}
                >
                  Request to complete
                </Button>
              )}
              {item.is_completed === 'pending' && (
                <Button
                  variant="outlined"
                  disabled
                  size="small"
                  className="block text-center w-full"
                  onClick={() => sendCompleteRequest(item.lesson_booking_id)}
                >
                  Waiting Acceptance
                </Button>
              )}
            </Box>
          </Paper>
        ))}
      </Container>
    )
  );
}

function LessonDescription({ label, content }: { label: string; content: any }) {
  return (
    <Box className="flex">
      <Typography className="text-sm font-semibold text-gray-500">{label}</Typography>
      <Typography className="overflow-hidden text-sm text-gray-400 ml-1 first-letter:capitalize">{content}</Typography>
    </Box>
  );
}
