import React, { useEffect, useState } from "react";
import useAxiosInstance from "../Hooks/useAxiosInstance";
import RecentMovieCard from "./RecentMovieCard";
import { FaArrowRight } from "react-icons/fa6";

const RecentlyAdded = () => {
  const axiosInstance = useAxiosInstance();
  const [latestMovies, setLatestMovies] = useState([]);
  console.log(latestMovies);

  useEffect(() => {
    axiosInstance.get(`/latest-movies`).then((res) => {
      setLatestMovies(res.data);
      console.log(latestMovies);
    });
  }, [axiosInstance]);
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="font-secondary text-3xl mb-4">
          <span className="text-primary font-secondary">Recently </span>Added
        </h1>
        <h1 className="flex items-center gap-1 hover:cursor-pointer">
          View All{" "}
          <span>
            <FaArrowRight />
          </span>
        </h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {latestMovies.map((movie) => (
          <RecentMovieCard key={movie._id} movie={movie}></RecentMovieCard>
        ))}
      </div>
    </div>
  );
};

export default RecentlyAdded;
