import Head from 'next/head'
import { GetStaticProps } from 'next'
import {
	generateGroupBasic
} from "react-seo-aio";
import Footer from '../components/Footer/Footer';
import { Query } from './[...path]';

/*

const query = `
query MyQuery($uri: String) {
	${baseQuery}
	pageBy(uri: $uri) {
		title,
		seo {
			title
			canonical
			metaDesc
			opengraphTitle
			opengraphType
			opengraphDescription
		}
		${IntroQuery}
		${LandingPageQuery}
	}
}
`;

interface Props {
	result: BaseQuery<Query>;
	uri: string;
}

export default function Home(props: Props) {
	const result = props.result;

	const menus: { [key: string]: MenuNode } = {};

	if (result?.menus?.nodes) {
		result.menus.nodes.forEach(n => {
			n.locations.forEach(l => {
				menus[l] = n;
			});
		});
	}

	const seo = result?.pageBy.seo;
	let seoBlocks = [];
	if (seo) {
		seoBlocks.push(generateGroupBasic({
			title: seo.title,
			description: seo.metaDesc,
			locale: "de-AT",
		}));
	}

	return (
		<div className={""}>
			<Head>
				<link rel="icon" href="/favicon.ico" />
				{seoBlocks}
			</Head>
			<main className={""}>
				<LandingPage menus={menus} pageBy={result.pageBy} uri={props.uri} />
				<Footer
					menu1={menus["FOOTER_MENU_1"]}
					menu2={menus["FOOTER_MENU_2"]}
					menu3={menus["FOOTER_MENU_3"]}
					menu4={menus["FOOTER_MENU_4"]}
					bottomLine={menus["FOOTER_MENU_BOTTOM"]}
				/>
			</main>
		</div>
	)
}

export const getStaticProps: GetStaticProps = async (context) => {
	const result = await fetchAPI(query, { uri: "/" });

	return {
		props: {
			result,
			uri: "/"
		}
	}
}
*/

export default function Home() {
	return <div>INDEX</div>
}
