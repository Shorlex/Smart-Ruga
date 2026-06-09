"use client";
import Link from "next/link";
import { useState } from "react";
import Register from "./Register";
import Login from "./Login";
import Image from "next/image";
import SocialLogin from "./SocialLogin";

const Authentication = () => {
  const [auth, setAuth] = useState(true);

  return (
    <section className="h-full flex items-center justify-center">
      <div className="w-full lg:px-12 xl:px-12 px-5">
        <div className=" mb-10">
          <Image
            src={"/images/SmartRUGA-Logo.png"}
            width={150}
            height={70}
            alt="main-logo"
          />
          <h1 className="text-3xl font-extrabold text-gray-900 text-center">
            {auth
              ? "Let’s Get You Started"
              : "Good to See You Again"}
          </h1>
          <p className="text-gray-900 text-center">
            {auth
              ? "Create an account and begin managing your ranch smarter"
              : "Sign in to access your dashboard"}
          </p>
        </div>
        {auth ? <Register /> : <Login />}
        <div className="mt-5">
          <SocialLogin />
        </div>
        <p className="mt-5 text-center text-sm">
          {auth ? "Already have an account?" : "Don’t have an account?"}{" "}
          <Link
            className="text-[#94D838]"
            href={"#"}
            onClick={() => setAuth(!auth)}
          >
            {auth ? "Login" : "Register"}
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Authentication;
