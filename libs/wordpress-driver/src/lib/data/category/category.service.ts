import { WordpressCategory } from '../../model/category.model';
import { PathType } from '../path/path.enum';
import { WordpressResource } from '../wordpress.resource';

export class WordpressCategoryService {
    constructor(private resource: WordpressResource) {}

    public getCategory = async (id: number): Promise<WordpressCategory | undefined> => {
        const getCategoryQuery = `
            query MyQuery {
                category(where: {id: ${id}}) {
                    nodes {
                        id
                        title(format: RENDERED)
                        uri
                    }
                }
            }
        `;

        interface GetCategoryResponse {
            pages: {
                nodes: {
                    id: string;
                    title: string;
                    uri: string;
                }[];
            };
        }

        const result = await this.resource.get<GetCategoryResponse>(getCategoryQuery);

        if(result.pages.nodes.length > 0) {

            const page = result.pages.nodes[0];
            return {
                pathType: PathType.Category,
                id: page.id,
                title: page.title,
                uri: page.uri
            }

        } else {
            return undefined;
        }
    };
}
