import React from "react";
import HomePageImage from "../components/home/HomePageImage";
import AccountPending from "../components/home/AccountPending";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components

const page = () => {
  return (
    <section className="w-full min-h-screen">
      <div className="w-full h-full block xl:flex p-3">
        <div className="hidden xl:block xl:w-1/2 h-175">
          <HomePageImage />
        </div>
        <div className="w-full xl:w-1/2 xl:h-175">
          <AccountPending />
        </div>
      </div>
    </section>
  );
};

export default page;
