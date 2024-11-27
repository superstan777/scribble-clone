import { useEffect } from "react";
import { socket } from "../utility/socket";
import { WordInterface } from "../utility/types";
import { useWordStore } from "../utility/store";

export const useWord = () => {
  const { word, setWord } = useWordStore();

  const handleWord = (word: WordInterface) => {
    setWord(word);
  };

  useEffect(() => {
    socket.on("update word", handleWord);

    return () => {
      socket.off("update word", handleWord);
    };
  }, []);

  return word;
};
