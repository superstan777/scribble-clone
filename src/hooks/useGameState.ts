import { useEffect } from "react";
import { socket } from "../utility/socket";
import { GameStateInterface } from "../utility/types";
import { useGameStore } from "../utility/store";

export const useGameState = () => {
  const { game, setGame } = useGameStore();

  const handleGameState = (data: GameStateInterface) => {
    setGame(data);
  };

  console.log(game);

  useEffect(() => {
    socket.on("update game state", handleGameState);

    return () => {
      socket.off("update game state", handleGameState);
    };
  }, []);

  return game;
};
