

const MainButton = ({ text, isValidForm, passwordLength }) => {
  return (
    <button
      className={`py-2 px-4 w-full text-white rounded-full  ${
        isValidForm && !passwordLength
          ? "bg-[#81BB33] cursor-pointer"
          : "bg-[#a5d6a7] text-white cursor-not-allowed"
      }`}
    >
      {text}
    </button>
  );
};

export default MainButton