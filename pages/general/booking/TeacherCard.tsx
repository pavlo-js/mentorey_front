import { Avatar, Paper, Badge, Tooltip, Button } from "@mui/material";
import ReactCountryFlag from "react-country-flag";
import Overview from "./Overview";
import { countries } from "~/shared/data";
import { useEffect } from "react";
import Link from "next/link";

export default function TeacherCard({ coach }: { coach: any }) {
  const country = countries.find((item) => item.code === coach.country);

  return (
    <>
      <Paper className="mx-auto my-4 flex max-w-2xl p-4">
        <div className="flex w-[75px] items-center justify-center">
          <Tooltip title={country?.label}>
            <Badge
              overlap="circular"
              className="rounded-full shadow-md"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={
                <ReactCountryFlag
                  countryCode={coach.country}
                  svg
                  style={{
                    width: "25px",
                    height: "25px",
                    border: "1px solid white",
                    borderRadius: "20px",
                    objectFit: "cover",
                  }}
                />
              }
            >
              <Avatar
                sx={{ width: "75px", height: "75px" }}
                alt={coach.first_name + " " + coach.last_name}
                src={coach.avatar}
              />
            </Badge>
          </Tooltip>
        </div>
        <div className="w-calc-100-minus-75 pl-4">
          <div className="mb-2 flex items-center justify-between">
            <h4 className="text-xl font-semibold text-slate-600">
              {`${coach.first_name} ${coach.last_name}`}&nbsp;
              <span className="text-sm font-normal text-slate-500">
                {coach.title != "null" ? coach.title : null}
              </span>
            </h4>
            <Button size="small" variant="outlined">
              <Link href={`/profile/coach/${coach.id}`}>View Profile</Link>
            </Button>
          </div>
          <Overview />
        </div>
      </Paper>
    </>
  );
}
