import React from "react";
import { AuthContext } from "../Context/AuthContext";
import RecentMovieCard from "./RecentMovieCard";
import { useContext } from "react";
import { Link } from "react-router";

const MoviesByGenre = () => {
  const { genreMovies } = useContext(AuthContext);

  return (
    <div className="min-h-screen py-7 px-4">
      <div className="w-10/12 mx-auto p-3 md:p-0">
        <h1 className="font-secondary text-4xl text-center mt-8">
          <span className="font-secondary text-primary">
            ({genreMovies.length}){" "}
          </span>
          Movies Found
        </h1>
        {genreMovies.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mx-auto mt-8">
            {genreMovies.map((movie) => (
              <RecentMovieCard key={movie._id} movie={movie}></RecentMovieCard>
            ))}
          </div>
        ) : (
          <div className=" min-h-[70vh] flex flex-col justify-center items-center">
            <div className="text-6xl mb-4">😵</div>
            <h3 className="text-xl font-semibold mb-2">No movies found!</h3>
            <Link
              to="/"
              className="btn border-none btn-primary btn-sm text-white font-semibold px-8 py-3 rounded-full  hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            >
              Back to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoviesByGenre;
