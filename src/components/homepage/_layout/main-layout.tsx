import React, { FC, ReactNode } from 'react';
import Box from '@mui/material/Box';
import { Footer } from '~/components/homepage/footer';
import { Header } from '~/components/homepage/header';

interface Props {
  children: ReactNode;
}

const MainLayout: FC<Props> = ({ children }) => {
  return (
    <Box component="main">
      <Header />
      {children}
      <Footer />
    </Box>
  );
};

export default MainLayout;
