import React, { useState, useEffect } from 'react';
import { Avatar, Tooltip, Rating, Button, Box, Paper } from '@mui/material';
import Badge from '@mui/material/Badge';
import ReactCountryFlag from 'react-country-flag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { countries } from '~/shared/data';
import { CurrencyData } from '~/shared/CurrencyData';

import { useRouter } from 'next/navigation';
import { useQuery } from 'react-query';
import axios from 'axios';

import styled from '@emotion/styled';

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const CoachCard = ({ coach }: { coach: any }) => {
  const [isLike, setIsLike] = useState<boolean>(false);
  const router = useRouter();

  const { data: categories } = useQuery({
    queryKey: ['getAvailCategories', coach],
    queryFn: async () => {
      const api = '/api/common/getCoachCategory';
      const { data: response } = await axios.post(api, { coachID: coach.id });
      return response.categories;
    },
  });

  const country = countries.find((country) => country.code === coach.country)?.code;
  const currencySymbol = CurrencyData[coach.currency].symbol;
  const languages = JSON.parse(coach.language);

  return (
    categories &&
    categories.length > 0 && (
      <Box className="sm:w-1/2 md:w-1/3 lg:w-1/4 w-full px-2">
        <Paper className="w-full transform overflow-hidden rounded-lg shadow-lg transition duration-500 ease-in-out hover:shadow-2xl hover:cursor-pointer ">
          {/* <Box className="w-full h-40">
            <video src={coach.intro_video} className="w-full object-cover rounded-t-lg" controls></video>
          </Box> */}
          <VideoContainer>
            <video src={coach.intro_video} className="w-full object-cover rounded-t-lg" controls></video>
          </VideoContainer>
          <Box className="w-full p-3" onClick={() => router.push(`/profile/coach/${coach.id}`)}>
            <Box className="flex items-center">
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
                  <Avatar alt="Travis Howard" src={coach.avatar} />
                </Badge>
              </Tooltip>
              <Box className="ml-3">
                <Box className="text-large font-bold">{coach.first_name + ' ' + coach.last_name}</Box>
                <Box className="text-sm text-gray-600">{coach.title}</Box>
              </Box>
              {/* <Box className="ml-auto">
              {isLike ? (
                <FavoriteIcon className="text-red-400" onClick={() => setIsLike(false)} />
              ) : (
                <FavoriteBorderIcon className="cursor-pointer hover:text-red-400" onClick={() => setIsLike(true)} />
              )}
            </Box> */}
            </Box>
            <Box className="my-2 flex justify-between">
              <Box className="flex items-center">
                <p className="price font-base font-bold">
                  {coach.trial_price}
                  {currencySymbol} &nbsp;
                </p>
                <p className="text-sm text-slate-400">/ trial</p>
              </Box>
              <Box className="flex items-center">
                <Rating value={4} size="small" />
                <p className="text-sm font-bold text-gray-900">4.95</p>
              </Box>
            </Box>
            <Box className="w-full bg-white">
              <Box className="flex flex-wrap items-center text-xs font-medium text-white">
                {categories &&
                  categories.map((item: any, index: number) => (
                    <span key={index} className="mr-1 cursor-default rounded bg-primary-500 px-2 py-1">
                      {item.label}
                    </span>
                  ))}
              </Box>
              <Box className="mt-2 flex flex-wrap items-center text-xs font-medium text-white">
                {languages.map((item: any, index: number) => (
                  <span
                    key={index}
                    className="mr-1 cursor-default rounded border border-primary-500 px-2 py-1 text-primary-500"
                  >
                    {item}
                  </span>
                ))}
              </Box>
            </Box>
            <Box className="my-3 w-full">
              <p className="line-clamp-3 select-none break-words text-sm">
                {coach.profile == 'null' ? '' : coach.profile}
              </p>
            </Box>
            <Box className="w-full">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/general/booking/${coach.id}`);
                }}
                type="button"
                className="w-full rounded-lg bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-primary-300"
              >
                Book Trial
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    )
  );
};

export default CoachCard;
