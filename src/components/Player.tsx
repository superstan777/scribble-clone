import { PlayerInterface } from "../utility/types";
import { usePlayerStore } from "../utility/store";

interface Props {
  player: PlayerInterface;
  index: number;
}

export const Player: React.FC<Props> = ({ player, index }) => {
  const { playerId } = usePlayerStore();

  const backgroundColor = player.guessed ? "bg-green-500" : "bg-white";

  return (
    <div
      className={`flex justify-between p-2 my-2 rounded-lg ${backgroundColor}`}
    >
      <div className="flex items-center">#{index + 1}</div>
      <div>
        {player.id === playerId ? (
          <p>{player.name} (You)</p>
        ) : (
          <p>{player.name}</p>
        )}

        <p>{player.score} Points</p>
      </div>
    </div>
  );
};
