// // import { useDispatch, useSelector } from "react-redux";
// // import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
// // import { logout } from "../slices/authSlice";

// // import { FaChessKnight, FaTrophy, FaUser, FaSignOutAlt } from "react-icons/fa";

// // export const Navbar = () => {
// //   const user = useSelector((state) => state.auth.user);
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();

// //   function handleLogout() {
// //     dispatch(logout());
// //     navigate("/login");
// //   }

// //   return (
// //     <div>
// //       {/* NAVBAR */}
// //       <div className="px-6 py-4 bg-[#B57EDC] text-white shadow-md flex justify-between items-center">

// //         {/* Logo */}
// //         <div className="flex items-center gap-2 text-xl font-semibold">
// //           <FaChessKnight className="text-2xl" />
// //           <Link to="/lobby" className="hover:opacity-90">
// //             Chess Lobby
// //           </Link>
// //         </div>

// //         {/* RIGHT SIDE */}
// //         <div>
// //           {user ? (
// //             <div className="flex gap-6 items-center">

// //               <NavLink
// //                 to="/leaderboard"
// //                 className={({ isActive }) =>
// //                   `flex items-center gap-1 px-3 py-1 rounded-lg transition ${
// //                     isActive
// //                       ? "bg-white text-[#7A4FA3]"
// //                       : "hover:bg-[#9F6ED0]"
// //                   }`
// //                 }
// //               >
// //                 <FaTrophy /> Leaderboard
// //               </NavLink>

// //               <NavLink
// //                 to="/profile"
// //                 className={({ isActive }) =>
// //                   `flex items-center gap-1 px-3 py-1 rounded-lg transition ${
// //                     isActive
// //                       ? "bg-white text-[#7A4FA3]"
// //                       : "hover:bg-[#9F6ED0]"
// //                   }`
// //                 }
// //               >
// //                 <FaUser /> Profile
// //               </NavLink>

// //               <button
// //                 onClick={handleLogout}
// //                 className="flex items-center gap-1 px-3 py-1 rounded-lg bg-red-400 hover:bg-red-500 transition"
// //               >
// //                 <FaSignOutAlt /> Logout
// //               </button>

// //             </div>
// //           ) : (
// //             <div className="flex gap-4">
// //               <Link className="hover:underline" to="/login">
// //                 Login
// //               </Link>
// //               <Link className="hover:underline" to="/signup">
// //                 Signup
// //               </Link>
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       <Outlet />
// //     </div>
// //   );
// // };


// import { useDispatch, useSelector } from "react-redux";
// import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
// import { logout } from "../slices/authSlice";

// import { FaChessKnight, FaTrophy, FaUser, FaSignOutAlt } from "react-icons/fa";

// export const Navbar = () => {
//   const user = useSelector((state) => state.auth.user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   function handleLogout() {
//     dispatch(logout());
//     navigate("/login");
//   }

//   return (
//     <div>
//       {/* NAVBAR */}
//       <div className="px-6 py-4 bg-[#B57EDC] text-white shadow-md flex justify-between items-center">

//         {/* LOGO */}
//         <div className="flex items-center gap-2 text-xl font-semibold">
//           <FaChessKnight className="text-2xl" />
//           <Link to="/lobby" className="hover:opacity-90">
//             Chess Lobby
//           </Link>
//         </div>

//         {/* RIGHT SIDE */}
//         <div>
//           {user ? (
//             <div className="flex gap-6 items-center">

//               {/* LEADERBOARD */}
//               <NavLink
//                 to="/leaderboard"
//                 className={({ isActive }) =>
//                   `flex items-center gap-2 px-3 py-1 rounded-lg transition ${
//                     isActive
//                       ? "bg-white text-[#7A4FA3]"
//                       : "hover:bg-[#9F6ED0]"
//                   }`
//                 }
//               >
//                 <FaTrophy />
//                 Leaderboard
//               </NavLink>

//               {/* LOGOUT */}
//               <button
//                 onClick={handleLogout}
//                 className="flex items-center gap-2 px-3 py-1 rounded-lg bg-red-400 hover:bg-red-500 transition"
//               >
//                 <FaSignOutAlt />
//                 Logout
//               </button>

//               {/* PROFILE (ICON ONLY) */}
//               <NavLink
//                 to="/profile"
//                 className={({ isActive }) =>
//                   `flex items-center justify-center p-2 rounded-full transition ${
//                     isActive
//                       ? "bg-white text-[#7A4FA3]"
//                       : "hover:bg-[#9F6ED0]"
//                   }`
//                 }
//               >
//                 <FaUser size={20} />
//               </NavLink>

//             </div>
//           ) : (
//             <div className="flex gap-4">
//               <Link className="hover:underline" to="/login">
//                 Login
//               </Link>
//               <Link className="hover:underline" to="/signup">
//                 Signup
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>

//       <Outlet />
//     </div>
//   );
// };

import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { logout } from "../slices/authSlice";
import { useState } from "react";

import { FaChessKnight, FaTrophy, FaUser, FaSignOutAlt } from "react-icons/fa";

export const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeItem, setActiveItem] = useState("");

  function handleLogout() {
    setActiveItem("logout");
    dispatch(logout());
    navigate("/login");
  }

  return (
    <div>
      {/* NAVBAR */}
      <div className="px-6 py-4 bg-[#B57EDC] text-white shadow-md flex justify-between items-center">

        {/* LOGO */}
        <div className="flex items-center gap-2 text-xl font-semibold">
          <FaChessKnight className="text-2xl" />
          <Link to="/lobby">Chess Lobby</Link>
        </div>

        {/* RIGHT SIDE */}
        {user && (
          <div className="flex gap-6 items-center">

            {/* LEADERBOARD */}
            <NavLink
              to="/leaderboard"
              onClick={() => setActiveItem("")}
              className={({ isActive }) =>
                `flex items-center gap-2 pb-1 border-b-2 transition ${
                  isActive
                    ? "border-white"
                    : "border-transparent hover:border-white/60"
                }`
              }
            >
              <FaTrophy />
              Leaderboard
            </NavLink>

            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className={`flex items-center gap-2 pb-1 border-b-2 transition ${
                activeItem === "logout"
                  ? "border-white"
                  : "border-transparent hover:border-white/60"
              }`}
            >
              <FaSignOutAlt />
              Logout
            </button>

            {/* PROFILE ICON ONLY */}
            <NavLink
              to="/profile"
              onClick={() => setActiveItem("")}
              className={({ isActive }) =>
                `flex items-center justify-center pb-1 border-b-2 transition ${
                  isActive
                    ? "border-white"
                    : "border-transparent hover:border-white/60"
                }`
              }
            >
              <FaUser size={20} />
            </NavLink>

          </div>
        )}
      </div>

      <Outlet />
    </div>
  );
};