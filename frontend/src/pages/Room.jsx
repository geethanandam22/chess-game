// 

import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { connectSocket, socket } from "../socket";
import { useSelector } from "react-redux";
import { Chessboard } from "@gustavotoyota/react-chessboard";

import { FaUserCircle } from "react-icons/fa";
import { FiHash, FiClock, FiCalendar, FiCopy, FiCheck } from "react-icons/fi";

export const Room = () => {
  const { roomCode } = useParams();

  const [room, setRoom] = useState({});
  const [fen, setFen] = useState("start");
  const [turn, setTurn] = useState("w");

  const [whiteMs, setWhiteMs] = useState(300000);
  const [blackMs, setBlackMs] = useState(300000);

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [showChat, setShowChat] = useState(false); 
  const [copied, setCopied] = useState(false);

  const timerRef = useRef(null);

  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    connectSocket();

    socket.emit("room:join", roomCode, (res) => {
      if (!res?.ok) return;
      setRoom(res.room || {});
    });

    socket.on("room:update", (data) => setRoom(data || {}));

    socket.emit("game:state", roomCode, (res) => {
      if (!res?.ok) return;

      setFen(res.state?.fen || "start");
      setTurn(res.state?.turn || "w");

      setWhiteMs(res.clock?.whiteMs ?? 300000);
      setBlackMs(res.clock?.blackMs ?? 300000);
    });

    socket.on("game:update", (data) => {
      setFen(data?.fen || "start");
      setTurn(data?.turn || "w");

      setWhiteMs((prev) => data?.whiteMs ?? prev);
      setBlackMs((prev) => data?.blackMs ?? prev);
    });

    socket.emit("chat:history", roomCode, (res) => {
      if (res?.ok) setMessages(res.messages);
    });

    socket.on("chat:new", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("room:update");
      socket.off("game:update");
      socket.off("chat:new");
    };
  }, [roomCode]);

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    if (!room.players || room.players.length < 2) return;

    timerRef.current = setInterval(() => {
      setWhiteMs((prev) => {
        if (turn === "w" && prev > 0) return prev - 1000;
        return prev;
      });

      setBlackMs((prev) => {
        if (turn === "b" && prev > 0) return prev - 1000;
        return prev;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [turn, room.players]);

  function onDrop(source, target) {
    socket.emit("game:move", roomCode, source, target, "q");
    return true;
  }

  function convertTime(ms) {
    const t = Math.max(0, Math.floor((ms || 0) / 1000));
    const m = String(Math.floor(t / 60)).padStart(2, "0");
    const s = String(t % 60).padStart(2, "0");
    return `${m}:${s}`;
  }

  function getColor(index) {
    if (index === 0) return "♙ White";
    if (index === 1) return "♟ Black";
    return "👀 Spectator";
  }

  function sendMessage() {
    if (!text.trim()) return;
    socket.emit("chat:send", roomCode, text);
    setText("");
  }

  function copyCode() {
    navigator.clipboard.writeText(roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="min-h-screen bg-[#F8F1FF] p-6">

      <div className="flex items-center gap-3 mb-4">
        <h1 className="text-2xl font-bold text-purple-900">Room:</h1>

        <div className="flex items-center gap-2 bg-purple-100 px-3 py-1 rounded">
          <span className="text-purple-700 font-bold">#{roomCode}</span>

          <button onClick={copyCode}>
            {copied ? <FiCheck className="text-green-600" /> : <FiCopy className="text-purple-700" />}
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">

        <div className="w-full lg:w-[30%] flex flex-col gap-6">

          <div className="bg-white p-5 rounded-xl shadow border">
            <h2 className="font-bold text-lg text-purple-800 mb-3 flex items-center gap-2">
              <FaUserCircle /> Players ({room.players?.length || 0})
            </h2>

            {room.players?.length > 0 ? (
              room.players.map((p, index) => {
                const isMe = user?._id === p.userId;

                return (
                  <div
                    key={p.userId}
                    className={`flex justify-between items-center p-3 rounded mb-2 ${
                      isMe ? "bg-purple-300 font-bold" : "bg-purple-300"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <FaUserCircle />
                      {p.name} {isMe && "(You)"}
                    </div>
                    <span>{getColor(index)}</span>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-600">Waiting for players...</p>
            )}
          </div>

          <div className="bg-white p-5 rounded-xl shadow border">
            <h2 className="font-bold text-lg text-purple-800 mb-3">Game Info</h2>

            <div className="border-t border-gray-200 mb-3"></div>

            <div className="flex justify-between items-center text-gray-700 py-2 border-b">
              <span className="flex items-center gap-2">
                <FiClock /> Time Control
              </span>
              <span className="font-semibold">5:00 + 0</span>
            </div>

            <div className="flex justify-between items-center text-gray-700 py-2 border-b">
              <span className="flex items-center gap-2">
                <FiHash /> Status
              </span>
              <span className="bg-green-200 px-2 py-1 rounded text-sm font-semibold">
                {room.players?.length < 2 ? "Waiting" : "Running"}
              </span>
            </div>

            <div className="flex justify-between items-center text-gray-700 py-2">
              <span className="flex items-center gap-2">
                <FiCalendar /> Created
              </span>
              <span className="font-semibold">Just now</span>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[70%] bg-white p-5 rounded-xl shadow">

          <div className="flex justify-between mb-4">
            <div className="font-bold text-purple-900">
              Turn: {turn === "w" ? "White" : "Black"}
            </div>

            <div className="flex gap-4">
              <div className="bg-purple-300 px-3 py-1 rounded font-bold">
                White: {convertTime(whiteMs)}
              </div>
              <div className="bg-black text-white px-3 py-1 rounded font-bold">
                Black: {convertTime(blackMs)}
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <div
              className="w-[420px] rounded-lg overflow-hidden shadow-lg"
              style={{
                backgroundColor: "#EDE7F6",
                padding: "10px",
              }}
            >
              <Chessboard
                position={fen}
                onPieceDrop={onDrop}
                boardWidth={404}
                customLightSquareStyle={{ backgroundColor: "#FFFFFF" }}
                customDarkSquareStyle={{ backgroundColor: "#aa83ed" }}
                customBoardStyle={{
                  borderRadius: "8px",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-5 right-5 bg-purple-600 text-white p-4 rounded-full cursor-pointer shadow-lg"
      >
        💬
      </div>

      {showChat && (
        <div className="fixed bottom-20 right-5 w-[320px] bg-white rounded-xl shadow-lg flex flex-col">

          <div className="bg-purple-600 text-white p-3 flex justify-between">
            <span>Chat</span>
            <button onClick={() => setShowChat(false)}>✖</button>
          </div>

          <div className="h-[220px] overflow-y-auto p-3 bg-[#F8F1FF]">
            {messages.map((m, i) => {
              const isMe = user?._id === m.userId;

              return (
                <div key={i} className={`mb-2 ${isMe ? "text-right" : ""}`}>
                  <div
                    className={`inline-block px-3 py-2 rounded-lg ${
                      isMe
                        ? "bg-purple-600 text-white"
                        : "bg-purple-200 text-black"
                    }`}
                  >
                    {m.text || m.message}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex p-2 gap-2 border-t">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="flex-1 border px-2 py-1 rounded"
              placeholder="Type message..."
            />
            <button
              onClick={sendMessage}
              className="bg-purple-600 text-white px-3 rounded"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};