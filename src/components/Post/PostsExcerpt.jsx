/* eslint-disable react/prop-types */
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { Link } from "react-router-dom";

import styles from "../Post/Post.module.css";

function PostsExcerpt({ post }) {
  return (
    <article className={styles.postdiv}>
      <h3>{post.title}</h3>
      <p>{post.body.substring(0, 75)}</p>

      {/* Link allows to write post id into the url */}
      <div className={styles["back-kit"]}>
        <Link to={`post/${post.id}`}>View Post</Link>
        <PostAuthor userId={post.userId}></PostAuthor>
        <TimeAgo timestamp={post.date}></TimeAgo>
      </div>
      <ReactionButtons post={post}></ReactionButtons>
    </article>
  );
}

export default PostsExcerpt;
