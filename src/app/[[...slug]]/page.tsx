import RootLayout from "@/app/layout";
import { PageTemplate } from "@/components/templates/page";
import { PostTemplate } from "@/components/templates/post";
import { getPathObject } from "@/driver/driver";

export default async function Page({ params }: { params: { slug: string[] } }) {
  return <RootLayout>{await getPage(params.slug)}</RootLayout>;
}

async function getPage(slug: string[]) {
  const pathObject = await getPathObject(slug);

  switch (pathObject?.type) {
    case "page":
      return <PageTemplate page={pathObject.data} />;
    case "post":
      return <PostTemplate post={pathObject.data} />;
    default:
      return <div>Unknown</div>;
    /*
    case "post-archive":
      return <PostArchiveTemplate />;
    */
  }
}
