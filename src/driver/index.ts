import { YoastMetadata } from "@/driver/yoast.model";
import {
  WP_REST_API_Page,
  WP_REST_API_Pages,
  WP_REST_API_Post,
  WP_REST_API_Posts,
} from "wp-types";
import WPAPI from "wpapi";

var wp = new WPAPI({
  endpoint: `${process.env.WP_URL}/wp-json`,
});

export async function getPathObject(path: string[]) {
  let pageOrPostData: Awaited<ReturnType<typeof getPageOrPost>> | undefined;

  for (const slug of path) {
    pageOrPostData = await getPageOrPost(slug, pageOrPostData?.data.id);
  }

  return pageOrPostData;
}

type BaseData = {
  yoast?: YoastMetadata;
};

type PageOrPostData =
  | (BaseData & {
      type: "page";
      data: WP_REST_API_Page;
    })
  | (BaseData & {
      type: "post";
      data: WP_REST_API_Post;
    });

async function getPageOrPost(
  slug: string,
  parentId?: number
): Promise<PageOrPostData | undefined> {
  // Try page first
  const pageRequest = wp.pages().slug(slug);
  if (parentId) {
    pageRequest.param("parent", parentId);
  }
  const pageResponse: WP_REST_API_Pages = await pageRequest;

  if (pageResponse?.length > 0) {
    return {
      type: "page",
      data: pageResponse[0],
      yoast: pageResponse[0]?.yoast_head_json as YoastMetadata | undefined,
    };
  }

  // Then try post
  const postRequest = wp.posts().slug(slug);
  if (parentId) {
    postRequest.param("parent", parentId);
  }
  const postResponse: WP_REST_API_Posts = await postRequest;
  console.log("post", postResponse);

  if (postResponse?.length > 0) {
    return {
      type: "post",
      data: postResponse[0],
      yoast: postResponse[0]?.yoast_head_json as YoastMetadata | undefined,
    };
  }

  return undefined;
}
