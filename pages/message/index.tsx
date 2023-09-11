import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { selectAuthState } from "~/slices/authSlice";
import { useSelector } from "react-redux";
// Pubnub
import PubNub from "pubnub";
import { PubNubProvider, usePubNub } from "pubnub-react";
import {
  Chat,
  MessageList,
  MessageInput,
  MemberList,
  TypingIndicator,
  ChannelList,
  useChannelMembers,
} from "@pubnub/react-chat-components";

const drawerWidth = 240;

interface Props {
  window?: () => Window;
}

const channels = [
  {
    name: "Movies",
    custom: {
      profileUrl:
        "https://www.gravatar.com/avatar/149e60f311749f2a7c6515f7b34?s=256&d=identicon",
    },
    description: "Everything about movies",
    eTag: "AbOx6N+6vu3zoAE",
    id: "c01",
    updated: "2020-09-23T09:23:37.175764Z",
  },
  {
    name: "Cartoon",
    custom: {
      profileUrl:
        "https://www.gravatar.com/avatar/149e60f311749f2a7c6515f7b34?s=256&d=identicon",
    },
    description: "Everything about movies",
    eTag: "AbOx6N+6vu3zoAE0",
    id: "c02",
    updated: "2020-09-23T09:23:37.175764Z",
  },
  {
    name: "Shows",
    custom: {
      profileUrl:
        "https://www.gravatar.com/avatar/149e60f311749f2a7c6515f7b34?s=256&d=identicon",
    },
    description: "Everything about movies",
    eTag: "AbOx6N+6vu3zoAE1",
    id: "c03",
    updated: "2020-09-23T09:23:37.175764Z",
  },
];

export default function Message(props: Props) {
  // const pubnub = usePubNub();
  const { window } = props;
  const curUser = useSelector(selectAuthState);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [users, setUsers] = React.useState<any[]>([]);

  const pubnub = new PubNub({
    publishKey: "pub-c-5f93adb3-e1cf-4b9b-8a42-04e604c05440",
    subscribeKey: "sub-c-6629f8fc-edda-47d4-b886-bdb046c755d0",
    uuid: curUser.id.toString(),
  });
  const channelList = <ChannelList channels={channels} />;

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  React.useEffect(() => {
    const tempUsers: any[] = [];
    channels.map((item) => {
      const channelID = item.id;
      pubnub.hereNow(
        {
          channels: [channelID],
          includeUUIDs: true,
          includeState: true,
        },
        (status, response) => {
          console.log(status, response);
          if (response && response.channels) {
            console.log("llll", response.channels[channelID]);
            // tempUsers.push(response.channels[channelID].occupants);
          }
        }
      );
    });
    console.log("tempUsers :", tempUsers);
    setUsers(tempUsers);
  }, []);

  React.useEffect(() => {
    console.log("dddddd", users);
  }, [users]);

  return (
    <PubNubProvider client={pubnub}>
      <Chat currentChannel="c01">
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
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Drawer
              container={container}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
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
    </PubNubProvider>
  );
}
