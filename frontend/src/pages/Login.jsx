import { useDispatch } from "react-redux";
import { fetchMe, login } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      setLoading(true);

      await dispatch(login({ email, password })).unwrap();
      await dispatch(fetchMe()).unwrap();

      navigate("/lobby");
    } catch (err) {
      console.error("Login Error:", err);
      alert(
        "Login failed: " +
          (typeof err === "string"
            ? err
            : err?.message || "Please check your credentials.")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      
      {/* ✨ Login Card */}
      <div className="p-10 rounded-2xl shadow-xl bg-purple-100 border border-purple-300 w-full max-w-md">
        
        <h2 className="text-3xl font-bold text-purple-800 mb-6 text-center">
          Welcome Back ♟️
        </h2>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          
          {/* Email */}
          <label className="flex flex-col text-gray-700 font-medium">
            Email
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              required
              className="mt-1 p-2.5 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
            />
          </label>

          {/* Password */}
          <label className="flex flex-col text-gray-700 font-medium">
            Password
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              required
              className="mt-1 p-2.5 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
            />
          </label>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 px-4 rounded-md shadow-md transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Guest Button */}
          <button
            type="button"
            onClick={() => navigate("/guest")}
            className="bg-purple-400 hover:bg-purple-500 text-white p-2 rounded-md"
          >
            Join as Guest
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-gray-600 mt-5">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-purple-700 font-medium cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};