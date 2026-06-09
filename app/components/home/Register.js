"use client";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import MainButton from "./MainButton";
import { EyeOff, Eye } from "lucide-react";

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

  const [showPassword, setShowPassword] = useState(false)

  return (
    <form
      className="flex flex-col gap-4 text-sm 2xl:text-[16px]"
      onSubmit={register}
    >
      {/* Full Name */}
      <div className="xl:flex gap-4">
        <div className="w-full xl:w-1/2">
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            placeholder="Enter your first name"
            onChange={handleChange}
            value={formData.firstName}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] transition-colors"
          />
        </div>
        <div className="w-full mt-4 xl:mt-0 xl:w-1/2">
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            placeholder="Enter your last name"
            onChange={handleChange}
            value={formData.lastName}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] transition-colors"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
          Email Address
        </label>
        <input
          type="text"
          id="email"
          name="email"
          required
          placeholder="Enter your email address"
          onChange={handleChange}
          value={formData.email}
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] transition-colors"
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            placeholder="Min. 8 characters"
            onChange={handleChange}
            value={formData.password}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pr-10 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4CAF50] transition-colors"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
      </div>

      {!loading && (
        <p className="text-center text-[#81BB33] text-sm">{success}</p>
      )}
      {error && <p className="text-center text-red-400 text-sm">{error}</p>}

      <MainButton
        text={loading ? "Registration in progress..." : "Register"}
        isValidForm={isRegisterValidForm}
        passwordLength={passwordLength}
      />
    </form>
  );
};

export default Register;
