import React, { useState, useContext } from "react";
import useAxiosInstance from "../Hooks/useAxiosInstance";
import { AuthContext } from "../Context/AuthContext";
import { Link } from "react-router";

const Genre = () => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const axiosInstance = useAxiosInstance();
  const { setGenreMovies} = useContext(AuthContext);
  // console.log("genreMOvies", genreMovies);
  const genres = [
    "Action",
    "Drama",
    "Comedy",
    "Horror",
    "Romance",
    "Sci-Fi",
    "Thriller",
    "Fantasy",
    "Adventure",
    "Animation",
    "Mystery",
    "Crime",
    "Classic",
    "Family",
    "History",
    "Music",
    "War",
    "Western",
  ];

  const handleToggleGenre = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleGenreSearch = () => {
    axiosInstance
      .get(`/movies-by-genre?genres=${selectedGenres}`)
      .then((res) => {
        setGenreMovies(res.data);
        // console.log(res.data);
      })
  };
  return (
    <section className="py-16 bg-base-100 px-2">
      <div className=" mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold font-secondary mb-4">
            Browse by <span className="font-secondary text-primary">Genre</span>
          </h2>
          <p className="max-w-2xl mx-auto">
            Explore our collection organized by genre. Find exactly what you're
            in the mood for.
          </p>
        </div>

        <div className="grid grid-cols-3  md:grid-cols-4 lg:grid-cols-6 gap-3">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => handleToggleGenre(genre)}
              className={`border rounded-lg py-3 px-4 text-sm font-medium text-center transition-all duration-200 cursor-pointer hover:scale-105 hover:shadow-md ${
                selectedGenres.includes(genre)
                  ? "bg-primary text-white border-primary"
                  : "bg-base-100 border-gray-600 "
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
        <Link
          to="/movies-by-genre"
          onClick={handleGenreSearch}
          className="btn btn-primary w-full mt-5"
        >
          Browse
        </Link>
        <div className="text-center mt-12">
          <p className="text-sm">
            Can't find what you're looking for?{" "}
            <button className="text-primary hover:underline font-medium">
              Suggest a genre
            </button>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Genre;
