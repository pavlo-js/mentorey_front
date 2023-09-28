import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DateTime } from 'luxon';
import Add from '@mui/icons-material/Add';
import { IconButton, TextField } from '@mui/material';
import Delete from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRouter } from 'next/router';

interface PageProps {
  isOpen: boolean;
  seminarID: any;
}

export default function TimelineSetModal({ isOpen, seminarID }: PageProps) {
  const [times, setTimes] = React.useState<DateTime[]>([DateTime.now()]);
  const [hasError, setHasError] = React.useState<boolean>(false);
  const router = useRouter();
  const saveTimes = async () => {
    if (hasError) {
      toast.warning('Please set valid start time for your seminar.');
    } else {
      console.log(seminarID);
      // by calling this api, we create new real seminar instances
      try {
        const startTimes = times.map((time) => {
          return time.toUTC().toISO();
        });
        await axios.post('/api/coach/save-seminar', { seminarID, startTimes });
        router.push('/coach/dashboard');
      } catch (error) {
        console.log(error);
      }
    }
  };

  const addTimes = () => {
    const temp = [...times];
    temp.push(times[times.length - 1].plus({ day: 1 }));
    setTimes(temp);
  };

  const deleteTime = (index: number) => {
    const temp = [...times];
    temp.splice(index, 1);
    setTimes(temp);
  };

  const updateTimes = (value: DateTime, index: number) => {
    const temp = [...times];
    temp[index] = value;
    setTimes(temp);
  };

  React.useEffect(() => {
    const invalidTimes = times.filter((time) => time < DateTime.now());
    if (invalidTimes.length > 0) {
      setHasError(true);
    } else {
      setHasError(false);
    }
  }, [times]);

  return (
    <>
      <Dialog open={isOpen} className=" max-w-sm mx-auto">
        <DialogTitle>Set Time for your seminar</DialogTitle>
        <DialogContent>
          <DialogContentText className="text-sm mb-3">
            We are happy to hear that you create a new seminar for our customers. Kindly insert start time of your
            seminar.
          </DialogContentText>
          <Button startIcon={<Add />} variant="outlined" size="small" onClick={addTimes}>
            Add timeline
          </Button>
          <LocalizationProvider dateAdapter={AdapterLuxon}>
            {times.map((time, index) => (
              <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                <DateTimePicker
                  key={index}
                  value={time}
                  className="w-full my-2"
                  disablePast
                  onChange={(value) => updateTimes(value!, index)}
                  minutesStep={30}
                />
                <IconButton onClick={() => deleteTime(index)} disabled={index === 0}>
                  <Delete />
                </IconButton>
              </Box>
            ))}
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={saveTimes} variant="contained" className="bg-primary-600">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
