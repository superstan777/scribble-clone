import React from "react";

interface Props {
  size: number;
  currentBrush: number;
  setCurrentBrush: React.Dispatch<React.SetStateAction<number>>;
}

export const BrushSelector: React.FC<Props> = ({
  size,
  currentBrush,
  setCurrentBrush,
}) => {
  return (
    <div
      className={`bg-white h-16 w-16 flex justify-center items-center rounded-lg ${
        size === currentBrush ? "border-2 border-black" : ""
      }`}
      onClick={() => setCurrentBrush(size)}
    >
      <div
        className="bg-black rounded-full"
        style={{ width: size, height: size }}
      />
    </div>
  );
};
