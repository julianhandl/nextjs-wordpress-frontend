export interface SEOBlock {
	title: string;
	canonical?: string;
	metaDesc?: string;
	opengraphTitle: string;
	opengraphType: string;
	opengraphDescription?: string;
}

export const seoBlockQuery = `
	seo {
		title
		canonical
		metaDesc
		opengraphTitle
		opengraphType
		opengraphDescription
	}
`
