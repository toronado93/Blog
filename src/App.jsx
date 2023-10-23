import AddPostForm from "./components/Post/AddPostForm";
import PostsList from "./components/Post/PostsList";
import SinglePostPage from "./components/Post/SinglePostPage";
import EditPostForm from "./components/Post//EditPostForm";
import Layout from "./Layout/Layout";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostsList />} />

        <Route path="post">
          <Route index element={<AddPostForm />} />
          <Route path=":postId" element={<SinglePostPage />} />
          <Route path="edit/:postId" element={<EditPostForm />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
