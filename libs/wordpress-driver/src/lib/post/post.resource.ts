import { EnumType } from "json-to-graphql-query";

export interface PostResponseObject {
    posts: {
        nodes: {
            id: string;
            title: string;
            uri: string;
        }[];
    };
}

export const buildPostQueryObject = (id: number) => ({
    posts: {
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
            uri: true,
        },
    },
});
