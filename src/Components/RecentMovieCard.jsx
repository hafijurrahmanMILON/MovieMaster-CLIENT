import React from "react";
import { Link } from "react-router";

const RecentMovieCard = ({ movie }) => {
  return (
    <Link to={`/movie-details/${movie?._id}`} className="group cursor-pointer">
      <div className="relative rounded-lg overflow-hidden shadow-md group-hover:shadow-lg transition-shadow duration-300 w-36 md:w-44 h-48 md:h-64">
        <img
          src={movie?.posterUrl}
          alt={movie?.title}
          className="w-full h-full group-hover:scale-105 transition-transform duration-300"
        />

        <div className="absolute top-2 right-2 bg-black/80 text-white px-2 py-1 rounded-3xl text-xs font-bold">
          ⭐ {movie?.rating}
        </div>

        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
          <div className="text-white">
            <h3 className="text-2xl text-primary font-secondary font-bold mb-1">
              {movie?.title}
            </h3>
            <p className="text-xs text-white/80">{movie?.genre}</p>
            <p className="text-xs text-white/80">{movie?.language}</p>
          </div>
        </div>
      </div>
      <div className=" w-36 md:w-44">
        <h3 className="text-md font-medium">
          {movie?.title} <span className="text-sm">({movie?.releaseYear})</span>
        </h3>
      </div>
    </Link>
  );
};

export default RecentMovieCard;
