import React, { useEffect, useState } from "react";
import useAxiosInstance from "../Hooks/useAxiosInstance";
import RecentMovieCard from "./RecentMovieCard";
import { FaArrowRight } from "react-icons/fa6";

const TopRated = () => {
  const axiosInstance = useAxiosInstance();
  const [top, setTop] = useState([]);
  console.log(top);
  useEffect(() => {
    axiosInstance.get(`/top-rated-movies`).then((res) => {
      setTop(res.data);
    });
  }, [axiosInstance]);
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="font-secondary text-3xl mb-4">
          Top
          <span className="text-primary font-secondary"> Rated </span>Movies
        </h1>
          <h1 className="flex items-center gap-1 hover:cursor-pointer">
            View All <span><FaArrowRight /></span>
          </h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {top.map((movie) => (
          <RecentMovieCard key={movie._id} movie={movie}></RecentMovieCard>
        ))}
      </div>
    </div>
  );
};

export default TopRated;
