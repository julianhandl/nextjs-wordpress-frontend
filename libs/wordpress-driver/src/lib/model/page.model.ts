import { PathType } from "../data/path/path.enum";

export interface WordpressPage {
    pathType: PathType.Page;
    id: string;
    title: string;
    uri: string;
    isFrontPage: boolean;
    isPostsPage: boolean;
}