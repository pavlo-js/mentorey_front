import InsideLayout from "~/layouts/InsideLayout";
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
import { Container, List, Paper, Typography } from "@mui/material";

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

export default function ChatMain() {
  const channelList = <ChannelList channels={defaultChannels} />;
  return (
    <InsideLayout>
      <Chat currentChannel="mentorey.channel01">
        <Container className="flex justify-between px-0">
          <Paper className="md:block hidden mr-2 w-1/4">
            <Typography className="block bg-gradient-to-r from-primary-700 to-primary-500 text-white pl-3 py-2">
              Contancts
            </Typography>
            {channelList}
          </Paper>
          <Paper className="flex-grow flex flex-col justify-between">
            <MessageList fetchMessages={25} />
            <TypingIndicator />
            <MessageInput typingIndicator={true} fileUpload="all" />
          </Paper>
        </Container>
      </Chat>
    </InsideLayout>
  );
}
