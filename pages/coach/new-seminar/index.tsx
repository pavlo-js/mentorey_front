import { Box, Button, Container, Paper, Typography, InputAdornment, Chip, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import { TextFieldElement, SelectElement, useForm } from 'react-hook-form-mui';
import { useQuery } from 'react-query';
import InsideLayout from '~/layouts/InsideLayout';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { nanoid } from 'nanoid';
import { getFileExtension } from '~/utils/utils';
import AWS from 'aws-sdk';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Image from 'next/image';
import styled from '@emotion/styled';
import { CurrencyData } from '~/shared/CurrencyData';
import { useSelector } from 'react-redux';
import { selectAuthState } from '~/slices/authSlice';
import TimelineSetModal from './TimelineSetModal';

const BannerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
`;

AWS.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  region: process.env.NEXT_PUBLIC_AWS_REGION,
});

const s3 = new AWS.S3();

const maxBannerFileSize = 1024 * 1024 * 5; // 5 MB
const defaultPlaceholder = '/img/default-placeholder.png';

const SeminarTypes = [
  { id: 'MIN30', label: '30 mins' },
  { id: 'MIN60', label: '60 mins' },
  { id: 'MIN90', label: '90 mins' },
];

export default function NewSeminar() {
  const [uploading, setUploading] = useState<boolean>(false);
  const [bannerURL, setBannerURL] = useState<string>(defaultPlaceholder);
  const [bannerKey, setBannerKey] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newSeminarID, setNewSeminarID] = useState();
  const { control, handleSubmit } = useForm();

  const curUser = useSelector(selectAuthState);
  const currencySymbol = CurrencyData[curUser?.currency]?.symbol;

  const languages = JSON.parse(curUser.language);

  const languageOptions = languages.map((item: any) => {
    return { id: item, label: item };
  });

  const commuicationTools = [];

  if (curUser.skype) commuicationTools.push({ id: 'skype', label: 'Skype' });
  if (curUser.zoom) commuicationTools.push({ id: 'zoom', label: 'Zoom' });
  if (curUser.discord) commuicationTools.push({ id: 'discord', label: 'Discord' });
  if (curUser.slack) commuicationTools.push({ id: 'slack', label: 'Slack' });
  if (curUser.hangouts) commuicationTools.push({ id: 'hangouts', label: 'Hangouts' });

  const onSubmit = handleSubmit(async (data) => {
    const banner = bannerURL != defaultPlaceholder ? bannerURL : 'default';

    try {
      const { data: res } = await axios.post('/api/coach/create-seminar-basic', {
        ...data,
        coachID: curUser.id,
        banner,
      });
      setNewSeminarID(res.newSeminarID);
      setIsModalOpen(true);
    } catch (error) {
      toast.error('Sorry. Something went wrong. Please try again after refresh.');
      console.log(error);
    }
  });

  const { data: categories } = useQuery({
    queryKey: ['getAllCategories'],
    queryFn: async () => {
      const { data: res } = await axios.post('/api/common/get-all-categories');
      return res.categories;
    },
  });

  async function bannerUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const banner = event.target.files?.[0];
    if (banner) {
      setUploading(true);
      setBannerURL(defaultPlaceholder);
      if (banner.size > maxBannerFileSize) {
        toast.warn('Your banner exceeds the maximum file size 10 MB.');
      } else {
        const fileName = `${nanoid()}.${getFileExtension(banner.name)}`;
        const uploadParams = {
          Bucket: process.env.NEXT_PUBLIC_S3_BUCKET!,
          Key: `seminar_banner/${fileName}`,
          Body: banner,
          ContentType: banner.type,
        };
        try {
          const uploadResponse = await s3.upload(uploadParams).promise();
          setBannerKey(bannerKey + 1);
          setBannerURL(uploadResponse.Location);
        } catch (error) {
          toast.error('Sorry, Upload failed. Please try again after refresh.');
          console.error(error);
        } finally {
          setUploading(false);
        }
      }
    }
  }

  return (
    <InsideLayout>
      <TimelineSetModal isOpen={isModalOpen} seminarID={newSeminarID} />
      <Container>
        <Paper className="max-w-3xl mx-auto py-3 px-2 md:py-5 md:px-3">
          <Typography className="text-xl md:text-2xl font-semibold text-gray-500 text-center mb-3">
            Create new Seminar
          </Typography>
          <form onSubmit={onSubmit} className="w-full">
            <Box className="flex flex-wrap">
              <Box className="w-full md:w-3/5 md:mr-2 flex flex-wrap">
                <TextFieldElement
                  size="small"
                  label="Title"
                  name={'title'}
                  required
                  fullWidth
                  control={control}
                  className="my-2"
                  type="text"
                />
                <SelectElement
                  label="Categories"
                  name={'category'}
                  options={categories}
                  control={control}
                  size="small"
                  className="w-1/2 my-2 pr-1"
                  required
                />
                <TextFieldElement
                  size="small"
                  label="Max people can attend"
                  name={'max_people'}
                  required
                  type="number"
                  control={control}
                  className="w-1/2 my-2 pl-1"
                  inputProps={{ min: 2 }}
                />

                <TextFieldElement
                  size="small"
                  label="Price per hour"
                  name="price"
                  type="number"
                  control={control}
                  required
                  className="w-1/2 my-2 pr-1"
                  InputProps={{
                    inputProps: { min: 0, max: 100 },
                    startAdornment: <InputAdornment position="start">{currencySymbol}</InputAdornment>,
                  }}
                />

                <SelectElement
                  label="Seminar Type"
                  name={'duration'}
                  options={SeminarTypes}
                  control={control}
                  size="small"
                  className="w-1/2 my-2 pl-1"
                  required
                />

                <SelectElement
                  label="Language"
                  name={'language'}
                  options={languageOptions}
                  control={control}
                  size="small"
                  className="w-1/2 my-2 pr-1"
                  required
                />

                <SelectElement
                  label="Communication Tool"
                  name={'communication'}
                  options={commuicationTools}
                  control={control}
                  size="small"
                  className="w-1/2 my-2 pl-1"
                  required
                />

                <TextFieldElement
                  size="small"
                  label="Description"
                  placeholder="Insert some description about your seminar"
                  multiline
                  minRows={5}
                  fullWidth
                  name="description"
                  inputProps={{ min: 1 }}
                  control={control}
                  required
                  className="my-2"
                />

                <TextFieldElement
                  size="small"
                  label="Purpose"
                  placeholder="Describe what they will learn after this seminar."
                  multiline
                  minRows={5}
                  fullWidth
                  name="purpose"
                  inputProps={{ min: 1 }}
                  control={control}
                  required
                  className="my-2"
                />
              </Box>
              <Box className="md:block w-full md:flex-1 pt-5">
                <Typography className="text-sm text-center">
                  Upload your own banner image to promote your seminar. A wonderful banner will help you to engage more
                  people.
                </Typography>
                <Typography className="text-xs mt-4 text-center">
                  ⚠ Be sure your banner has 16:9 aspect ratio for the best effective and below 5 MB file size.
                </Typography>
                <LoadingButton
                  variant="contained"
                  component="label"
                  startIcon={<CloudUploadIcon />}
                  className="flex w-fit mx-auto my-4"
                  loading={uploading}
                >
                  Upload Banner
                  <input
                    type="file"
                    accept="imgage/*"
                    className="hidden"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      bannerUpload(e);
                    }}
                  />{' '}
                </LoadingButton>
                <BannerContainer className="relative w-full">
                  {bannerURL && (
                    <Image
                      src={bannerURL}
                      fill
                      alt="banner_image_preview"
                      className="object-cover rounded-lg shadow-md"
                      key={bannerKey}
                    />
                  )}
                </BannerContainer>
              </Box>
            </Box>
            <Button
              type="submit"
              variant="contained"
              disabled={uploading}
              className="bg-primary-600 px-8 ml-auto block mt-4"
            >
              Save
            </Button>
          </form>
        </Paper>
      </Container>
    </InsideLayout>
  );
}
