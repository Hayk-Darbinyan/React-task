import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
  persist(
    (set) => ({
      player1Name: "Player 1",
      player2Name: "Player 2",
      level: 1,
      decidedPlayer: null,
      player1Score: 0,
      player2Score: 0,
      isGameStarted: false,
      gameState: null,
      
      setPlayer1Name: (name) => set({ player1Name: name }),
      setPlayer2Name: (name) => set({ player2Name: name }),
      setLevel: (level) => set({ level }),
      setDecidedPlayer: (player) => set({ decidedPlayer: player }),
      saveGameState: (state) => set({ gameState: state }),
      resetGameState: () => set({ gameState: null }),
    }),
    {
      name: "memory-game-storage", 
      getStorage: () => localStorage,
    }
  )
);