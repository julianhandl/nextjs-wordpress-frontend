import { PathType } from "../path/path.resource";
import { PostResponseObject } from "./post.resource";

export interface WordpressPost {
    pathType: PathType.Post;
    id: string;
    title: string;
    uri: string;
}

export const generateWordpressPost = (result: PostResponseObject): WordpressPost => {
    const post = result.posts.nodes[0];
    return {
        pathType: PathType.Post,
        id: post.id,
        title: post.title,
        uri: post.uri
    }
}
