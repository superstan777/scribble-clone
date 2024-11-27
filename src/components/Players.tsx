import { PlayerInterface } from "../utility/types";
import { Player } from "./Player";

import { usePlayersStore } from "../utility/store";

export const Players = () => {
  const { players } = usePlayersStore();
  console.log(players);

  const renderPlayers = () => {
    if (players) {
      const sortedPlayers = players.sort((a, b) => b.score - a.score);

      return sortedPlayers.map((player: PlayerInterface, index) => (
        <Player key={index} player={player} index={index} />
      ));
    }
  };

  return (
    <div className="w-[15%] h-full">
      <div className="mr-2">{renderPlayers()}</div>
    </div>
  );
};
