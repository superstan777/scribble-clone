import { BrushSelector } from "./BrushSelector";
import { ColorSelector } from "./ColorSelector";

interface Props {
  currentColor: string;
  setCurrentColor: React.Dispatch<React.SetStateAction<string>>;
  currentBrush: number;
  setCurrentBrush: React.Dispatch<React.SetStateAction<number>>;
  clearCanvas: any;
}

export const Toolbar: React.FC<Props> = ({
  currentColor,
  setCurrentColor,
  currentBrush,
  setCurrentBrush,
  clearCanvas,
}) => {
  const colors = [
    "#FFFFFF",
    "#C1C1C1",
    "#EF120C",
    "#FF7102",
    "#FFE402",
    "#00CC00",
    "#00B2FF",
    "#231FD3",
    "#A300BB",
    "#D37CAA",
    "#A0522E",
    "#000000",
    "#4C4C4C",
    "#750B07",
    "#C33900",
    "#E8A203",
    "#005511",
    "#00569E",
    "#0E0765",
    "#550069",
    "#A85574",
    "#63310D",
  ];

  const brushes = [10, 20, 40, 50];

  const renderColors = () => {
    return colors.map((color, index) => {
      return (
        <ColorSelector
          key={index}
          color={color}
          setCurrentColor={setCurrentColor}
        />
      );
    });
  };
  const renderBrushes = () => {
    return brushes.map((size, index) => {
      return (
        <BrushSelector
          size={size}
          key={index}
          currentBrush={currentBrush}
          setCurrentBrush={setCurrentBrush}
        />
      );
    });
  };

  return (
    <div className="flex h-full items-cente justify-center">
      <div
        className="h-16 w-16 mr-2 rounded-lg"
        style={{ backgroundColor: currentColor }}
      ></div>
      <div className="">
        <div className="grid grid-cols-11 gap-0">{renderColors()}</div>
      </div>
      <div className="ml-2">
        <div className="flex items-center gap-1">{renderBrushes()}</div>
      </div>
      <button
        className="bg-red-500 text-white text-lg font-bold h-16 w-24 rounded-lg ml-2"
        onClick={clearCanvas}
      >
        Clear
      </button>
    </div>
  );
};
