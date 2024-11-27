import { Word } from "./Word";
import { useProvidedWords } from "../hooks/useProvidedWords";

export const WordSelector = () => {
  const words = useProvidedWords();

  const renderWords = () => {
    return words.map((string: string, index: number) => (
      <Word word={string} key={index} />
    ));
  };

  return (
    <div className="h-5/6 w-full bg-gray-200 flex justify-center items-center gap-8 text-2xl font-bold rounded-lg">
      {renderWords()}
    </div>
  );
};
