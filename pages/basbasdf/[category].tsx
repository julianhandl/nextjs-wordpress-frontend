import React from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { fetchAPI, BaseQuery, baseQuery, MenuNode } from "../../driver/fetchAPI";
import { SEOBlock } from "../[...path]";
import ErrorPage from 'next/error';
import Head from "next/head";
import PostCategoryPage from "../../components/Post/Category/Page";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { generateGroupBasic, generateStructuredDataArticle } from "react-seo-aio";

export interface CategoryNodeByUri {
	name: string;
	posts: {
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
	seo: SEOBlock;
}

export interface Query {
	nodeByUri?: CategoryNodeByUri;
	categories: {
		nodes: {
			name: string;
			uri: string;
		}[]
	}
}

const query = `
query MyQuery($uri: String!) {
	${baseQuery}
	nodeByUri(uri: $uri) {
		... on Category {
			name
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
			seo {
				title
				canonical
				metaDesc
				opengraphTitle
				opengraphType
				opengraphDescription
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
`;

interface Props {
	result: BaseQuery<Query>;
	uri: string;
}

export default function KategoryPage(props: Props) {
	const result = props.result;

	const menus: { [key: string]: MenuNode } = {};
	if (result?.menus?.nodes) {
		result.menus.nodes.forEach(n => {
			n.locations.forEach(l => {
				menus[l] = n;
			});
		});
	}

	if (result?.nodeByUri?.name) {
		// is Category
		const seo = result.nodeByUri.seo;

		let seoBlocks = [];
		if (seo) {
			const uri = props.uri[props.uri.length - 1] === "/" ? props.uri.slice(0, -1) : props.uri;
			seoBlocks.push(generateGroupBasic({
				type: "article",
				title: seo.title,
				description: seo.metaDesc,
				locale: "de-AT",
				url: ``
			}));
		}

		return (
			<div className={""}>
				<Head>
					<link rel="icon" href="/favicon.ico" />
					{seoBlocks}
				</Head>
				<main className={""}>
					<Header menu={menus["MAIN_MENU"]} uri={props.uri} />
					<PostCategoryPage
						category={props.result.nodeByUri}
						categories={props.result.categories}
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
	else {
		return <ErrorPage statusCode={404} />
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { category } = params;
	const uri = `/kategorie/${category}/`;

	const result = await fetchAPI(query, { uri });

	return {
		props: {
			result,
			uri
		},
		revalidate: 1
	}
}

export const getStaticPaths: GetStaticPaths = async () => {
	const query = `
		query MyQuery {
			categories {
				nodes {
					uri
				}
			}
		}
	`;
	const result = await fetchAPI<{ categories: { nodes: { uri: string; }[] } }>(query);

	const categoryUris = result.categories.nodes
		? result.categories.nodes.map(n => n.uri)
		: [];

	return {
		paths: categoryUris,
		fallback: true
	}
}
