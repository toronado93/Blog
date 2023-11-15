import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPostById,
  updatePost,
  deletePost,
} from "../../slices/postsSlice";
import { useParams, useNavigate } from "react-router-dom";
import { selectAllUsers } from "../../slices/usersSlice";

import styles from "../Post/Post.module.css";

function EditPostForm() {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const navigate = useNavigate();

  const post = useSelector((state) => selectPostById(state, Number(postId)));
  const users = useSelector(selectAllUsers);

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body);
  const [userId, setUserId] = useState(post?.userId);
  const [requestStatus, setRequestStatus] = useState("idle");

  //   During edit , if page is reload , use localstorage and bring information back , set all the logic
  // UseEffect for LocalStorage

  // LocalStorage

  const localSaveData = () => {
    if (canSave) {
      try {
        localStorage.setItem(
          "editedPost",
          JSON.stringify({ title, content, userId, requestStatus })
        );
      } catch (error) {
        console.log("Something happened");
      }
    }
  };

  useEffect(() => {
    localSaveData();
  }, [title, content]);

  // Mountant When Page Refresh

  useEffect(() => {
    const savedData = localStorage.getItem("editedPost");
    if (savedData) {
      const { title, content, userId } = JSON.parse(savedData);
      setTitle(title);
      setContent(content);
      setUserId(userId);
    }
  }, [postId]);

  const canSave =
    [title, content, userId].every(Boolean) && requestStatus === "idle";

  if (!post) {
    return (
      <section>
        <h2>Post is not found!</h2>
      </section>
    );
  }

  const onTitleChanged = (e) => setTitle(e.target.value);
  // Oncontentchange with LocalStorage
  const onContentChanged = (e) => {
    setContent(e.target.value);
    // localSaveData();
  };
  const onAuthorChanged = (e) => setUserId(Number(e.target.value));
  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setRequestStatus("pending");
        dispatch(
          updatePost({
            id: post.id,
            title,
            body: content,
            userId,
            reactions: post.reactions,
          })
        ).unwrap();

        setTitle("");
        setContent("");
        setUserId("");
        navigate(`/post/${postId}`);
      } catch (err) {
        console.error("Failed to save the post", err);
      } finally {
        setRequestStatus("idle");
      }
    }
  };
  const onDeletePostClicked = () => {
    try {
      setRequestStatus("pending");
      dispatch(deletePost({ id: post.id })).unwrap();

      setTitle("");
      setContent("");
      setUserId("");
      navigate("/");
    } catch (err) {
      console.error("Failed to delete the post", err);
    } finally {
      setRequestStatus("idle");
    }
  };

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section className={styles.editpost}>
      <h2>Edit Post</h2>
      <form className={styles.formdesign}>
        <div className={styles.semicolon}>
          <label htmlFor="postTitle">Post Title:</label>
          <input
            type="text"
            id="postTitle"
            name="postTitle"
            value={title}
            onChange={onTitleChanged}
          />
          <label htmlFor="postAuthor">Author:</label>
          <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
            <option value=""></option>
            {usersOptions}
          </select>
        </div>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
        <button
          className="deleteButton"
          type="button"
          onClick={onDeletePostClicked}
        >
          Delete Post
        </button>
      </form>
    </section>
  );
}

export default EditPostForm;
