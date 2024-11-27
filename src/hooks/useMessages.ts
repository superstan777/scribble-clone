import { useEffect, useState } from "react";
import { MessageInterface } from "../utility/types";
import { socket } from "../utility/socket";

export const useMessages = () => {
  const [messages, setMessages] = useState<MessageInterface[]>();

  const handleMessages = (data: MessageInterface[]) => {
    setMessages(data);
  };

  useEffect(() => {
    socket.on("update messages", handleMessages);

    return () => {
      socket.off("update messages", handleMessages);
    };
  }, []);

  return messages;
};
