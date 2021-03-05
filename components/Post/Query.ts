import { seoBlockQuery } from "../../common/types/SEOBlock";

export interface PostsQuery {
    nodes: {
        uri: string;
        categories: {
            nodes: {
                name: string;
                uri: string;
            }[]
        }
        excerpt: string;
        title: string;
        modified: string;
        featuredImage?: {
            node: {
                sourceUrl: string;
                mediaDetails: {
                    width: number;
                    height: number;
                }
            }
        }
    }[]
}

export const postSingleQuery = `
    post(id: $uri, idType: URI) {
		title
		excerpt(format: RENDERED)
		content(format: RENDERED)
		modified
		${seoBlockQuery}
		categories {
			nodes {
				uri
				name
			}
		}
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
`
