import { calculateScore } from "../utils/utils";
import "./Congrats.css";

const Congrats = ({ difficultyLevel, attempts, time }) => {
  const calculatedScore = calculateScore(difficultyLevel, attempts, time);

  return (
    <div className="congrats-wrap">
      <div className="congrats">
        <p>Congrats! you've successfully matched all pairs.</p>
        <p>
          It took you <b>{attempts}</b> attempts in <b>{time}</b> seconds and you
          scored <b>{calculatedScore}</b> points.
        </p>
      </div>
    </div>
  );
};

export default Congrats;
