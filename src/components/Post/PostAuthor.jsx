import { useSelector } from "react-redux";
import { selectAllUsers } from "../../slices/usersSlice";

// eslint-disable-next-line react/prop-types
function PostAuthor({ userId }) {
  const users = useSelector(selectAllUsers);

  const author = users.find((user) => user.id === userId);

  return <span>by {author ? author.name : "Unknown author"}</span>;
}

export default PostAuthor;
