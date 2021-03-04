import React from "react";
import { MenuMap } from "../../../common/types/Menu";
import { CategoryNodeByUri } from "../../../pages/basbasdf/[category]";
import Header from "../../Header/Header";

interface Props {
    category: CategoryNodeByUri;
    uri: string;
    categories: {
        nodes: {
            name: string;
            uri: string;
        }[]
    }
}

interface PostCategoryProps {
    menus: MenuMap
    uri: string;
}

const PostCategoryPage: React.FC<PostCategoryProps> = ({
    menus,
	uri,
}) => {
    return <>
        <Header menu={menus["MAIN_MENU"]} uri={uri} />
        <section>
            CATEGORIE
        </section>
    </>
}

export default PostCategoryPage;
