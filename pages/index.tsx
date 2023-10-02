import dynamic from 'next/dynamic';

import { Footer } from '~/components/homepage/footer';
import { Header } from '~/components/homepage/header';

const DynamicHomeHero: any = dynamic(() => import('../src/components/landingpage/hero'));
const DynamicHomeFeature = dynamic(() => import('../src/components/landingpage/feature'));
const DynamicHomePopularCourse = dynamic(() => import('../src/components/landingpage/popular-courses'));
const DynamicHomeTestimonial = dynamic(() => import('../src/components/landingpage/testimonial'));
const DynamicHomeOurMentors = dynamic(() => import('../src/components/landingpage/mentors'));
const DynamicHomeNewsLetter = dynamic(() => import('../src/components/landingpage/newsletter'));

export default function HomePage() {
  return (
    <>
      <Header />
      <DynamicHomeHero />
      <DynamicHomePopularCourse />
      <DynamicHomeFeature />
      <DynamicHomeTestimonial />
      <DynamicHomeOurMentors />
      {/* <DynamicHomeNewsLetter /> */}
      <Footer />
    </>
  );
}
