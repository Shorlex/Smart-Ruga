"use client";
import { useAuth } from "../../context/AuthContext";
import MainButton from "./MainButton";

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

  return (
    <div>
      <form
        className="flex flex-col gap-3 text-sm 2xl:text-[16px]"
        onSubmit={login}
      >
        <div>
          <label htmlFor="email">Email Address</label>
          <br />
          <input
            id="email"
            className="py-2 px-4 w-full bg-[#a3a3a3]/10 rounded-2xl outline-gray-200 mt-2"
            type="email"
            name="email"
            required
            placeholder="Enter your email address"
            onChange={handleChange}
            value={formData.email}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <br />
          <input
            id="password"
            className="py-2 px-4 w-full bg-[#a3a3a3]/10 rounded-2xl outline-gray-200 mt-2"
            type="password"
            name="password"
            required
            placeholder="Enter your password"
            onChange={handleChange}
            value={formData.password}
          />
        </div>

        {success && !loading && (
          <p className="text-center text-[#81BB33]">{success}</p>
        )}
        {error && <p className="text-center text-red-400">{error}</p>}

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
