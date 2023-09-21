import React, { FC } from 'react';
import Box from '@mui/material/Box';
import { StyledButton } from '~/components/homepage/styled-button';
import { useRouter } from 'next/router';

const AuthNavigation: FC = () => {
  const router = useRouter();

  return (
    <Box sx={{ '& button:first-child': { mr: 2 } }}>
      <StyledButton color="primary" variant="outlined" onClick={() => router.push('/auth/login')}>
        Sign In
      </StyledButton>
      <StyledButton color="primary" onClick={() => router.push('/auth/signup')}>
        Sign Up
      </StyledButton>
    </Box>
  );
};

export default AuthNavigation;
