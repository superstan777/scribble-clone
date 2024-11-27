interface Props {
  text: string;
  handler: () => void;
}

export const Button: React.FC<Props> = ({ text, handler }) => {
  return (
    <button
      className="bg-green-500 p-8 text-white rounded-lg text-2xl mt-8"
      onClick={handler}
    >
      {text}
    </button>
  );
};
