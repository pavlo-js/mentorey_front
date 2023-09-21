import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import Image from 'next/image';

interface Props {
  variant?: 'primary' | 'secondary';
}

const Logo: FC<Props> = ({ variant }) => {
  const router = useRouter();
  return (
    <Box onClick={() => router.push('/')} sx={{ position: 'relative', width: 180, height: 50 }}>
      {/* <Typography
        variant="h4"
        component="h1"
        sx={{ fontWeight: 700, '& span': { color: variant === 'primary' ? 'primary.main' : 'unset' } }}
      >
        Course<span>space</span>
      </Typography> */}
      <Image src="/logo.svg" alt="logo" fill />
    </Box>
  );
};

Logo.defaultProps = {
  variant: 'primary',
};

export default Logo;
