import "./DifficultyLevel.css";

const DifficultyLevel = ({ handleDifficultyLevel }) => {
  return (
    <div className="difficulty-level">
      <h2>Choose Difficulty Level</h2>
      <div className="dl-btns">
        <button className="btn" onClick={() => handleDifficultyLevel("easy")}>
          Easy
        </button>
        <button className="btn" onClick={() => handleDifficultyLevel("medium")}>
          Medium
        </button>
        <button className="btn" onClick={() => handleDifficultyLevel("hard")}>
          Hard
        </button>
      </div>
    </div>
  );
};

export default DifficultyLevel;
