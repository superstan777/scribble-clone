import { useEffect, useRef, useState } from "react";
import { Message } from "./Message";
import { usePlayerStore } from "../utility/store";
import { useMessages } from "../hooks/useMessages";
import { socket } from "../utility/socket";

export const Chat = () => {
  const { playerId } = usePlayerStore();

  const messages = useMessages();

  const [input, setInput] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    socket.emit("add message", playerId, input);

    setInput("");
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    sendMessage();
  };

  const renderMessages = () => {
    if (messages) {
      return messages.map((message, index) => (
        <Message message={message} key={index} />
      ));
    }
  };

  return (
    <div className="h-full w-[15%] flex flex-col justify-between  mt-2 rounded-lg ">
      <div className="bg-white  ml-2 h-full rounded-lg flex flex-col overflow-hidden">
        <div className="flex-grow overflow-auto ">
          {renderMessages()}

          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={submitHandler} className="m-2">
          <input
            className="w-full p-2 text-black border-[1px] border-black rounded-lg"
            placeholder="Type your guess here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
};
