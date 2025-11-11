import React from "react";
import { Link } from "react-router";

const AllMoviesCard = ({ movie }) => {
  return (
    <div className="bg-base-100 rounded-lg shadow-md border border-neutral overflow-hidden transition-all duration-300">
      <div className="relative overflow-hidden">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full aspect-2/3 object-cover"
        />

        <div className="absolute top-2 right-2 bg-black/75 text-white px-2 py-0.5 rounded-full text-xs font-semibold ">
          ⭐ {movie.rating}
        </div>
      </div>

      <div className="relative p-3 space-y-2 bg-black">
        <h3 className="text-white font-semibold">{movie.title}</h3>

        <div className="flex flex-wrap gap-2">
          <span className="bg-primary/90 text-white text-xs px-2 py-1 rounded-full">
            {movie.genre}
          </span>
          <span className="bg-gray-800 rounded-full text-white text-xs px-2 py-1">
            {movie.releaseYear}
          </span>
        </div>

        <Link
          to={`/movie-details/${movie._id}`}
          className="block w-full bg-primary text-white text-center py-1.5 rounded-lg text-sm font-semibold hover:scale-105 transform transition-all duration-200 mt-2"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default AllMoviesCard;
