// import { useSelector } from "react-redux";
// import { Chessboard } from "@gustavotoyota/react-chessboard";

// export const Profile = () => {
//   const user = useSelector((state) => state.auth.user);

//   const stats = {
//     rating: 1240,
//     games: 52,
//     wins: 30,
//     losses: 18,
//     draws: 4,
//     online: true,
//     lastGameFen: "start",
//     recent: [
//       { result: "win", opponent: "Aravind" },
//       { result: "loss", opponent: "Rahul" },
//       { result: "draw", opponent: "Sita" },
//       { result: "win", opponent: "Kiran" },
//     ],
//   };

//   return (
//     <div className="min-h-screen bg-[#F8F1FF] p-6 flex justify-center text-gray-900">

//       <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6">

//         {/* HEADER */}
//         <div className="flex items-center gap-6">

//           <img
//             src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
//             alt="avatar"
//             className="w-24 h-24 rounded-full border-4 border-purple-300"
//           />

//           <div>
//             <h2 className="text-2xl font-bold text-purple-900">
//               {user?.name || "Geetha"}
//               <span className="ml-2 bg-purple-600 text-white px-2 py-1 rounded">
//                 (You)
//               </span>
//             </h2>

//             {/* ✅ FIXED STATUS */}
//             <p className="mt-2">
//               {stats.online ? (
//                 <span className="bg-green-100 text-green-800 px-3 py-1 rounded font-semibold">
//                   🟢 Online
//                 </span>
//               ) : (
//                 <span className="bg-red-100 text-red-800 px-3 py-1 rounded font-semibold">
//                   🔴 Offline
//                 </span>
//               )}
//             </p>

//             <p className="mt-3 bg-purple-200 text-purple-900 px-3 py-1 rounded font-bold inline-block">
//               ⭐ Rating: {stats.rating}
//             </p>
//           </div>
//         </div>

//         {/* MAIN GRID */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

//           {/* LEFT SIDE */}
//           <div>

//             {/* STATS */}
//             <div className="bg-purple-50 p-4 rounded-xl mb-4 border">
//               <h3 className="font-bold text-purple-900 mb-3">
//                 Stats
//               </h3>

//               <div className="grid grid-cols-2 gap-3 text-center">

//                 <div className="bg-white p-3 rounded shadow">
//                   <p className="text-gray-600">🎮 Games</p>
//                   <p className="font-bold text-purple-900">
//                     {stats.games}
//                   </p>
//                 </div>

//                 <div className="bg-green-100 p-3 rounded">
//                   <p className="text-gray-700">✔ Wins</p>
//                   <p className="font-bold text-green-700">
//                     {stats.wins}
//                   </p>
//                 </div>

//                 <div className="bg-red-100 p-3 rounded">
//                   <p className="text-gray-700">❌ Losses</p>
//                   <p className="font-bold text-red-700">
//                     {stats.losses}
//                   </p>
//                 </div>

//                 <div className="bg-purple-100 p-3 rounded">
//                   <p className="text-gray-700">🤝 Draws</p>
//                   <p className="font-bold text-purple-800">
//                     {stats.draws}
//                   </p>
//                 </div>

//               </div>
//             </div>

//             {/* ✅ FIXED RECENT MATCHES */}
//             <div className="bg-purple-50 p-4 rounded-xl border">
//               <h3 className="font-bold text-purple-900 mb-3">
//                 Recent Matches
//               </h3>

//               {stats.recent.map((match, i) => (
//                 <div
//                   key={i}
//                   className={`flex justify-between p-3 mb-2 rounded ${
//                     match.result === "win"
//                       ? "bg-green-100"
//                       : match.result === "loss"
//                       ? "bg-red-100"
//                       : "bg-gray-100"
//                   }`}
//                 >
//                   <span className="font-semibold text-gray-900">
//                     {match.result === "win" && "✔"}
//                     {match.result === "loss" && "❌"}
//                     {match.result === "draw" && "🤝"} vs{" "}
//                     {match.opponent}
//                   </span>

//                   <span className="text-gray-800 font-bold capitalize">
//                     {match.result}
//                   </span>
//                 </div>
//               ))}
//             </div>

//           </div>

//           {/* RIGHT SIDE */}
//           <div className="flex flex-col items-center">

//             <h3 className="font-bold text-purple-900 mb-3">
//               Last Game Preview
//             </h3>

//             {/* CHESSBOARD */}
//             <div className="w-[300px]">
//               <Chessboard
//                 position={stats.lastGameFen}
//                 arePiecesDraggable={false}
//               />
//             </div>

//             <p className="mt-3 text-sm text-gray-600">
//               Preview of your last game
//             </p>

//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };/

import { useEffect, useState } from "react";
import { api } from "../api/client";
import { useSelector } from "react-redux";

export const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [file, setFile] = useState(null);

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await api.get("/auth/me");
        setProfile(res.data.user);
      } catch (err) {
        console.log(err.message);
      }
    }
    loadProfile();
  }, []);

  async function uploadImage() {
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      // TODO: Create /auth/upload-avatar endpoint in backend
      await api.post("/auth/upload-avatar", formData);
      window.location.reload(); // simple refresh
    } catch (err) {
      console.log(err.message);
    }
  }

  if (!profile) return <div>Loading...</div>;

  const stats = profile.stats || {};
  const games = stats.gamesPlayed || 0;
  const wins = stats.wins || 0;

  const winRate = games ? ((wins / games) * 100).toFixed(1) : 0;

  function getRankBadge(rating) {
    if (rating > 1800) return "🏆 Master";
    if (rating > 1400) return "🥇 Pro";
    if (rating > 1000) return "🥈 Intermediate";
    return "🥉 Beginner";
  }

  return (
    <div
      className={`min-h-screen p-6 flex justify-center ${
        darkMode ? "bg-gray-900 text-white" : "bg-[#F8F1FF]"
      }`}
    >
      <div className={`p-6 rounded-xl shadow w-[420px] text-center ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="mb-3 text-sm underline"
        >
          Toggle Dark Mode
        </button>

        {/* Avatar */}
        <div className="w-20 h-20 mx-auto rounded-full overflow-hidden bg-purple-300 flex items-center justify-center text-2xl font-bold text-white">
          {profile.avatar ? (
            <img src={profile.avatar} alt="avatar" className="w-full h-full object-cover" />
          ) : (
            profile.name?.charAt(0)
          )}
        </div>

        {/* Upload */}
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="mt-2 text-sm"
        />
        <button
          onClick={uploadImage}
          className="mt-2 bg-purple-600 text-white px-3 py-1 rounded"
        >
          Upload
        </button>

        {/* Name */}
        <h2 className="text-xl font-bold mt-3 text-purple-900 dark:text-white">
          {profile.name}
        </h2>

        {/* Rank Badge */}
        <div className="mt-2 text-sm font-semibold">
          {getRankBadge(stats.rating || 0)}
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 gap-4 text-sm">

          <div className="bg-purple-100 p-3 rounded">
            <p className="font-bold text-green-600">{wins}</p>
            <p>Wins</p>
          </div>

          <div className="bg-purple-100 p-3 rounded">
            <p className="font-bold text-red-500">{stats.loss || 0}</p>
            <p>Losses</p>
          </div>

          <div className="bg-purple-100 p-3 rounded">
            <p className="font-bold">{games}</p>
            <p>Games</p>
          </div>

          <div className="bg-purple-100 p-3 rounded">
            <p className="font-bold text-orange-500">
              {stats.currentStreak || 0}
            </p>
            <p>Streak</p>
          </div>

        </div>

        {/* Win Rate */}
        <div className="mt-4">
          <p className="font-bold">Win Rate</p>
          <div className="w-full bg-gray-200 rounded h-3 mt-1">
            <div
              className="bg-green-500 h-3 rounded"
              style={{ width: `${winRate}%` }}
            ></div>
          </div>
          <p className="text-sm mt-1">{winRate}%</p>
        </div>

        {/* Rating */}
        <div className="mt-5 bg-purple-600 text-white py-2 rounded font-bold">
          Rating: {stats.rating || 0}
        </div>

        {/* Match History (UI only) */}
        <div className="mt-6 text-left">
          <h3 className="font-bold mb-2">Recent Matches</h3>

          <div className="bg-purple-100 p-2 rounded mb-2">
            Win vs Player123
          </div>

          <div className="bg-red-100 p-2 rounded mb-2">
            Loss vs Player456
          </div>

          <div className="bg-purple-100 p-2 rounded">
            Win vs Player789
          </div>
        </div>

      </div>
    </div>
  );
};