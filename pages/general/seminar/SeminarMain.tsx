import { useSelector } from 'react-redux';
import SeminarCard from './SeminarCard';
import { Box } from '@mui/material';
import { selectAuthState } from '~/slices/authSlice';

export default function SeminarMainBoard({ seminars, categories }: { seminars: any[]; categories: any[] }) {
  const curUser = useSelector(selectAuthState);
  return (
    seminars && (
      <>
        <Box className="flex flex-wrap justify-between">
          {seminars.map((seminar: any) => (
            <SeminarCard seminar={seminar} categories={categories} curUser={curUser} />
          ))}
        </Box>
      </>
    )
  );
}
