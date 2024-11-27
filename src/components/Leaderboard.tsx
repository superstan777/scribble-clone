import {
  usePlayersStore,
  useGameStore,
  usePlayerStore,
} from "../utility/store";
import { PlayerInterface } from "../utility/types";
import { Button } from "./Button";
import { socket } from "../utility/socket";

export const Leaderboard = () => {
  const { playerId } = usePlayerStore();
  const { players } = usePlayersStore();
  const { game } = useGameStore();

  const renderPlayers = () => {
    if (players) {
      const sortedPlayers = players.sort((a, b) => b.score - a.score);

      return sortedPlayers.map((player: PlayerInterface, index) => (
        <div key={player.id}>
          #{index + 1} {player.name}: {player.score}{" "}
        </div>
      ));
    }
  };

  const restartGame = () => {
    if (game?.gameState === "ended" && game?.admin === playerId) {
      socket.emit("restart game", playerId);
    }
  };

  return (
    <div className="text-center text-2xl  bg-white h-5/6 flex flex-col justify-center items-center rounded-lg">
      {renderPlayers()}
      {game?.admin === playerId && (
        <Button text="Play again" handler={restartGame} />
      )}
    </div>
  );
};
