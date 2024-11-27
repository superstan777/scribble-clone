import { useRef, useState, useEffect } from "react";
import { socket } from "../utility/socket";
import { Toolbar } from "./Toolbar";

import { useGameStore, usePlayerStore } from "../utility/store";

export const Canvas = () => {
  const [currentColor, setCurrentColor] = useState("black");
  const [currentBrush, setCurrentBrush] = useState(10);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const { game } = useGameStore();
  const { playerId } = usePlayerStore();

  console.log(game?.drawingState);

  const isDrawer = game?.currentDrawer === playerId;

  useEffect(() => {
    const canvas = canvasRef.current;
    const resizeCanvas = () => {
      const parent = canvas?.parentNode as HTMLElement;
      if (canvas && parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };

    resizeCanvas();

    const context = canvas?.getContext("2d");
    if (context) {
      context.lineCap = "round";
      context.strokeStyle = currentColor; // Set initial color
      context.lineWidth = currentBrush;
      contextRef.current = context;
    }

    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  ///
  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = currentColor;
    }
  }, [currentColor]);

  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.lineWidth = currentBrush;
    }
  }, [currentBrush]);

  //
  useEffect(() => {
    if (isDrawer) {
      socket.emit("update brush", { color: currentColor, brush: currentBrush });
    }
  }, [currentColor, currentBrush]);
  //

  const startDrawing = ({
    nativeEvent,
  }: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawer) return;
    const { offsetX, offsetY } = nativeEvent;

    if (contextRef.current) {
      contextRef.current.beginPath();
      contextRef.current.moveTo(offsetX, offsetY);
    }
    setIsDrawing(true);

    socket.emit("drawing", { offsetX, offsetY, isStart: true });
  };

  const draw = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawer || !isDrawing || !contextRef.current) return;

    const { offsetX, offsetY } = nativeEvent;

    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();

    socket.emit("drawing", {
      offsetX,
      offsetY,
      color: currentColor,
      brush: currentBrush,
    });
  };

  const stopDrawing = () => {
    if (!isDrawer) return;
    if (contextRef.current) {
      contextRef.current.closePath();
    }
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    if (!isDrawer) return;
    if (contextRef.current && canvasRef.current) {
      contextRef.current.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
    }

    socket.emit("clear canvas");
  };

  useEffect(() => {
    const handleIncomingDrawing = (data: {
      offsetX: number;
      offsetY: number;
      isStart: boolean;
      color: string;
      brush: number;
    }) => {
      const { offsetX, offsetY, isStart, color, brush } = data;

      if (contextRef.current) {
        // Apply brush settings before drawing
        contextRef.current.strokeStyle = color;
        contextRef.current.lineWidth = brush;

        if (isStart) {
          contextRef.current.beginPath();
          contextRef.current.moveTo(offsetX, offsetY);
        } else {
          contextRef.current.lineTo(offsetX, offsetY);
          contextRef.current.stroke();
        }
      }
    };

    const handleClearCanvas = () => {
      if (contextRef.current && canvasRef.current) {
        contextRef.current.clearRect(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
      }
    };

    socket.on("drawing", handleIncomingDrawing);
    socket.on("clear canvas", handleClearCanvas);

    const handleBrushUpdate = (data: { color: string; brush: number }) => {
      const { color, brush } = data;

      if (contextRef.current) {
        contextRef.current.strokeStyle = color;
        contextRef.current.lineWidth = brush;
      }
    };

    socket.on("update brush", handleBrushUpdate);

    return () => {
      socket.off("drawing", handleIncomingDrawing);
      socket.off("clear canvas", handleClearCanvas);
      socket.off("update brush", handleBrushUpdate);
    };
  }, []);

  return (
    <div className="w-full h-full ">
      <div className="w-full h-5/6">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          // onMouseLeave={stopDrawing}
          className="w-full h-full bg-white rounded-lg"
        />
      </div>

      <div className=" w-full h-1/6  p-4 rounded-lg ">
        {game?.currentDrawer === playerId && (
          <Toolbar
            currentColor={currentColor}
            setCurrentColor={setCurrentColor}
            currentBrush={currentBrush}
            setCurrentBrush={setCurrentBrush}
            clearCanvas={clearCanvas}
          />
        )}
      </div>
    </div>
  );
};
