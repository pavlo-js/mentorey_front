import { NextPageWithLayout } from "../../_app";
import { ReactElement, useEffect, useState } from "react";
import BlankLayout from "~/layouts/BlankLayout";
import { Paper, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { selectAuthState } from "~/slices/authSlice";
import { useSelector } from "react-redux";

const VerifyPage: NextPageWithLayout = () => {
  const [code, setCode] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);
  const router = useRouter();
  const curUser = useSelector(selectAuthState);
  useEffect(() => {
    if (curUser.is_verified) {
      const url = curUser.is_teacher ? "/coach/dashboard" : "/pupil/learn";
      router.push(url);
    }
  }, []);

  function confirmCode() {
    const userID = curUser.id;
    if (userID && code) {
      const url = "/api/auth/verify";
      const request = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userID, token: code }),
      };
      fetch(url, request)
        .then((res) => {
          if (res.status != 400) return res.json();
          else return false;
        })
        .then((data) => {
          if (data) {
            curUser.is_teacher
              ? router.push("/coach/dashboard")
              : router.push("/pupil/learn");
          } else {
            toast.error("Invalid code! Try again please");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  return (
    <>
      <div className="my-44 flex w-full items-center justify-center">
        <Paper className="m-4 px-6 py-10">
          <h1 className="mb-6 text-center text-3xl font-bold text-primary-800">
            Mentorey
          </h1>
          <h2 className="mb-4 text-2xl">Hi 👋, Welcome!</h2>
          <p className="mb-2">
            Please insert your verification code to activate your account.
          </p>
          <TextField
            autoFocus
            placeholder="Verify code"
            size="small"
            onChange={(e) => setCode(e.target.value)}
            className="w-full"
          />
          <LoadingButton
            className="w-full bg-primary-600 text-white hover:bg-primary-700"
            sx={{
              marginTop: "20px",
            }}
            onClick={confirmCode}
            endIcon={<SendIcon />}
            loading={isSending}
            loadingPosition="end"
            variant="contained"
          >
            <span>Send Code</span>
          </LoadingButton>
          <p className="mt-4 text-sm">
            Not received yet? Click{" "}
            <span
              className="cursor-pointer text-primary-700 underline hover:font-bold"
              // onClick={resendCode}
            >
              here
            </span>{" "}
            to resend the verification code.
          </p>
        </Paper>
      </div>
    </>
  );
};

VerifyPage.getLayout = function getLayout(page: ReactElement) {
  return <BlankLayout>{page}</BlankLayout>;
};

export default VerifyPage;
