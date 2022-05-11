import React from "react";
import Header from "../DesignSystem/Header/Header";
import { SEOBlock } from "../../common/types/SEOBlock";
import { MenuMap } from "../../common/types/Menu";
import Footer from "../DesignSystem/Footer/Footer";
import WordpressContent from "../DesignSystem/Wordpress/Content/Content";

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
			{page.content ? <WordpressContent content={page.content} /> : null}
		</article>
		<Footer
			menu1={menus["FOOTER_MENU_1"]}
			menu2={menus["FOOTER_MENU_2"]}
			menu3={menus["FOOTER_MENU_3"]}
			menu4={menus["FOOTER_MENU_4"]}
		/>
	</>
}

export default PageSingle;
