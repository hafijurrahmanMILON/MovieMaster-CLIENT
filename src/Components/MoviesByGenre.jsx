import React from "react";
import { AuthContext } from "../Context/AuthContext";
import RecentMovieCard from "./RecentMovieCard";
import { useContext } from "react";

const MoviesByGenre = () => {
      const { genreMovies } = useContext(AuthContext);
    

  return (
    <div className="w-10/12 mx-auto p-3 md:p-0">
      <h1 className="font-secondary text-4xl text-center mt-8">
        <span className="font-secondary text-primary">
          ({genreMovies.length}){" "}
        </span>
        Movies Found
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mx-auto">
        {genreMovies.map((movie) => (
          <RecentMovieCard key={movie._id} movie={movie}></RecentMovieCard>
        ))}
      </div>
    </div>
  );
};

export default MoviesByGenre;
