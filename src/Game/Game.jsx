import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import "./game.css";

const MemoryGame = () => {
  const { level } = useParams();
  const navigate = useNavigate();
  const numLevel = parseInt(level);

  const cardData = [
    { id: 1, emoji: "🐶", name: "Dog" },
    { id: 2, emoji: "🐱", name: "Cat" },
    { id: 3, emoji: "🐭", name: "Mouse" },
    { id: 4, emoji: "🐹", name: "Hamster" },
    { id: 5, emoji: "🐰", name: "Rabbit" },
    { id: 6, emoji: "🦊", name: "Fox" },
    { id: 7, emoji: "🐻", name: "Bear" },
    { id: 8, emoji: "🐼", name: "Panda" },
    { id: 9, emoji: "🦁", name: "Lion" },
    { id: 10, emoji: "🐮", name: "Cow" },
    { id: 11, emoji: "🐷", name: "Pig" },
    { id: 12, emoji: "🐸", name: "Frog" },
    { id: 13, emoji: "🐵", name: "Monkey" },
    { id: 14, emoji: "🐔", name: "Chicken" },
    { id: 15, emoji: "🐧", name: "Penguin" },
    { id: 16, emoji: "🦄", name: "Unicorn" },
    { id: 17, emoji: "🍎", name: "Apple" },
    { id: 18, emoji: "🍐", name: "Pear" },
    { id: 19, emoji: "🍊", name: "Orange" },
    { id: 20, emoji: "🍋", name: "Lemon" },
    { id: 21, emoji: "🍌", name: "Banana" },
    { id: 22, emoji: "🍉", name: "Watermelon" },
    { id: 23, emoji: "🍇", name: "Grapes" },
    { id: 24, emoji: "🍓", name: "Strawberry" },
    { id: 25, emoji: "🥕", name: "Carrot" },
    { id: 26, emoji: "🍕", name: "Pizza" },
    { id: 27, emoji: "🍔", name: "Burger" },
    { id: 28, emoji: "🌭", name: "Hotdog" },
    { id: 29, emoji: "⚽", name: "Soccer" },
    { id: 30, emoji: "🏀", name: "Basketball" },
    { id: 31, emoji: "🎾", name: "Tennis" },
    { id: 32, emoji: "🏓", name: "Ping Pong" },
  ];

  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const selectedCards = cardData.slice(
    0,
    numLevel === 1 ? 8 : numLevel === 2 ? 18 : 32
  );

  useEffect(() => {
    let interval;
    if (timerActive) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

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
      setTimerActive(true);
    }, 3000);
  };

  const startGame = () => {
    setTime(0);
    setMoves(0);
    startPreview();
  };

  const restartGame = () => {
    setCards([]);
    setFlipped([]);
    setMatched([]);
    startGame();
    setMoves(0);
    setTime(0);
    setGameStarted(false);
    setTimerActive(false);
    setPreviewMode(true);
  };

  useEffect(() => {
    if (matched.length === selectedCards.length * 2 && gameStarted) {
      setTimerActive(false);
      alert(`🎉 You won in ${time} seconds with ${moves} moves!`);
    }
  }, [matched]);

  const handleClick = (id) => {
    console.log(matched);
    console.log(id);
    if (
      !gameStarted ||
      previewMode ||
      flipped.includes(id) ||
      matched.includes(id) ||
      flipped.length === 2
    )
      return;

    setFlipped([...flipped, id]);
    setMoves(moves + 1);

    if (flipped.length === 1) {
      const firstCard = cards.find((card) => card.uniqueId === flipped[0]);
      const secondCard = cards.find((card) => card.uniqueId === id);
      console.log(firstCard, secondCard);
      if (firstCard.id === secondCard.id) {
        setMatched([...matched, firstCard.uniqueId, secondCard.uniqueId]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  const baclToLevels = () => {
    if (window.confirm("Are you sure you want to leave the game?")) {
      navigate("/");
    } else return;
  };

  return (
    <div className="gameWrapper">
      <div className="header">
        <h1>Memory Game - Level {level}</h1>
        <div className="stats">
          <span>⏱️ Time: {time}s</span>
          <span>↻ Moves: {moves}</span>
          <span>
            ✅ Pairs: {matched.length / 2}/{selectedCards.length}
          </span>
        </div>
      </div>

      <div
        className="cardsGrid"
        style={{
          gridTemplateColumns: `repeat(${
            numLevel === 1 ? 4 : numLevel === 2 ? 6 : 8
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
                <span className="emoji">{card.emoji}</span>
                <p>{card.name}</p>
              </div>
              <div className="cardBack">?</div>
            </div>
          </div>
        ))}
      </div>

      <div className="controls">
        <button className="backButton" onClick={baclToLevels}>
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

export default MemoryGame;
