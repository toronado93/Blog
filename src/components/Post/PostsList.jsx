import { useSelector } from "react-redux";
import { selectAllPosts } from "../../slices/postsSlice";
import styles from "../Post/Post.module.css";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

function PostsList() {
  const posts = useSelector(selectAllPosts);

  // Nice filter option , lift up to lastest entry
  const orderedList = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  const renderedPosts = orderedList.map((post) => (
    <article className={styles.postdiv} key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content.substring(0, 100)}</p>
      <PostAuthor userId={post.userId}></PostAuthor>
      <TimeAgo timestamp={post.date}></TimeAgo>
      <ReactionButtons post={post}></ReactionButtons>
    </article>
  ));

  return (
    <section>
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  );
}

export default PostsList;
