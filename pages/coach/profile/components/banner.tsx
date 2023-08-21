import { Box, Avatar, Typography, Tooltip, Badge } from "@mui/material";
import sampleBanner from "~/assets/images/user_banner.jpg";
import ReactCountryFlag from "react-country-flag";
import Image from "next/image";

const Banner = () => {
  return (
    <>
      <Box className="relative mb-14 h-32 w-full md:h-40 lg:mb-24 lg:h-48">
        <Image
          src={sampleBanner}
          alt="sample Banner"
          fill
          style={{ objectFit: "cover" }}
          className="rounded-t-lg"
        />
        <Badge
          className="absolute left-1/2 top-16 -translate-x-2/4 rounded-full border-4 border-white shadow-md md:top-24"
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={
            <>
              <Tooltip title="Austria">
                <div>
                  <ReactCountryFlag
                    countryCode="at"
                    svg
                    style={{
                      width: 30,
                      height: 30,
                      border: "2px solid white",
                      borderRadius: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </Tooltip>
            </>
          }
        >
          <Avatar
            alt="Travis Howard"
            className="h-28 w-28 md:h-32 md:w-32 lg:h-44 lg:w-44"
            src="https://plus.unsplash.com/premium_photo-1688350808212-4e6908a03925?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80"
          />
        </Badge>
      </Box>
    </>
  );
};

export default Banner;
