import React from "react";
import loader from '../assets/clapperboard.png'

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="relative inline-block">
          <div className="w-18 h-18 border-4 border-gray-500 border-t-primary rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 text-red-500">
           <img src={loader} alt="" />
            </div>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-semibold">
            Loading...
          </h3>
          <p className="mt-2">
            Preparing your cinema experience
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loading;