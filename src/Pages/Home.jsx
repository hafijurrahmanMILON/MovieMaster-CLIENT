import React from "react";
import HeroSlider from "../Components/HeroSlider";
import RecentlyAdded from "../Components/RecentlyAdded";
import TopRated from "../Components/TopRated";
import AboutUs from "../Components/AboutUs";
import Statistics from "../Components/Statistics";
import Genre from "../Components/Genre";

const Home = () => {
  return (
    <div>
      <HeroSlider></HeroSlider>
      <div className="w-9/12 mx-auto mt-12">
        <RecentlyAdded></RecentlyAdded>
      </div>
      <div className="w-9/12 mx-auto mt-12">
        <AboutUs></AboutUs>
      </div>
      <div className="w-9/12 mx-auto my-12">
        <TopRated></TopRated>
      </div>
      <Statistics></Statistics>
       <div className="w-7/12 mx-auto my-12">
        <Genre></Genre>
      </div>
    </div>
  );
};

export default Home;
