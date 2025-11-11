import React from "react";
import { motion } from "framer-motion";
import bannerIMG from "../assets/banner.jpg";

const AboutUs = () => {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-center gap-2 py-16  px-6 md:px-4">
      {/* Left Side - Image */}
      <motion.div
        className="md:w-[75%] w-full flex justify-center relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
            filter: "blur(10px)",
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 1.2,
            delay: 0.3,
          }}
          className="relative"
        >
          <motion.img
            src={bannerIMG}
            alt="About MovieMaster Pro"
            className="lg:w-[75%] rounded-3xl shadow-2xl border border-gray-700"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 0 50px rgba(229, 9, 20, 0.4)",
              transition: { duration: 0.4 },
            }}
          />

        
          <motion.div
            className="absolute inset-0 rounded-3xl lg:w-[75%]"
            whileHover={{
              opacity: 0.1,
              x: ["0%", "100%"],
              transition: {
                x: {
                  duration: 0.8,
                  ease: "easeInOut",
                },
                opacity: { duration: 0.3 },
              },
            }}
          />
        </motion.div>
      </motion.div>
      {/* Right Side - Text */}
      <motion.div
        className="md:w-[60%] w-full space-y-5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.3,
            },
          },
        }}
      >
        <motion.h2
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                duration: 0.5,
              },
            },
          }}
          className="text-3xl md:text-3xl lg:text-5xl font-bold text-primary overflow-hidden"
          style={{
            width: "0px",
            animation:
              "typing 3.5s steps(40, end) forwards, blink-caret 0.75s step-end infinite",
          }}
        >
          About MovieMaster Pro
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
         
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
            className="text-primary font-semibold"
          >
            MovieMaster Pro
          </motion.span>{" "}
          is your ultimate movie management platform.
        </motion.p>

        <motion.ul className="space-y-1">
          {[
            "🎬 Discover trending and top-rated movies",
            "⭐ Create personalized collections",
            "📊 Track statistics and user activity",
            "🕹️ Smooth animations and dark mode interface",
          ].map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.6 + index * 0.15,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{
                x: 10,
                transition: { duration: 0.2 },
              }}
              className="flex items-center gap-2 cursor-default"
            >
              {item}
            </motion.li>
          ))}
        </motion.ul>

        <style>{`
          @keyframes typing {
            from {
              width: 0;
            }
            to {
              width: 100%;
            }
          }
          @keyframes blink-caret {
            from,
            to {
              border-color: transparent;
            }
            50% {
              border-color: #e50914;
            }
          }
        `}</style>
      </motion.div>
    </section>
  );
};

export default AboutUs;
