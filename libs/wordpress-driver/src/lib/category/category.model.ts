import { PathType } from "../path/path.resource";

export interface WordpressCategory {
    pathType: PathType.Category;
    id: string;
    title: string;
    uri: string;
}