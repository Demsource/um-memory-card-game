import "./NewGameBtn.css";

const NewGameBtn = ({ handleNewGame }) => {
  return (
    <button className="btn" onClick={handleNewGame}>
      New Game
    </button>
  );
};

export default NewGameBtn;
