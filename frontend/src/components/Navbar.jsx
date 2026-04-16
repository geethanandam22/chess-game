// import { useDispatch, useSelector } from "react-redux";
// import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
// import { logout } from "../slices/authSlice";

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
//       <div className="p-4 bg-purple-200 flex justify-between items-center">
//         <div>
//           <Link to="/lobby">Lobby</Link>
//         </div>

//         <div>
//           {user ? (
//             <div className="flex gap-4">
//               <NavLink to="/leaderboard">Leaderboard</NavLink>
//               <NavLink to="/profile">Profile</NavLink>
//               <button onClick={handleLogout}>Logout</button>
//             </div>
//           ) : (
//             <div className="flex gap-4">
//               <Link to="/login">Login</Link>
//               <Link to="/signup">Signup</Link>
//             </div>
//           )}
//         </div>
//       </div>

//       <div >
//         <Outlet />
//       </div>
//     </div>
//   );
// };



import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { logout } from "../slices/authSlice";

// ✅ Icons
import { FaChessKnight, FaTrophy, FaUser, FaSignOutAlt } from "react-icons/fa";

export const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(logout());
    navigate("/login");
  }

  return (
    <div>
      <div className="p-4 bg-purple-200 flex justify-between items-center">
        
        {/* 🔥 Lobby with icon */}
        <div className="flex items-center gap-2">
          <FaChessKnight />
          <Link to="/lobby">Lobby</Link>
        </div>

        <div>
          {user ? (
            <div className="flex gap-4 items-center">

              {/* Leaderboard */}
              <NavLink to="/leaderboard" className="flex items-center gap-1">
                <FaTrophy /> Leaderboard
              </NavLink>

              {/* Profile */}
              <NavLink to="/profile" className="flex items-center gap-1">
                <FaUser /> Profile
              </NavLink>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-1"
              >
                <FaSignOutAlt /> Logout
              </button>

            </div>
          ) : (
            <div className="flex gap-4">
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </div>
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  );
};