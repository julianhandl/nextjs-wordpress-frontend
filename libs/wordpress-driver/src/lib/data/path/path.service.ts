import {jsonToGraphQLQuery} from 'json-to-graphql-query';
import { WordpressCategory } from '../../model/category.model';
import { WordpressPage } from '../../model/page.model';
import { WordpressPost } from '../../model/post.model';
import { WordpressCategoryService } from '../category/category.service';
import { WordpressPageService } from '../page/page.service';
import { WordpressPostService } from '../post/post.service';
import { WordpressResource } from '../wordpress.resource';
import { PathType } from './path.enum';

export class WordpressPathService {
    private resource: WordpressResource;
    private pageService: WordpressPageService;
    private postService: WordpressPostService;
    private categoryService: WordpressCategoryService;

    constructor(apiUrl: string) {
        this.resource = new WordpressResource(apiUrl);
        this.pageService = new WordpressPageService(this.resource);
        this.postService = new WordpressPostService(this.resource);
        this.categoryService = new WordpressCategoryService(this.resource);
    }

    /**
     * Get all paths (permalinks) of your wordpress instance.
     * This includes: Pages, Posts, Categories
     */
    public getAllPaths = async (): Promise<string[]> => {
        const allPathQuery = {
            query: {
                pages: {
                    __args: {
                        first: 1000
                    },
                    nodes: {
                        uri: true
                    }
                },
                posts: {
                    __args: {
                        first: 1000
                    },
                    nodes: {
                        uri: true
                    }
                },
                categories: {
                    __args: {
                        first: 1000
                    },
                    nodes: {
                        uri: true
                    }
                }
            }
        }

        interface AllPathsResponse {
            pages: {
                nodes: {
                    uri: string;
                }[];
            };
            posts: {
                nodes: {
                    uri: string;
                }[];
            };
            categories: {
                nodes: {
                    uri: string;
                }[];
            };
        }

        const result = await this.resource.get<AllPathsResponse>(jsonToGraphQLQuery(allPathQuery));

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

        const postUris = result.posts.nodes
            ? result.posts.nodes.map(e => e.uri)
            : [];

        const categoryUris = result.categories.nodes
            ? result.categories.nodes.map(e => e.uri)
            : [];

        return [...pageUris, ...postUris, ...categoryUris];
    };

    public getPathObject = async (
        uri: string
    ): Promise<
        WordpressPage | WordpressPost | WordpressCategory | undefined
    > => {
        const pathTypeResult = await this.getPathType(uri);

        switch (pathTypeResult.type) {
            case PathType.Page:
                return await this.pageService.getPage(pathTypeResult.id);
            case PathType.Post:
                return await this.postService.getPost(pathTypeResult.id);
            case PathType.Category:
                return await this.categoryService.getCategory(pathTypeResult.id);
            default:
                return undefined;
        }
    };

    private getPathType = async (
        uri: string
    ): Promise<{ id: number; type: PathType | undefined }> => {
        const getUriTypeQuery = {
            query: {
                nodeByUri: {
                    __args: {
                        uri
                    },
                    __on: [{
                        __typeName: 'Page',
                        pageId: true
                    },
                    {
                        __typeName: 'Post',
                        postId: true
                    },
                    {
                        __typeName: 'Category',
                        categoryId: true
                    }]
                }
            }
        }

        interface GetUriTypeResponse {
            nodeByUri: {
                pageId?: number;
                postId?: number;
                categoryId?: number;
            };
        }

        const getUriTypeResult = await this.resource.get<GetUriTypeResponse>(
            jsonToGraphQLQuery(getUriTypeQuery)
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
}
