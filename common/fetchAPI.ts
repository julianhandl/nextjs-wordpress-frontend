import { MenuNode } from "./types/Menu";

const API_URL = process.env.WP_URL;


export type BaseQuery<T extends {}> = T & {
    generalSettings: {
        description: string;
        language: string;
        title: string;
        url: string;
    }
    menus?: {
        nodes: MenuNode[]
    }
}

export const baseQuery = `
generalSettings {
    description
    language
    title
    url
}
menus {
    nodes {
        slug
        menuItems {
            nodes {
                label
                path
            }
        }
        locations
        name
    }
}`;

export async function fetchAPI<T>(query: string, variables: any = {}): Promise<T> {
    const headers = { 'Content-Type': 'application/json' };
    const res = await fetch(`${API_URL}/graphql/`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ query, variables })
    });

    // error handling work
    const json = await res.json();
    if (json.errors) {
        throw new Error(JSON.stringify(json.errors));
    }
    return json.data;
}
