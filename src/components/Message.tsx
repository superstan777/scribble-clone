import { MessageInterface } from "../utility/types";

interface Props {
  message: MessageInterface;
}

export const Message: React.FC<Props> = ({ message }) => {
  if (message.type === "connect") {
    return (
      <div className="px-2 w-full text-left text-green-500 font-bold">
        {message.text}
      </div>
    );
  }

  if (message.type === "disconnect") {
    return (
      <div className="px-2 w-full text-left text-red-500 font-bold">
        {message.text}
      </div>
    );
  }

  if (message.type === "guessed") {
    return (
      <div className="px-2 w-full text-left bg-green-500">{message.text}</div>
    );
  }

  return (
    <div className="px-2 w-full text-left">
      {message.playerName}: {message.text}
    </div>
  );
};
