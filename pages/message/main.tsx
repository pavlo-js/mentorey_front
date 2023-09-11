import { useEffect, useState } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import {
  Chat,
  MessageList,
  MessageInput,
  MemberList,
  TypingIndicator,
  ChannelList,
  useChannelMembers,
  useChannels,
} from "@pubnub/react-chat-components";

const defaultChannels = [
  {
    name: "Movies",
    custom: {
      profileUrl:
        "https://www.gravatar.com/avatar/149e60f311749f2a7c6515f7b34?s=256&d=identicon",
    },
    description: "Everything about movies",
    eTag: "AbOx6N+6vu3zoAE",
    id: "mentorey.channel01",
    updated: "2020-09-23T09:23:37.175764Z",
  },
];

const drawerWidth = 240;

interface Props {
  window?: () => Window;
}
export default function ChatMain(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  // const [members, fetchPage, refetchChannelMembers, total, error] =
  //   useChannelMembers({
  //     channel: "c01",
  //   });

  const [channels, fetchPage, total, error] = useChannels();

  console.log(channels);
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const channelList = <ChannelList channels={defaultChannels} />;

  return (
    channels.length > 0 && (
      <Chat currentChannel={"mentorey.channel01"}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar
            position="fixed"
            sx={{
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              ml: { sm: `${drawerWidth}px` },
            }}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                Responsive drawer
              </Typography>
            </Toolbar>
          </AppBar>
          <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
          >
            <Drawer
              container={container}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true,
              }}
              sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
            >
              {channelList}
            </Drawer>
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: "none", sm: "block" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
              open
            >
              {channelList}
            </Drawer>
          </Box>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100vh",
            }}
          >
            <Toolbar />
            <MessageList fetchMessages={25} />
            <TypingIndicator />
            <MessageInput typingIndicator={true} fileUpload="all" />
          </Box>
        </Box>
      </Chat>
    )
  );
}
