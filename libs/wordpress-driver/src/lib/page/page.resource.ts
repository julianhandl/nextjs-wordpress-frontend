import { EnumType } from "json-to-graphql-query";

export interface PageResponseObject {
    pages: {
        nodes: {
            id: string;
            title: string;
            isFrontPage: boolean;
            isPostsPage: boolean;
            uri: string;
        }[];
    };
}

export const buildPageQueryObject = (id: number) => ({
    pages: {
        __args: {
            where: {
                id,
            },
        },
        nodes: {
            id: true,
            title: {
                __args: {
                    format: new EnumType('RENDERED')
                },
            },
            isFrontPage: true,
            isPostsPage: true,
            uri: true,
        },
    },
});
