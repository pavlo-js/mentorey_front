import React, { FC } from 'react';
import Box from '@mui/material/Box';
import { Link as ScrollLink } from 'react-scroll';
import { navigations } from './navigation.data';

const Navigation: FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
      {navigations.map(({ path: destination, label }) => (
        <Box
          component={ScrollLink}
          key={destination}
          activeClass="current"
          to={destination}
          spy={true}
          smooth={true}
          duration={350}
          sx={{
            position: 'relative',
            color: 'text.disabled',
            cursor: 'pointer',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            px: { xs: 0, md: 3 },
            mb: { xs: 3, md: 0 },
            fontSize: { xs: '1rem', md: 'inherit' },
            ...(destination === '/' && {
              color: 'primary.main',
            }),

            '& > div': { display: 'none' },

            '&.current>div': { display: 'block' },

            '&:hover': {
              color: 'primary.main',
              '&>div': {
                display: 'block',
              },
            },
          }}
        >
          {label}
        </Box>
      ))}
    </Box>
  );
};

export default Navigation;
