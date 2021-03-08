import { fetchAPI } from "../../common/fetchAPI";
const DOMAIN = process.env.DOMAIN;

interface AllPagesAndPostQuery {
    pages: {
        nodes: {
            uri: string
        }[]
    }
    posts: {
        nodes: {
            uri: string
        }[]
    }
    categories: {
        nodes: {
            uri: string;
        }[]
    }
}

export default async (req, res) => {
    const query = `
		query MyQuery {
			pages(first: 1000) {
				nodes {
					uri
				}
			}
			posts(first: 1000) {
				nodes {
					uri
				}
			}
			categories(first: 1000) {
				nodes {
					uri
				}
			}
		}
	`;
    const result = await fetchAPI<AllPagesAndPostQuery>(query);

    const pageUris = result.pages.nodes
        ? result.pages.nodes
            .filter(e => e.uri !== "/")
            .map(e => {
                const raw = e.uri
                if (raw.length > 1) {
                    return raw.substring(0, e.uri.length - 1);
                }
                else {
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

    const urls = [
        "/",
        ...pageUris,
        ...postUris,
        ...categoryUris,
    ];

    const urlSet = urls
        .map((url) => {
            return `<url><loc>${DOMAIN}${url}</loc></url>`;
        })
        .join('');

    // Add urlSet to entire sitemap string
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlSet}</urlset>`;

    // set response content header to xml
    res.setHeader('Content-Type', 'text/xml');
    // write the sitemap
    res.write(sitemap);
    res.end();
};