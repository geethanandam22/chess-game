// // import { useState } from "react";
// // import { connectSocket, socket } from "../socket";
// // import { useNavigate } from "react-router-dom";
// // import { AiFillPlusCircle } from "react-icons/ai";
// // import { FaPlus, FaSignInAlt } from "react-icons/fa";

// // export const Lobby = () => {
// //   const [roomCode, setRoomCode] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");

// //   const navigate = useNavigate();

// //   function ensureConnection(callback) {
// //     connectSocket();

// //     if (!socket.connected) {
// //       socket.once("connect", callback);
// //     } else {
// //       callback();
// //     }
// //   }

// //   /* ================= CREATE ROOM ================= */
// //   function createRoom() {
// //     setLoading(true);
// //     setError("");

// //     ensureConnection(() => {
// //       socket.emit("room:create", (response) => {
// //         setLoading(false);

// //         if (!response?.ok) {
// //           return setError(response?.message || "Failed to create room");
// //         }

// //         navigate(`/rooms/${response.room.roomCode}`);
// //       });
// //     });
// //   }

// //   /* ================= JOIN ROOM ================= */
// //   function joinRoom() {
// //     const formattedCode = roomCode.trim().toUpperCase();

// //     if (!formattedCode) {
// //       return setError("Please enter a room code");
// //     }

// //     setLoading(true);
// //     setError("");

// //     ensureConnection(() => {
// //       socket.emit("room:join", formattedCode, (response) => {
// //         setLoading(false);

// //         if (!response?.ok) {
// //           return setError(response?.message || "Failed to join room");
// //         }

// //         navigate(`/rooms/${response.room.roomCode}`);
// //       });
// //     });
// //   }

// //   /* ================= JOIN AS SPECTATOR ================= */
// //   function joinSpectator() {
// //     const formattedCode = roomCode.trim().toUpperCase();

// //     if (!formattedCode) {
// //       return setError("Please enter a room code");
// //     }

// //     setLoading(true);
// //     setError("");

// //     ensureConnection(() => {
// //       socket.emit("room:join-spectator", formattedCode, (response) => {
// //         setLoading(false);

// //         if (!response?.ok) {
// //           return setError(response?.message || "Failed to join as spectator");
// //         }

// //         navigate(`/rooms/${response.room.roomCode}`);
// //       });
// //     });
// //   }

// //   return (
// //     <div
// //       className="min-h-screen w-full flex flex-col items-center justify-center gap-10 p-4 relative overflow-hidden"
// //       style={{
// //         background: `
// //           linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 50%, rgba(240, 147, 251, 0.9) 100%),
// //           repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.05) 35px, rgba(255,255,255,.05) 70px),
// //           repeating-linear-gradient(-45deg, transparent, transparent 35px, rgba(255,255,255,.05) 35px, rgba(255,255,255,.05) 70px)
// //         `,
// //         backgroundAttachment: "fixed",
// //       }}
// //     >
// //       {/* Welcome */}
// //       <div className="text-center text-white">
// //         <h1 className="text-4xl font-bold">♟️ Welcome to Chess</h1>
// //         <p className="mt-2 text-lg">
// //           Create a room or join an existing one to start playing
// //         </p>
// //       </div>

// //       {/* Error */}
// //       {error && (
// //         <div className="bg-red-500 text-white px-6 py-2 rounded shadow font-semibold">
// //           {error}
// //         </div>
// //       )}

// //       <div className="flex items-stretch gap-12 flex-wrap justify-center">

// //         {/* CREATE */}
// //         <div className="bg-gradient-to-br from-purple-400 to-purple-600 shadow-2xl w-[350px] p-8 rounded-2xl flex flex-col gap-4 items-center text-center text-white hover:shadow-2xl hover:scale-105 transition-all duration-300">

// //           <AiFillPlusCircle
// //             size={60}
// //             color="#FFFFFF"
// //             onClick={createRoom}
// //             className="cursor-pointer hover:scale-110 transition drop-shadow-lg"
// //           />

// //           <h2 className="text-2xl font-bold drop-shadow-sm">
// //             Create Room
// //           </h2>

// //           <p className="text-purple-100">
// //             Start a new game and share the room code.
// //           </p>

// //           <button
// //             onClick={createRoom}
// //             disabled={loading}
// //             className="px-6 py-3 rounded-lg text-purple-700 font-bold bg-white hover:bg-purple-50 transition-all disabled:opacity-50"
// //           >
// //             {loading ? "Creating..." : "Create"}
// //           </button>
// //         </div>

// //         {/* JOIN */}
// //         <div className="bg-gradient-to-br from-indigo-400 to-indigo-600 shadow-2xl w-[350px] p-8 rounded-2xl flex flex-col gap-4 items-center text-center text-white hover:shadow-2xl hover:scale-105 transition-all duration-300">

// //           <FaSignInAlt size={40} className="text-white drop-shadow-lg" />

// //           <h2 className="text-2xl font-bold drop-shadow-sm">
// //             Join Room
// //           </h2>

// //           <input
// //             autoFocus
// //             type="text"
// //             placeholder="ENTER ROOM CODE"
// //             value={roomCode}
// //             onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
// //             onKeyDown={(e) => e.key === "Enter" && joinRoom()}
// //             className="w-full p-3 rounded-lg border-2 border-indigo-300 text-center 
// //                        text-black font-bold text-lg tracking-widest
// //                        bg-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-500"
// //           />

// //           <button
// //             onClick={joinRoom}
// //             disabled={!roomCode.trim() || loading}
// //             className="w-full py-3 rounded-lg bg-white text-indigo-600 font-bold hover:bg-indigo-50 transition-all disabled:opacity-50"
// //           >
// //             {loading ? "Joining..." : "Join as Player"}
// //           </button>

// //           <button
// //             onClick={joinSpectator}
// //             disabled={!roomCode.trim() || loading}
// //             className="w-full py-3 rounded-lg bg-indigo-300 text-white font-bold hover:bg-indigo-200 transition-all disabled:opacity-50"
// //           >
// //             Join as Spectator
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// import { useState } from "react";
// import { connectSocket, socket } from "../socket";
// import { useNavigate } from "react-router-dom";
// import { AiFillPlusCircle } from "react-icons/ai";
// import { FaPlus, FaSignInAlt } from "react-icons/fa";

// export const Lobby = () => {
//   const [roomCode, setRoomCode] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const navigate = useNavigate();

//   function ensureConnection(callback) {
//     connectSocket();

//     if (!socket.connected) {
//       socket.once("connect", callback);
//     } else {
//       callback();
//     }
//   }

//   /* ================= CREATE ROOM ================= */
//   function createRoom() {
//     setLoading(true);
//     setError("");

//     ensureConnection(() => {
//       socket.emit("room:create", (response) => {
//         setLoading(false);

//         if (!response?.ok) {
//           return setError(response?.message || "Failed to create room");
//         }

//         navigate(`/rooms/${response.room.roomCode}`);
//       });
//     });
//   }

//   /* ================= JOIN ROOM ================= */
//   function joinRoom() {
//     const formattedCode = roomCode.trim().toUpperCase();

//     if (!formattedCode) {
//       return setError("Please enter a room code");
//     }

//     setLoading(true);
//     setError("");

//     ensureConnection(() => {
//       socket.emit("room:join", formattedCode, (response) => {
//         setLoading(false);

//         if (!response?.ok) {
//           return setError(response?.message || "Failed to join room");
//         }

//         navigate(`/rooms/${response.room.roomCode}`);
//       });
//     });
//   }

//   /* ================= JOIN AS SPECTATOR ================= */
//   function joinSpectator() {
//     const formattedCode = roomCode.trim().toUpperCase();

//     if (!formattedCode) {
//       return setError("Please enter a room code");
//     }

//     setLoading(true);
//     setError("");

//     ensureConnection(() => {
//       socket.emit("room:join-spectator", formattedCode, (response) => {
//         setLoading(false);

//         if (!response?.ok) {
//           return setError(response?.message || "Failed to join as spectator");
//         }

//         navigate(`/rooms/${response.room.roomCode}`);
//       });
//     });
//   }

//   return (
//     <div
//       className="min-h-screen w-full flex flex-col items-center justify-center gap-10 p-4 relative overflow-hidden"
//       style={{
//         backgroundImage: `
//           linear-gradient(135deg, rgba(102, 126, 234, 0.85) 0%, rgba(118, 75, 162, 0.85) 50%, rgba(240, 147, 251, 0.85) 100%),
//           url("https://images.unsplash.com/photo-1528819622765-d6bcf132f793")
//         `,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//         backgroundAttachment: "fixed",
//       }}
//     >
//       {/* Welcome */}
//       <div className="text-center text-white">
//         <h1 className="text-4xl font-bold">♟️ Welcome to Chess</h1>
//         <p className="mt-2 text-lg">
//           Create a room or join an existing one to start playing
//         </p>
//       </div>

//       {/* Error */}
//       {error && (
//         <div className="bg-red-500 text-white px-6 py-2 rounded shadow font-semibold">
//           {error}
//         </div>
//       )}

//       <div className="flex items-stretch gap-12 flex-wrap justify-center">

//         {/* CREATE */}
//         <div className="bg-gradient-to-br from-purple-400 to-purple-600 shadow-2xl w-[350px] p-8 rounded-2xl flex flex-col gap-4 items-center text-center text-white hover:shadow-2xl hover:scale-105 transition-all duration-300">

//           <AiFillPlusCircle
//             size={60}
//             color="#FFFFFF"
//             onClick={createRoom}
//             className="cursor-pointer hover:scale-110 transition drop-shadow-lg"
//           />

//           <h2 className="text-2xl font-bold drop-shadow-sm">
//             Create Room
//           </h2>

//           <p className="text-purple-100">
//             Start a new game and share the room code.
//           </p>

//           <button
//             onClick={createRoom}
//             disabled={loading}
//             className="px-6 py-3 rounded-lg text-purple-700 font-bold bg-white hover:bg-purple-50 transition-all disabled:opacity-50"
//           >
//             {loading ? "Creating..." : "Create"}
//           </button>
//         </div>

//         {/* JOIN */}
//         <div className="bg-gradient-to-br from-indigo-400 to-indigo-600 shadow-2xl w-[350px] p-8 rounded-2xl flex flex-col gap-4 items-center text-center text-white hover:shadow-2xl hover:scale-105 transition-all duration-300">

//           <FaSignInAlt size={40} className="text-white drop-shadow-lg" />

//           <h2 className="text-2xl font-bold drop-shadow-sm">
//             Join Room
//           </h2>

//           <input
//             autoFocus
//             type="text"
//             placeholder="ENTER ROOM CODE"
//             value={roomCode}
//             onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
//             onKeyDown={(e) => e.key === "Enter" && joinRoom()}
//             className="w-full p-3 rounded-lg border-2 border-indigo-300 text-center 
//                        text-black font-bold text-lg tracking-widest
//                        bg-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-500"
//           />

//           <button
//             onClick={joinRoom}
//             disabled={!roomCode.trim() || loading}
//             className="w-full py-3 rounded-lg bg-white text-indigo-600 font-bold hover:bg-indigo-50 transition-all disabled:opacity-50"
//           >
//             {loading ? "Joining..." : "Join as Player"}
//           </button>

//           <button
//             onClick={joinSpectator}
//             disabled={!roomCode.trim() || loading}
//             className="w-full py-3 rounded-lg bg-indigo-300 text-white font-bold hover:bg-indigo-200 transition-all disabled:opacity-50"
//           >
//             Join as Spectator
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

import { useState } from "react";
import { connectSocket, socket } from "../socket";
import { useNavigate } from "react-router-dom";
import { AiFillPlusCircle } from "react-icons/ai";
import { FaSignInAlt } from "react-icons/fa";

export const Lobby = () => {
  const [roomCode, setRoomCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  function ensureConnection(callback) {
    connectSocket();

    if (!socket.connected) {
      socket.once("connect", callback);
    } else {
      callback();
    }
  }

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
      className="min-h-screen w-full flex flex-col items-center justify-center gap-10 p-4"
      style={{
        backgroundImage: `
          linear-gradient(rgba(88, 28, 135, 0.75), rgba(126, 34, 206, 0.75)),
          url("https://images.unsplash.com/photo-1528819622765-d6bcf132f793")
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Title */}
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold">♟️ Welcome to Chess</h1>
        <p className="mt-2 text-lg">
          Create a room or join an existing one to start playing
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-500 text-white px-6 py-2 rounded shadow font-semibold">
          {error}
        </div>
      )}

      <div className="flex gap-12 flex-wrap justify-center">

        {/* CREATE ROOM */}
        <div className="w-[350px] p-8 rounded-2xl flex flex-col items-center text-center text-white gap-4
          bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl
          hover:scale-105 transition">

          <AiFillPlusCircle
            size={60}
            onClick={createRoom}
            className="cursor-pointer hover:scale-110 transition"
          />

          <h2 className="text-2xl font-bold">Create Room</h2>

          <p className="text-purple-100">
            Start a new game and share the room code.
          </p>

          <button
            onClick={createRoom}
            disabled={loading}
            className="px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 font-bold w-full"
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>

        {/* JOIN ROOM */}
        <div className="w-[350px] p-8 rounded-2xl flex flex-col items-center text-center text-white gap-4
          bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl
          hover:scale-105 transition">

          <FaSignInAlt size={40} />

          <h2 className="text-2xl font-bold">Join Room</h2>

          <input
            autoFocus
            type="text"
            placeholder="ENTER ROOM CODE"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === "Enter" && joinRoom()}
            className="w-full p-3 rounded-lg text-center text-black font-bold tracking-widest
                       bg-white/90 focus:outline-none"
          />

          <button
            onClick={joinRoom}
            disabled={!roomCode.trim() || loading}
            className="w-full py-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 font-bold"
          >
            {loading ? "Joining..." : "Join as Player"}
          </button>

          <button
            onClick={joinSpectator}
            disabled={!roomCode.trim() || loading}
            className="w-full py-3 rounded-lg bg-indigo-300 hover:bg-indigo-400 text-black font-bold"
          >
            Join as Spectator
          </button>
        </div>
      </div>
    </div>
  );
};