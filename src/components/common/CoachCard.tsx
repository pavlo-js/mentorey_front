import React, { useState, useEffect } from "react";
import { Avatar, Tooltip, Rating } from "@mui/material";
import Badge from "@mui/material/Badge";
import ReactCountryFlag from "react-country-flag";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { useRouter } from "next/navigation";

const CoachCard = ({ coach }: { coach: any }) => {
  const [isLike, setIsLike] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    console.log(coach);
  }, []);

  return (
    <>
      <div className="m-auto w-full transform overflow-hidden rounded-lg bg-white shadow-lg transition duration-500 ease-in-out hover:-translate-y-1 hover:shadow-xl">
        <div className="w-full">
          <video src={coach.intro_video} className="w-full" controls></video>
        </div>
        <div className="w-full p-3">
          <div className="flex items-center">
            <Tooltip title="Austria">
              <Badge
                overlap="circular"
                className="rounded-full shadow-md"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  <ReactCountryFlag
                    countryCode="at"
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
                <Avatar
                  alt="Travis Howard"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                />
              </Badge>
            </Tooltip>
            <div className="ml-3">
              <div className="text-large font-bold">Silver Girl</div>
              <div className="text-sm text-gray-600">Professor from Vienna</div>
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
              <p className="font-base font-bold">USD&nbsp;</p>
              <p className="price font-base font-bold">30&nbsp;</p>
              <p className="text-sm text-slate-400"> / trial</p>
            </div>
            <div className="flex items-center">
              <Rating value={4} size="small" />
              <p className="text-sm font-bold text-gray-900">4.95</p>
            </div>
          </div>
          <div className="w-full bg-white">
            <div className="flex flex-wrap items-center text-xs font-medium text-white">
              <span className="mr-1 cursor-default rounded bg-primary-500 px-2 py-1">
                Life style
              </span>
              <span className="mr-1 cursor-default rounded bg-primary-500 px-2 py-1">
                Business
              </span>
              <span className="mr-1 cursor-default rounded bg-primary-500 px-2 py-1">
                Fitness
              </span>
            </div>
            <div className="mt-2 flex flex-wrap items-center text-xs font-medium text-white">
              <span className="mr-1 cursor-default rounded border border-primary-500 px-2 py-1 text-primary-500">
                English
              </span>
              <span className="ml-1 cursor-default rounded border border-primary-500 px-2 py-1 text-primary-500">
                French
              </span>
            </div>
          </div>
          <div className="my-3 w-full">
            <p className="line-clamp-3 select-none break-words text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
              blanditiis quas facere laudantium doloribus dignissimos fugit
              voluptatem odio itaque reiciendis. Id laudantium omnis, sed a
              distinctio assumenda voluptatem minima? Eos.
            </p>
          </div>
          <div className="w-full">
            <button
              onClick={() => router.push("/booking/1")}
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
