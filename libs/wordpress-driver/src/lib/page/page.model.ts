import { PathType } from "../path/path.resource";

export interface WordpressPage {
    pathType: PathType.Page;
    id: string;
    title: string;
    uri: string;
    isFrontPage: boolean;
    isPostsPage: boolean;
}