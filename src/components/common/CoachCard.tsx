import React, { useState, useEffect } from "react";
import { Avatar, Tooltip, Rating } from "@mui/material";
import Badge from "@mui/material/Badge";
import ReactCountryFlag from "react-country-flag";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { countries } from "~/shared/data";
import { CurrencyData } from "~/shared/CurrencyData";

import { useRouter } from "next/navigation";

const CoachCard = ({ coach }: { coach: any }) => {
  const [isLike, setIsLike] = useState<boolean>(false);
  const [categories, setCategories] = useState<any[]>();
  const router = useRouter();

  useEffect(() => {
    const api = "/api/common/getCoachCategory";
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ coachID: coach.id }),
    };
    fetch(api, request)
      .then((res) => res.json())
      .then((data) => setCategories(data.categories))
      .catch((err) => console.error(err));
  }, []);

  const country = countries.find(
    (country) => country.code === coach.country
  )?.code;
  const currencySymbol = CurrencyData[coach.currency].symbol;
  const languages = JSON.parse(coach.language);

  return (
    <>
      <div className="m-auto w-full transform overflow-hidden rounded-lg bg-white shadow-lg transition duration-500 ease-in-out hover:shadow-2xl">
        <div className="w-full">
          <video src={coach.intro_video} className="w-full" controls></video>
        </div>
        <div className="w-full p-3">
          <div className="flex items-center">
            <Tooltip title={country}>
              <Badge
                overlap="circular"
                className="rounded-full shadow-md"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  <ReactCountryFlag
                    countryCode={country!}
                    svg
                    style={{
                      width: "20px",
                      height: "20px",
                      border: "1px solid white",
                      borderRadius: "20px",
                      objectFit: "cover",
                    }}
                  />
                }
              >
                <Avatar alt="Travis Howard" src={coach.avatar} />
              </Badge>
            </Tooltip>
            <div className="ml-3">
              <div className="text-large font-bold">
                {coach.first_name + " " + coach.last_name}
              </div>
              <div className="text-sm text-gray-600">{coach.title}</div>
            </div>
            <div className="ml-auto">
              {isLike ? (
                <FavoriteIcon
                  className="text-red-400"
                  onClick={() => setIsLike(false)}
                />
              ) : (
                <FavoriteBorderIcon
                  className="cursor-pointer hover:text-red-400"
                  onClick={() => setIsLike(true)}
                />
              )}
            </div>
          </div>
          <div className="my-2 flex justify-between">
            <div className="flex items-center">
              <p className="font-base font-bold">{coach.currency}&nbsp;</p>
              <p className="price font-base font-bold">
                {coach.trial_price}
                {currencySymbol}
              </p>
              <p className="text-sm text-slate-400"> / trial</p>
            </div>
            <div className="flex items-center">
              <Rating value={4} size="small" />
              <p className="text-sm font-bold text-gray-900">4.95</p>
            </div>
          </div>
          <div className="w-full bg-white">
            <div className="flex flex-wrap items-center text-xs font-medium text-white">
              {categories &&
                categories.map((item: any, index: number) => (
                  <span
                    key={index}
                    className="mr-1 cursor-default rounded bg-primary-500 px-2 py-1"
                  >
                    {item.label}
                  </span>
                ))}
            </div>
            <div className="mt-2 flex flex-wrap items-center text-xs font-medium text-white">
              {languages.map((item: any, index: number) => (
                <span
                  key={index}
                  className="mr-1 cursor-default rounded border border-primary-500 px-2 py-1 text-primary-500"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="my-3 w-full">
            <p className="line-clamp-3 select-none break-words text-sm">
              {coach.profile == "null" ? "" : coach.profile}
            </p>
          </div>
          <div className="w-full">
            <button
              onClick={() => router.push(`/general/booking/${coach.id}`)}
              type="button"
              className="w-full rounded-lg bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-primary-300"
            >
              Book Trial
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoachCard;
