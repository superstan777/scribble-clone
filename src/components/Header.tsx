import { Timer } from "./Timer";
import { useWordStore, useGameStore } from "../utility/store";

export const Header = () => {
  const { game } = useGameStore();
  const { word } = useWordStore();

  const renderContent = () => {
    if (game?.gameState === "pending") {
      return (
        <div className="text-center text-2xl font-bold">
          Waiting for all players
        </div>
      );
    }
    if (game?.gameState === "ended") {
      return <div className="text-center text-2xl font-bold">Game ended</div>;
    }

    if (game?.gameState === "inProgress") {
      return (
        <div className="flex items-center justify-between w-full h-full">
          <Timer />
          <h1 className="text-xl font-bold w-2/6">{renderWord()}</h1>
          <div className="text-xl font-bold w-2/6 text-right">
            Round {game.roundAmount - game.roundsLeft + 1} of {game.roundAmount}
          </div>
        </div>
      );
    }
  };

  const renderWord = () => {
    if (word?.word) {
      return word.word;
    } else {
      const renderChars = () => {
        return word.chars.map((char, index) => {
          return <div key={index}>{char}</div>;
        });
      };

      return (
        <div className="flex gap-2 justify-center items-center">
          {renderChars()}
        </div>
      );
    }
  };

  return (
    <div className="w-full bg-white px-16 py-8 rounded-lg h-[10%] flex items-center justify-center">
      {renderContent()}
    </div>
  );
};
