import { PathType } from "../path/path.resource";

export interface WordpressPost {
    pathType: PathType.Post;
    id: string;
    title: string;
    uri: string;
}