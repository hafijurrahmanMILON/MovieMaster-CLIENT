import React from "react";
import HeroSlider from "../Components/HeroSlider";
import RecentlyAdded from "../Components/RecentlyAdded";
import TopRated from "../Components/TopRated";
import AboutUs from "../Components/AboutUs";

const Home = () => {
  return (
    <div>
      <HeroSlider></HeroSlider>
      <div className="w-9/12 mx-auto mt-12">
        <RecentlyAdded></RecentlyAdded>
      </div>
      <div className="w-9/12 mx-auto mt-12">
        <TopRated></TopRated>
      </div>
      <div className="w-9/12 mx-auto mt-12">
        <AboutUs></AboutUs>
      </div>
    </div>
  );
};

export default Home;
