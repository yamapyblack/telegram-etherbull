// src/App.tsx
import React, { useEffect, useRef } from "react";
import "./PhaserApp.css";
import Game from "./Game";

const PhaserApp: React.FC = () => {
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    // Initialize Phaser game
    gameRef.current = new Game();

    // Cleanup on unmount
    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  return <div id="phaser-game" />;
};

export default PhaserApp;
