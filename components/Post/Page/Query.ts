import { PostsQuery } from "../Query";

export interface PostPageCategoryList {
    nodes: {
        name: string;
        uri: string;
    }[]
}

export interface PostPageQuery {
    posts: PostsQuery;
    categories: PostPageCategoryList;
}

export const postPageQuery = `
query MyQuery {
    posts {
        nodes {
            uri
            categories {
                nodes {
                    name
                    uri
                }
            }
            excerpt(format: RENDERED)
            title
            modified
            featuredImage {
                node {
                    sourceUrl
                    mediaDetails {
                        width
                        height
                    }
                }
            }
        }
    }
    categories {
		nodes {
			name
			uri
		}
	}
}
`
