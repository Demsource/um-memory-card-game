import { memo } from "react";
import "./Card.css";

const Card = ({ card, difficultyLevel, handleChoice, flipped, disabled }) => {
  return (
    <div className="card">
      <div className={flipped ? "flipped" : undefined}>
        <img
          className={`front ${
            difficultyLevel === "hard"
              ? "img-hard"
              : difficultyLevel === "medium"
              ? "img-medium"
              : ""
          }`}
          src={card.src}
          alt="Card Front"
        />
        <img
          className={`back ${
            difficultyLevel === "hard"
              ? "img-hard"
              : difficultyLevel === "medium"
              ? "img-medium"
              : ""
          }`}
          src="/um-memory-card-game/img/cover.jpg"
          alt="Card Back"
          onClick={() => !disabled && handleChoice(card)}
        />
      </div>
    </div>
  );
};

export default memo(Card);
