import { PathType } from "../data/path/path.enum";

export interface WordpressCategory {
    pathType: PathType.Category;
    id: string;
    title: string;
    uri: string;
}