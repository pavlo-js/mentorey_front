import { Box, Typography } from '@mui/material';
import styled from '@emotion/styled';
import Image from 'next/image';
export default function SeminarHero() {
  return (
    <Box className="max-w-5xl mx-auto">
      <Typography variant="h2" className="text-2xl md:text-3xl font-bold my-4 md:my-8">
        Make a new Relationship on our Mentorey Seminar
      </Typography>
      <Box className="flex flex-wrap">
        <Element imgURL="/img/seminar_1.webp" text="Engaging online classes with 2-6 students from around the world" />
        <Element imgURL="/img/seminar_2.webp" text="Designed and led by expert teachers, start from $5" />
        <Element imgURL="/img/seminar_3.webp" text="Over 350 useful and interesting topics for you to explore" />
      </Box>
    </Box>
  );
}

function Element({ imgURL, text }: { imgURL: string; text: string }) {
  return (
    <Box className="flex justify-between px-2 items-center w-full md:w-1/3">
      <Box className="relative w-20 h-20">
        <Image src={imgURL} fill alt="seminar_1" />
      </Box>
      <Box className="flex-1 pl-2">
        <Typography className="text-sm font-semibold">{text}</Typography>
      </Box>
    </Box>
  );
}
