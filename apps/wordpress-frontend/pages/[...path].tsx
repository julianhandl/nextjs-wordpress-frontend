import { PathObject, PathObjectData, WordpressDriver } from "@nwf/wordpress-driver";
import { GetStaticPaths, GetStaticProps } from "next";

export interface DynamicPathProps {
    path: PathObject<PathObjectData>;
}

export const renderPage = (props: DynamicPathProps) => {
    console.log("page props", props);

    const pathObject = props.path.data;

    return <div>
        <h1>Page {pathObject.title}</h1>
    </div>
};

export default renderPage;

export const getStaticProps: GetStaticProps<DynamicPathProps> = async ({params}) => {
	const path = params?.path || "";
	const uriString = typeof path === "string" ? path : path.join("/");
	const uri = `/${uriString}${uriString ? '/' : ''}`;

    const driver = new WordpressDriver(process.env.WP_URL);
    const data = await driver.getPath(uri)

    return {
        props: {
            path: data
        },
        revalidate: 1
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const driver = new WordpressDriver(process.env.WP_URL);
    const allPaths = await driver.getAllPaths();

	return {
		paths: allPaths,
		fallback: true
	}
}