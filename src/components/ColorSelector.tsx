interface Props {
  color: string;
  setCurrentColor: React.Dispatch<React.SetStateAction<string>>;
}

export const ColorSelector: React.FC<Props> = ({ color, setCurrentColor }) => {
  return (
    <div
      className="h-8 w-8"
      style={{ backgroundColor: color }}
      onClick={() => setCurrentColor(color)}
    />
  );
};
