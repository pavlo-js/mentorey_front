import React, { useEffect, useState } from "react";
import { Box, Chip, Card, Typography, Divider } from "@mui/material";
import { CurrencyData } from "~/shared/CurrencyData";
import useCurrencyConverter from "~/hooks/useCurrencyConverter";
import currencyConverter from "~/utils/currencyConverter";
import axios from "axios";
import { GetServerSidePropsContext } from "next";

const activeStyle = {
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
  border: "1px solid #059669",
};

interface PageProps {
  curUser: any;
  coach: any;
  selectedLessonID: any;
  sendLessonID: (data: any) => void;
  lessons?: any[];
}

export default function Page({
  curUser,
  coach,
  selectedLessonID,
  sendLessonID,
  lessons,
}: PageProps) {
  console.log("dddddddddddd :", lessons);

  return <></>;
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  // const api = "/api/coach/my_lessons";
  // const coachID = context.query.coach?.id;
  // const { data: response } = await axios.post(api, {
  //   userID: coachID,
  // });
  // const lessons = response;

  // Pass lessons data to the page via props
  return {
    props: {
      lessons: [
        { id: "1", title: "Lesson 1", price: 50 },
        { id: "2", title: "Lesson 2", price: 100 },
      ],
    },
  };
}
