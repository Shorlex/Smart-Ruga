"use client";
import { useAuth } from "../../context/AuthContext";
import MainButton from "./MainButton";

const Register = () => {
  const {
    loading,
    error,
    formData,
    success,
    isRegisterValidForm,
    passwordLength,
    register,
    handleChange,
  } = useAuth();

  return (
    <form
      className="flex flex-col gap-3 text-sm 2xl:text-[16px]"
      onSubmit={register}
    >
      {/* Full Name */}
      <div className="xl:flex gap-5">
        <div className="w-full xl:w-1/2">
          <label htmlFor="firstName">First Name</label>
          <br></br>
          <input
            className="py-2 px-4 w-full bg-[#a3a3a3]/10 rounded-2xl outline-gray-200 mt-2"
            type="text"
            id="firstName"
            name="firstName"
            required
            placeholder="Enter your first name"
            onChange={handleChange}
            value={formData.firstName}
          />
        </div>
        <div className="w-full mt-5 xl:mt-0 xl:w-1/2">
          <label htmlFor="lastName">Last Name</label>
          <br></br>
          <input
            className="py-2 px-4 w-full bg-[#a3a3a3]/10 rounded-2xl outline-gray-200 mt-2"
            type="text"
            id="lastName"
            name="lastName"
            required
            placeholder="Enter your lastName"
            onChange={handleChange}
            value={formData.lastName}
          />
        </div>
      </div>
      {/* Email Address */}
      <div>
        <label htmlFor="email">Email Address</label>
        <br></br>
        <input
          className="py-2 px-4 w-full bg-[#a3a3a3]/10 rounded-2xl outline-gray-200 mt-2"
          type="text"
          name="email"
          required
          placeholder="Enter your email address"
          onChange={handleChange}
          value={formData.email}
          id="email"
        />
      </div>
      {/* Password */}
      <div>
        <label htmlFor="password">Password</label>
        <br></br>
        <input
          className="py-2 px-4 w-full bg-[#a3a3a3]/10 rounded-2xl outline-gray-200 mt-2"
          type="password"
          name="password"
          required
          placeholder="Enter your password"
          onChange={handleChange}
          value={formData.password}
          id="password"
        />
      </div>
      {!loading && <p className="text-center text-[#81BB33]">{success}</p>}
      {error && <p className="text-center text-red-400">{error}</p>}
      {/* Button */}
      <MainButton
        text={loading ? "Registration in progess..." : "Register"}
        isValidForm={isRegisterValidForm}
        passwordLength={passwordLength}
      />
    </form>
  );
};

export default Register;
