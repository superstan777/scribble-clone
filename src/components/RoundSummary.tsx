import { useWordStore, usePlayersStore } from "../utility/store";

export const RoundSummary = () => {
  const { word } = useWordStore();
  const { players } = usePlayersStore();

  const renderPlayers = () => {
    if (players) {
      const sortedPlayers = players.sort((a, b) => b.score - a.score);

      return sortedPlayers.map((player) => {
        return (
          <div key={player.id}>
            {player.name}: {player.lastRoundPoints} points{" "}
          </div>
        );
      });
    }
  };

  return (
    <div className="text-center text-2xl bg-white h-5/6 flex flex-col justify-center items-center rounded-lg">
      <p>The word was</p>
      <p className="font-bold text-3xl">{word?.word}</p>
      {renderPlayers()}
    </div>
  );
};
