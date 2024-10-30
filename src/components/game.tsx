"use client";

import { keys, startRendering } from "@/js";
import React, { useEffect, useRef } from "react";

const Game = () => {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvas.current) return;
    const context = canvas.current.getContext("2d");
    if (!context) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.current.width = 1024 * dpr;
    canvas.current.height = 576 * dpr;

    let lastTime = performance.now();
    startRendering({
      canvas: canvas.current,
      context,
      dpr,
    });
    // On return to game's tab, ensure delta time is reset
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) {
        lastTime = performance.now();
      }
    });
  }, []);

  //event listeners
  useEffect(() => {
    window.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "w":
        case "ArrowUp":
          keys.w.pressed = true;
          break;
        case "a":
        case "ArrowLeft":
          keys.a.pressed = true;
          break;
        case "s":
        case "ArrowDown":
          keys.s.pressed = true;
          break;
        case "d":
        case "ArrowRight":
          keys.d.pressed = true;
          break;
      }
    });

    window.addEventListener("keyup", (event) => {
      switch (event.key) {
        case "w":
        case "ArrowUp":
          keys.w.pressed = false;
          break;
        case "a":
        case "ArrowLeft":
          keys.a.pressed = false;
          break;
        case "s":
        case "ArrowDown":
          keys.s.pressed = false;
          break;
        case "d":
        case "ArrowRight":
          keys.d.pressed = false;
          break;
      }
    });
  }, []);
  return (
    <canvas
      className="size-full"
      style={{ imageRendering: "pixelated" }}
      ref={canvas}
    />
  );
};

export default Game;
