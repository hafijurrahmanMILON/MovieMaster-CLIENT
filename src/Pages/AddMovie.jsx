import React from "react";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import useAxiosInstance from "../Hooks/useAxiosInstance";
import Swal from "sweetalert2";

const AddMovie = () => {
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxiosInstance();

  const handleAddMovies = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const genre = e.target.genre.value;
    const releaseYear = Number(e.target.releaseYear.value)
    const director = e.target.director.value;
    const cast = e.target.cast.value;
    const rating = Number(e.target.rating.value)
    const duration = Number(e.target.duration.value);
    const plotSummary = e.target.plotSummary.value;
    const posterUrl = e.target.posterUrl.value;
    const language = e.target.language.value;
    const country = e.target.country.value;
    const addedBy = e.target.addedBy.value;
    const newMovie = {
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
      created_at: new Date(),
    };
    console.log(newMovie);
    axiosInstance.post(`/movies/add`, newMovie).then((res) => {
      console.log(res.data);
      if (res.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Movies has been added",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-base-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl  font-primary">
            Add<span className="font-primary text-primary"> New </span>Movie
          </h1>
          <p className="mt-2">Fill in the details below</p>
        </div>

        <form onSubmit={handleAddMovies}>
          <div className="space-y-3">
            <div>
              <label className="label">Movie Title</label>
              <input
                required
                type="text"
                name="title"
                placeholder="Movie Title"
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
                  className="p-3 bg-base-100 border border-neutral rounded"
                />
              </div>
              <div className="flex flex-col">
                <label className="label">Duration</label>
                <input
                  name="duration"
                  // required
                  type="number"
                  placeholder="Duration (min)"
                  className="p-3 bg-base-100 border border-neutral rounded"
                />
              </div>
            </div>

            <div>
              <label className="label">Director</label>
              <input
                //   required
                name="director"
                type="text"
                placeholder="Director"
                className="w-full p-3 bg-base-100 border border-neutral rounded"
              />
            </div>
            <div>
              <label className="label">Cast</label>
              <input
                //   required
                name="cast"
                type="text"
                placeholder="Cast"
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
                  className="p-3 bg-base-100 border border-neutral rounded"
                />
              </div>
              <div className="flex flex-col">
                <label className="label">Language</label>
                <input
                  // required
                  name="language"
                  type="text"
                  placeholder="Language"
                  className="p-3 bg-base-100 border border-neutral rounded"
                />
              </div>
            </div>
            <div>
              <label className="label">Country</label>
              <input
                //   required
                name="country"
                type="text"
                placeholder="Country"
                className="w-full p-3 bg-base-100 border border-neutral rounded"
              />
            </div>
            <div>
              <label className="label">Poster URL</label>
              <input
                required
                name="posterUrl"
                type="text"
                // type="url"
                placeholder="Poster Image URL"
                className="w-full p-3 bg-base-100 border border-neutral rounded"
              />
            </div>
            <div>
              <label className="label">Plot Summary</label>
              <textarea
                placeholder="Plot Summary"
                name="plotSummary"
                rows="4"
                className="w-full p-3 bg-base-100 border border-neutral rounded"
              />
            </div>
            <div>
              <label className="label">Email</label>
              <input
                required
                type="email"
                name="addedBy"
                defaultValue={user?.email}
                placeholder="Your Email"
                className="w-full p-3 bg-base-100 border border-neutral rounded"
              />
            </div>

            <button className="w-full btn btn-primary text-white py-3 rounded font-semibold">
              Add Movie
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMovie;
