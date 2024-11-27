import { socket } from "../utility/socket";
import { usePlayerStore } from "../utility/store";

interface Props {
  word: string;
}

// add hover
export const Word: React.FC<Props> = ({ word }) => {
  const { playerId } = usePlayerStore();

  const selectWord = () => {
    socket.emit("set word", playerId, word);
  };

  return (
    <div className="bg-white px-8 py-4 rounded-lg " onClick={selectWord}>
      {word}
    </div>
  );
};
