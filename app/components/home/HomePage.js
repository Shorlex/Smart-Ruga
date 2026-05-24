import React from "react";
import HomePageImage from "./HomePageImage";
import Authentication from "./Authentication";

const HomePage = () => {
  return (
    <section className="w-full min-h-screen">
      <div className="w-full h-full block xl:flex p-3">
        <div className="hidden xl:block xl:w-1/2 h-175">
          <HomePageImage />
        </div>
        <div className="w-full xl:w-1/2 xl:h-175">
          <Authentication />
        </div>
      </div>
    </section>
  );
};

export default HomePage;
