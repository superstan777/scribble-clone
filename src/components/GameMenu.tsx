// import { useState, useEffect } from "react";
// import { socket } from "../utility/socket";
// import { usePlayerStore } from "../utility/store";

// export const GameMenu = () => {
//   const { setPlayerId, setPlayerName } = usePlayerStore();
//   const [input, setInput] = useState("");
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     socket.on(
//       "is name valid",
//       (data: { success: boolean; message: string }) => {
//         if (data.success) {
//           setPlayerName(input);
//           setPlayerId(socket.id!);
//           setError(null);
//         } else {
//           setError(data.message);
//         }
//       }
//     );

//     return () => {
//       socket.off("name validation result");
//     };
//   }, [input]);

//   const submitHandler = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!input.trim()) {
//       setError("Name cannot be empty!");
//       return;
//     }
//     socket.emit("set player name", input);
//   };

//   return (
//     <form
//       className="w-2/6 h-2/4 bg-white rounded-lg flex flex-col"
//       onSubmit={submitHandler}
//     >
//       <input
//         className="border-2 border-black m-8 p-4"
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         placeholder="Enter your name"
//       />
//       {error && <p className="text-red-500 m-4">{error}</p>}
//       <button className="bg-green-500 text-white p-4 text-2xl rounded-lg m-8">
//         Play
//       </button>
//     </form>
//   );
// };

import { useState, useEffect } from "react";
import { socket } from "../utility/socket";
import { usePlayerStore } from "../utility/store";

export const GameMenu = () => {
  const { setPlayerId, setPlayerName } = usePlayerStore();
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Listen for player restoration
    socket.on(
      "player restored",
      (data: {
        success: boolean;
        player: { id: string; name: string };
        message: string;
      }) => {
        if (data.success) {
          setPlayerName(data.player.name);
          setPlayerId(data.player.id);
          setError(null);
        }
      }
    );

    // Listen for name validation results
    socket.on(
      "is name valid",
      (data: { success: boolean; message: string }) => {
        if (data.success) {
          setPlayerName(input);
          setPlayerId(socket.id!);
          setError(null);
        } else {
          setError(data.message);
        }
      }
    );

    return () => {
      socket.off("player restored");
      socket.off("is name valid");
    };
  }, [input, setPlayerId, setPlayerName]);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) {
      setError("Name cannot be empty!");
      return;
    }
    socket.emit("set player name", input);
  };

  return (
    <form
      className="w-2/6 h-2/4 bg-white rounded-lg flex flex-col"
      onSubmit={submitHandler}
    >
      <input
        className="border-2 border-black m-8 p-4"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter your name"
      />
      {error && <p className="text-red-500 m-4">{error}</p>}
      <button className="bg-green-500 text-white p-4 text-2xl rounded-lg m-8">
        Play
      </button>
    </form>
  );
};
