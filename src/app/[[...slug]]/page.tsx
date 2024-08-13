import { PageTemplate } from "@/components/templates/page";
import { PostTemplate } from "@/components/templates/post";
import { PostArchiveTemplate } from "@/components/templates/post-archive";

export default function Page({ params }: { params: { slug: string } }) {
  const pageType = "";

  switch (pageType) {
    case "page":
      return <PageTemplate />;
    case "post":
      return <PostTemplate />;
    case "post-archive":
      return <PostArchiveTemplate />;
  }
}
