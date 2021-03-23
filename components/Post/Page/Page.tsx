import React from "react";
import { PostPageQuery } from "./Query";
import { MenuMap } from "../../../common/types/Menu";
import Header from "../../Header/Header";
import { PageSingleQuery } from "../../Page/Single";
import Footer from "../../Footer/Footer";

interface PostsPageProps extends PostPageQuery {
    page: PageSingleQuery;
    menus: MenuMap;
    uri: string;
}

const PostsPage: React.FC<PostsPageProps> = ({
    page,
    posts,
    categories,
    menus,
    uri
}) => {
    return <>
        <Header menu={menus["MAIN_MENU"]} uri={uri} />
        <section>
            <h1>{page.title}</h1>

            <h2>Categories</h2>
            {categories?.nodes.length > 0
                ? <ul>{categories.nodes.map(c => {
                    return <li key={`category-link-${c.uri}`}><a href={c.uri}>{c.name}</a></li>
                })}</ul>
                : <div>No categories found</div>
            }

            <h2>Posts</h2>
            {posts?.nodes.length > 0
                ? <ul>{posts.nodes.map(p => {
                    return <li key={`post-link-${p.uri}`}><a href={p.uri}>{p.title}</a></li>
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

export default PostsPage;
