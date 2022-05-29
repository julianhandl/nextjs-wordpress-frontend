export enum PathType {
    'Page' = 'Page',
    'Post' = 'Post',
    'Category' = 'Category',
}

export const generateUriTypeQuery = (uri: string) => ({
    query: {
        nodeByUri: {
            __args: {
                uri,
            },
            __on: [
                {
                    __typeName: 'Page',
                    pageId: true,
                },
                {
                    __typeName: 'Post',
                    postId: true,
                },
                {
                    __typeName: 'Category',
                    categoryId: true,
                },
            ],
        },
    },
});

export interface GetUriTypeResponse {
    nodeByUri: {
        pageId?: number;
        postId?: number;
        categoryId?: number;
    };
}

export const allPathsQuery = {
    query: {
        pages: {
            __args: {
                first: 1000,
            },
            nodes: {
                uri: true,
            },
        },
        posts: {
            __args: {
                first: 1000,
            },
            nodes: {
                uri: true,
            },
        },
        categories: {
            __args: {
                first: 1000,
            },
            nodes: {
                uri: true,
            },
        },
    },
};

export interface AllPathsResponse {
    pages: {
        nodes: {
            uri: string;
        }[];
    };
    posts: {
        nodes: {
            uri: string;
        }[];
    };
    categories: {
        nodes: {
            uri: string;
        }[];
    };
}
