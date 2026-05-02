"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const AccountPending = () => {
  const route = useRouter();

  return (
    <section className=" relative w-full h-[700px] flex justify-center items-center">
      <div className="flex flex-col items-center gap-5">
        {/* Animation */}
        <Image
          src={"/images/pending-image.png"}
          alt="Account Pending Image"
          width={100}
          height={400}
          className="animate-float-spin"
        />
        <h1 className="font-bold text-2xl">
          Your Access Request is Pending Approval!
        </h1>
        <p className="w-full md:w-140 text-center space-x-0.5 font-extralight">
          Thank you for signing up! Your request to join as a Ranch Owner has
          been received. we are currently reviewing your details and will grant
          or decline access shortly.
        </p>
        <p className="bg-gray-100 py-1 px-2 rounded-full text-sm text-gray-500">
          🕒 Wait Time: Typically reviewed within 8 hours.
        </p>
      </div>
      <div className="absolute bottom-10 left-0 w-full flex justify-center">
        <p className="text-[#81BB33]">
          Contact Ranch Admin if this takes longer than expected
        </p>
        <Image
          src={"/images/arrow.png"}
          alt="arrow"
          width={40}
          height={5}
          className="w-6 h-3 mt-2 ml-2 cursor-pointer"
          onClick={() => route.push("/contact")}
        />
      </div>
    </section>
  );
};

export default AccountPending;
