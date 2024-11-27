import "./App.css";
import { Canvas } from "./components/Canvas";
import { Chat } from "./components/Chat";
import { Header } from "./components/Header";
import { Players } from "./components/Players";
import { GameMenu } from "./components/GameMenu";
import { useGameStore, usePlayerStore } from "./utility/store";
import { Lobby } from "./components/Lobby";
import { WordSelector } from "./components/WordSelector";
import { Waiting } from "./components/Waiting";
import { useGameState } from "./hooks/useGameState";
import { Leaderboard } from "./components/Leaderboard";
import { useWord } from "./hooks/useWord";
import { RoundSummary } from "./components/RoundSummary";
import { usePlayers } from "./hooks/usePlayers";

function App() {
  useGameState();
  useWord();
  usePlayers();

  const { game } = useGameStore();
  const { playerId } = usePlayerStore();

  const renderContent = () => {
    if (game?.gameState === "pending") {
      return <Lobby />;
    }
    if (game?.gameState === "ended") {
      return <Leaderboard />;
    }

    if (game?.roundState === "pending" && game?.currentDrawer === playerId) {
      return <WordSelector />;
    }

    if (game?.roundState === "pending") {
      return <Waiting />;
    }

    if (game?.roundState === "inProgress") {
      return <Canvas />;
    }
    if (game?.roundState === "ended") {
      return <RoundSummary />;
    }
  };

  return (
    <div className="h-screen w-screen bg-blue-500 flex justify-center items-center select-none">
      {!playerId && <GameMenu />}
      {playerId && (
        <>
          <div className=" w-10/12 h-5/6">
            <Header />
            <div className="w-full h-[90%] flex ">
              <Players />
              <div className="h-full w-[70%] my-2 flex flex-col space-y-2">
                <div className=" w-full h-full  overflow-hidden rounded-lg ">
                  <div className="w-full h-full">{renderContent()}</div>
                </div>
              </div>
              <Chat />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
