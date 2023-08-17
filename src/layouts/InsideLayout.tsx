import InsideHeader from "~/components/layout/InsideHeader";

export default function InsideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <InsideHeader />
      {children}
    </>
  );
}
