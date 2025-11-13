import React, { useContext, useEffect, useState } from "react";
import useAxiosInstance from "../Hooks/useAxiosInstance";
import { Link, useNavigate, useParams } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";
import Loading from "./Loading";
import RouteError from "./RouteError";
import { FaPlus } from "react-icons/fa6";
import { MdOutlineLibraryAddCheck } from "react-icons/md";
import toast from "react-hot-toast";

const MovieDetails = () => {
  const axiosInstance = useAxiosInstance();
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [btnState, setBtnState] = useState(false);
  // console.log(movie, user);

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`/movies/${id}`)
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [axiosInstance, id]);

  useEffect(() => {
    if (!movie?._id) {
      return;
    }
    axiosInstance
      .get(`/watchList/check?movie=${movie?._id}&email=${user?.email}`)
      .then((res) => {
        // console.log(res.data);
        if (res.data) {
          setBtnState(true);
        } else {
          setBtnState(false);
        }
      });
  }, [axiosInstance, user?.email, movie?._id]);

  const handleAddWatchList = () => {
    const newList = {
      movieId: movie?._id,
      title: movie?.title,
      rating: movie?.rating,
      posterUrl: movie?.posterUrl,
      releaseYear: movie?.releaseYear,
      user_email: user?.email,
    };
    axiosInstance
      .post(`/watchList/add`, newList)
      .then((res) => {
        console.log(res.data);
        toast.success("added to watchlist");
        setBtnState(true);
      })
      .catch((err) => {
        if (err.response?.status === 400) {
          toast.error(err.response.data.message);
        }
        console.log(err);
      });
  };

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
        setLoading(true);
        axiosInstance
          .delete(`/movies/delete/${movie._id}`)
          .then((res) => {
            // console.log(res.data);
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
              title: "failed!",
              text: "Something went wrong.",
            });
            console.log(err);
          })
          .finally(() => setLoading(false));
      }
    });
  };

  if (loading) {
    return <Loading></Loading>;
  }

  if (error) {
    return <RouteError></RouteError>;
  }

  return (
    <div className="min-h-screen bg-base-100 mt-12 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-base-100 rounded-3xl shadow-2xl border border-neutral overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-2/5 p-6">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full rounded-2xl shadow-lg"
              />
            </div>

            <div className="lg:w-3/5 p-6 lg:p-8 space-y-6">
              <div className="space-y-4">
                <div className="flex flex-col gap-3 md:flex-row justify-between items-start md:items-center">
                  <h1 className="text-3xl lg:text-4xl font-semibold">
                    {movie.title || "-"}
                  </h1>
                  {user && (
                    <div>
                      {btnState ? (
                        <button
                          onClick={handleAddWatchList}
                          className={`btn  btn-primary btn-sm rounded-lg`}
                          disabled
                        >
                          <MdOutlineLibraryAddCheck /> Added to Watchlist
                        </button>
                      ) : (
                        <button
                          onClick={handleAddWatchList}
                          className={`btn btn-primary btn-sm rounded-lg`}
                        >
                          <FaPlus /> Add to Watchlist
                        </button>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex gap-4 items-center">
                  <div className=" bg-primary text-white px-2 py-1 text-xs font-bold rounded-full">
                    {movie?.genre || "-"}
                  </div>
                  <div className="flex gap-2 text-sm">
                    <span>📆 {movie.releaseYear || "-"}</span>
                    <span>•</span>
                    <span>
                      {movie.duration ? `🕛 ${movie.duration} min` : "-"}
                    </span>
                    <span>•</span>
                    <span>⭐ {movie.rating || "-"}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Director</h3>
                  <p className="font-light">{movie.director || "-"}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Language</h3>
                  <p className="font-light">{movie.language || "-"}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Country</h3>
                  <p className="font-light">{movie.country || "-"}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Added By</h3>
                  <p className="font-light">
                    {movie.addedBy || "example@email.com"}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Cast</h3>
                <p className="font-light">{movie.cast || "-"}</p>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Plot Summary</h3>
                <p className="font-light">{movie.plotSummary || "-"}</p>
              </div>

              {user?.email === movie?.addedBy && (
                <div className="flex gap-4 mt-2">
                  <Link
                    to={`/movies/update/${movie?._id}`}
                    className="btn btn-sm btn-primary px-6 py-3 rounded-lg font-semibold flex-1"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={handleDelete}
                    className="btn btn-sm btn-outline px-6 py-3 rounded-lg font-semibold flex-1"
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
