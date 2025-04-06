import { useState } from "react";
import { useNavigate } from "react-router";
import { useStore } from "../../../store/store";
import "./roller.css";

const Roller = ({ onClose }) => {
  const navigate = useNavigate();

  const { player1Name, player2Name, setDecidedPlayer, decidedPlayer } = useStore();
  const [isDecided, setIsDecided] = useState(false);

  const decideStarter = () => {
    if (isDecided) {
      navigate("/game");
      return;
    }

    const randomPlayer = Math.random() < 0.5 ? 1 : 2;
    const playerName = randomPlayer === 1 ? player1Name : player2Name;

    setDecidedPlayer(playerName);
    setIsDecided(true);
  };

  return (
    <div className="starterModalOverlay">
      <div className="starterModal">
        <button className="backButton" onClick={onClose}>
          ← Back
        </button>
        <h2>Who Starts First?</h2>

        <div className="playerResult">
          {isDecided ? (
            <p className="winnerAnnouncement">
              <span className="winnerName">
                {decidedPlayer}
              </span>{" "}
              goes first!
            </p>
          ) : (
            <p className="readyText">Ready to decide!</p>
          )}
        </div>

        <button className="decideButton" onClick={decideStarter}>
          {isDecided ? "Start Game" : "Decide Now"}
        </button>
      </div>
    </div>
  );
};

export default Roller;
