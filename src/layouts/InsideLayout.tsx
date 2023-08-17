import InsideHeader from "~/components/layout/InsideHeader";

export default function InsideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <InsideHeader />
      <div className="py-4">{children}</div>
    </>
  );
}
