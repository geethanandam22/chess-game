

// import { useState } from "react";
// import { connectSocket, socket } from "../socket";
// import { useNavigate } from "react-router-dom";
// import { AiFillPlusCircle } from "react-icons/ai";
// import { FaPlus, FaSignInAlt } from "react-icons/fa";

// export const Lobby = () => {
//   const [roomCode, setRoomCode] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   // ================= CREATE ROOM =================
//   function createRoom() {
//     setLoading(true);

//     connectSocket();

//     if (!socket.connected) {
//       socket.once("connect", emitCreateRoom);
//     } else {
//       emitCreateRoom();
//     }

//     function emitCreateRoom() {
//       socket.emit("room:create", (response) => {
//         setLoading(false);

//         if (!response?.ok) {
//           return alert(response?.message || "Failed to create room");
//         }

//         navigate(`/rooms/${response.room.roomCode}`);
//       });
//     }
//   }

//   // ================= JOIN ROOM =================
//   function joinRoom() {
//     if (!roomCode.trim()) {
//       return alert("Enter Room Code");
//     }

//     setLoading(true);

//     connectSocket();

//     if (!socket.connected) {
//       socket.once("connect", emitJoinRoom);
//     } else {
//       emitJoinRoom();
//     }

//     function emitJoinRoom() {
//       socket.emit("room:join", roomCode.trim().toUpperCase(), (response) => {
//         setLoading(false);

//         if (!response?.ok) {
//           return alert(response?.message || "Failed to join the room");
//         }

//         navigate(`/rooms/${response.room.roomCode}`);
//       });
//     }
//   }

//   return (
//     <div
//       className="min-h-screen w-full flex flex-col items-center justify-center gap-10"
//       style={{
//         backgroundImage: "url('/chess-bg.png')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       {/* Welcome */}
//       <div className="text-center text-white">
//         <h1 className="text-4xl font-bold">Welcome to Chess</h1>
//         <p className="mt-2">
//           Create a room or join an existing one to start playing
//         </p>
//       </div>

//       {/* Cards */}
//       <div className="flex items-stretch gap-12 flex-wrap justify-center">

//         {/* CREATE ROOM */}
//         <div className="bg-white shadow-xl w-[350px] p-8 rounded-xl flex flex-col gap-4 items-center text-center hover:shadow-2xl transition">

//           <AiFillPlusCircle
//             size={55}
//             color="#CDBADA"
//             onClick={createRoom}
//             className="cursor-pointer hover:scale-110 transition"
//           />

//           <h2 className="text-2xl text-[#B072BA] font-bold">
//             Create Room
//           </h2>

//           <p className="text-gray-600">
//             Start a new game and invite your friend
//           </p>

//           <button
//             onClick={createRoom}
//             disabled={loading}
//             className={`px-6 py-3 rounded text-white font-bold flex items-center gap-2 transition ${
//               loading
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-[#B072BA] hover:scale-105"
//             }`}
//           >
//             <FaPlus />
//             {loading ? "Creating..." : "Create"}
//           </button>
//         </div>

//         {/* DIVIDER */}
//         <div className="flex flex-col items-center justify-center">
//           <div className="w-[2px] flex-1 bg-gradient-to-b from-transparent via-white to-transparent"></div>

//           <div className="my-3 px-4 py-1 rounded-full bg-white text-[#B072BA] font-bold shadow-lg">
//             OR
//           </div>

//           <div className="w-[2px] flex-1 bg-gradient-to-b from-transparent via-white to-transparent"></div>
//         </div>

//         {/* JOIN ROOM */}
//         <div className="bg-white shadow-xl w-[350px] p-8 rounded-xl flex flex-col gap-4 items-center text-center hover:shadow-2xl transition">

//           <FaSignInAlt size={35} className="text-[#CDBADA]" />

//           <h2 className="text-2xl text-[#B072BA] font-bold">
//             Join Room
//           </h2>

//           <p className="text-gray-600">
//             Enter a room code to join a game
//           </p>

//           <input
//             className="p-3 border rounded w-full text-center uppercase focus:outline-none focus:ring-2 focus:ring-[#B072BA]"
//             type="text"
//             placeholder="Enter room code"
//             value={roomCode}
//             onChange={(e) =>
//               setRoomCode(e.target.value.toUpperCase())
//             }
//           />

//           <button
//             onClick={joinRoom}
//             disabled={!roomCode || loading}
//             className={`py-3 rounded text-white font-bold w-full transition ${
//               !roomCode || loading
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-[#B072BA] hover:scale-105"
//             }`}
//           >
//             {loading ? "Joining..." : "Join"}
//           </button>
//         </div>
//       </div>

//       {/* HOW IT WORKS */}
//       <div className="bg-white/80 backdrop-blur-md px-10 py-6 rounded-xl shadow-lg text-center">
//         <h3 className="text-lg font-semibold mb-4">
//           💡 How it works
//         </h3>

//         <div className="flex gap-10 justify-center flex-wrap">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-bold">
//               1
//             </div>
//             <p>Create or join a room</p>
//           </div>

//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-bold">
//               2
//             </div>
//             <p>Wait for an opponent</p>
//           </div>

//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-bold">
//               3
//             </div>
//             <p>Play chess in real-time</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };




import { useState } from "react";
import { connectSocket, socket } from "../socket";
import { useNavigate } from "react-router-dom";
import { AiFillPlusCircle } from "react-icons/ai";
import { FaPlus, FaSignInAlt } from "react-icons/fa";

export const Lobby = () => {
  const [roomCode, setRoomCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // ✅ Reusable socket connection handler
  function ensureConnection(callback) {
    connectSocket();

    if (!socket.connected) {
      socket.once("connect", callback);
    } else {
      callback();
    }
  }

  // ================= CREATE ROOM =================
  function createRoom() {
    setLoading(true);
    setError("");

    ensureConnection(() => {
      socket.emit("room:create", (response) => {
        setLoading(false);

        if (!response?.ok) {
          return setError(response?.message || "Failed to create room");
        }

        navigate(`/rooms/${response.room.roomCode}`);
      });
    });
  }

  // ================= JOIN ROOM =================
  function joinRoom() {
    const formattedCode = roomCode.trim().toUpperCase();

    if (!formattedCode) {
      return setError("Please enter a room code");
    }

    setLoading(true);
    setError("");

    ensureConnection(() => {
      socket.emit("room:join", formattedCode, (response) => {
        setLoading(false);

        if (!response?.ok) {
          return setError(response?.message || "Failed to join room");
        }

        navigate(`/rooms/${response.room.roomCode}`);
      });
    });
  }

  // ================= JOIN AS SPECTATOR =================
  function joinSpectator() {
    const formattedCode = roomCode.trim().toUpperCase();

    if (!formattedCode) {
      return setError("Please enter a room code");
    }

    setLoading(true);
    setError("");

    ensureConnection(() => {
      socket.emit("room:join-spectator", formattedCode, (response) => {
        setLoading(false);

        if (!response?.ok) {
          return setError(response?.message || "Failed to join as spectator");
        }

        navigate(`/rooms/${response.room.roomCode}`);
      });
    });
  }

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center gap-10"
      style={{
        backgroundImage: "url('/chess-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Welcome */}
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold">Welcome to Chess</h1>
        <p className="mt-2">
          Create a room or join an existing one to start playing
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-500 text-white px-6 py-2 rounded shadow">
          {error}
        </div>
      )}

      {/* Cards */}
      <div className="flex items-stretch gap-12 flex-wrap justify-center">

        {/* CREATE ROOM */}
        <div className="bg-white shadow-xl w-[350px] p-8 rounded-xl flex flex-col gap-4 items-center text-center hover:shadow-2xl transition">

          <AiFillPlusCircle
            size={55}
            color="#CDBADA"
            onClick={createRoom}
            className="cursor-pointer hover:scale-110 transition"
          />

          <h2 className="text-2xl text-[#B072BA] font-bold">
            Create Room
          </h2>

          <p className="text-gray-600">
            Start a new game and invite your friend
          </p>

          <button
            onClick={createRoom}
            disabled={loading}
            className={`px-6 py-3 rounded text-white font-bold flex items-center gap-2 transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#B072BA] hover:scale-105"
            }`}
          >
            <FaPlus />
            {loading ? "Creating..." : "Create"}
          </button>
        </div>

        {/* DIVIDER */}
        <div className="flex flex-col items-center justify-center">
          <div className="w-[2px] flex-1 bg-gradient-to-b from-transparent via-white to-transparent"></div>

          <div className="my-3 px-4 py-1 rounded-full bg-white text-[#B072BA] font-bold shadow-lg">
            OR
          </div>

          <div className="w-[2px] flex-1 bg-gradient-to-b from-transparent via-white to-transparent"></div>
        </div>

        {/* JOIN ROOM */}
        <div className="bg-white shadow-xl w-[350px] p-8 rounded-xl flex flex-col gap-4 items-center text-center hover:shadow-2xl transition">

          <FaSignInAlt size={35} className="text-[#CDBADA]" />

          <h2 className="text-2xl text-[#B072BA] font-bold">
            Join Room
          </h2>

          <p className="text-gray-600">
            Enter a room code to join a game
          </p>

          <input
            autoFocus
            className="p-3 border rounded w-full text-center uppercase focus:outline-none focus:ring-2 focus:ring-[#B072BA]"
            type="text"
            placeholder="Enter room code"
            value={roomCode}
            onChange={(e) =>
              setRoomCode(e.target.value.toUpperCase())
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") joinRoom();
            }}
          />

          <button
            onClick={joinRoom}
            disabled={!roomCode.trim() || loading}
            className={`py-3 rounded text-white font-bold w-full transition ${
              !roomCode.trim() || loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#B072BA] hover:scale-105"
            }`}
          >
            {loading ? "Joining..." : "Join as Player"}
          </button>

          <button
            onClick={joinSpectator}
            disabled={!roomCode.trim() || loading}
            className="py-3 rounded text-white font-bold w-full bg-green-500 hover:scale-105 transition"
          >
            Join as Spectator
          </button>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="bg-white/80 backdrop-blur-md px-10 py-6 rounded-xl shadow-lg text-center">
        <h3 className="text-lg font-semibold mb-4">
          💡 How it works
        </h3>

        <div className="flex gap-10 justify-center flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-bold">
              1
            </div>
            <p>Create or join a room</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-bold">
              2
            </div>
            <p>Wait for an opponent</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-bold">
              3
            </div>
            <p>Play chess in real-time</p>
          </div>
        </div>
      </div>
    </div>
  );
};