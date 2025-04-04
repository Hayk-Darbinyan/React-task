import { useNavigate } from "react-router";
import "./Levels.css";

const Levels = () => {
  const navigate = useNavigate();

  return (
    <div className="levelsContainer">
      <h1 className="gameTitle">Memory Card Game</h1>
      <div className="levels">
        <h2>Choose Difficulty</h2>
        <div className="levelCards">
          <div className="levelCard" onClick={() => navigate("/game/1")}>
            <div className="levelIcon">🐶</div>
            <h3>Easy</h3>
            <p>4x4 Grid</p>
          </div>
          <div className="levelCard" onClick={() => navigate("/game/2")}>
            <div className="levelIcon">🦊</div>
            <h3>Medium</h3>
            <p>6x6 Grid</p>
          </div>
          <div className="levelCard" onClick={() => navigate("/game/3")}>
            <div className="levelIcon">🦉</div>
            <h3>Hard</h3>
            <p>8x8 Grid</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Levels;
