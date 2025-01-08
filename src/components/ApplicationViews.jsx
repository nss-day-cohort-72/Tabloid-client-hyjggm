import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import UserProfileList from "./userprofiles/UserProfilesList";
import MyPosts from "./MyPosts";
import PostDetails from "./PostDetails";
import UserProfileDetails from "./userprofiles/UserProfileDetails";
import CreatePost from "./CreatePost";
import EditPost from "./EditPost";
import CategoryList from "./CategoryList";
import CreateCategory from "./CreateCategory";
import EditCategory from "./EditCategory";
import DeletePost from "./DeletePost";
import AllPosts from "./AllPosts";

export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
// console.log("what is loggedInUser in applicationViews", loggedInUser);

  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <p>Welcome to Tabloid!</p>
            </AuthorizedRoute>
          }
        />
        <Route path="/userprofiles">
          <Route
            index
            element={
              <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
                <UserProfileList />
              </AuthorizedRoute>
            }
          />
          <Route
            path=":id"
            element={
              <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
                <UserProfileDetails />
              </AuthorizedRoute>
            }
          />
        </Route>
        {/* Nested posts route */}
        <Route path="/posts">
          <Route
            index
            element={
              <AuthorizedRoute loggedInUser={loggedInUser}>
                <AllPosts />
              </AuthorizedRoute>
            }
          />
          <Route
            path=":id"
            element={
              <AuthorizedRoute loggedInUser={loggedInUser}>
                <PostDetails />
              </AuthorizedRoute>
            }
          />
          <Route
            path="new"
            element={
              <AuthorizedRoute loggedInUser={loggedInUser}>
                <CreatePost  loggedInUser={loggedInUser} />
              </AuthorizedRoute>
            }
          />
          <Route
            path="edit/:id"
            element={
              <AuthorizedRoute loggedInUser={loggedInUser}>
                <EditPost  loggedInUser={loggedInUser} />
              </AuthorizedRoute>
            }
          />
          <Route
            path="delete/:id"
            element={
              <AuthorizedRoute loggedInUser={loggedInUser}>
                <DeletePost loggedInUser={loggedInUser} />
              </AuthorizedRoute>
            }
          />
        </Route>
        <Route path="/myposts">
          <Route
            index
            element={
              <AuthorizedRoute loggedInUser={loggedInUser}>
                <MyPosts loggedInUser={loggedInUser} />
              </AuthorizedRoute>
            }
          />
        </Route>
        <Route path="/category">
          <Route
            index
            element={
              <AuthorizedRoute loggedInUser={loggedInUser}>
                <CategoryList />
              </AuthorizedRoute>
            }
          />
          <Route
            path="new"
            element={
              <AuthorizedRoute loggedInUser={loggedInUser}>
                <CreateCategory />
              </AuthorizedRoute>
            }
          />
          <Route
            path="edit/:id"
            element={
              <AuthorizedRoute loggedInUser={loggedInUser}>
                <EditCategory />
              </AuthorizedRoute>
            }
          />
        </Route>
        <Route
          path="login"
          element={<Login setLoggedInUser={setLoggedInUser} />}
        />
        <Route
          path="register"
          element={<Register setLoggedInUser={setLoggedInUser} />}
        />
      </Route>
      <Route path="*" element={<p>Whoops, nothing here...</p>} />
    </Routes>
  );
}
