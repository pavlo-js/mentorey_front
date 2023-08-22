import InsideHeader from "~/components/layout/InsideHeader";

export default function InsideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <InsideHeader />
      <div className="py-4 px-1 sm:px-2 mx-auto">{children}</div>
    </>
  );
}
