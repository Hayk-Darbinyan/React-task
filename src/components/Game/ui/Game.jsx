import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import useStore from "../../../store/store";
import { useImage } from "../../../hooks/useImage";
import "./game.css";

const Game = () => {
  const navigate = useNavigate();

  const { level, player1Name, player2Name, decidedPlayer } = useStore(
    (state) => state
  );
  const { data } = useImage();
  console.log(data);

  // const cardData = [
  //   { id: 1, emoji: "🐶", name: "Dog" },
  //   { id: 2, emoji: "🐱", name: "Cat" },
  //   { id: 3, emoji: "🐭", name: "Mouse" },
  //   { id: 4, emoji: "🐹", name: "Hamster" },
  //   { id: 5, emoji: "🐰", name: "Rabbit" },
  //   { id: 6, emoji: "🦊", name: "Fox" },
  //   { id: 7, emoji: "🐻", name: "Bear" },
  //   { id: 8, emoji: "🐼", name: "Panda" },
  //   { id: 9, emoji: "🦁", name: "Lion" },
  //   { id: 10, emoji: "🐮", name: "Cow" },
  //   { id: 11, emoji: "🐷", name: "Pig" },
  //   { id: 12, emoji: "🐸", name: "Frog" },
  //   { id: 13, emoji: "🐵", name: "Monkey" },
  //   { id: 14, emoji: "🐔", name: "Chicken" },
  //   { id: 15, emoji: "🐧", name: "Penguin" },
  //   { id: 16, emoji: "🦄", name: "Unicorn" },
  //   { id: 17, emoji: "🍎", name: "Apple" },
  //   { id: 18, emoji: "🍐", name: "Pear" },
  //   { id: 19, emoji: "🍊", name: "Orange" },
  //   { id: 20, emoji: "🍋", name: "Lemon" },
  //   { id: 21, emoji: "🍌", name: "Banana" },
  //   { id: 22, emoji: "🍉", name: "Watermelon" },
  //   { id: 23, emoji: "🍇", name: "Grapes" },
  //   { id: 24, emoji: "🍓", name: "Strawberry" },
  //   { id: 25, emoji: "🥕", name: "Carrot" },
  //   { id: 26, emoji: "🍕", name: "Pizza" },
  //   { id: 27, emoji: "🍔", name: "Burger" },
  //   { id: 28, emoji: "🌭", name: "Hotdog" },
  //   { id: 29, emoji: "⚽", name: "Soccer" },
  //   { id: 30, emoji: "🏀", name: "Basketball" },
  //   { id: 31, emoji: "🎾", name: "Tennis" },
  //   { id: 32, emoji: "🏓", name: "Ping Pong" },
  // ];

  const cardData = (data ?? []).map((obj, idx) => ({
    id: idx + 1,
    emoji: obj.download_url,
  }));

  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [timerActive, setTimerActive] = useState(true);
  const [currentPlayer, setCurrentPlayer] = useState(
    decidedPlayer === player1Name ? 1 : 2
  );
  const [player1Moves, setPlayer1Moves] = useState(0);
  const [player2Moves, setPlayer2Moves] = useState(0);
  const [player1Pairs, setPlayer1Pairs] = useState(0);
  const [player2Pairs, setPlayer2Pairs] = useState(0);
  const [player1Time, setPlayer1Time] = useState(0);
  const [player2Time, setPlayer2Time] = useState(0);

  const selectedCards = cardData.slice(
    0,
    level === 1 ? 8 : level === 2 ? 18 : 32
  );

  useEffect(() => {
    let interval;
    if (gameStarted && !previewMode && timerActive) {
      interval = setInterval(() => {
        if (currentPlayer === 1) {
          setPlayer1Time((prev) => prev + 1);
        } else {
          setPlayer2Time((prev) => prev + 1);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, previewMode, currentPlayer, timerActive]);

  const startPreview = () => {
    const doubledCards = [...selectedCards, ...selectedCards]
      .map((card, index) => ({ ...card, uniqueId: index }))
      .sort(() => Math.random() - 0.5);

    setCards(doubledCards);
    setFlipped(doubledCards.map((card) => card.uniqueId));
    setPreviewMode(true);

    setTimeout(() => {
      setFlipped([]);
      setPreviewMode(false);
      setGameStarted(true);
      setCurrentPlayer(1);
    }, 3000);
  };

  const startGame = () => {
    setPlayer1Moves(0);
    setPlayer2Moves(0);
    setPlayer1Pairs(0);
    setPlayer2Pairs(0);
    setPlayer1Time(0);
    setPlayer2Time(0);
    startPreview();
  };

  const restartGame = () => {
    setCards([]);
    setFlipped([]);
    setMatched([]);
    startGame();
    setGameStarted(false);
    setPreviewMode(true);
    setTimerActive(true);
  };

  useEffect(() => {
    if (matched.length === selectedCards.length * 2 && gameStarted) {
      let winner;
      if (player1Pairs > player2Pairs) {
        winner = player1Name;
      } else if (player2Pairs > player1Pairs) {
        winner = player2Name;
      } else {
        // If pairs are equal, check moves
        if (player1Moves < player2Moves) {
          winner = player1Name;
        } else if (player2Moves < player1Moves) {
          winner = player2Name;
        } else {
          // If moves are equal, check time
          winner = player1Time < player2Time ? player1Name : player2Name;
        }
      }

      setTimerActive(false);
      alert(
        `🎉 ${winner} wins!\n\n${player1Name}: ${player1Pairs} pairs, ${player1Moves} moves, ${player1Time}s\n${player2Name}: ${player2Pairs} pairs, ${player2Moves} moves, ${player2Time}s`
      );
    }
  }, [matched]);

  const handleClick = (id) => {
    if (
      !gameStarted ||
      previewMode ||
      flipped.includes(id) ||
      matched.includes(id) ||
      flipped.length === 2
    )
      return;

    setFlipped([...flipped, id]);
    if (currentPlayer === 1) {
      setPlayer1Moves(player1Moves + 1);
    } else {
      setPlayer2Moves(player2Moves + 1);
    }

    if (flipped.length === 1) {
      const firstCard = cards.find((card) => card.uniqueId === flipped[0]);
      const secondCard = cards.find((card) => card.uniqueId === id);
      if (firstCard.id === secondCard.id) {
        setMatched([...matched, firstCard.uniqueId, secondCard.uniqueId]);
        setFlipped([]);

        if (currentPlayer === 1) {
          setPlayer1Pairs(player1Pairs + 1);
        } else {
          setPlayer2Pairs(player2Pairs + 1);
        }
      } else {
        setTimeout(() => {
          setFlipped([]);
          setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
        }, 1000);
      }
    }
  };

  const backToLevels = () => {
    if (window.confirm("Are you sure you want to leave the game?")) {
      navigate("/");
    } else return;
  };

  return (
    <div className="gameWrapper">
      <div className="header">
        <h1>Memory Game - Level {level}</h1>
        <div className="playerStats">
          <div className={`playerStat ${currentPlayer === 1 ? "active" : ""}`}>
            <h3>{player1Name}</h3>
            <div className="stats">
              <span>⏱️ {player1Time}s</span>
              <span>↻ {player1Moves}</span>
              <span>✅ {player1Pairs}</span>
            </div>
          </div>
          <div className={`playerStat ${currentPlayer === 2 ? "active" : ""}`}>
            <h3>{player2Name}</h3>
            <div className="stats">
              <span>⏱️ {player2Time}s</span>
              <span>↻ {player2Moves}</span>
              <span>✅ {player2Pairs}</span>
            </div>
          </div>
        </div>
      </div>

      <div
        className="cardsGrid"
        style={{
          gridTemplateColumns: `repeat(${
            level === 1 ? 4 : level === 2 ? 6 : 8
          }, 1fr)`,
        }}
      >
        {cards.map((card) => (
          <div
            key={card.uniqueId}
            className={`card ${
              flipped.includes(card.uniqueId) || matched.includes(card.uniqueId)
                ? "flipped"
                : ""
            } ${previewMode ? "preview" : ""}`}
            onClick={() => handleClick(card.uniqueId)}
          >
            <div className="cardInner">
              <div className="cardFront">
                <img className="emoji" src={card.emoji} alt="card" />
                <p>{card.name}</p>
              </div>
              <div className="cardBack">?</div>
            </div>
          </div>
        ))}
      </div>

      <div className="controls">
        <button className="backButton" onClick={backToLevels}>
          ← Back to Levels
        </button>
        {!gameStarted ? (
          <button className="startButton" onClick={startGame}>
            🎮 Start Game
          </button>
        ) : (
          <button className="restartButton" onClick={restartGame}>
            🔄 Restart
          </button>
        )}
      </div>

      {previewMode && (
        <div className="previewOverlay">
          <h2>Memorize the cards!</h2>
        </div>
      )}
    </div>
  );
};

export default Game;
