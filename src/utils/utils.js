export const getCardImages = (difficultyLevel) => {
  // Total cards for Easy: 4x3; medium: 4x4; hard: 6x6;
  // Total unique images - half of total cards
  const totalImages =
    difficultyLevel === "easy"
      ? 6
      : difficultyLevel === "medium"
      ? 8
      : difficultyLevel === "hard"
      ? 18
      : 0;

  if (!totalImages) return;

  let cardImages = [];

  for (let i = 0; i < totalImages; i++) {
    cardImages.push({
      src: `https://picsum.photos/200/200?random=${Math.floor(
        Math.random() * 10000
      )}`,
    });
  }

  return cardImages;
};

export const shuffle = (array) => {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

export const calculateScore = (difficultyLevel, attempts, time) => {
  // Setting difficulty level number optionally to uniquie images quantity
  const difficultyLevelNum =
    difficultyLevel === "easy"
      ? 6
      : difficultyLevel === "medium"
      ? 8
      : difficultyLevel === "hard"
      ? 18
      : 0;

  // Setting ideal attempts(1 attempt = choosing 2 cards) to uniquie images quantity (case for low possibility of matching all pairs on the first attempt)
  const idealAttempts = difficultyLevelNum;
  // Setting ideal time to total images quantity (as if each card click takes 1 second and happens non-stop, consecutively)
  const idealTime = difficultyLevelNum * 2;

  // Ideally, dividend(10000) when divided by divisor(1) equals to maximum amount(10000) of score
  // So, in an ideal divisor case, static number of difficulty level multiplied by dynamic ideal attempts and time
  // should be multiplied by a default coefficient which should give back 1 as a result
  const defaultCoefficient =
    1 / (difficultyLevelNum * idealAttempts * idealTime);

  // If any of the multiplicators - attempts and time increase, the overal result will become less score
  // (changing variables: attempts to idealAttempts and time to idealTime manually, score should become maximum of 10000)
  const score =
    10000 / (difficultyLevelNum * attempts * time * defaultCoefficient);

  return Math.round(score);
};
