import { useEffect, useState } from "react";
import { socket } from "../utility/socket";

export const useTimer = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    socket.on("timer update", (newTime) => {
      setTime(newTime);
    });

    socket.on("timer ended", () => {
      setTime(0);
    });

    return () => {
      socket.off("timer update");
      socket.off("timer ended");
    };
  }, []);

  return time;
};
