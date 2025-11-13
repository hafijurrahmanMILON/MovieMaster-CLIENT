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
    <div className="w-full h-[90vh] relative overflow-hidden">
      {featuredMovies.length > 1 && (
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
                <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/80 to-transparent"></div>

                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/80 to-transparent"></div>

                <div className="text-white max-w-xl">
                  <h1 className="text-4xl font-secondary md:text-5xl font-bold mb-4 text-primary">
                    {movie.title}
                  </h1>

                  <div className="flex gap-4 text-sm mb-4 text-white/70">
                    <span>📆{movie.releaseYear}</span>
                    <span>•</span>
                    <span>🎬{movie.genre}</span>
                    <span>•</span>
                    <span>⭐ {movie.rating}</span>
                  </div>

                  <p className="mb-4">{movie.plotSummary}</p>

                  <div className="text-sm">
                    <p>📽️ Directed by {movie.director}</p>
                  </div>
                </div>

                <div className="hidden md:block">
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="w-76 h-[450px] object-cover rounded-2xl shadow-2xl border border-gray-700"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <style>{`
        .custom-bullet {
          background: rgba(255,255,255,0.5);
          width: 10px;
          height: 5px;
          border-radius: 2px;
          margin: 0 2px;
          transition: all 0.6s ease;
        }
        .custom-bullet-active {
          background: #e50914;
          width: 24px;
        }
        .swiper-pagination {
          bottom: 30px !important;
        }
      `}</style>
    </div>
  );
};

export default HeroSlider;
