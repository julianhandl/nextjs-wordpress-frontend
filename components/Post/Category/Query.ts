import { SEOBlock } from "../../../common/types/SEOBlock";

export interface PostCategoryQuery {
	title: string;
	content: string;
	isPostsPage: boolean;
	seo: SEOBlock;
	template: {
		templateName: string;
	}
}

export const PostCategoryQuery = `
    page(id: $uri, idType: URI) {
		title
		content(format: RENDERED)
		isPostsPage
		seo {
			title
			canonical
			metaDesc
			opengraphTitle
			opengraphType
			opengraphDescription
		}
		template {
			templateName
        }
    }
`