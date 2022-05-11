import React from "react";
import Header from "../DesignSystem/Header/Header";
import { SEOBlock } from "../../common/types/SEOBlock";
import { MenuMap } from "../../common/types/Menu";
import Footer from "../DesignSystem/Footer/Footer";
import WordpressContent from "../DesignSystem/Wordpress/Content/Content";

export interface PostSingleQuery {
	title: string;
	excerpt?: string;
	content?: string;
	modified: string;
	seo: SEOBlock;
	categories?: {
		nodes: {
			uri: string;
			name: string;
		}[]
	}
	featuredImage?: {
		node: {
			sourceUrl: string;
			mediaDetails: {
				width: number;
				height: number;
			}
		}
	}
}


interface PostSingleProps {
	post: PostSingleQuery;
	menus: MenuMap
	uri: string;
}

const PostSingle: React.FC<PostSingleProps> = ({
	post,
	menus,
	uri,
}) => {
	return <>
		<Header menu={menus["MAIN_MENU"]} uri={uri} />
		<article>
			<h1>{post.title}</h1>
			{post.excerpt ? <WordpressContent content={post.excerpt} /> : null}
			{post.content ? <WordpressContent content={post.content} /> : null}
		</article>
		<Footer
			menu1={menus["FOOTER_MENU_1"]}
			menu2={menus["FOOTER_MENU_2"]}
			menu3={menus["FOOTER_MENU_3"]}
			menu4={menus["FOOTER_MENU_4"]}
		/>
	</>
}

export default PostSingle;
