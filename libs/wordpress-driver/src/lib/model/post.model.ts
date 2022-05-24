import { PathType } from "../data/path/path.enum";

export interface WordpressPost {
    pathType: PathType.Post;
    id: string;
    title: string;
    uri: string;
}