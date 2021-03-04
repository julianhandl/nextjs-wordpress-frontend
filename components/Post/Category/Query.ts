import { SEOBlock } from "../../../common/types/SEOBlock";

export interface PostCategoryQuery {
	name: string;
	seo: SEOBlock;
}

export const postCategoryQuery = `
	category(id: $uri, idType: URI) {
		name
		seo {
			title
			canonical
			metaDesc
			opengraphTitle
			opengraphType
			opengraphDescription
		}
		posts {
			nodes {
				uri
				title
				excerpt(format: RENDERED)
				featuredImage {
					node {
						sourceUrl
						mediaDetails {
							height
							width
						}
					}
				}
			}
		}
	}
`