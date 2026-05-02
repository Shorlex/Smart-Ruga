import React from "react";
import HomePageImage from "../components/home/HomePageImage";
import AccountPending from "../components/home/AccountPending";

const page = () => {
  return (
    <section className="w-full min-h-screen">
      <div className="w-full h-full block xl:flex p-3">
        <div className="hidden xl:block xl:w-1/2 h-[700px]">
          <HomePageImage />
        </div>
        <div className="w-full xl:w-1/2 xl:h-[700px]">
          <AccountPending />
        </div>
      </div>
    </section>
  );
};

export default page;
