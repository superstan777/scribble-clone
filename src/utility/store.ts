import { create } from "zustand";
import { WordInterface, PlayerInterface, GameStateInterface } from "./types";

///
interface PlayerStore {
  playerId: string | undefined;
  setPlayerId: (playerId: string) => void;
  playerName: string | undefined;
  setPlayerName: (playerId: string) => void;
}

export const usePlayerStore = create<PlayerStore>((set) => ({
  playerId: undefined,
  setPlayerId: (playerId) => set({ playerId }),
  playerName: undefined,
  setPlayerName: (playerName) => set({ playerName }),
}));

///
interface WordStore {
  word: WordInterface;
  setWord: (word: WordInterface) => void;
}

export const useWordStore = create<WordStore>((set) => ({
  word: { word: null, chars: [] },
  setWord: (word) => set({ word }),
}));

///
interface PlayersStore {
  players: PlayerInterface[] | undefined;
  setPlayers: (players: PlayerInterface[]) => void;
}

export const usePlayersStore = create<PlayersStore>((set) => ({
  players: undefined,
  setPlayers: (players) => set({ players }),
}));

///
interface CanvasStore {
  color: string;
  setColor: (color: string) => void;
  brushSize: number;
  setBrushSize: (brushSize: number) => void;
}

export const useCanvasStore = create<CanvasStore>((set) => ({
  color: "black",
  setColor: (color) => set({ color }),
  brushSize: 10,
  setBrushSize: (brushSize) => set({ brushSize }),
}));

//
interface GameStore {
  game: GameStateInterface | undefined;
  setGame: (game: GameStateInterface) => void;
}

export const useGameStore = create<GameStore>((set) => ({
  game: undefined,
  setGame: (game) => set({ game }),
}));
