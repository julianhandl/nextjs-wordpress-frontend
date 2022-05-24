export class WordpressResource {
    constructor(private apiUrl: string) {}

    public get = async <T>(
        query: string,
        variables: any = {}
    ): Promise<T> => {
        const headers = { 'Content-Type': 'application/json' };
        const res = await fetch(`${this.apiUrl}/graphql/`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ query, variables }),
        });

        // error handling work
        const json = await res.json();
        if (json.errors) {
            throw new Error(JSON.stringify(json.errors));
        }
        return json.data;
    };
}
