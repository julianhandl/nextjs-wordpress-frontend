import React from "react";
import { PostPageQuery } from "./Query";
import { MenuMap } from "../../../common/types/Menu";
import Header from "../../DesignSystem/Header/Header";
import { PageSingleQuery } from "../../Page/Single";
import Footer from "../../DesignSystem/Footer/Footer";
import Link from "next/link";

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
                    return <li key={`category-link-${c.uri}`}>
                        <Link href={c.uri}>
                            <a>{c.name}</a>
                        </Link>
                    </li>
                })}</ul>
                : <div>No categories found</div>
            }

            <h2>Posts</h2>
            {posts?.nodes.length > 0
                ? <ul>{posts.nodes.map(p => {
                    return <li key={`post-link-${p.uri}`}>
                        <Link href={p.uri}>
                            <a>{p.title}</a>
                        </Link>
                    </li>
                })}</ul>
                : <div>No posts found</div>
            }
        </section>
        <Footer />
    </>
}

export default PostsPage;
