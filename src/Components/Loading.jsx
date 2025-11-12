import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="relative inline-block">
          <div className="w-16 h-16 border-4 border-gray-500 border-t-primary rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 text-red-500">
           
              <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 3l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 3H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-4Z"/>
              </svg>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-semibold">
            Loading
            <span className="inline-flex w-6 ml-1">
              <span className="animate-bounce">.</span>
              <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>.</span>
              <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>.</span>
            </span>
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