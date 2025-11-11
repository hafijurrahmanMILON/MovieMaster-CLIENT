import React from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const Genre = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.2 });

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section ref={sectionRef} className="py-16 bg-base-100 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={titleVariants}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Browse by Genre
          </h2>
          <p className="text-text text-opacity-70 max-w-2xl mx-auto">
            Explore our collection organized by genre. Find exactly what you're
            in the mood for.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {genres.map((genre) => (
            <motion.button
              key={genre}
              variants={itemVariants}
              whileHover={{
                scale: 1.09,
                backgroundColor: "rgba(229, 9, 20, 0.1)",
                borderColor: "#e50914",
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.99 }}
              className="bg-base-100 border border-gray-600 rounded-lg py-3 px-4 text-text text-sm font-medium text-center hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              {genre}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <p className="text-text text-opacity-60 text-sm">
            Can't find what you're looking for?{" "}
            <button className="text-primary hover:underline font-medium">
              Suggest a genre
            </button>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Genre;
