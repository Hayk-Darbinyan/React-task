import { useState } from "react";
import useStore from "../../../store/store";
import Roller from "../../Roller";
import "./start.css";

const Start = () => {
  const { setPlayer1Name, setPlayer2Name, setLevel } = useStore(
    (state) => state
  );

  const [player1, setPlayer1] = useState("Player 1");
  const [player2, setPlayer2] = useState("Player 2");
  const [showRoller, setShowRoller] = useState(false);

  const handleChange = (e) => {
    setPlayer1(e.target.value);
  };

  const handleChange2 = (e) => {
    setPlayer2(e.target.value);
  };

  const handleSelect = (level) => {
    setPlayer1Name(player1);
    setPlayer2Name(player2);
    setLevel(level);
    setShowRoller(true);
  };

  const closeRoller = () => setShowRoller(false);

  return (
    <div className="startContainer">
      <h1 className="gameTitle">Memory Card Game</h1>
      <div className="playersContainer">
        <input type="text" onChange={handleChange} value={player1} />
        <input type="text" onChange={handleChange2} value={player2} />
      </div>
      <div className="levelsContainer">
        <div className="levels">
          <h2>Choose Difficulty</h2>
          <div className="levelCards">
            <div className="levelCard" onClick={() => handleSelect(1)}>
              <div className="levelIcon">🐶</div>
              <h3>Easy</h3>
              <p>4x4 Grid</p>
            </div>
            <div className="levelCard" onClick={() => handleSelect(2)}>
              <div className="levelIcon">🦊</div>
              <h3>Medium</h3>
              <p>6x6 Grid</p>
            </div>
            <div className="levelCard" onClick={() => handleSelect(3)}>
              <div className="levelIcon">🦉</div>
              <h3>Hard</h3>
              <p>8x8 Grid</p>
            </div>
          </div>
        </div>
      </div>
      {showRoller && <Roller onClose={closeRoller} />}
    </div>
  );
};

export default Start;
