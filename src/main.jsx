import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { store } from "./store/store.jsx";
import { Provider } from "react-redux";

import { fetchUsers } from "./slices/usersSlice.jsx";
import { fetchPosts } from "./slices/postsSlice.jsx";

// Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// we want user is filled , when app first mounted.
store.dispatch(fetchUsers());

// When we refresh the page , post dissappears this cause post not found,
// why we have this issue , bcoz we mounted fetch process with conponents , if we use browser tools like refresh button , without trigger react state , fetch function will not be triggered and this cause unloaded posts in order to solve this problem we can also load posts in here. js fiole directly into the dom

store.dispatch(fetchPosts());

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <Routes>
        {/* "/*" allowe us to make nested route inside of / pattern  */}
        <Route path="/*" element={<App />}></Route>
      </Routes>
    </Router>
  </Provider>
);
