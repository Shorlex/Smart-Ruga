"use client";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import MainButton from "./MainButton";
import { EyeOff, Eye } from "lucide-react";

const Login = () => {
  const {
    login,
    formData,
    handleChange,
    success,
    loading,
    error,
    passwordLength,
    isLoginValidForm,
  } = useAuth();

  const [showPassword, setShowPassword] = useState(false)

  return (
    <div>
      <form
        className="flex flex-col gap-4 text-sm 2xl:text-[16px]"
        onSubmit={login}
      >
        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">
            Email Address
          </label>
          <input
            id="email"
            type="email"
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
              placeholder="Enter your password"
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

        {success && !loading && (
          <p className="text-center text-[#81BB33] text-sm">{success}</p>
        )}
        {error && <p className="text-center text-red-400 text-sm">{error}</p>}

        <MainButton
          text={loading ? "Logging in..." : "Login"}
          isValidForm={isLoginValidForm}
          passwordLength={passwordLength}
        />
      </form>
    </div>
  );
};

export default Login;
