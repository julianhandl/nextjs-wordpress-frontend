import { PathType } from "../path/path.resource";
import { PageResponseObject } from "./page.resource";

export interface WordpressPage {
    pathType: PathType.Page;
    id: string;
    title: string;
    uri: string;
    isFrontPage: boolean;
    isPostsPage: boolean;
}

export const generateWordpressPage = (result: PageResponseObject): WordpressPage => {
    const page = result.pages.nodes[0];

    return {
        pathType: PathType.Page,
        id: page.id,
        title: page.title,
        uri: page.uri,
        isFrontPage: page.isFrontPage,
        isPostsPage: page.isPostsPage,
    }
};
