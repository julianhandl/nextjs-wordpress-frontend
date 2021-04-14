import React from "react";
import styles from "./Content.module.scss";

interface Props {
    content: string;
}

const WordpressContent: React.FC<Props> = ({
    content
}) => {
    if(content) {
        return <div className={styles.content} dangerouslySetInnerHTML={{__html: content}}></div>
    }
    else {
        return null;
    }
}

export default WordpressContent;
