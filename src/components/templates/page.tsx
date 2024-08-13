import { Footer } from "@/components/layout/footer/footer";
import { Header } from "@/components/layout/header/header";
import { WP_REST_API_Page } from "wp-types";

export const PageTemplate: React.FC<{ page: WP_REST_API_Page }> = ({
  page,
}) => {
  return (
    <>
      <Header />
      <main>Page: {page.title.rendered}</main>
      <Footer />
    </>
  );
};
