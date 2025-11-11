import React, { useEffect, useState } from "react";
import useAxiosInstance from "../Hooks/useAxiosInstance";
import AllMoviesCard from "../Components/AllMoviesCard";

const AllMovies = () => {
  const axiosInstance = useAxiosInstance();
  const [allMovies, setAllMovies] = useState([]);

  useEffect(() => {
    axiosInstance.get(`/movies`).then((res) => {
    //   console.log(res.data);
      setAllMovies(res.data);
    });
  }, [axiosInstance]);
  return (
    <div className="w-9/12 mx-auto p-3 md:p-0">
      <div>
        <h1 className="text-center font-primary text-2xl md:text-4xl mt-10">
          All{" "}
          <span className="text-primary font-primary">
            {" "}
            Movies ({allMovies.length})
          </span>
        </h1>
        <div className="my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {allMovies.map((movie) => (
            <AllMoviesCard key={movie._id} movie={movie}></AllMoviesCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllMovies;
