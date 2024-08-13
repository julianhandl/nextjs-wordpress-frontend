import { Gutenberg } from "@/components/layout/content/gutenberg";
import { Headline } from "@/components/layout/content/headline";
import { Footer } from "@/components/layout/footer/footer";
import { Header } from "@/components/layout/header/header";
import { WP_REST_API_Post } from "wp-types";

export const PostTemplate: React.FC<{ post: WP_REST_API_Post }> = ({
  post,
}) => {
  return (
    <>
      <Header />
      <main>
        <Headline>{post.title.rendered}</Headline>
        <Gutenberg content={post.content} />
      </main>
      <Footer />
    </>
  );
};
