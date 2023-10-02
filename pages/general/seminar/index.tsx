import { Container } from '@mui/material';
import InsideLayout from '~/layouts/InsideLayout';
import SeminarHero from './Hero';
import SeminarMainBoard from './SeminarMain';
import type { InferGetStaticPropsType } from 'next';
import axios from 'axios';
import { DateTime } from 'luxon';
import getAllCategories from '~/lib/getAllCategories';

export default function SeminarPage({ seminars, categories }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <InsideLayout>
      <Container>
        <SeminarHero />
        <SeminarMainBoard seminars={seminars} categories={categories} />
      </Container>
    </InsideLayout>
  );
}

export const getStaticProps = async () => {
  try {
    const { data: res } = await axios.get('http://localhost:3000/api/common/get-all-active-seminars');
    const seminarBasics = res.seminars;

    const seminarInstances = await Promise.all(
      seminarBasics.map(async (seminarBasic: any) => {
        const { data: result } = await axios.post(`${process.env.BASIC_URL}/api/common/get-seminar-instances`, {
          seminarBasicID: seminarBasic.seminar_basic_id,
        });

        const instances = result.instances;
        const sortedInstnaces = instances.sort((a: any, b: any) => {
          const dateTimeA = DateTime.fromISO(a.start_time).toUnixInteger();
          const dateTimeB = DateTime.fromISO(b.start_time).toUnixInteger();
          return dateTimeA - dateTimeB;
        });

        const instanceBookings = await Promise.all(
          sortedInstnaces.map(async (instance: any) => {
            const { data: res } = await axios.post(`${process.env.BASIC_URL}/api/common/get-seminar-bookings`, {
              instanceID: instance.id,
            });
            const bookings = res.seminarBookings;
            return {
              instance,
              bookings,
            };
          }),
        );

        return {
          basic: seminarBasic,
          instnaces: instanceBookings,
        };
      }),
    );

    const categories = await getAllCategories();

    return { props: { seminars: seminarInstances, categories } };
  } catch (error) {
    return { props: { seminars: [], categories: [] } };
  }
};
