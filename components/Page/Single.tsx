import React from "react";
import Header from "../Header/Header";
import { SEOBlock, seoBlockQuery } from "../../common/types/SEOBlock";
import { MenuMap } from "../../common/types/Menu";

export interface PageSingleQuery {
	title: string;
	content?: string;
	isPostsPage: boolean;
	contentType: {
		node: {
			hierarchical: boolean;
		}
	}
	seo: SEOBlock;
	template: {
		templateName: string;
	}
}

export const pageSingleQuery = `
    page(id: $uri, idType: URI) {
		title
		content(format: RENDERED)
		isPostsPage
		contentType {
			node {
				hierarchical
			}
		}
		${seoBlockQuery}
		template {
			templateName
		}
    }
`

interface PageSingleProps {
	page: PageSingleQuery;
	menus: MenuMap
	uri: string;
}

const PageSingle: React.FC<PageSingleProps> = ({
	page,
	menus,
	uri,
}) => {
	return <>
		<Header menu={menus["MAIN_MENU"]} uri={uri} />
		<article>
			<h1>{page.title}</h1>
			<div dangerouslySetInnerHTML={{ __html: page.content }}></div>
		</article>
	</>
}

export default PageSingle;
