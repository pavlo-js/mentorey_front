import React, { useEffect, useState } from "react";
import { Box, Container, Button } from "@mui/material";
import CoachCard from "~/components/common/CoachCard";
import { useSelector } from "react-redux";
import { selectAuthState } from "~/slices/authSlice";

export default function Coaches() {
  const [coaches, setCoaches] = useState<any[]>();

  const curUser = useSelector(selectAuthState);

  useEffect(() => {
    getCoaches();
  }, []);

  function getCoaches() {
    const api = "/api/common/getAllCoaches";
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ myID: curUser?.id }),
    };
    fetch(api, request)
      .then((res) => res.json())
      .then((data) => setCoaches(data.coaches))
      // .then((data) => console.log(data))
      .catch((err) => console.error(err));
  }

  // useEffect(() => {
  //   if (coaches?.length! > 0) {
  //     console.log(coaches);
  //   }
  // }, [coaches]);

  return (
    <>
      <Box className="bg-slate-100">
        <Container className="px-4 py-2 lg:py-4">
          <h2 className="mt-5 text-2xl font-semibold">
            Start learining with one of these top coaches.
          </h2>
          <p className="my-3 text-sm text-slate-600">
            There isn&apos;t a single way to teach a language. Book a regular
            lesson or a trial lessons to get an introduction to a teacher&apos;s
            style. We have teachers who specialize in teaching the foundations
            of English all the way to advanced topics.
          </p>
          <div className="mb-0 grid items-start gap-4 dark:text-white sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {coaches?.map((coach, index) => (
              <CoachCard coach={coach} key={index} />
            ))}
          </div>
          <Button
            variant="outlined"
            size="small"
            className="mx-auto w-fit block mt-6 hover:bg-primary-600 hover:text-white mb-4"
          >
            Explore more coaches
          </Button>
        </Container>
      </Box>
    </>
  );
}
