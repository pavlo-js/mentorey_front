import { useState } from 'react';
import InsideLayout from '~/layouts/InsideLayout';
import { usePubNub } from 'pubnub-react';
import {
  ChannelEntity,
  Chat,
  MessageList,
  MessageInput,
  MemberList,
  TypingIndicator,
  ChannelList,
  useChannelMembers,
  useChannels,
  useUsers,
  useUser,
} from '@pubnub/react-chat-components';
import { Container, List, Paper, Typography, useMediaQuery, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectAuthState } from '~/slices/authSlice';
import { useQuery } from 'react-query';
import axios from 'axios';
import { nanoid } from 'nanoid';

import pickerData from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

type ChannelType = ChannelEntity;

export default function ChatMain() {
  const pubnub = usePubNub();
  const uuid = pubnub.getUUID();

  const [currentUser] = useUser({ uuid });
  const [allUsers] = useUsers({ include: { customFields: true } });
  const [currentChannel, setCurrentChannel] = useState<any>();
  const [members, fetchPage, refetchChannelMembers, total, error] = useChannelMembers({
    channel: currentChannel,
  });

  const curUser = useSelector(selectAuthState);

  const isMobile = useMediaQuery('(max-width: 600px)');

  const { data: channels } = useQuery({
    queryKey: ['getChannels', curUser],
    queryFn: async () => {
      const api = '/api/common/get-channels';
      const { data: res } = await axios.post(api, { ownerID: curUser.id });
      const temp: any[] = [];
      res.channels.map((item: any, index: number) => {
        temp.push({
          name: `${item.first_name} ${item.last_name}`,
          custom: {
            profileUrl: item.avatar || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
          },
          description: item.title || '',
          eTag: `${nanoid()}`,
          id: item.channel_id,
          updated: item.updated_at,
        });
      });

      return temp;
    },
  });

  pubnub.subscribe({ channels });
  const [allChannels] = useChannels({ include: { customFields: true } });
  console.log(allChannels);

  return (
    channels &&
    channels.length > 0 && (
      <InsideLayout>
        <Chat
          users={allUsers}
          channels={[...channels.map((c) => c.id), uuid]}
          currentChannel={currentChannel?.id || channels[0].id}
        >
          <Container className="flex justify-between px-0">
            <Box
              className="mr-2 hidden w-1/4 md:block"
              sx={{ height: isMobile ? 'calc(100vh - 90px)' : 'calc(100vh - 150px)' }}
            >
              <Typography className="block bg-gradient-to-r from-primary-700 to-primary-500 py-1 pl-3 text-white">
                Contacts
              </Typography>
              <ChannelList
                onChannelSwitched={(channel) => {
                  setCurrentChannel(channel);
                }}
                channels={channels}
              />
            </Box>
            <Paper
              className="flex flex-grow flex-col justify-between"
              sx={{ height: isMobile ? 'calc(100vh - 90px)' : 'calc(100vh - 115px)' }}
            >
              <MessageList fetchMessages={25} enableReactions={true} reactionsPicker={<Picker data={pickerData} />} />
              <TypingIndicator />
              <MessageInput typingIndicator={true} fileUpload="all" emojiPicker={<Picker data={pickerData} />} />
            </Paper>
          </Container>
        </Chat>
      </InsideLayout>
    )
  );
}
