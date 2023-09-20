import React from 'react';
import dynamic from 'next/dynamic';
import { NextPageWithLayout } from '~/interfaces/layout';
import { MainLayout } from '~/components/_layout';
// import { HomeFeature, HomeHero, HomePopularCourse, HomeTestimonial, HomeOurMentors, DynamicHomeNewsLetter } from '~/components/home'

const DynamicHomeHero = dynamic(() => import('./components/hero'));
const DynamicHomeFeature = dynamic(() => import('./components/feature'));
const DynamicHomePopularCourse = dynamic(() => import('./components/popular-courses'));
const DynamicHomeTestimonial = dynamic(() => import('./components/testimonial'));
const DynamicHomeOurMentors = dynamic(() => import('./components/mentors'));
const DynamicHomeNewsLetter = dynamic(() => import('./components/newsletter'));

const Home: NextPageWithLayout = () => {
  return (
    <>
      <DynamicHomeHero />
      <DynamicHomePopularCourse />
      <DynamicHomeFeature />
      <DynamicHomeTestimonial />
      <DynamicHomeOurMentors />
      <DynamicHomeNewsLetter />
    </>
  );
};

Home.getLayout = (page: any) => <MainLayout>{page}</MainLayout>;

export default Home;
