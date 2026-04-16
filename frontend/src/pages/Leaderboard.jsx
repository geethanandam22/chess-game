// import { useState, useEffect, useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { AuthContext } from "../contexts/AuthContext";
// import {
//   getUserProfileApi,
//   followUserApi,
//   unfollowUserApi,
//   getUserPostsApi,
// } from "../api/users.api";
// import {
//   IoArrowBack,
//   IoPersonAdd,
//   IoPersonRemove,
//   IoSettingsSharp,
// } from "react-icons/io5";

// export const Profile = () => {
//   const { userId } = useParams();
//   const navigate = useNavigate();
//   const { user: currentUser } = useContext(AuthContext);

//   const [profile, setProfile] = useState(null);
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [isFollowing, setIsFollowing] = useState(false);

//   const isOwnProfile = currentUser?._id === userId;

//   useEffect(() => {
//     async function loadProfile() {
//       setLoading(true);
//       try {
//         const profileData = await getUserProfileApi(userId);
//         const postsData = await getUserPostsApi(userId);

//         setProfile(profileData);
//         setPosts(postsData);
//         setIsFollowing(
//           profileData.followers?.includes(currentUser?._id)
//         );
//       } catch (err) {
//         console.error("Error loading profile:", err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     if (userId) loadProfile();
//   }, [userId, currentUser]);

//   const handleFollowToggle = async () => {
//     try {
//       if (isFollowing) {
//         await unfollowUserApi(userId);
//       } else {
//         await followUserApi(userId);
//       }
//       setIsFollowing(!isFollowing);
//     } catch (err) {
//       console.error("Error toggling follow:", err);
//     }
//   };

//   if (loading)
//     return <div className="text-white p-8">Loading...</div>;

//   if (!profile)
//     return <div className="text-white p-8">Profile not found</div>;

//   return (
//     <div className="w-full max-w-4xl mx-auto text-white bg-black min-h-screen">
      
//       {/* Header */}
//       <div className="sticky top-0 p-4 border-b border-gray-800 bg-black/80 backdrop-blur flex items-center gap-4 z-40">
//         <button
//           onClick={() => navigate(-1)}
//           className="hover:bg-gray-900 p-2 rounded-full"
//         >
//           <IoArrowBack size={24} />
//         </button>

//         <div>
//           <h2 className="text-lg font-bold">{profile.username}</h2>
//           <p className="text-xs text-gray-400">
//             {posts.length} posts
//           </p>
//         </div>
//       </div>

//       {/* Profile Section */}
//       <div className="p-6 border-b border-gray-800">
//         <div className="flex gap-8 mb-8">
          
//           <img
//             src={
//               profile.profileImg ||
//               "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=988&auto=format&fit=crop"
//             }
//             alt={profile.username}
//             className="w-40 h-40 rounded-full object-cover border-2 border-gray-700"
//           />

//           <div className="flex-1">
            
//             <div className="flex items-center gap-4 mb-4">
//               <h1 className="text-3xl font-bold">
//                 {profile.username}
//               </h1>

//               {isOwnProfile ? (
//                 <button
//                   onClick={() => navigate("/settings")}
//                   className="flex items-center gap-2 px-6 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg font-semibold transition-all"
//                 >
//                   <IoSettingsSharp size={20} />
//                   Edit Profile
//                 </button>
//               ) : (
//                 <button
//                   onClick={handleFollowToggle}
//                   className={`flex items-center gap-2 px-6 py-2 rounded-lg font-semibold transition-all ${
//                     isFollowing
//                       ? "bg-gray-800 hover:bg-gray-700"
//                       : "bg-blue-600 hover:bg-blue-700"
//                   }`}
//                 >
//                   {isFollowing ? (
//                     <>
//                       <IoPersonRemove size={20} />
//                       Following
//                     </>
//                   ) : (
//                     <>
//                       <IoPersonAdd size={20} />
//                       Follow
//                     </>
//                   )}
//                 </button>
//               )}
//             </div>

//             <p className="text-lg font-semibold mb-2">
//               {profile.name}
//             </p>

//             <p className="text-gray-300 mb-6">
//               {profile.bio || "No bio added"}
//             </p>

//             <div className="flex gap-12">
              
//               <div className="text-center">
//                 <span className="block font-bold text-2xl">
//                   {posts.length}
//                 </span>
//                 <span className="text-gray-400 text-sm">
//                   Posts
//                 </span>
//               </div>

//               <button
//                 onClick={() =>
//                   alert("Followers list coming soon!")
//                 }
//                 className="text-center hover:opacity-70"
//               >
//                 <span className="block font-bold text-2xl">
//                   {profile.followers?.length || 0}
//                 </span>
//                 <span className="text-gray-400 text-sm">
//                   Followers
//                 </span>
//               </button>

//               <button
//                 onClick={() =>
//                   alert("Following list coming soon!")
//                 }
//                 className="text-center hover:opacity-70"
//               >
//                 <span className="block font-bold text-2xl">
//                   {profile.following?.length || 0}
//                 </span>
//                 <span className="text-gray-400 text-sm">
//                   Following
//                 </span>
//               </button>

//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Posts */}
//       <div className="p-6">
//         <h2 className="text-xl font-bold mb-6">Posts</h2>

//         {posts.length > 0 ? (
//           <div className="grid grid-cols-3 gap-4">
            
//             {posts.map((post) => (
//               <div
//                 key={post._id}
//                 className="aspect-square bg-gray-900 rounded-lg overflow-hidden group cursor-pointer relative"
//               >
//                 <img
//                   src={post.imageUrl}
//                   alt={post.caption}
//                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
//                 />

//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
//                   <div className="flex gap-6 text-white">
                    
//                     <span className="font-bold">
//                       ❤️ {post.likes?.length || 0}
//                     </span>

//                     <span className="font-bold">
//                       💬 {post.commentCount || 0}
//                     </span>

//                   </div>
//                 </div>
//               </div>
//             ))}

//           </div>
//         ) : (
//           <div className="text-gray-400 text-center py-16">
//             <p className="text-lg">No posts yet</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };



import { useEffect } from "react";
import { api } from "../api/client";
import { useState } from "react";
import { useSelector } from "react-redux";
import { TfiCup } from "react-icons/tfi";
import { IoShieldOutline } from "react-icons/io5";
import { FaGamepad } from "react-icons/fa";
import { AiFillFire } from "react-icons/ai";
import { FaStar } from "react-icons/fa6";
import { FaRegUserCircle } from "react-icons/fa";
import { GiPodiumWinner } from "react-icons/gi";
import { GiPodiumSecond } from "react-icons/gi";
import { GiPodiumThird } from "react-icons/gi";

export const Leaderboard = () => {
  const [data, setData] = useState([]);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await api.get("/leaderboard");
        console.log(res.data);
        setData(res.data);
      } catch (err) {
        console.log(err.message);
      }
    }

    loadData();
  }, []);

  function RankIcon({ rank }) {
    if (rank === 1) return <GiPodiumWinner color="#b18d18" size={34} />;
    else if (rank === 2) return <GiPodiumSecond color="#728b96" size={34} />;
    else if (rank === 3) return <GiPodiumThird color="#ae7c61" size={34} />;
    return rank;
  }

  function getTagColor(row) {
    const colors = [
      "bg-blue-200 text-blue-800",
      "bg-yellow-200 text-yellow-800",
      "bg-orange-200 text-orange-800",
      "bg-green-200 text-green-800",
    ];
    const index = row % colors.length;
    return colors[index];
  }

  return (
    <div className="flex flex-col gap-10 p-10 w-[100%]">
      <div className="flex gap-4 items-center">
        <div className="bg-blue-200 p-4 rounded">
          <TfiCup size={40} color="#2a3a8a" />
        </div>
        <div>
          <h1 className="text-4xl text-blue-900">Leaderboard</h1>
          <p className="text-gray-500">Top players ranked by performance</p>
        </div>
      </div>
      <div className="rounded rounded-[20px] w-[100%] overflow-hidden">
        <table className="rounded border text-xl w-[100%]">
          <thead>
            <tr className="bg-blue-800 text-white">
              <th className="p-4">#</th>
              <th>
                <div className="flex items-center gap-2">Name</div>
              </th>
              <th>
                <div className="flex items-center gap-2">
                  <TfiCup />
                  Wins
                </div>
              </th>
              <th>
                <div className="flex items-center gap-2">
                  <IoShieldOutline />
                  Losses
                </div>
              </th>
              <th>
                <div className="flex items-center gap-2">
                  <FaGamepad />
                  Games Played
                </div>
              </th>
              <th>
                <div className="flex items-center gap-2">
                  <AiFillFire />
                  Streak
                </div>
              </th>
              <th>
                <div className="flex items-center gap-2">
                  <FaStar />
                  Rating
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="font-bold">
            {data.map((u) => (
              <tr
                className={
                  user._id.toString() === u._id.toString()
                    ? "bg-yellow-100 border border-l-[10px] border-l-yellow-400"
                    : "border"
                }
              >
                <td className="p-6">
                  <RankIcon rank={u.rank} />
                </td>
                <td>
                  <div className="flex gap-2 items-center">
                    <FaRegUserCircle size={30} />
                    {u.name}
                  </div>
                </td>
                <td className="text-green-700">{u.stats.wins}</td>
                <td className="text-red-600">{u.stats.losses}</td>
                <td>{u.stats.gamesPlayed}</td>
                <td
                  className={u.stats.currentStreak > 0 ? "text-green-600" : ""}
                >
                  <div className="flex gap-2 items-center">
                    <AiFillFire />
                    {u.stats.currentStreak}
                  </div>
                </td>
                <td>
                  <div
                    className={
                      getTagColor(u.rank) +
                      " flex gap-4 items-center pt-2 pb-2 pl-6 pr-6 rounded rounded-full bg-blue-200 w-fit"
                    }
                  >
                    <FaStar />
                    {u.stats.rating}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};