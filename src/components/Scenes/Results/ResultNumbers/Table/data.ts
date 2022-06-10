import { formatNumber, formatPercent } from '~/components/utils'

type Data = {
  [key: string]: {
    divideTop?: boolean
    bike: string | number
    pedestrian: string | number
    car: string | number
  }
}

export const data = (scene, precision): Data => {
  return {
    vote0Unsafe: {
      bike: formatPercent(scene.vote0Unsafe, { precision }),
      pedestrian: formatPercent(scene.votePedestrian0Unsafe, { precision }),
      car: formatPercent(scene.voteCar0Unsafe, { precision }),
    },
    vote1RatherUnsafe: {
      bike: formatPercent(scene.vote1RatherUnsafe, { precision }),
      pedestrian: formatPercent(scene.votePedestrian1RatherUnsafe, {
        precision,
      }),
      car: formatPercent(scene.voteCar1RatherUnsafe, { precision }),
    },
    vote2Save: {
      bike: formatPercent(scene.vote2Save, { precision }),
      pedestrian: formatPercent(scene.votePedestrian2Save, { precision }),
      car: formatPercent(scene.voteCar2Save, { precision }),
    },
    vote3VerySave: {
      bike: formatPercent(scene.vote3VerySave, { precision }),
      pedestrian: formatPercent(scene.votePedestrian3VerySave, { precision }),
      car: formatPercent(scene.voteCar3VerySave, { precision }),
    },
    voteMeans: {
      divideTop: true,
      bike: formatNumber(scene.voteMeans, { precision }),
      pedestrian: formatNumber(scene.votePedestrianMeans, { precision }),
      car: formatNumber(scene.voteCarMeans, { precision }),
    },
    voteCount: {
      bike: Math.round(scene.voteCount),
      pedestrian: Math.round(scene.votePedestrianCount),
      car: Math.round(scene.voteCarCount),
    },
  }
}
