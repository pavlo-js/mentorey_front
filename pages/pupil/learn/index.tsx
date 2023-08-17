import { NextPageWithLayout } from "../../_app";
import { ReactElement, useEffect, useState } from "react";
import InsideLayout from "~/layouts/InsideLayout";
import { useRouter } from "next/router";
import { selectAuthState } from "~/slices/authSlice";
import { useSelector } from "react-redux";

// const VerifyPage: NextPageWithLayout = () => {
//   const router = useRouter();
//   const curUser = useSelector(selectAuthState);

//   return <></>;
// };

// VerifyPage.getLayout = function getLayout(page: ReactElement) {
//   return <InsideLayout>{page}</InsideLayout>;
// };

// export default VerifyPage;

export default function LearnPage() {
  return (
    <InsideLayout>
      <h1>This is learn page.</h1>
    </InsideLayout>
  );
}
