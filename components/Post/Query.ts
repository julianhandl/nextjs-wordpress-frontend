export interface PostsQuery {
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

export interface PostPageQuery {
    posts: PostsQuery;
    categories: {
        nodes: {
            name: string;
            uri: string;
        }[]
    }
}

export const PostPageQuery = `
query MyQuery {
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
    categories {
		nodes {
			name
			uri
		}
	}
}
`
