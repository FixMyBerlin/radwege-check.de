import {
  aggregationConfigPrimary,
  aggregationConfigSecondary,
} from '../constants'
import { SceneCategory } from '../types'

export const useAggregationConfig = (category: SceneCategory) =>
  category === 'primary' ? aggregationConfigPrimary : aggregationConfigSecondary
