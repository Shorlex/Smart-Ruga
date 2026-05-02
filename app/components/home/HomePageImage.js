import Image from "next/image";

const HomePageImage = () => {
  return (
    <div
      className="w-full h-full pb-10 bg-cover bg-center flex justify-center items-end rounded-4xl"
      style={{ backgroundImage: "url('/images/cattle-image.png')" }}
    >
      <div className="w-8/10 backdrop-blur-[6px] border-white/20 border rounded-3xl text-white text-center py-5 px-10">
        <div className="flex justify-center gap-3">
          <Image
            src={"/images/grass-icon.png"}
            width={35}
            height={20}
            alt="grass-icon"
          />
          <h3 className="text-2xl">
            Smarter <span className="text-[#98C950]">Ranching</span>, Greater{" "}
            <span className="text-[#98C950]">Yields</span>
          </h3>
          <Image
            src={"/images/grass-icon.png"}
            width={35}
            height={20}
            alt="grass-icon"
          />
        </div>
        <p className="mt-3 space-x-0.5 font-extralight text-[18px]">
          Streamline operations, safeguard livestock health, and maximize
          profitability - all in one intelligent platform.
        </p>
      </div>
    </div>
  );
};

export default HomePageImage;
