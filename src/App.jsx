import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import { getCardImages, shuffle } from "./utils/utils";
import { v4 as uuidv4 } from "uuid";
import Card from "./components/Card";
import DifficultyLevel from "./components/DifficultyLevel";
import NewGameBtn from "./components/NewGameBtn";
import Congrats from "./components/Congrats";

function App() {
  const [difficultyLevel, setDifficultyLevel] = useState();
  const [cards, setCards] = useState([]);

  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  const [attempts, setAttempts] = useState(0);
  const [disabled, setDisabled] = useState(false);

  const timeRef = useRef(0);
  const timeIntervalRef = useRef(null);

  const handleDifficultyLevel = useCallback(
    (level) => {
      setDifficultyLevel(level);

      const cardImages = getCardImages(level);

      // Cards multiplied by two for pairing. Shuffling, adding an ids and matched properties
      const shuffledCards = shuffle([...cardImages, ...cardImages]).map(
        (card) => ({ ...card, id: uuidv4(), matched: false })
      );

      setCards(shuffledCards);
    },
    [setDifficultyLevel, getCardImages, shuffle, setCards]
  );

  const handleNewGame = useCallback(() => {
    setDifficultyLevel();
    setCards([]);
    setChoiceOne(null);
    setChoiceTwo(null);
    setAttempts(0);
  }, [setDifficultyLevel, setCards, setChoiceOne, setChoiceTwo, setAttempts]);

  const handleChoice = useCallback(
    (card) => {
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    },
    [choiceOne, setChoiceOne, setChoiceTwo]
  );

  useEffect(() => {
    if (choiceOne && !choiceTwo) {
      // Prevent doubleclick on a single, choice one card
      // Avoiding a card click until the choice one card is rotated
      // 0.2 second being a time taken for transforming rotation
      setDisabled(true);
      setTimeout(() => {
        setDisabled(false);
      }, 200);
    }

    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            // Assuming picsum.photos api for random images will always be unique and will not send two or more same images
            card.src === choiceOne.src ? { ...card, matched: true } : card
          )
        );
        resetChoices();
      } else {
        setTimeout(() => resetChoices(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetChoices = useCallback(() => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setAttempts((prevAttempts) => prevAttempts + 1);
    setDisabled(false);
  }, [setChoiceOne, setChoiceTwo, setAttempts, setDisabled]);

  useEffect(() => {
    // Start the timer when the user selects difficulty level and the game starts
    if (difficultyLevel) {
      timeIntervalRef.current = setInterval(() => {
        timeRef.current += 1;
      }, 1000);
    }

    // Stop and reset the timer when the user starts a new game and difficulty level resets
    return () => {
      clearInterval(timeIntervalRef.current);
      timeRef.current = 0;
    };
  }, [difficultyLevel]);

  const allPairsMatched = useMemo(
    () => cards.every((card) => card.matched),
    [cards]
  );

  useEffect(() => {
    // Stop the timer when the user matches all pairs
    if (allPairsMatched) clearInterval(timeIntervalRef.current);
  }, [allPairsMatched]);

  return (
    <div
      className={`App ${difficultyLevel === "hard" ? "app-hard" : ""}`}
      style={
        difficultyLevel === "medium"
          ? { width: "660px" }
          : difficultyLevel === "hard"
          ? { width: "700px" }
          : {}
      }
    >
      <h1>Memory Card Game</h1>
      {difficultyLevel ? (
        <NewGameBtn handleNewGame={handleNewGame} />
      ) : (
        <DifficultyLevel handleDifficultyLevel={handleDifficultyLevel} />
      )}
      {difficultyLevel && cards.length && (
        <>
          <div
            className="card-grid"
            style={
              difficultyLevel === "hard"
                ? { gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr" }
                : {}
            }
          >
            {cards.map((card) => (
              <Card
                key={card.id}
                card={card}
                difficultyLevel={difficultyLevel}
                handleChoice={handleChoice}
                flipped={
                  card === choiceOne || card === choiceTwo || card.matched
                }
                disabled={disabled}
              />
            ))}
            {allPairsMatched && (
              <Congrats
                difficultyLevel={difficultyLevel}
                attempts={attempts}
                time={timeRef.current}
              />
            )}
          </div>
          <p className="attempts">Attempts: {attempts}</p>
        </>
      )}
    </div>
  );
}

export default App;
