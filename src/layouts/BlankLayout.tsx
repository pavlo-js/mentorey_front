import BlankHeader from "~/components/widgets/BlankHeader";
import Footer from "~/components/widgets/Footer";

export default function BlankLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BlankHeader />
      {children}
      <Footer />
    </>
  );
}
