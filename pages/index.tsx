import dynamic from 'next/dynamic';

import { Footer } from '~/components/homepage/footer';
import { Header } from '~/components/homepage/header';

const DynamicHomeHero: any = dynamic(() => import('./components/hero'));
const DynamicHomeFeature = dynamic(() => import('./components/feature'));
const DynamicHomePopularCourse = dynamic(() => import('./components/popular-courses'));
const DynamicHomeTestimonial = dynamic(() => import('./components/testimonial'));
const DynamicHomeOurMentors = dynamic(() => import('./components/mentors'));
const DynamicHomeNewsLetter = dynamic(() => import('./components/newsletter'));

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
