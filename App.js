import React, { useState, useEffect } from "react";
import "./App.css";

const cardImages = ["🍎", "🍌", "🍒", "🍇", "🥝", "🍍"]; // Символы для пар

const shuffleCards = () => {
  const shuffled = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((item, index) => ({ id: index, value: item, flipped: false, matched: false }));
  return shuffled;
};

function App() {
  const [cards, setCards] = useState(shuffleCards());
  const [selected, setSelected] = useState([]);
  const [disabled, setDisabled] = useState(false);

  const handleClick = (id) => {
    if (disabled || selected.length === 2) return;

    const newCards = cards.map((card) =>
      card.id === id ? { ...card, flipped: true } : card
    );
    setCards(newCards);
    setSelected((prev) => [...prev, newCards.find((card) => card.id === id)]);
  };

  useEffect(() => {
    if (selected.length === 2) {
      setDisabled(true);
      const [first, second] = selected;

      if (first.value === second.value) {
        setCards((prev) =>
          prev.map((card) =>
            card.value === first.value ? { ...card, matched: true } : card
          )
        );
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === first.id || card.id === second.id
                ? { ...card, flipped: false }
                : card
            )
          );
        }, 1000);
      }
      setTimeout(() => {
        setSelected([]);
        setDisabled(false);
      }, 1000);
    }
  }, [selected]);

  const resetGame = () => {
    setCards(shuffleCards());
    setSelected([]);
  };

  return (
    <div className="game">
      <h1>🃏 Игра «Память»</h1>
      <div className="grid">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`card ${card.flipped ? "flipped" : ""} ${card.matched ? "matched" : ""}`}
            onClick={() => handleClick(card.id)}
          >
            {card.flipped || card.matched ? card.value : "❓"}
          </div>
        ))}
      </div>
      <button onClick={resetGame}>🔄 Сбросить</button>
    </div>
  );
}

export default App;
