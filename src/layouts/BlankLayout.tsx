import BlankHeader from "~/components/layout/BlankHeader";

export default function BlankLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BlankHeader />
      {children}
    </>
  );
}
