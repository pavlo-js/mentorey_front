import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "next/link";
import Image from "next/image";

function BlankHeader() {
  return (
    <AppBar position="static" sx={{ backgroundColor: "white" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              width: 180,
              height: "50px",
              marginRight: "auto",
              position: "relative",
            }}
          >
            <Image src="/logo.svg" alt="logo" fill priority={false} />
          </Box>
          <Box sx={{ marginLeft: "auto" }}>
            <Link href="/auth/logout">
              <Typography sx={{ color: "black" }}>Logout</Typography>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default BlankHeader;
