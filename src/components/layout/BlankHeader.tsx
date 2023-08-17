import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "next/link";

function BlankHeader() {
  return (
    <AppBar position="static" sx={{ backgroundColor: "white" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                color: "black",
                textDecoration: "none",
              }}
            >
              Mentorey
            </Typography>
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
