import React, { useContext, useEffect, useState } from "react";
import useAxiosInstance from "../Hooks/useAxiosInstance";
import { AuthContext } from "../Context/AuthContext";
import Loading from "../Components/Loading";
import { Link } from "react-router";
import Swal from "sweetalert2";

const MyWatchList = () => {
  const axiosInstance = useAxiosInstance();
  const { user, apiLoading, setApiLoading } = useContext(AuthContext);
  const [watchList, setWatchList] = useState([]);
  const [refetch, setRefetch] = useState(false);
  // console.log(watchList);
  useEffect(() => {
    setApiLoading(true);
    axiosInstance
      .get(`/watchList/myWatchList?email=${user?.email}`)
      .then((res) => {
        setWatchList(res.data);
      })
      .finally(() => setApiLoading(false));
  }, [axiosInstance, user?.email,refetch]);

  const handleRemove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance
          .delete(`/watchList/delete?id=${id}`)
          .then((res) => {
            console.log(res.data);
            if (res.data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been Removed.",
                icon: "success",
              });
              setRefetch(!refetch);
            }
          })
          .catch((err) => {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "failed!",
              text: "Something went wrong.",
            });
            console.log(err);
          })
      }
    });
  };

  if (apiLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="min-h-screen py-8 w-10/12 mx-auto p-3 md:p-0">
      <div>
        <h1 className="font-secondary text-4xl font-semibold text-center my-8">
          <span className="font-secondary text-primary">My </span>Watchlist(
          {watchList.length})
        </h1>
        {watchList.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {watchList.map((movie) => (
              <div key={movie._id} className="group cursor-pointer">
                <div className="relative rounded-lg overflow-hidden shadow-md group-hover:shadow-lg transition-shadow duration-300 w-36 md:w-44 h-48 md:h-64">
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-bold backdrop-blur-sm">
                    ⭐ {movie.rating}
                  </div>
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100  duration-300 flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleRemove(movie._id)}
                      className="btn btn-outline btn-sm px-2 border-white text-white  rounded text-xs"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="mt-2 w-36 md:w-44">
                  <h3 className="text-sm font-medium line-clamp-1">
                    {movie?.title}({movie?.releaseYear})
                  </h3>
                  <div className="flex gap-1 px-1 mt-1 md:hidden">
                    <button
                      onClick={() => handleRemove(movie._id)}
                      className="btn btn-outline btn-xs  px-2 rounded text-xs font-medium flex-1"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="min-h-[70vh] flex flex-col justify-center items-center text-center">
            <div className="text-6xl mb-4">🎬</div>
            <h3 className="text-xl font-semibold mb-2">
              No movies in your watchlist yet
            </h3>
            <p>Start building your movie library by adding some favorites!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyWatchList;
