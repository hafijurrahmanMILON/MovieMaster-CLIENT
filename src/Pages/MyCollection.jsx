import React, { useContext, useEffect, useState } from "react";
import useAxiosInstance from "../Hooks/useAxiosInstance";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyCollection = () => {
  const { user, } = useContext(AuthContext);
  const axiosInstance = useAxiosInstance();
  const [collection, setCollection] = useState([]);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    axiosInstance
      .get(`/movies/my-collection?email=${user?.email}`)
      .then((res) => {
        console.log(res.data);
        setCollection(res.data);
      });
  }, [axiosInstance, user, refetch]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance
          .delete(`/movies/delete/${id}`)
          .then((res) => {
            console.log(res.data);
            if (res.data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
            setRefetch(!refetch);
          })
          .catch((err) => {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "failed!",
              text: "Something went wrong.",
            });
            console.log(err);
          });
      }
    });
  };
    
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="w-10/12 mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-4xl font-bold font-secondary">
            <span className="text-primary font-secondary">My</span> Collection
          </h1>
          <p className=" mt-2">Your personal movie library</p>
        </div>

        {/* Movies Grid */}
        {collection.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {collection.map((movie) => (
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
                    <Link
                      to={`/movies/update/${movie?._id}`}
                      className="btn btn-primary btn-sm text-white px-3 rounded text-xs "
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(movie._id)}
                      className="btn btn-outline btn-sm px-2 border-white text-white  rounded text-xs"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="mt-2 w-36 md:w-44">
                  <h3 className="text-sm font-medium line-clamp-1">
                    {movie.title}({movie.releaseYear})
                  </h3>
                  <div className="flex gap-1 px-1 mt-1 md:hidden">
                    <Link
                      to={`/movies/update/${movie?._id}`}
                      className="btn btn-primary btn-xs text-white px-2 rounded text-xs font-medium flex-1"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(movie._id)}
                      className="btn btn-outline btn-xs  px-2 rounded text-xs font-medium flex-1"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎬</div>
            <h3 className="text-xl font-semibold mb-2">
              No movies in your collection yet
            </h3>
            <p>Start building your movie library by adding some favorites!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCollection;
