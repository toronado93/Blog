/* eslint-disable react/prop-types */
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

import styles from "../Post/Post.module.css";

function PostsExcerpt({ post }) {
  return (
    <>
      <article className={styles.postdiv}>
        <h3>{post.title}</h3>
        <p>{post.body.substring(0, 100)}</p>

        <PostAuthor userId={post.userId}></PostAuthor>
        <TimeAgo timestamp={post.date}></TimeAgo>
        <ReactionButtons post={post}></ReactionButtons>
      </article>
    </>
  );
}

export default PostsExcerpt;
