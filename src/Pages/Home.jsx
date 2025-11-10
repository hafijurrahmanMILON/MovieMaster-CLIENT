import React from "react";
import HeroSlider from "../Components/HeroSlider";
import RecentlyAdded from "../Components/RecentlyAdded";

const Home = () => {
  return (
    <div>
      <HeroSlider></HeroSlider>
      <div className="w-9/12 mx-auto mt-12">
        <RecentlyAdded></RecentlyAdded>
      </div>
    </div>
  );
};

export default Home;
