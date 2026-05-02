import Image from "next/image";

const SocialLogin = () => {
  return (
    <button className="py-2 px-4 text-sm w-full text-[#81bb33] rounded-full border border-[#81BB33] cursor-pointer flex justify-center gap-5">
      <Image
        src={"/images/google-logo.png"}
        width={40}
        height={30}
        alt="google-icon"
      />{" "}
      <span>Sign up with Google</span>
    </button>
  );
};

export default SocialLogin;
