import React from "react";
import { Link } from "react-router";

const AllMoviesCard = ({ movie }) => {
  return (
    <div className=" rounded-lg shadow-md overflow-hidden">
      <div className="relative overflow-hidden">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full aspect-2/3 object-cover"
        />

        <div className="absolute top-2 right-2 bg-gray-800 text-white px-2 py-0.5 rounded-full text-xs font-semibold ">
          ⭐ {movie.rating}
        </div>
      </div>

      <div className="relative p-3 space-y-2 bg-black">
        <h3 className="text-white font-semibold text-sm md:text-lg">{movie.title}</h3>

        <div className="flex gap-2">
          <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
            {movie.genre}
          </span>
          <span className="bg-gray-800 rounded-full text-white text-xs px-2 py-1">
            {movie.releaseYear}
          </span>
        </div>

        <Link
          to={`/movie-details/${movie._id}`}
          className="w-full btn btn-primary btn-sm  text-center py-1.5 rounded-lg text-sm font-semibold hover:scale-105 mt-2"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default AllMoviesCard;
