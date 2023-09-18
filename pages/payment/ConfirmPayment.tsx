import { Box, Button, Paper, Typography } from "@mui/material";
import Image from "next/image";
import BlankLayout from "~/layouts/BlankLayout";
import { useSelector } from "react-redux";
import { selectLessonBookingState } from "~/slices/lessonBookingSlice";

export default function ConfirmPayment() {
  const params = new URLSearchParams();

  console.log(params);

  return (
    <BlankLayout>
      <Box className="w-full h-screen flex justify-center items-center">
        <Paper className="flex flex-col items-center max-w-xl mx-auto py-4 lg:py-8 px-2 md:px-4 lg:px-8">
          <Box className="relative w-20 md:w-30 h-20 md:h-30 lg:w-40 lg:h-40">
            <Image src={"/img/Checkmark.svg"} alt="green_checkmark" fill />
          </Box>
          <Typography className="text-2xl font-semibold">Completed!</Typography>
          <Typography className="text-center">
            Your purchace has been completed. You can confirm your booked lesson
            on your own lessons page.
          </Typography>
          <Button
            variant="contained"
            className="bg-primary-600 mt-4"
            href="/general/mylessons"
          >
            Go to my lessons page
          </Button>
        </Paper>
      </Box>
    </BlankLayout>
  );
}
