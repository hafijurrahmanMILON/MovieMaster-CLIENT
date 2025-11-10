import React from 'react';

const RecentMovieCard = ({ movie }) => {
    return (
        <div className="group cursor-pointer">
            <div className="relative rounded-lg overflow-hidden shadow-md group-hover:shadow-lg transition-shadow duration-300 w-46 h-64">
                <img 
                    src={movie.posterUrl} 
                    alt={movie.title}
                    className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
                
               
                <div className="absolute top-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-bold backdrop-blur-sm">
                    ⭐ {movie.rating}
                </div>
            </div>

            
            <div className="mt-2 w-40">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {movie.title}({movie.releaseYear})
                </h3>
            </div>
        </div>
    );
};

export default RecentMovieCard;