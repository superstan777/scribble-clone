import { useGameStore, usePlayersStore } from "../utility/store";

export const Waiting = () => {
  const { game } = useGameStore();
  const { players } = usePlayersStore();

  const renderCurrentDrawer = () => {
    const drawer = players?.find((player) => player.id === game?.currentDrawer);
    return drawer?.name;
  };

  return (
    <div className="h-5/6 w-full bg-gray-200 flex justify-center items-center gap-8 text-2xl font-bold rounded-lg">
      {renderCurrentDrawer()} is choosing word
    </div>
  );
};
