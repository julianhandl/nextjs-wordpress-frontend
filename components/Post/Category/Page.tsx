import React from "react";
import { CategoryNodeByUri } from "../../../pages/kategorie/[category]";
import styles from "./Page.module.scss";
import PostHeader from "../Header";
import Link from "next/link";
import Image from "next/image";

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

const PostCategoryPage: React.FC<Props> = ({
    category,
    categories,
    uri
}) => {
    const [firstArticle, ...otherArticles] = category.posts.nodes;

    return <div>
        <div className="container">
            <h1 className={styles.title}>Blog: {category.name}</h1>
            <div className={styles.header}>
                <Link href={firstArticle.uri}>
                    <a href={firstArticle.uri} className={styles.headerText}>
                        <PostHeader
                            title={firstArticle.title}
                            date={new Date(firstArticle.modified)}
                            categories={firstArticle.categories}
                            excerpt={firstArticle.excerpt}
                        />
                    </a>
                </Link>
                {firstArticle.featuredImage
                    ? <Link href={firstArticle.uri}>
                        <a href={firstArticle.uri} className={styles.headerImage}>
                            <Image
                                src={firstArticle.featuredImage.node.sourceUrl}
                                height={firstArticle.featuredImage.node.mediaDetails.height}
                                width={firstArticle.featuredImage.node.mediaDetails.width}
                                priority={true}
                                sizes={`(max-width: 480px) 750px, (max-width: 1024px) 750px, (min-width: 1024px) 1200px`}
                            /></a>
                    </Link>
                    : null
                }
            </div>

            <h2 className={styles.categoriesLabel}>Blog Kategorien</h2>
            <div className={styles.categories}>
                <Link href={"/blog"}>
                    <a href={"/blog"} className={`${styles.category} ${uri === "/blog/" ? styles.categoryActive : ""}`}>Alle</a>
                </Link>
                {categories.nodes.map(c => {
                    const classes = [styles.category];
                    if (c.uri === uri) classes.push(styles.categoryActive);
                    return <Link key={`category-link-${c.uri}`} href={c.uri}>
                        <a href={c.uri} className={classes.join(" ")}>{c.name}</a>
                    </Link>
                })}
            </div>

            <div className={styles.posts}>
                {otherArticles && otherArticles.length > 0
                    ? otherArticles.map(post => {
                        return <Link href={post.uri} key={`post-item-${post.uri}`}>
                            <a href={post.uri} className={styles.post}>
                                <div className={styles.postImage} style={{ backgroundImage: `url(${post.featuredImage.node.sourceUrl})` }}></div>
                                <div className={styles.postContent}>
                                    <PostHeader
                                        titleLevel="h2"
                                        date={new Date(post.modified)}
                                        title={post.title}
                                        excerpt={post.excerpt}
                                        categories={post.categories}
                                    />
                                </div>
                            </a>
                        </Link>
                    })
                    : <div className={styles.empty}>Aktuell haben wir keine weiteren Artikel zu diesem Thema</div>
                }
            </div>

        </div>
    </div>
}

export default PostCategoryPage;
