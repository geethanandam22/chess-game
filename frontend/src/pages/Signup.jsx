
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signup } from "../slices/authSlice";
import { useState } from "react";

export const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      setLoading(true);
      await dispatch(signup({ name, email, password })).unwrap();
      navigate("/login");
    } catch (err) {
      console.log(err);
      alert("Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      
      {/* 💎 Signup Card */}
      <div className="p-10 rounded-2xl shadow-xl bg-purple-100 border border-purple-300 w-full max-w-md">
        
        <h2 className="text-3xl font-bold text-purple-800 mb-6 text-center">
          Create Account ♟️
        </h2>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          
          {/* Name */}
          <label className="flex flex-col text-gray-700 font-medium">
            Name
            <input
              type="text"
              name="name"
              placeholder="Enter name"
              required
              className="mt-1 p-2.5 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
            />
          </label>

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

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 px-4 rounded-md shadow-md transition disabled:opacity-50"
          >
            {loading ? "Signing up..." : "Signup"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-gray-600 mt-5">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-purple-700 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};