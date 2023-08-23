import { Paper, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectAuthState } from "~/slices/authSlice";
import Weekly from "./components/Weekly";
import Override from "./components/Override";
export default function Schedule() {
  const curUser = useSelector(selectAuthState);

  return (
    <>
      <Paper className="max-w-4xl mx-auto">
        <Typography className="text-lg font-semibold p-5">
          Your Timezone: {curUser.timezone}
        </Typography>
        <div className="flex">
          <div className="w-3/5">
            <Weekly />
          </div>
          <div className="w-2/5">
            <Override />
          </div>
        </div>
      </Paper>
    </>
  );
}
