// 
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { connectSocket, socket } from "../socket";
import { useSelector } from "react-redux";
import { Chessboard } from "@gustavotoyota/react-chessboard";
import { IoArrowBack } from "react-icons/io5";
import { IoPeopleCircle } from "react-icons/io5";
import { MdAccessTime } from "react-icons/md";
import { ImExit } from "react-icons/im";
import { IoMdPeople } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import { FaHashtag } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { FaChess } from "react-icons/fa";
import { FaLightbulb } from "react-icons/fa";

export const Room = () => {
  const { roomCode } = useParams();
  const [room, setRoom] = useState(null);
  const [fen, setFen] = useState(null);
  const [turn, setTurn] = useState(null);
  const [whiteMs, setWhiteMs] = useState(null);
  const [blackMs, setBlackMs] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isSpectator, setIsSpectator] = useState(false);
  const [text, setText] = useState("");

  const guest = JSON.parse(localStorage.getItem("guest"));
  const user = useSelector((state) => state.auth.user) || {
    _id: guest?.id,
    name: guest?.name,
  };
  const navigate = useNavigate();

  useEffect(() => {
    connectSocket();

    socket.emit("room:join", roomCode, (response) => {
      if (!response?.ok)
        return alert(response?.message || "Failed to join room");
      setRoom(response.room);
      setIsSpectator(
        response?.room?.spectators?.some(
          (s) => s.userId.toString() === user._id.toString(),
        ),
      );
    });

    socket.emit("game:state", roomCode, (response) => {
      if (!response?.ok)
        return alert(response?.message || "Failed to fetch game state");
      setFen(response?.state?.fen);
      setTurn(response?.state?.turn);
      setWhiteMs(response?.clock?.whiteMs);
      setBlackMs(response?.clock?.blackMs);
    });

    socket.emit("chat:history", roomCode, (response) => {
      if (!response?.ok) {
        alert(response?.message || "Failed top fetch history");
        return;
      }
      setMessages(response?.messages);
    });
  }, [roomCode, user._id]);

  useEffect(() => {
    connectSocket();
    const onPresence = (data) => {
      setRoom(data);
    };

    socket.on("room:presence", onPresence);

    const onUpdate = (state) => {
      console.log("game:update", state.fen);
      setFen(state.fen);
      setTurn(state.turn);
    };

    socket.on("game:update", onUpdate);
    // Add "game:over" event listener

    const onEnd = (result) => {
      alert(result);
    };

    socket.on("game:over", onEnd);

    function onClock(c) {
      if (roomCode !== c.roomCode) return;
      setWhiteMs(c.whiteMs);
      setBlackMs(c.blackMs);
    }

    socket.on("clock:update", onClock);

    function onChat(message) {
      setMessages((prev) => [...prev, message]);
    }

    socket.on("chat:message", onChat);

    return () => {
      socket.off("room:presence", onPresence);
      socket.off("game:update", onUpdate);
      socket.off("game:over", onEnd);
      socket.off("clock:update", onClock);
      socket.off("chat:message", onChat);
    };
  }, [roomCode, room?.whiteId, user._id]);

  function leaveRoom() {
    // connect to the socket if not connected -> connectSocket()
    connectSocket();
    // emit a "room:leave" event with roomCode and acknowledgment () as payload
    socket.emit("room:leave", roomCode, (response) => {
      if (!response?.ok)
        return alert(response?.message || "Failed to leave room");
      // redirect to the lobby
      setRoom(response?.room);
      navigate("/lobby", { replace: true });
    });
  }

  // We emit "game:move"
  function onDrop(sourceSquare, targetSquare) {
    connectSocket();
    if (!fen) return false;
    if (isSpectator) return false;
    socket.emit(
      "game:move",
      roomCode,
      sourceSquare,
      targetSquare,
      "q",
      (response) => {
        if (!response?.ok) return alert(response?.message || "Invalid move");
      },
    );

    return true;
  }

  function convertTime(ms) {
    if (!ms) return "--:--";
    const total = Math.floor(ms / 1000);
    const m = String(Math.floor(total / 60)).padStart(2, "0");
    const s = String(Math.floor(total % 60)).padStart(2, "0");
    return `${m}:${s}`;
  }

  function onSend() {
    connectSocket();
    socket.emit("chat:send", roomCode, text.trim(), (response) => {
      if (!response?.ok) {
        alert(response?.message || "Failed to send the message");
        return;
      }
      setText("");
    });
  }

  return (
    <div className="min-h-screen p-4 md:p-10 flex flex-col gap-8 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 glass-3d p-6 rounded-2xl animate-float" style={{ animationDuration: '6s' }}>
        <div className="flex flex-col gap-2">
          <div
            onClick={() => navigate("/lobby")}
            className="flex items-center text-lg gap-2 text-blue-400 hover:text-blue-300 font-bold cursor-pointer transition-colors w-fit"
          >
            <IoArrowBack size={24} />
            Back to Lobby
          </div>
          <div className="flex gap-6 items-center">
            <IoPeopleCircle size={64} className="text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300 text-shadow-3d">
                Room: {roomCode}
              </h1>
              {room?.status === "waiting" && (
                <span className="p-2 rounded-lg bg-orange-500/20 text-orange-300 w-fit flex items-center gap-2 border border-orange-500/30">
                  <MdAccessTime size={20} className="animate-pulse" />
                  Waiting for opponent...
                </span>
              )}
            </div>
          </div>
        </div>
        <div>
          <button
            onClick={leaveRoom}
            className="bg-red-600 hover:bg-red-500 text-white font-bold p-4 rounded-xl flex items-center gap-3 box-3d shadow-red-900 transition-colors"
          >
            <ImExit size={24} />
            Leave Room
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Panel: Info */}
        <div className="flex flex-col gap-6 w-full lg:w-[30%]">
          {/* Players Card */}
          <div className="glass-3d rounded-2xl flex flex-col gap-4 p-6">
            <div className="flex items-center gap-3 text-2xl font-bold text-blue-100 border-b border-white/10 pb-4">
              <IoMdPeople size={32} className="text-blue-400" />
              Players {room?.players.length === 1 ? "(1/2)" : "(2/2)"}
            </div>
            
            {room?.players?.map((p) => (
              <div key={p.userId} className="p-4 bg-slate-800/80 border border-slate-700 rounded-xl flex gap-4 items-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <FaUserCircle size={52} className="text-indigo-400 drop-shadow-[0_0_10px_rgba(129,140,248,0.4)]" />
                <div className="flex flex-col gap-1 z-10">
                  <div className="text-xl font-bold text-slate-100 flex items-center gap-3">
                    {p.name}
                    {p.userId.toString() === user._id.toString() && (
                      <span className="bg-blue-600/30 text-blue-300 text-xs px-2 py-1 rounded-md border border-blue-500/30 font-medium">
                        You
                      </span>
                    )}
                  </div>
                  <div className="text-sm font-medium text-slate-400">
                    Color:{" "}
                    <span className={room?.status === "waiting" ? "text-slate-500" : (p.userId.toString() === room?.whiteId?.toString() ? "text-slate-200" : "text-zinc-500")}>
                      {room?.status === "waiting"
                        ? "TBD"
                        : p.userId.toString() === room?.whiteId?.toString()
                          ? "White"
                          : "Black"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            
            {room?.status === "waiting" && (
              <div className="p-4 bg-slate-800/40 border border-slate-700/50 border-dashed rounded-xl flex gap-4 items-center">
                <FaUserCircle size={52} className="text-slate-600" />
                <div className="flex flex-col gap-1">
                  <div className="text-lg font-bold text-slate-400">Waiting...</div>
                  <div className="text-sm text-slate-500">Share room code to invite</div>
                </div>
              </div>
            )}
          </div>

          {/* Room Info Card */}
          <div className="glass-3d rounded-2xl flex flex-col gap-4 p-6">
            <div className="flex gap-3 text-2xl font-bold items-center pb-4 border-b border-white/10 text-blue-100">
              <FaCircleInfo size={28} className="text-blue-400" />
              Room Info
            </div>
            <div className="flex justify-between items-center bg-slate-800/50 p-3 rounded-lg border border-slate-700 cursor-copy hover:bg-slate-700/50 transition-colors">
              <div className="flex gap-3 text-md text-slate-300 items-center">
                <FaHashtag size={20} className="text-indigo-400" />
                Room Code
              </div>
              <div className="font-bold bg-blue-600/30 border border-blue-500/50 text-blue-200 rounded-md py-1 px-3 tracking-wider">
                {roomCode}
              </div>
            </div>
            <div className="flex justify-between items-center p-2">
              <div className="flex gap-3 text-md text-slate-300 items-center">
                <MdAccessTime size={22} className="text-teal-400" />
                Time Control
              </div>
              <div className="font-bold text-slate-200">05:00 + 0</div>
            </div>
            <div className="flex justify-between items-center p-2">
              <div className="flex gap-3 text-md text-slate-300 items-center">
                <FaCalendarAlt size={20} className="text-purple-400" />
                Created
              </div>
              <div className="font-bold text-slate-200 text-sm">{room?.createdAt ? new Date(room.createdAt).toLocaleTimeString() : '...'}</div>
            </div>
          </div>
        </div>

        {/* Right Panel: Game Area */}
        <div className="w-full lg:w-[70%] flex flex-col items-center justify-center gap-8 glass-3d rounded-3xl p-6 lg:p-12 min-h-[600px] relative">
          {room?.status === "waiting" ? (
            <div className="text-center w-full flex flex-col items-center gap-8">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 blur-[80px] opacity-20 rounded-full animate-pulse-glow" />
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-12 rounded-full relative z-10 box-3d shadow-slate-950 animate-float">
                  <FaChess size={140} className="text-blue-400 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]" />
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400 text-shadow-3d">
                  Awaiting Challenger
                </h2>
                <p className="text-lg text-slate-400 max-w-md mx-auto">
                  Your battlefield is ready. Share the code below with your opponent to commence the game.
                </p>
              </div>
              
              <div className="bg-slate-900/80 border-2 border-blue-500/30 rounded-2xl p-6 flex flex-col items-center gap-4 box-3d shadow-slate-950/80">
                <span className="text-sm font-bold text-blue-400 uppercase tracking-widest">Share this Code</span>
                <div className="text-5xl font-mono font-bold text-white tracking-widest drop-shadow-[0_0_10px_rgba(59,130,246,0.6)]">
                  {roomCode}
                </div>
              </div>
              
              <div className="max-w-md border border-yellow-500/20 bg-yellow-500/10 rounded-xl p-5 flex gap-4 items-start">
                <FaLightbulb size={28} className="text-yellow-400 shrink-0 mt-1" />
                <p className="text-slate-300 text-left text-sm leading-relaxed">
                  <span className="font-bold text-yellow-400 mr-1">Tip:</span>
                  Once another player joins, the board will initialize automatically and colors will be assigned.
                </p>
              </div>
            </div>
          ) : (
            <div className="w-full flex justify-center items-center h-full relative">
              <div className="w-full max-w-[650px] flex flex-col gap-6">
                {/* Game Header / Timers */}
                <div className="glass-3d rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-center gap-4 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600" />
                  
                  <div className={`flex items-center gap-3 text-xl font-bold px-6 py-3 rounded-xl border ${turn === "w" ? "bg-slate-100 text-slate-900 border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]" : "bg-slate-800 text-slate-100 border-slate-600 shadow-[0_0_20px_rgba(0,0,0,0.5)]"} transition-all duration-300`}>
                    <div className={`w-5 h-5 rounded-full border-2 ${turn === "w" ? "bg-white border-slate-300" : "bg-zinc-900 border-slate-700"} shadow-inner`} />
                    Turn: {turn === "w" ? "White" : "Black"}
                  </div>
                  
                  <div className="flex gap-4">
                    <div className={`flex gap-3 items-center rounded-xl p-3 border-2 ${turn === 'w' ? 'border-blue-400 bg-slate-800/80 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'border-slate-700 bg-slate-900/50'} transition-all`}>
                      <div className="bg-slate-100 text-slate-900 p-2 rounded-lg box-3d shadow-slate-300/50">
                        <MdAccessTime size={24} />
                      </div>
                      <div className="flex flex-col items-start pr-2">
                        <span className="text-xs font-bold text-slate-400 uppercase">White</span>
                        <span className="text-xl font-mono font-bold text-slate-100">{convertTime(whiteMs)}</span>
                      </div>
                    </div>
                    
                    <div className={`flex gap-3 items-center rounded-xl p-3 border-2 ${turn === 'b' ? 'border-blue-400 bg-slate-800/80 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'border-slate-700 bg-slate-900/50'} transition-all`}>
                      <div className="bg-zinc-800 text-slate-100 p-2 rounded-lg box-3d shadow-zinc-950 border border-zinc-700">
                        <MdAccessTime size={24} />
                      </div>
                      <div className="flex flex-col items-start pr-2">
                        <span className="text-xs font-bold text-slate-400 uppercase">Black</span>
                        <span className="text-xl font-mono font-bold text-slate-100">{convertTime(blackMs)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Premium 3D Chessboard Wrapper */}
                <div className="flex justify-center items-center py-4">
                  <div className="relative">
                    {/* 3D Base Platform */}
                    <div className="absolute inset-0 transform translate-y-4 rounded-lg" style={{
                      background: 'linear-gradient(to bottom, #1e293b, #0f172a)',
                      boxShadow: '0 20px 40px -10px rgba(0,0,0,0.8), 0 30px 60px -15px rgba(0,0,0,0.9)',
                      border: '1px solid rgba(255,255,255,0.05)'
                    }} />
                    
                    {/* The Board Container */}
                    <div className="relative p-2 md:p-4 rounded-lg bg-[#2a1a11] shadow-[inset_0_2px_10px_rgba(0,0,0,0.8)] border-t border-l border-white/10" style={{
                      boxShadow: '0 15px 0 0 #1a0f0a, 0 15px 20px rgba(0,0,0,0.7)',
                    }}>
                      <div className="w-full h-full max-w-[500px] max-h-[500px] lg:max-w-[550px] lg:max-h-[550px] rounded shadow-[0_10px_20px_rgba(0,0,0,0.5)] overflow-hidden border-2 border-[#1a0f0a]">
                        <Chessboard
                          id="room-board"
                          position={fen || "start"}
                          onPieceDrop={onDrop}
                          animationDuration={300}
                          customDarkSquareStyle={{ backgroundColor: "#779556" }}
                          customLightSquareStyle={{ backgroundColor: "#ebecd0" }}
                          customBoardStyle={{
                            borderRadius: "2px",
                            boxShadow: "inset 0 0 10px rgba(0,0,0,0.5)"
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating 3D Chat */}
      {room?.status !== "waiting" && (
        <div className="fixed bottom-6 right-6 w-[350px] glass-3d rounded-2xl flex flex-col overflow-hidden box-3d shadow-slate-900 border border-white/10 z-50 transition-transform hover:-translate-y-1">
          <div className="h-[50px] bg-gradient-to-r from-blue-900/80 to-indigo-900/80 border-b border-white/10 flex items-center px-4 font-bold text-blue-100 text-lg shadow-md">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Live Chat
            </span>
          </div>
          
          <div className="h-[300px] flex flex-col gap-3 p-4 overflow-y-auto bg-slate-900/60 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
            {messages.length === 0 ? (
              <div className="flex-1 flex items-center justify-center text-slate-500 text-sm italic">
                No messages yet. Say hello!
              </div>
            ) : (
              messages.map((m, i) => {
                const isMe = user._id.toString() === m.userId;
                return (
                  <div key={i} className={`flex flex-col max-w-[85%] ${isMe ? 'self-end' : 'self-start'}`}>
                    <div className="text-[10px] text-slate-400 mb-1 ml-1 flex items-center gap-1">
                      {!isMe && <FaUserCircle size={10} />}
                      {m.name} <span className="opacity-50">{m.timestamp}</span>
                    </div>
                    <div className={`p-2.5 rounded-2xl text-sm shadow-md ${isMe ? 'bg-blue-600 text-white rounded-tr-sm' : 'bg-slate-700 text-slate-100 rounded-tl-sm'}`}>
                      {m.text}
                    </div>
                  </div>
                );
              })
            )}
          </div>
          
          <div className="p-3 bg-slate-800/80 border-t border-white/10 flex gap-2 w-full">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onSend()}
              placeholder="Type message..."
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-inner transition-all"
            />
            <button 
              onClick={onSend} 
              className="bg-blue-600 hover:bg-blue-500 text-white p-2 px-4 rounded-xl font-bold box-3d shadow-blue-900 transition-all active:translate-y-[2px]"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};










