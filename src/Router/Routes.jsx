import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import RouteError from "../Components/RouteError";
import MyProfile from "../Pages/MyProfile";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import PrivateRoute from "../Components/PrivateRoute";
import AllMovies from "../Pages/AllMovies";
import MyCollection from "../Pages/MyCollection";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: RouteError,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/all-movies",
        Component: AllMovies,
      },

      {
        path: "/my-collection",
        element: <MyCollection></MyCollection>,
      },

      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/myProfile",
        element: (
          <PrivateRoute>
            <MyProfile></MyProfile>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
