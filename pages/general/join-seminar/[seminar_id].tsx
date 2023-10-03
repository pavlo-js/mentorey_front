import { Avatar, Box, Container, Paper, Typography, Tooltip, Badge, Stack, Chip, Button } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import InsideLayout from '~/layouts/InsideLayout';
import Image from 'next/image';
import ReactCountryFlag from 'react-country-flag';
import { countries } from '~/shared/data';
import LanguageIcon from '@mui/icons-material/Language';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import GroupIcon from '@mui/icons-material/Group';
import TopicIcon from '@mui/icons-material/Topic';
import styled from '@emotion/styled';
import { DateTime } from 'luxon';
import { useSelector } from 'react-redux';
import { selectAuthState } from '~/slices/authSlice';
import { useEffect, useState } from 'react';
import SeminarCheckOut from './CheckOut';

const BannerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
`;

const defaultBanner = '/img/default-seminar.jpg';

const SeminarTypes: any = {
  MIN30: { value: 0.5, label: '30 min' },
  MIN60: { value: 1, label: '60 min' },
  MIN90: { value: 1.5, label: '90 min' },
};

const CommunicationToolLogos: any = {
  skype: '/img/skype_logo.svg',
  slack: '/img/slack_logo.svg',
  discord: '/img/discord_logo.svg',
  zoom: '/img/zoom_logo.svg',
  hangouts: '/img/hangouts_logo.svg',
};

export default function JoinSeminarPage() {
  const [instace, setInstance] = useState<number>();
  const router = useRouter();
  const seminarBasicID = router.query.seminar_id;
  const curUser = useSelector(selectAuthState);

  const { data: seminar } = useQuery({
    queryKey: ['getSeminar', seminarBasicID],
    queryFn: async () => {
      const { data: res } = await axios.post(`/api/common/get-seminar`, { seminarBasicID: seminarBasicID });
      return res;
    },
    enabled: !!seminarBasicID,
  });

  const { data: categories } = useQuery({
    queryKey: ['getAllCategories'],
    queryFn: async () => {
      const api = '/api/common/get-all-categories';
      const { data: response } = await axios.post(api);
      return response.categories;
    },
  });

  const seminarBasic = seminar?.seminarBasic[0];
  const seminarInstances = seminar?.seminarInstances;
  const seminarBookings = seminar?.seminarBookings;
  const seminarBookingsMap = new Map<number, any[]>();

  useEffect(() => {
    if (seminarInstances && seminarInstances.length > 0) {
      setInstance(seminarInstances[0].id);
    }
  }, [seminarInstances]);

  seminarBookings?.map((booking: any) => {
    if (!seminarBookingsMap.has(booking.seminar_id)) {
      seminarBookingsMap.set(booking.seminar_id, []);
    }
    seminarBookingsMap.get(booking.seminar_id)?.push(booking);
  });

  const category = categories?.find((category: any) => (category.id = seminarBasic?.category_id));

  const country = countries.find((country) => country.code === seminarBasic?.country)?.code;

  const test = seminarBookingsMap.get(1)?.filter((booking) => booking.seminar_id === 1);

  return (
    seminar &&
    category && (
      <InsideLayout>
        <Container className="flex flex-wrap max-w-4xl mx-auto">
          <Paper className="w-full md:w-3/5 p-2 md:p-4 order-2 md:order-1">
            <BannerContainer>
              <Image
                src={seminarBasic.banner === 'default' ? defaultBanner : seminar.banner}
                fill
                alt="seminar-banner"
                className="object-cover"
              />
            </BannerContainer>
            <Typography component={'h3'} className="first-letter:capitalize text-lg font-semibold my-3">
              {seminarBasic.seminar_title}
            </Typography>
            <Box className="my-2 flex flex-wrap">
              <Chip
                icon={<LanguageIcon />}
                label={seminarBasic.seminar_language}
                variant="outlined"
                size="small"
                className="px-1 select-none m-1"
              />
              <Chip
                icon={<WatchLaterIcon />}
                label={SeminarTypes[seminarBasic.duration].label}
                variant="outlined"
                size="small"
                className="px-1 select-none m-1"
              />
              <Chip
                icon={<GroupIcon />}
                label={`${seminarBasic.max_pupil_num}spots/seminar`}
                variant="outlined"
                size="small"
                className="px-1 select-none m-1"
              />
              <Chip
                icon={<TopicIcon />}
                label={`${category.label}`}
                variant="outlined"
                size="small"
                className="px-1 select-none m-1"
              />
            </Box>
            {/* <Box className="flex items-center">
              <Tooltip title={country}>
                <Badge
                  overlap="circular"
                  className="rounded-full shadow-md"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  badgeContent={
                    <ReactCountryFlag
                      countryCode={country!}
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
                  <Avatar alt="Travis Howard" src={seminarBasic.avatar} />
                </Badge>
              </Tooltip>
              <Box className="ml-3">
                <Typography className="first-letter:capitalize">{`${seminarBasic.first_name} ${seminarBasic.last_name}`}</Typography>
                <Typography className="first-letter:capitalize">{`${seminarBasic.coach_title}`}</Typography>
              </Box>
            </Box> */}
            <Box className="mt-2">
              <Typography className="font-semibold text-gray-500">Description</Typography>
              <Typography className="text-sm text-gray-400">{seminarBasic.description}</Typography>
            </Box>
            <Box className="mt-2">
              <Typography className="font-semibold text-gray-500">What you will learn after this seminar</Typography>
              <Typography className="text-sm text-gray-400">{seminarBasic.purpose}</Typography>
            </Box>
          </Paper>
          <Paper className="w-full mb-2 md:mb-0 md:flex-1 md:ml-2 p-2 md:p-4 order-1 md:order-2">
            <Box className="flex items-center">
              <Typography>Communication Tool: </Typography>
              <Image
                src={CommunicationToolLogos[seminarBasic.communication_tool]}
                width={30}
                height={30}
                alt="communicationTool"
              />
            </Box>
            <Typography className="mt-2 text-base font-semibold text-gray-500">
              Select the best start time for you{' '}
            </Typography>
            {seminarInstances.map((instance: any) => (
              <>
                {instance.id === instace ? (
                  <Button fullWidth variant="contained" className="bg-primary-600 my-1">
                    {DateTime.fromISO(instance.start_time).setZone(curUser.timezone).toFormat('yyyy-MM-dd hh:mm')}{' '}
                    {seminarBookingsMap.get(instance.id)?.length}/{seminarBasic.max_pupil_num} spots
                  </Button>
                ) : (
                  <Button fullWidth variant="outlined" className="my-1" onClick={() => setInstance(instance.id)}>
                    {DateTime.fromISO(instance.start_time).setZone(curUser.timezone).toFormat('yyyy-MM-dd hh:mm')}{' '}
                    {seminarBookingsMap.get(instance.id)?.length}/{seminarBasic.max_pupil_num} spots
                  </Button>
                )}
              </>
            ))}
            <SeminarCheckOut seminar={seminarBasic} />
          </Paper>
        </Container>
      </InsideLayout>
    )
  );
}
