import { useEffect, useState } from "react";
import { api } from "../api/client";
import { useSelector } from "react-redux";

import { TfiCup } from "react-icons/tfi";
import { FaCrown, FaMedal, FaStar } from "react-icons/fa";
import { AiFillFire } from "react-icons/ai";
import { IoInformationCircleOutline } from "react-icons/io5";

export const Leaderboard = () => {
  const [data, setData] = useState([]);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await api.get("/leaderboard");
        setData(res.data || []);
      } catch (err) {
        console.log(err.message);
      }
    }
    loadData();
  }, []);

  function RankIcon({ rank }) {
    if (rank === 1)
      return <FaCrown size={22} className="text-yellow-500 mx-auto" />;
    if (rank === 2)
      return <FaMedal size={20} className="text-gray-400 mx-auto" />;
    if (rank === 3)
      return <FaMedal size={20} className="text-orange-400 mx-auto" />;
    return <span className="font-bold text-purple-700">{rank}</span>;
  }

  function getTagColor(rank) {
    if (rank === 1) return "bg-yellow-200 text-yellow-900";
    if (rank === 2) return "bg-gray-200 text-gray-800";
    if (rank === 3) return "bg-orange-200 text-orange-800";
    return "bg-purple-200 text-purple-900";
  }

  return (
    <div className="min-h-screen bg-[#F8F1FF] p-8">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">

        <div className="flex items-center gap-4">
          <div className="bg-[#E9D8F5] p-4 rounded-xl">
            <TfiCup size={30} className="text-purple-700" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-purple-900">
              Leaderboard
            </h1>
            <p className="text-gray-600 text-sm">
              Top players ranked by performance
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-[#E9D8F5] px-5 py-2 rounded-xl">
        <IoInformationCircleOutline className="text-purple-700" />
        <div>
            <p className="text-sm font-semibold text-purple-800">
              Last Updated
            </p>
           <p className="text-xs text-gray-600">Just now</p>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow border border-purple-200 overflow-hidden">

        <table className="w-full table-fixed text-sm">

          {/* HEADER */}
          <thead>
            <tr className="bg-[#B57EDC] text-white">
              <th className="w-[8%] py-3 text-center">#</th>
              <th className="w-[32%] text-center">Player</th>
              <th className="w-[10%] text-center">Wins</th>
              <th className="w-[10%] text-center">Losses</th>
              <th className="w-[10%] text-center">Games</th>
              <th className="w-[12%] text-center">Streak</th>
              <th className="w-[18%] text-center">Rating</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody className="text-gray-900">

            {data.map((u) => {
              const isMe = user?._id === u._id;

              return (
                <tr
                  key={u._id}
                  className={`border-b ${
                    isMe
                      ? "bg-purple-100 border-l-4 border-purple-500"
                      : "hover:bg-purple-50"
                  }`}
                >
                  {/* RANK */}
                  <td className="text-center py-4">
                    <RankIcon rank={u.rank} />
                  </td>

                  {/* ✅ PLAYER COLUMN (VERTICAL FIX) */}
                  <td className="py-4 text-center">
                    <div className="flex flex-col items-center justify-center gap-1">

                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center font-bold text-purple-800">
                        {u.name?.charAt(0) || "U"}
                      </div>

                      {/* Name */}
                      <span className="font-semibold text-gray-900">
                        {u.name}
                      </span>

                      {/* YOU BADGE */}
                      {isMe && (
                        <span className="bg-purple-600 text-white px-2 py-[2px] rounded text-xs font-semibold">
                          You
                        </span>
                      )}

                    </div>
                  </td>

                  {/* WINS */}
                  <td className="text-center font-bold text-green-600">
                    {u.stats?.wins ?? 0}
                  </td>

                  {/* LOSSES */}
                  <td className="text-center font-bold text-red-500">
                    {u.stats?.looses ?? u.stats?.loss ?? 0}
                  </td>

                  {/* GAMES */}
                  <td className="text-center">
                    {u.stats?.gamesPlayed ?? 0}
                  </td>

                  {/* STREAK */}
                  <td className="text-center">
                    <div className="flex justify-center items-center gap-1 font-bold">
                      <AiFillFire className="text-orange-500" />
                      <span>{u.stats?.currentStreak ?? 0}</span>
                    </div>
                  </td>

                  {/* RATING */}
                  <td className="text-center">
                    <div
                      className={`${getTagColor(
                        u.rank
                      )} px-3 py-1 rounded-full inline-flex items-center justify-center gap-1`}
                    >
                      <FaStar />
                      {u.stats?.rating ?? 0}
                    </div>
                  </td>
                </tr>
              );
            })}

          </tbody>
        </table>
      </div>
    </div>
  );
};