import type { InferGetStaticPropsType, GetStaticProps } from 'next';

type Seminars = any[];

export const getStaticProps = async () => {
  const res = await fetch('http://localhost:3000/api/common/get-all-active-seminars');
  const data = await res.json();

  return { props: { seminars: data.seminars } };
};

export default function Page({ seminars }: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log(seminars);

  return (
    // seminars && (
    //   <>
    //     {seminars.map((seminar: any) => (
    //       <p>{seminar.title}</p>
    //     ))}
    //   </>
    // )
    <p>hello</p>
  );
}
