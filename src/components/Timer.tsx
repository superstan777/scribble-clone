import { useTimer } from "../hooks/useTimer";

export const Timer = () => {
  const time = useTimer();

  return <div className="text-xl font-bold w-2/6 text-left">{time}</div>;
};
