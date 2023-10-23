/* eslint-disable react/no-unescaped-entities */
import { useSelector } from "react-redux";

import {
  selectAllPosts,
  getPostStatus,
  getPostsError,
} from "../../slices/postsSlice";
import PostsExcerpt from "./PostsExcerpt";

import styles from "../Post/Post.module.css";

function PostsList() {
  // const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector(getPostStatus);
  const error = useSelector(getPostsError);

  // Trigger Async function

  // useEffect(() => {
  //   if (postStatus === "idle") {
  //     dispatch(fetchPosts());
  //   }
  // }, [postStatus, dispatch]);

  let content;
  if (postStatus === "loading") {
    content = <p>"Loading..."</p>;
  } else if (postStatus === "succeeded") {
    // Nice filter option , lift up to lastest entry
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map((post) => (
      <PostsExcerpt key={post.id} post={post} />
    ));
  } else if (postStatus === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <section className={styles.container}>
      <h2>Posts</h2>
      {content}
    </section>
  );
}

export default PostsList;
