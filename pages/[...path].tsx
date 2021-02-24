import React from "react";
import { GetStaticProps, GetStaticPaths } from 'next'
import ErrorPage from 'next/error';
import { fetchAPI, BaseQuery, baseQuery } from '../common/fetchAPI'
import PostSingle, { postSingleQuery, PostSingleQuery } from '../components/Post/Single';
import { pageQuery, PageQuery } from '../components/Page/Query';
import { MenuMap } from '../common/types/Menu';
import PageSingle, { PageSingleQuery } from "../components/Page/Single";


interface Props {
	result: BaseQuery<Query>;
	uri: string;
	// posts?: PostsQuery;
	categories?: {
		nodes: {
			name: string;
			uri: string;
		}[]
	}
}

export default function Page(props: Props) {
	const result = props.result;

	const menus: MenuMap = {};
	if (result?.menus?.nodes) {
		result.menus.nodes.forEach(n => {
			n.locations.forEach(l => {
				menus[l] = n;
			});
		});
	}

	if (result.page?.isPostsPage && props.categories) {
		// Posts Page
		return <div>TEST</div>
	}
	if (result.page) {
		// Page
		return <PageSingle
			page={result.page}
			menus={menus}
			uri={props.uri}
		/>
	}
	else if (result.post) {
		// Post
		return <PostSingle
			post={result.post}
			menus={menus}
			uri={props.uri}
		/>
	}
	else if (result) {
		// Posts Category
		return <div>TEST</div>
	}
	else {
		// Error
		// return <ErrorPage statusCode={404} />
		return <div>TEST</div>
	}

	/*
	if (props.posts && props.categories) {
		const seo = result.pageBy.seo;

		let seoBlock = null
		if (seo) {
			const uri = props.uri[props.uri.length - 1] === "/" ? props.uri.slice(0, -1) : props.uri;
			seoBlock = generateGroupBasic({
				title: seo.title,
				description: seo.metaDesc,
				locale: "de-AT",
			});
		}

		return (
			<div className={""}>
				<Head>
					<link rel="icon" href="/favicon.ico" />
					{seoBlock}
				</Head>
				<main className={""}>
					<Header menu={menus["MAIN_MENU"]} uri={props.uri} />
					<PostCategoryPage
						category={{
							name: result.pageBy.title,
							posts: props.posts,
							seo
						}}
						categories={props.categories}
						uri={props.uri}
					/>
					<Footer
						menu1={menus["FOOTER_MENU_1"]}
						menu2={menus["FOOTER_MENU_2"]}
						menu3={menus["FOOTER_MENU_3"]}
						menu4={menus["FOOTER_MENU_4"]}
						bottomLine={menus["FOOTER_MENU_BOTTOM"]}
					/>
				</main>
			</div>
		)
	}
	if (!!result?.pageBy && result?.pageBy?.contentType?.node?.hierarchical) {
		// is Page
		const seo = result.pageBy.seo;

		let content = null;
		switch (result.pageBy.template.templateName) {
			default:
				content = <ContentPage menus={menus} pageBy={result.pageBy} uri={props.uri} />
		}

		let seoBlock = null
		if (seo) {
			const uri = props.uri[props.uri.length - 1] === "/" ? props.uri.slice(0, -1) : props.uri;
			seoBlock = generateGroupBasic({
				title: seo.title,
				description: seo.metaDesc,
				locale: "de-AT",
			});
		}

		return (
			<div className={""}>
				<Head>
					<link rel="icon" href="/favicon.ico" />
					{seoBlock}
				</Head>
				<main className={""}>
					{content}
					<Footer
						menu1={menus["FOOTER_MENU_1"]}
						menu2={menus["FOOTER_MENU_2"]}
						menu3={menus["FOOTER_MENU_3"]}
						menu4={menus["FOOTER_MENU_4"]}
						bottomLine={menus["FOOTER_MENU_BOTTOM"]}
					/>
				</main>
			</div>
		)
	}
	else if (result?.postBy) {
		// is Beitrag
		const seo = result.postBy.seo;
		let seoBlocks = [];
		if (seo) {
			const uri = props.uri[props.uri.length - 1] === "/" ? props.uri.slice(0, -1) : props.uri;
			seoBlocks.push(generateGroupBasic({
				title: seo.title,
				description: seo.metaDesc,
				locale: "de-AT",
			}));
			seoBlocks.push(generateStructuredDataArticle({
				headline: seo.title,
				image: [result.postBy.featuredImage?.node.sourceUrl],
			}));
		}

		return (
			<div className={""}>
				<Head>
					<link rel="icon" href="/favicon.ico" />
					{seoBlocks}
				</Head>
				<main className={""}>
					<PostSingle postBy={result.postBy} uri={props.uri} menus={menus} />
					<Footer
						menu1={menus["FOOTER_MENU_1"]}
						menu2={menus["FOOTER_MENU_2"]}
						menu3={menus["FOOTER_MENU_3"]}
						menu4={menus["FOOTER_MENU_4"]}
						bottomLine={menus["FOOTER_MENU_BOTTOM"]}
					/>
				</main>
			</div>
		)
	}
	else {
	}
	*/
}

export interface Query {
	page?: PageSingleQuery;
	post?: PostSingleQuery;
}

const query = `
query MyQuery($uri: ID!) {
	${baseQuery}
	${pageQuery}
	${postSingleQuery}
}
`;

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { path } = params;
	const uriString = typeof path === "string" ? path : path.join("/");
	const uri = `/${uriString}/`;

	const result = await fetchAPI<BaseQuery<Query>>(query, { uri });

	/*
if (result.page?.isPostsPage) {
	// blogpage
	const blogResult = await fetchAPI<PostPageQuery>(PostPageQuery);
	return {
		props: {
			...blogResult,
			result,
			uri
		},
		revalidate: 1
	}
}
else {
	*/
	// normal page or post
	return {
		props: {
			result,
			uri
		},
		revalidate: 1
	}
	// }

}

interface AllPagesAndPostQuery {
	pages: {
		nodes: {
			uri: string
		}[]
	}
	posts: {
		nodes: {
			uri: string
		}[]
	}
	categories: {
		nodes: {
			uri: string;
		}[]
	}
}

export const getStaticPaths: GetStaticPaths = async () => {
	const query = `
		query MyQuery {
			pages(first: 1000) {
				nodes {
					uri
				}
			}
			posts(first: 1000) {
				nodes {
					uri
				}
			}
		}
	`;
	const result = await fetchAPI<AllPagesAndPostQuery>(query);

	const pageUris = result.pages.nodes
		? result.pages.nodes
			.filter(e => e.uri !== "/")
			.map(e => {
				const raw = e.uri
				if (raw.length > 1) {
					return raw.substring(0, e.uri.length - 1);
				}
				else {
					return raw;
				}
			})
		: [];

	const postUris = result.posts.nodes
		? result.posts.nodes.map(e => e.uri)
		: [];

	return {
		paths: [
			...pageUris,
			...postUris,
		],
		fallback: true
	}
}
