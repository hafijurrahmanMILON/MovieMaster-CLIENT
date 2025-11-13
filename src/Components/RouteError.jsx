import React from "react";
import error from '../assets/error.png'
import { Link } from "react-router";

const RouteError = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 p-24">
      <div>
        <img src={error} alt="Error" className="mx-auto w-5/12" />
      </div>

      <h1 className="text-4xl md:text-5xl font-bold mb-3 text-center text-transparent font-primary bg-clip-text  bg-primary">
        Oops! Page Not Found
      </h1>
      <p className="text-center max-w-md mb-8">
        The page you're looking for doesn't exist or may have been moved. Please
        check the URL or go back to the homepage.
      </p>

      <Link
        to="/"
        className="btn border-none btn-primary text-white font-semibold px-8 py-3 rounded-full  hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
      >
       Back to Home
      </Link>
    </div>
  );
};

export default RouteError;
