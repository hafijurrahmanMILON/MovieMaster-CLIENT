import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useAxiosInstance from "../Hooks/useAxiosInstance";
import movie from '../assets/watching-a-movie.png'
import user from '../assets/3d-movie.png'
import rating from '../assets/rating.png'

const Statistics = () => {
  const axiosInstance = useAxiosInstance();
  const [movies, setMovies] = useState([]);
  const [users, setUsers] = useState([]);
  const [avgRating, setAvgRating] = useState();

  useEffect(() => {
    axiosInstance.get(`/movies`).then((res) => {
      setMovies(res.data);
    });
    axiosInstance.get(`/users`).then((res) => {
      setUsers(res.data);
    });
    axiosInstance.get(`/avg-rating`).then((res) => {
      setAvgRating(res.data.avgRating);
    });
  }, [axiosInstance]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
    };

  return (
    <motion.div 
      className="bg-primary text-center p-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h1 
        className="text-4xl font-semibold text-white mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Discover the Stats Behind the Screen
      </motion.h1>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-14 lg:px-82 justify-center items-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Movies Stat */}
        <motion.div 
          className="py-8 flex justify-center items-center flex-col"
          variants={cardVariants}
          whileHover={{ 
            scale: 1.1,
            y: -5,
            transition: { duration: 0.3 }
          }}
        >
          <motion.img 
            src={movie} 
            alt="" 
            className="w-16 mb-4"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.8 }}
          />
          <h1 className="text-white text-5xl font-bold my-3">
            {movies.length}+
          </h1>
          <p className="text-white font-semibold">Movies</p>
        </motion.div>

        {/* Users Stat */}
        <motion.div 
          className="py-8 flex flex-col justify-center items-center"
          variants={cardVariants}
          whileHover={{ 
            scale: 1.1,
            y: -5,
            transition: { duration: 0.3 }
          }}
        >
          <motion.img 
            src={user} 
            alt="" 
            className="w-16 mb-4"
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.6 }}
          />
          <h1 className="text-white text-5xl font-bold my-3">
            {users.length}+
          </h1>
          <p className="text-white font-semibold">Users</p>
        </motion.div>

        {/* Rating Stat */}
        <motion.div 
          className="py-8 flex flex-col justify-center items-center"
          variants={cardVariants}
          whileHover={{ 
            scale: 1.1,
            y: -5,
            transition: { duration: 0.3 }
          }}
        >
          <motion.img 
            src={rating} 
            alt="" 
            className="w-16 mb-4"
            whileHover={{ 
              scale: 1.3,
              transition: { type: "spring", stiffness: 300 }
            }}
          />
          <h1 className="text-white text-5xl font-bold my-3">
            {avgRating?.toFixed(1)}
          </h1>
          <p className="text-white font-semibold">Average Rating</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Statistics;