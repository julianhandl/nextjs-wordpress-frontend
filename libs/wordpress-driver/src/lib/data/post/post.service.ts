import { WordpressPost } from '../../model/post.model';
import { PathType } from '../path/path.enum';
import { WordpressResource } from '../wordpress.resource';

export class WordpressPostService {
    constructor(private resource: WordpressResource) {}

    public getPost = async (id: number): Promise<WordpressPost | undefined> => {
        const getPostQuery = `
            query MyQuery {
                posts(where: {id: ${id}}) {
                    nodes {
                        id
                        title(format: RENDERED)
                        uri
                    }
                }
            }
        `;

        interface GetPostResponse {
            pages: {
                nodes: {
                    id: string;
                    title: string;
                    uri: string;
                }[];
            };
        }

        const result = await this.resource.get<GetPostResponse>(getPostQuery);

        if(result.pages.nodes.length > 0) {

            const page = result.pages.nodes[0];
            return {
                pathType: PathType.Post,
                id: page.id,
                title: page.title,
                uri: page.uri
            }

        } else {
            return undefined;
        }
    };
}
