import { WordpressPage } from '../../model/page.model';
import { PathType } from '../path/path.enum';
import { WordpressResource } from '../wordpress.resource';

export class WordpressPageService {
    constructor(private resource: WordpressResource) {}

    public getPage = async (id: number): Promise<WordpressPage | undefined> => {
        const getPageQuery = `
            query MyQuery {
                pages(where: {id: ${id}}) {
                    nodes {
                        id
                        title(format: RENDERED)
                        isFrontPage
                        isPostsPage
                        uri
                    }
                }
            }
        `;

        interface GetPageResponse {
            pages: {
                nodes: {
                    id: string;
                    title: string;
                    isFrontPage: boolean;
                    isPostsPage: boolean;
                    uri: string;
                }[];
            };
        }

        const result = await this.resource.get<GetPageResponse>(getPageQuery);

        if(result.pages.nodes.length > 0) {

            const page = result.pages.nodes[0];
            return {
                pathType: PathType.Page,
                id: page.id,
                title: page.title,
                isFrontPage: page.isFrontPage,
                isPostsPage: page.isPostsPage,
                uri: page.uri
            }

        } else {
            return undefined;
        }
    };
}
