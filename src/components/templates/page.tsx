import { WP_REST_API_Page } from "wp-types";

export const PageTemplate: React.FC<{ page: WP_REST_API_Page }> = ({
  page,
}) => {
  return <main>Page: {page.title.rendered}</main>;
};
