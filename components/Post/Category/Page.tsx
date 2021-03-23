import React from "react";
import { MenuMap } from "../../../common/types/Menu";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
import { PostCategoryQuery } from "./Query";

interface PostCategoryProps {
    menus: MenuMap;
    uri: string;
    category: PostCategoryQuery;
}

const PostCategoryPage: React.FC<PostCategoryProps> = ({
    menus,
    uri,
    category
}) => {
    return <>
        <Header menu={menus["MAIN_MENU"]} uri={uri} />
        <section>
            <h1>Category: {category.name}</h1>

            <h2>Posts</h2>
            {category?.posts?.nodes.length > 0
                ? <ul>{category.posts.nodes.map(p => {
                    return <li key={`category-link-${p.uri}`}><a href={p.uri}>{p.title}</a></li>
                })}</ul>
                : <div>No posts found</div>
            }
        </section>
        <Footer
            menu1={menus["FOOTER_MENU_1"]}
            menu2={menus["FOOTER_MENU_2"]}
            menu3={menus["FOOTER_MENU_3"]}
            menu4={menus["FOOTER_MENU_4"]}
        />
    </>
}

export default PostCategoryPage;
