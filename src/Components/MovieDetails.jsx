import React, { useContext, useEffect, useState } from "react";
import useAxiosInstance from "../Hooks/useAxiosInstance";
import { Link, useNavigate, useParams } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";

const MovieDetails = () => {
  const axiosInstance = useAxiosInstance();
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  // console.log(movie, user);

  useEffect(() => {
    axiosInstance.get(`/movies/${id}`).then((res) => {
      setMovie(res.data);
    });
  }, [axiosInstance, id]);

  const handleDelete = () => {
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
          .delete(`/movies/delete/${movie._id}`)
          .then((res) => {
            console.log(res.data);
            if (res.data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
            navigate("/all-movies");
          })
          .catch((err) => {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Delete failed!",
              text: "Something went wrong.",
            });
            console.log(err);
          });
      }
    });
  };

  return (
    <div className="min-h-screen bg-base-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-base-100 rounded-3xl shadow-2xl border border-neutral overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-2/5 p-6">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full rounded-2xl shadow-lg"
              />

              <div className="mt-6 space-y-3">
                <div className="flex justify-between items-center p-3 bg-neutral rounded-lg">
                  <span className="font-semibold">Year</span>
                  <span>{movie.releaseYear || "-"}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-neutral rounded-lg">
                  <span className="font-semibold">Duration</span>
                  <span>{movie.duration ? `${movie.duration} min` : "-"} </span>
                </div>
              </div>
            </div>

            <div className="lg:w-3/5 p-6 lg:p-8 space-y-6">
              <div className="space-y-4">
                <h1 className="text-3xl lg:text-4xl font-bold">
                  {movie.title || "-"}
                </h1>
                <div className="flex gap-2">
                  <span className="bg-primary text-white px-3 py-1 rounded-full">
                    {movie.genre || "-"}
                  </span>
                  <span className="bg-gray-700 text-white px-3 py-1 rounded-full">
                    ⭐{movie.rating || "-"}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Director</h3>
                  <p>{movie.director || "-"}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Language</h3>
                  <p>{movie.language || "-"}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Country</h3>
                  <p>{movie.country || "-"}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Added By</h3>
                  <p className="text-sm">
                    {movie.addedBy || "example@email.com"}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Cast</h3>
                <p>{movie.cast || "-"}</p>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Plot Summary</h3>
                <p>{movie.plotSummary || "-"}</p>
              </div>

              {user?.email === movie?.addedBy && (
                <div className="flex gap-4 pt-4">
                  <Link
                    to={`/movies/update/${movie?._id}`}
                    className="btn btn-primary hover:bg-primary-focus text-white px-6 py-3 rounded-lg font-semibold transition-colors flex-1"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={handleDelete}
                    className="btn btn-outline px-6 py-3 rounded-lg font-semibold flex-1"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
