import InHeader from "~/components/widgets/InHeader";
import Footer from "~/components/widgets/Footer";

export default function InsideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <InHeader />
      {children}
      <Footer />
    </>
  );
}
