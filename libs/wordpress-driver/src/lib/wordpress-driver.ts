import { jsonToGraphQLQuery } from 'json-to-graphql-query';
import { generateWordpressPage, WordpressPage } from './page/page.model';
import { buildPageQueryObject, PageResponseObject } from './page/page.resource';
import { generatePathObject, PathObject, PathObjectData } from './path/path.model';
import {
    allPathsQuery,
    AllPathsResponse,
    generateUriTypeQuery,
    GetUriTypeResponse,
    PathType,
} from './path/path.resource';
import { generateWordpressPost, WordpressPost } from './post/post.model';
import { buildPostQueryObject, PostResponseObject } from './post/post.resource';
import { WordpressResource } from './wordpress.resource';

export class WordpressDriver {
    private wordpressResource: WordpressResource;

    constructor(private wpurl: string) {
        this.wordpressResource = new WordpressResource(this.wpurl);
    }

    /**
     * Get all paths (permalinks) of your wordpress instance.
     * This includes: Pages, Posts, Categories
     */
    public getAllPaths = async (): Promise<string[]> => {
        const result = await this.wordpressResource.get<AllPathsResponse>(
            jsonToGraphQLQuery(allPathsQuery)
        );

        const pageUris = result.pages.nodes
            ? result.pages.nodes
                  .filter(e => e.uri !== '/')
                  .map(e => {
                      const raw = e.uri;
                      if (raw.length > 1) {
                          return raw.substring(0, e.uri.length - 1);
                      } else {
                          return raw;
                      }
                  })
            : [];

        const postUris = result.posts.nodes ? result.posts.nodes.map(e => e.uri) : [];
        const categoryUris = result.categories.nodes ? result.categories.nodes.map(e => e.uri) : [];

        return [...pageUris, ...postUris, ...categoryUris];
    };

    /**
     * Get the type of the given uri. Will return and id and the type (page, post, ...)
     */
    private getPathType = async (
        uri: string
    ): Promise<{ id: number; type: PathType | undefined }> => {
        const getUriTypeResult = await this.wordpressResource.get<GetUriTypeResponse>(
            jsonToGraphQLQuery(generateUriTypeQuery(uri))
        );

        if (getUriTypeResult.nodeByUri.pageId) {
            return {
                id: getUriTypeResult.nodeByUri.pageId,
                type: PathType.Page,
            };
        } else if (getUriTypeResult.nodeByUri.postId) {
            return {
                id: getUriTypeResult.nodeByUri.postId,
                type: PathType.Post,
            };
        } else if (getUriTypeResult.nodeByUri.categoryId) {
            return {
                id: getUriTypeResult.nodeByUri.categoryId,
                type: PathType.Category,
            };
        } else {
            return {
                id: -1,
                type: undefined,
            };
        }
    };

    async getPath(path: string): Promise<PathObject<PathObjectData> | undefined> {
        const pathTypeResult = await this.getPathType(path);

        if (pathTypeResult.id >= 0) {
            switch (pathTypeResult.type) {
                case PathType.Page: {
                    const pageQuery = buildPageQueryObject(pathTypeResult.id);
                    const result = await this.wordpressResource.get<PageResponseObject>(
                        jsonToGraphQLQuery({
                            query: {
                                ...pageQuery,
                            }
                        })
                    );

                    const page = generateWordpressPage(result);
                    const pathObject = generatePathObject(
                        page
                    );

                    return pathObject;
                }
                case PathType.Post: {
                    const postQuery = buildPostQueryObject(pathTypeResult.id);
                    const result = await this.wordpressResource.get<PostResponseObject>(
                        jsonToGraphQLQuery({
                            query: {
                                ...postQuery,
                            }
                        })
                    );

                    const post = generateWordpressPost(result);
                    const pathObject = generatePathObject(
                        post
                    )

                    return pathObject;
                }
                /*
                case PathType.Category: {
                    return await this.categoryService.getCategory(pathTypeResult.id);
                }
                */
                default:
                    return undefined;
            }
        } else {
            return undefined;
        }
    }
}
