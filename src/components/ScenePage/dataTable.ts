import { formatNumber, formatPercent } from '../utils';

export const dataTable = (scene) => {
  return {
    'Sehr schlecht': [
      formatPercent(scene.vote0Unsafe, {}),
      formatPercent(scene.votePedestrian0Unsafe, {}),
      formatPercent(scene.voteCar0Unsafe, {}),
    ],
    Schlecht: [
      formatPercent(scene.vote1RatherUnsafe, {}),
      formatPercent(scene.votePedestrian1RatherUnsafe, {}),
      formatPercent(scene.voteCar1RatherUnsafe, {}),
    ],
    Gut: [
      formatPercent(scene.vote2Save, {}),
      formatPercent(scene.votePedestrian2Save, {}),
      formatPercent(scene.voteCar2Save, {}),
    ],
    'Sehr gut': [
      formatPercent(scene.vote3VerySave, {}),
      formatPercent(scene.votePedestrian3VerySave, {}),
      formatPercent(scene.voteCar3VerySave, {}),
    ],
    Mittelwert: [
      formatNumber(scene.voteMeans, {}),
      formatNumber(scene.votePedestrianMeans, {}),
      formatNumber(scene.voteCarMeans, {}),
    ],
    'Anzahl Antworten': [
      Math.round(scene.voteCount),
      Math.round(scene.votePedestrianCount),
      Math.round(scene.voteCarCount),
    ],
  };
};