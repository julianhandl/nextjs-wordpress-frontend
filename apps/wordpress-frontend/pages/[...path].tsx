import { WordpressPathService } from "@nwf/wordpress-driver";
import { GetStaticPaths, GetStaticProps } from "next";

export interface DynamicPathProps {
    data: any;
}

export const renderPage = (props: DynamicPathProps) => {
    return <div>
        <h1>Page</h1>
        <pre>{JSON.stringify(props)}</pre>
    </div>
};

export default renderPage;

export const getStaticProps: GetStaticProps<DynamicPathProps> = async ({params}) => {
	const path = params?.path || "";
	const uriString = typeof path === "string" ? path : path.join("/");
	const uri = `/${uriString}/`;

    const service = new WordpressPathService(process.env.WP_URL);
    const data = await service.getPathObject(uri)

    return {
        props: {
            data
        },
        revalidate: 1
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const service = new WordpressPathService(process.env.WP_URL);
    const allPaths = await service.getAllPaths();

	return {
		paths: allPaths,
		fallback: true
	}
}