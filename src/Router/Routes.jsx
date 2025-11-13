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
import AddMovie from "../Pages/AddMovie";
import UpdateMovie from "../Pages/UpdateMovie";
import MoviesByGenre from "../Components/MoviesByGenre";
import MyWatchList from "../Pages/MyWatchList";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <RouteError></RouteError>,
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
        path: "/movies/update/:id",
        element: (
          <PrivateRoute>
            <UpdateMovie></UpdateMovie>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:3000/movies/${params.id}`),
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
        path: "/my-watchList",
        element: (
          <PrivateRoute>
            <MyWatchList></MyWatchList>
          </PrivateRoute>
        ),
      },
      {
        path: "/add-movies",
        element: (
          <PrivateRoute>
            <AddMovie></AddMovie>
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
      {
        path: "/movies-by-genre",
        Component: MoviesByGenre,
      },
    ],
  },
]);
