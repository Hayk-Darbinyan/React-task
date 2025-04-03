import { useNavigate } from "react-router";
import "./Levels.css";

const Levels = () => {
  const navigate = useNavigate();

  return (
    <div className="levels-container">
      <h1 className="game-title">Memory Card Game</h1>
      <div className="levels">
        <h2>Choose Difficulty</h2>
        <div className="level-cards">
          <div className="level-card" onClick={() => navigate("/game/1")}>
            <div className="level-icon">🐶</div>
            <h3>Easy</h3>
            <p>4x4 Grid</p>
          </div>
          <div className="level-card" onClick={() => navigate("/game/2")}>
            <div className="level-icon">🦊</div>
            <h3>Medium</h3>
            <p>6x6 Grid</p>
          </div>
          <div className="level-card" onClick={() => navigate("/game/3")}>
            <div className="level-icon">🦉</div>
            <h3>Hard</h3>
            <p>8x8 Grid</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Levels;
