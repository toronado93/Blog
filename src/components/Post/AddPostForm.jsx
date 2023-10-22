import styles from "../Post/Post.module.css";
import { useState } from "react";

import { addNewPost } from "../../slices/postsSlice";
import { useDispatch, useSelector } from "react-redux";

import { selectAllUsers } from "../../slices/usersSlice";

function AddPostForm() {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const users = useSelector(selectAllUsers);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);

  // Esy way to ENABLE AND DISABLE A BUTTON , embeded it with the button itself
  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === "idle";

  //  On Save Logic
  // redux toolkit has unwrap method , this method return us a promises
  // either action.payload or error , this gives us a change to use try and catch blog here.

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(addNewPost({ title, body: content, userId })).unwrap();

        setTitle("");
        setContent("");
        setUserId("");
      } catch (err) {
        console.error("Failed to save the post", err);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  const usersOption = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    );
  });

  return (
    <section>
      <h2>Add a New Post</h2>
      <form className={styles.form}>
        <label htmlFor="postTitle">Post Title</label>
        <input
          type="text"
          id="postTitle"
          value={title}
          onChange={onTitleChanged}
        ></input>

        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        ></textarea>
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value="">Select an Author</option>
          {usersOption}
        </select>
        <button
          type="button"
          onClick={() => {
            onSavePostClicked();
          }}
          //   If you sent true variable to disable button will be disable , that is the logic.
          disabled={!canSave}
        >
          Save Post
        </button>
      </form>
    </section>
  );
}

export default AddPostForm;
