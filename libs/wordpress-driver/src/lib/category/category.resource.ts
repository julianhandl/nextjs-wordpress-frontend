export interface CategoryResponseObject {}

export const buildCategoryQueryObject = (id: number) => ({
    category: {},
});

interface GetCategoryResponse {
    pages: {
        nodes: {
            id: string;
            title: string;
            uri: string;
        }[];
    };
}
