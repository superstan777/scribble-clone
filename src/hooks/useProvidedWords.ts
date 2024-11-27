import { useEffect, useState } from "react";
import { socket } from "../utility/socket";

export const useProvidedWords = () => {
  const [words, setWords] = useState<string[]>([]);

  const handleWords = (data: string[]) => {
    setWords(data);
  };

  useEffect(() => {
    socket.on("provided words", handleWords);

    return () => {
      socket.off("provided words", handleWords);
    };
  }, []);

  return words;
};
