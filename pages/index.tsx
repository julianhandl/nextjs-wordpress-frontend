import React from "react";
import { GetStaticProps } from 'next'
import ErrorPage from 'next/error';
import { fetchAPI, BaseQuery, baseQuery } from '../common/fetchAPI'
import { PostSingleQuery } from '../components/Post/Single';
import { pageQuery } from '../components/Page/Query';
import { MenuMap } from '../common/types/Menu';
import PageSingle, { PageSingleQuery } from "../components/Page/Single";
import { PostCategoryQuery } from "../components/Post/Category/Query";
import { PostPageQuery, postPageQuery, PostPageCategoryList } from "../components/Post/Page/Query";
import PostsPage from "../components/Post/Page/Page";
import { PostsQuery, postSingleQuery } from "../components/Post/Query";


interface Props {
	result?: BaseQuery<Query>;
	uri: string;
	posts?: PostsQuery;
	categories?: PostPageCategoryList;
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

	if (result?.page?.isPostsPage && props.categories) {
		// Posts Page
		return <PostsPage
			page={result.page}
			posts={props.posts || {nodes: []}}
			categories={props.categories}
			uri={props.uri}
			menus={menus}
		/>
	}
	else if (result?.page) {
		// Page
		return <PageSingle
			page={result.page}
			menus={menus}
			uri={props.uri}
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const uri = "/";

	let result = await fetchAPI<BaseQuery<Query>>(query, { uri });;

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
