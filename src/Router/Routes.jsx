import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import RouteError from "../Components/RouteError";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import AllMovies from "../Pages/AllMovies";
import MyCollection from "../Pages/MyCollection";
import PrivateRoute from "../Components/PrivateRoute";
import MovieDetails from "../Components/MovieDetails";

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
        path: "/movie-details/:id",
        Component: MovieDetails,
      },

      {
        path: "/my-collection",
        element: (
          <PrivateRoute>
            <MyCollection></MyCollection>
          </PrivateRoute>
        ),
      },

      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
]);
