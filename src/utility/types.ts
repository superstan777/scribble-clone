export interface MessageInterface {
  playerName: string;
  text: string;
  type?: "connect" | "disconnect" | "guessed";
}

export interface PlayerInterface {
  id: string;
  name: string;
  score: number;
  lastRoundPoints: number;
  guessed: boolean;
}

type currentState = "pending" | "inProgress" | "ended";

export interface GameStateInterface {
  gameState: currentState;
  roundState: currentState;
  roundAmount: number;
  drawingState: [];
  roundsLeft: number;
  roundDuration: number;
  timer: null | number;
  currentDrawer: null | string;
  admin: string;
}

export interface WordInterface {
  word: string | null;
  chars: string[];
}
