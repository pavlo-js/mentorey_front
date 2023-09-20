import * as React from 'react';

import { selectAuthState } from '~/slices/authSlice';
import { useSelector } from 'react-redux';
// Pubnub
import PubNub from 'pubnub';
import { PubNubProvider } from 'pubnub-react';
import ChatMain from './main';

export default function Message() {
  const curUser = useSelector(selectAuthState);

  const pubnub = new PubNub({
    publishKey: 'pub-c-5f93adb3-e1cf-4b9b-8a42-04e604c05440',
    subscribeKey: 'sub-c-6629f8fc-edda-47d4-b886-bdb046c755d0',
    uuid: curUser.id.toString(),
    logVerbosity: true,
    restore: true,
  });

  return (
    <PubNubProvider client={pubnub}>
      <ChatMain />
    </PubNubProvider>
  );
}
