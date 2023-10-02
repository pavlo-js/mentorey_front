import Image from 'next/image';
import { Box, Paper, Typography, Tooltip, Badge, Avatar, Button } from '@mui/material';
import { BannerContainer, CategoryLabel, SeminarTitleContainer } from '../../../src/components/common/SeminarComponent';
import ReactCountryFlag from 'react-country-flag';
import { countries } from '~/shared/data';
import { CurrencyData } from '~/shared/CurrencyData';
import useCurrencyConverter from '~/hooks/useCurrencyConverter';
import { useRouter } from 'next/router';

const defaultBanner = '/img/default-seminar.jpg';

const SeminarTypes: any = {
  MIN30: { value: 0.5, label: '30 min' },
  MIN60: { value: 1, label: '60 min' },
  MIN90: { value: 1.5, label: '90 min' },
};

export default function SeminarCard({
  seminar,
  categories,
  curUser,
}: {
  seminar: any;
  categories: any[];
  curUser: any;
}) {
  const router = useRouter();
  const seminarBasic = seminar.basic;
  const country = countries.find((country) => country.code === seminarBasic.country)?.code;
  const category = categories.find((category) => (category.id = seminarBasic.category_id));
  const currencySymbol = CurrencyData[curUser.currency].symbol;
  const originPrice = seminarBasic.price * SeminarTypes[seminarBasic.duration].value;

  const price = useCurrencyConverter(seminarBasic.currency, curUser.currency, originPrice);

  return (
    <>
      <Box className="w-full md:w-1/3 lg:w-1/4 p-2">
        <Paper className="w-full rounded-lg shadow-lg">
          <BannerContainer>
            <Image
              src={seminarBasic.banner === 'default' ? defaultBanner : seminar.banner}
              fill
              alt="banner"
              className="object-cover rounded-t-lg"
            />
            <CategoryLabel>
              <Typography>{category.label}</Typography>
            </CategoryLabel>
          </BannerContainer>
          <Box className="mt-6 px-2 pb-4">
            <SeminarTitleContainer>
              <Typography className="text-base first-letter:capitalize">{seminarBasic.seminar_title}</Typography>
            </SeminarTitleContainer>
            <Box className="flex items-center mt-3">
              <Tooltip title={country}>
                <Badge
                  overlap="circular"
                  className="rounded-full shadow-md"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  badgeContent={
                    <ReactCountryFlag
                      countryCode={country!}
                      svg
                      style={{
                        width: '20px',
                        height: '20px',
                        border: '1px solid white',
                        borderRadius: '20px',
                        objectFit: 'cover',
                      }}
                    />
                  }
                >
                  <Avatar alt="Travis Howard" src={seminarBasic.avatar} />
                </Badge>
              </Tooltip>
              <Box className="ml-3">
                <Box className="text-large font-bold first-letter:capitalize">
                  {seminarBasic.first_name + ' ' + seminarBasic.last_name}
                </Box>
                <Box className="text-sm text-gray-600 first-letter:capitalize">{seminarBasic.title}</Box>
              </Box>
            </Box>
            <Button
              variant="contained"
              className="bg-primary-600 mt-4"
              fullWidth
              onClick={() => router.push(`/general/join-seminar/${seminarBasic.seminar_basic_id}`)}
            >
              Join {currencySymbol + price}/{SeminarTypes[seminarBasic.duration].label}
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  );
}
