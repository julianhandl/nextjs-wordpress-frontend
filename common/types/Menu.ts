export interface MenuNode {
    slug: string;
    locations: string[];
    name: string;
    menuItems: {
        nodes: {
            label: string;
            path: string;
        }[]
    }
}

export interface MenuMap {
    [key: string]: MenuNode;
}
