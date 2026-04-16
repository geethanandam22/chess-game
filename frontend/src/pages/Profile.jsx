// // import { useState } from "react";
// // import { api} from "../api/client"; // your axios instance

// // export const Profile = () => {
// //   const [file, setFile] = useState(null);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (!file) {
// //       alert("Select a file first");
// //       return;
// //     }

// //     const formData = new FormData();
// //     formData.append("file", file);

// //     try {
// //       const res = await api.post("/uploads", formData);
// //       console.log(res.data);
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   return (
// //     <form onSubmit={handleSubmit}>
// //       <input
// //         onChange={(e) => setFile(e.target.files[0]
// //         )}type="file"
// //       />

// //       <button type="submit">Upload</button>
// //     </form>
// //   );
// // };

// import { useState } from "react";
// import { api } from "../api/client";
// import bgImage from "../assets/chess-bg.jpg";

// export const Profile = () => {
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!file) {
//       alert("Select a file first");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       setLoading(true);
//       const res = await api.post("/uploads", formData);
//       console.log(res.data);
//       alert("Upload successful ✅");
//     } catch (err) {
//       console.error(err);
//       alert("Upload failed ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center relative overflow-hidden"
//       style={{
//         backgroundImage: `url(${bgImage})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       {/* 🌫 Overlay */}
//       <div className="absolute inset-0 bg-gradient-to-br from-purple-900/60 via-purple-800/50 to-purple-900/60 backdrop-blur-sm"></div>

//       {/* 💎 Profile Card */}
//       <div className="relative z-10 p-10 rounded-2xl shadow-2xl bg-white/80 backdrop-blur-xl border border-purple-300 w-full max-w-md text-center">
//         <h2 className="text-3xl font-bold text-purple-700 mb-6">
//           👤 Profile
//         </h2>

//         <form onSubmit={handleSubmit} className="flex flex-col gap-5">
//           {/* File Input */}
//           <input
//             type="file"
//             onChange={(e) => setFile(e.target.files[0])}
//             className="p-2 border border-gray-300 rounded-md bg-white cursor-pointer"
//           />

//           {/* Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition disabled:opacity-50"
//           >
//             {loading ? "Uploading..." : "Upload"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };



import { useState } from "react";
import { api } from "../api/client";

export const Profile = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const res = await api.post("/uploads", formData);
      console.log(res.data);
      alert("Upload successful ✅");
    } catch (err) {
      console.error(err);
      alert("Upload failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
      {/* 💎 Profile Card */}
      <div className="p-10 rounded-2xl shadow-2xl bg-white border border-gray-200 w-full max-w-md text-center">
        
        <h2 className="text-3xl font-bold text-purple-700 mb-6">
          👤 Profile
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          
          {/* File Input */}
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="p-2 border border-gray-300 rounded-md bg-white cursor-pointer"
          />

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </form>
      </div>
    </div>
  );
};