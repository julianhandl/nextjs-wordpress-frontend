import { WP_REST_API_Post } from "wp-types";

export const Gutenberg: React.FC<{ content: WP_REST_API_Post["content"] }> = ({
  content,
}) => {
  return <div dangerouslySetInnerHTML={{ __html: content.rendered }}></div>;
};
