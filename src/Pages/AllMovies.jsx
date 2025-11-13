import React, { useContext, useEffect, useState } from "react";
import useAxiosInstance from "../Hooks/useAxiosInstance";
import AllMoviesCard from "../Components/AllMoviesCard";
import { AuthContext } from "../Context/AuthContext";

const AllMovies = () => {
  const axiosInstance = useAxiosInstance();
  const [allMovies, setAllMovies] = useState([]);
  const { apiLoading, setApiLoading } = useContext(AuthContext);
  const [minRating, setMinRating] = useState("");
  const [maxRating, setMaxRating] = useState("");

  useEffect(() => {
    const delay = setTimeout(() => {
      setApiLoading(true);
      axiosInstance
        .get(
          `/movies-by-rating?minRating=${minRating || 0}&maxRating=${
            maxRating || 10
          }`
        )
        .then((res) => {
          setAllMovies(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setApiLoading(false));
    }, 700);
    return () => clearTimeout(delay);
  }, [axiosInstance, maxRating, minRating, setApiLoading]);

  return (
    <div className="min-h-screen py-6 px-3">
      <div className="w-full md:w-9/12 mx-auto p-3 md:p-0">
        <div>
          <div className="flex flex-col sm:flex-row justify-between items-center mt-7 mb-8 gap-4">
            <h1 className="text-center font-secondary text-4xl md:text-4xl">
              All{" "}
              <span className="text-primary font-secondary">
                Movies ({allMovies.length})
              </span>
            </h1>
            <div className="flex gap-2 items-center bg-neutral p-2 rounded-lg">
              <div className="flex items-center gap-1">
                <span className="text-xs">Rating(max):</span>
                <input
                  type="number"
                  value={maxRating}
                  onChange={(e) => {
                    setMaxRating(e.target.value);
                  }}
                  placeholder="10"
                  min="0"
                  max="10"
                  step="0.1"
                  className="w-14 p-1 bg-base-100 border border-neutral rounded text-sm"
                />
              </div>
              <span className="text-xs">-</span>
              <div className="flex items-center gap-1">
                <span className="text-xs">Rating(min):</span>
                <input
                  value={minRating}
                  onChange={(e) => {
                    setMinRating(e.target.value);
                  }}
                  min="0"
                  max="10"
                  step="0.1"
                  type="number"
                  placeholder="0"
                  className="w-14 p-1 bg-base-100 border border-neutral rounded text-sm"
                />
              </div>
              <button
                onClick={() => {
                  setMinRating("");
                  setMaxRating("");
                }}
                className="btn btn-xs btn-outline btn-primary"
              >
                Clear
              </button>
            </div>
          </div>

          {apiLoading ? (
            <div className="min-h-[70vh] flex items-center justify-center">
              <span className="loading loading-bars loading-xl text-primary"></span>
            </div>
          ) : (
            <div className="my-8 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-10">
              {allMovies.map((movie) => (
                <AllMoviesCard key={movie._id} movie={movie}></AllMoviesCard>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllMovies;
