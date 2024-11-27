import { useGameStore, usePlayerStore } from "../utility/store";
import { socket } from "../utility/socket";
import { useState } from "react";
import { Button } from "./Button";

export const Lobby = () => {
  const { playerId } = usePlayerStore();
  const { game } = useGameStore();
  const [roundDuration, setRoundDuration] = useState(30);
  const [roundAmount, setRoundAmount] = useState(1);

  const buttonHandler = () => {
    socket.emit("start game", playerId, roundDuration, roundAmount);
  };

  const renderLobby = () => {
    if (game?.admin === playerId) {
      return (
        <div>
          <div>
            <p>Round duration:</p>
            <div className="rounded-lg overflow-hidden border-2 text-2xl font-bold">
              <button
                className={`p-4 w-1/3 ${
                  roundDuration === 30 ? "bg-gray-300" : ""
                }`}
                onClick={() => setRoundDuration(30)}
              >
                30
              </button>
              <button
                className={`p-4 w-1/3 border-y-gray-400 border-x-2 ${
                  roundDuration === 60 ? "bg-gray-300" : ""
                }`}
                onClick={() => setRoundDuration(60)}
              >
                60
              </button>
              <button
                className={`p-4 w-1/3 ${
                  roundDuration === 90 ? "bg-gray-300" : ""
                }`}
                onClick={() => setRoundDuration(90)}
              >
                90
              </button>
            </div>
          </div>

          <div>
            <p>Rounds per player:</p>
            <div className="rounded-lg overflow-hidden border-2 text-2xl font-bold">
              <button
                className={`p-4 w-1/3 ${
                  roundAmount === 1 ? "bg-gray-300" : ""
                }`}
                onClick={() => setRoundAmount(1)}
              >
                1
              </button>
              <button
                className={`p-4 w-1/3 border-y-gray-400 border-x-2 ${
                  roundAmount === 2 ? "bg-gray-300" : ""
                }`}
                onClick={() => setRoundAmount(2)}
              >
                2
              </button>
              <button
                className={`p-4 w-1/3 ${
                  roundAmount === 3 ? "bg-gray-300" : ""
                }`}
                onClick={() => setRoundAmount(3)}
              >
                3
              </button>
            </div>
          </div>

          <Button text="Start" handler={buttonHandler} />
        </div>
      );
    } else {
      return (
        <div className="text-center text-2xl font-bold">
          Waiting for game to start
        </div>
      );
    }
  };

  return (
    <div className="w-full flex justify-center items-center bg-white h-5/6 rounded-lg">
      {renderLobby()}
    </div>
  );
};
