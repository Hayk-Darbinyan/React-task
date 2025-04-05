import { create } from "zustand";
import { combine } from "zustand/middleware";

const useStore = create(
    combine(
        {
            player1Name: "Player 1",
            player2Name: "Player 2",
            level: 1,
            decidedPlayer: null,
            player1Score: 0,
            player2Score: 0,
            gameState: "waiting",
            isGameStarted: false,
            isGameOver: false,
            winner: "", 
        },
        (set) => ({
            setPlayer1Name: (name) => set({ player1Name: name }),
            setPlayer2Name: (name) => set({ player2Name: name }),
            setLevel: (level) => set({ level: level }),
            setDecidedPlayer: (player) => set({ decidedPlayer: player }),
        })
    )
)

export default useStore;