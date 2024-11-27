import { useEffect } from "react";
import { PlayerInterface } from "../utility/types";
import { socket } from "../utility/socket";
import { usePlayersStore } from "../utility/store";

export const usePlayers = () => {
  const { players, setPlayers } = usePlayersStore();

  const handlePlayers = (data: PlayerInterface[]) => {
    setPlayers(data);
  };

  useEffect(() => {
    socket.on("update players", handlePlayers);

    return () => {
      socket.off("update players", handlePlayers);
    };
  }, []);

  return players;
};
