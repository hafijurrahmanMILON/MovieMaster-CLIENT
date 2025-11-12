import React from "react";
import { useLoaderData, useNavigate } from "react-router";
import useAxiosInstance from "../Hooks/useAxiosInstance";
import Swal from "sweetalert2";

const UpdateMovie = () => {
  const axiosInstance = useAxiosInstance();
  const navigate = useNavigate();
  const movie = useLoaderData();

  const handleUpdateMovie = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const genre = e.target.genre.value;
    const releaseYear = Number(e.target.releaseYear.value);
    const director = e.target.director.value;
    const cast = e.target.cast.value;
    const rating = Number(e.target.rating.value);
    const duration = Number(e.target.duration.value);
    const plotSummary = e.target.plotSummary.value;
    const posterUrl = e.target.posterUrl.value;
    const language = e.target.language.value;
    const country = e.target.country.value;
    const addedBy = e.target.addedBy.value;
    const editedData = {
      title,
      genre,
      releaseYear,
      director,
      cast,
      rating,
      duration,
      plotSummary,
      posterUrl,
      language,
      country,
      addedBy,
      created_at: movie.created_at,
    };
    axiosInstance.put(`/movies/update/${movie._id}`, editedData).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Movie has been Updated!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      navigate("/all-movies");
    });
  };

  return (
    <div className="min-h-screen bg-base-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-primary">
            Update<span className="font-primary text-primary"> Movie</span>
          </h1>
          <p className="mt-2">Edit the movie details below</p>
        </div>

        <form onSubmit={handleUpdateMovie}>
          <div className="space-y-3">
            <div>
              <label className="label">Movie Title</label>
              <input
                required
                type="text"
                name="title"
                placeholder="Movie Title"
                defaultValue={movie.title}
                className="w-full p-3 bg-base-100 border border-neutral rounded"
              />
            </div>

            <div>
              <label className="label">Genre</label>
              <input
                required
                name="genre"
                type="text"
                placeholder="Genre"
                defaultValue={movie.genre}
                className="w-full p-3 bg-base-100 border border-neutral rounded"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Release Year</label>
                <input
                  required
                  name="releaseYear"
                  type="number"
                  placeholder="Release Year"
                  defaultValue={movie.releaseYear}
                  className="p-3 bg-base-100 border border-neutral rounded"
                />
              </div>
              <div className="flex flex-col">
                <label className="label">Duration</label>
                <input
                  name="duration"
                  type="number"
                  placeholder="Duration (min)"
                  defaultValue={movie.duration}
                  className="p-3 bg-base-100 border border-neutral rounded"
                />
              </div>
            </div>

            <div>
              <label className="label">Director</label>
              <input
                name="director"
                type="text"
                placeholder="Director"
                defaultValue={movie.director}
                className="w-full p-3 bg-base-100 border border-neutral rounded"
              />
            </div>

            <div>
              <label className="label">Cast</label>
              <input
                name="cast"
                type="text"
                placeholder="Cast"
                defaultValue={movie.cast}
                className="w-full p-3 bg-base-100 border border-neutral rounded"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="label">Rating</label>
                <input
                  required
                  name="rating"
                  type="number"
                  step="0.1"
                  placeholder="Rating"
                  defaultValue={movie.rating}
                  className="p-3 bg-base-100 border border-neutral rounded"
                />
              </div>
              <div className="flex flex-col">
                <label className="label">Language</label>
                <input
                  name="language"
                  type="text"
                  placeholder="Language"
                  defaultValue={movie.language}
                  className="p-3 bg-base-100 border border-neutral rounded"
                />
              </div>
            </div>

            <div>
              <label className="label">Country</label>
              <input
                name="country"
                type="text"
                placeholder="Country"
                defaultValue={movie.country}
                className="w-full p-3 bg-base-100 border border-neutral rounded"
              />
            </div>

            <div>
              <label className="label">Poster URL</label>
              <input
                required
                name="posterUrl"
                type="text"
                placeholder="Poster Image URL"
                defaultValue={movie.posterUrl}
                className="w-full p-3 bg-base-100 border border-neutral rounded"
              />
            </div>

            <div>
              <label className="label">Plot Summary</label>
              <textarea
                placeholder="Plot Summary"
                name="plotSummary"
                rows="4"
                defaultValue={movie.plotSummary}
                className="w-full p-3 bg-base-100 border border-neutral rounded"
              />
            </div>

            <div>
              <label className="label">Email</label>
              <input
                readOnly
                type="email"
                name="addedBy"
                value={movie.addedBy}
                placeholder="Your Email"
                className="w-full p-3 bg-base-100 border border-neutral rounded"
              />
            </div>

            <button className="w-full btn btn-primary text-white py-3 rounded font-semibold">
              Update Movie
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateMovie;
