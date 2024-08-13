import { WP_REST_API_Post } from "wp-types";

export const PostTemplate: React.FC<{ post: WP_REST_API_Post }> = ({
  post,
}) => {
  return <main>Post: {post.title.rendered}</main>;
};
