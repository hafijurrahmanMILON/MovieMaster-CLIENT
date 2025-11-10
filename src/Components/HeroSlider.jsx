import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import useAxiosInstance from "../Hooks/useAxiosInstance";

const HeroSlider = () => {
  const axiosInstance = useAxiosInstance();
  const [featuredMovies, setFeaturedMovies] = useState([]);

  useEffect(() => {
    axiosInstance.get("/featured-movies").then((res) => {
      setFeaturedMovies(res.data);
    });
  }, [axiosInstance]);

  return (
    <div className="w-full h-[85vh] relative overflow-hidden">
      <Swiper
        key={featuredMovies.length}
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        speed={1500}
        loop={true}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet custom-bullet",
          bulletActiveClass:
            "swiper-pagination-bullet-active custom-bullet-active",
        }}
        className="w-full h-full"
      >
        {featuredMovies.map((movie, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full h-full bg-cover bg-center flex items-center justify-around px-5 md:px-0"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0.4)), url(${movie.posterUrl})`,
              }}
            >
            
              <div className="text-white max-w-xl space-y-4 z-10">
                <h1 className="text-4xl md:text-4xl lg:text-5xl font-bold leading-tight font-primary text-primary">
                  {movie.title}
                </h1>
                <p className="text-base md:text-md opacity-80 leading-relaxed">
                  {movie.plotSummary}
                </p>
                <div className="text-sm opacity-75 space-y-1">
                  <p>
                    🎬 <span className="font-semibold">Genre:</span>{" "}
                    {movie.genre}
                  </p>
                  <p>
                    📅 <span className="font-semibold">Year:</span>{" "}
                    {movie.releaseYear}
                  </p>
                  <p>
                    🎥 <span className="font-semibold">Director:</span>{" "}
                    {movie.director}
                  </p>
                  <p>
                    ⭐ <span className="font-semibold">Rating:</span>{" "}
                    {movie.rating}
                  </p>
                </div>
              </div>

              <div className="hidden md:block translate-x-[-40px]">
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-56 md:w-64 h-80 md:h-96 object-cover rounded-2xl shadow-2xl border border-gray-700"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        .custom-bullet {
    @apply w-5 h-1.5 bg-gray-500 opacity-50 transition-all duration-300 mx-1 rounded-sm cursor-pointer;
  }
  .custom-bullet-active {
    @apply bg-primary opacity-100 w-7 rounded-sm;
  }
  .swiper-pagination {
    @apply flex justify-center items-center relative bottom-0 w-full py-2;
  }.custom-bullet {
  background: rgba(255, 255, 255, 0.3);
  width: 10px;
  height: 10px;
  border-radius: 50%; /* normal bullet = circle */
  margin: 0 6px !important;
  transition: all 0.3s ease;
}

.custom-bullet-active {
  background: #e50914; /* Netflix Red */
  width: 20px;   /* horizontal shape */
  height: 10px;  /* keep height same */
  border-radius: 12px; /* pill/ellipse shape */
}
      `}</style>
    </div>
  );
};

export default HeroSlider;
