import React from "react";
import { GetStaticProps, GetStaticPaths } from 'next'
import ErrorPage from 'next/error';
import { fetchAPI, BaseQuery, baseQuery } from '../common/fetchAPI'
import PostSingle, { PostSingleQuery } from '../components/Post/Single';
import { pageQuery } from '../components/Page/Query';
import { MenuMap } from '../common/types/Menu';
import PageSingle, { PageSingleQuery } from "../components/Page/Single";
import { postCategoryQuery, PostCategoryQuery } from "../components/Post/Category/Query";
import { PostPageQuery, postPageQuery, PostPageCategoryList } from "../components/Post/Page/Query";
import PostsPage from "../components/Post/Page/Page";
import PostCategoryPage from "../components/Post/Category/Page";
import { PostsQuery, postSingleQuery } from "../components/Post/Query";


interface Props {
	result?: BaseQuery<Query>;
	uri: string;
	posts?: PostsQuery;
	categories?: PostPageCategoryList;
}

export default function Page(props: Props) {
	if (!props.result) {
		return <ErrorPage statusCode={404} />
	}

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
		return <PostsPage
			page={result.page}
			posts={props.posts}
			categories={props.categories}
			uri={props.uri}
			menus={menus}
		/>
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
	else if (result.category) {
		// Posts Category
		return <PostCategoryPage
			menus={menus}
			uri={props.uri}
			category={result.category}
		/>
	}
	else {
		// Error
		return <ErrorPage statusCode={404} />
	}
}

export interface Query {
	page?: PageSingleQuery;
	post?: PostSingleQuery;
	category?: PostCategoryQuery;
}

const query = `
query MyQuery($uri: ID!) {
	${baseQuery}
	${pageQuery}
	${postSingleQuery}
}
`;

const categoryQuery = `
query MyQuery($uri: ID!) {
	${baseQuery}
	${postCategoryQuery}
}
`;

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { path } = params;
	const uriString = typeof path === "string" ? path : path.join("/");
	const uri = `/${uriString}/`;

	let result = null;

	try {
		// try to catch normal page or post
		result = await fetchAPI<BaseQuery<Query>>(query, { uri });
	}
	catch (err) {
		// catch category
		result = await fetchAPI<BaseQuery<Query>>(categoryQuery, { uri });;
	}

	if (result.page?.isPostsPage) {
		// blogpage
		const blogResult = await fetchAPI<PostPageQuery>(postPageQuery);
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
		// normal page or post
		return {
			props: {
				result,
				uri
			},
			revalidate: 1
		}
	}

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
			categories(first: 1000) {
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

	const categoryUris = result.categories.nodes
		? result.categories.nodes.map(e => e.uri)
		: [];

	return {
		paths: [
			...pageUris,
			...postUris,
			...categoryUris,
		],
		fallback: true
	}
}
