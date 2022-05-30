import { WordpressPage } from "../page/page.model";
import { PageResponseObject } from "../page/page.resource";
import { WordpressPost } from "../post/post.model";
import { PostResponseObject } from "../post/post.resource";

export interface PathObject<T> {
    data: T;
    settings?: any;
    menu?: any;
}

export type PathObjectData =
    WordpressPage |
    WordpressPost

export const generatePathObject = <T>(
    data: T
): PathObject<T> => ({
    data,
});
