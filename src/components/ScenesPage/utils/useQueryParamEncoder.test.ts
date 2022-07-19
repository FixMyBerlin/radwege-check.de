import { aggregationConfigPrimary } from '../constants'
import { decodeFilter } from './useQueryParamEncoder'

// See src/components/utils/matomo/types.d.ts
declare global {
  interface Window {
    _paq: any[]
    dev: boolean
  }
}

describe('decodeFilter()', () => {
  const aggregationConfig = aggregationConfigPrimary

  it('empty input', () => {
    const resultSafe = decodeFilter('', aggregationConfig)
    expect(resultSafe).toStrictEqual({})
  })

  it('one filter, one options', () => {
    const resultSafe = decodeFilter(
      'leftOfBicycleLane:car_lanes',
      aggregationConfig
    )
    expect(resultSafe).toStrictEqual({ leftOfBicycleLane: ['car_lanes'] })
  })

  it('one filter, two options', () => {
    const resultSafe = decodeFilter(
      'leftOfBicycleLane:car_lanes,parking_lane',
      aggregationConfig
    )
    expect(resultSafe).toStrictEqual({
      leftOfBicycleLane: ['car_lanes', 'parking_lane'],
    })
  })

  it('two filter (multi select), two options', () => {
    const resultSafe = decodeFilter(
      'leftOfBicycleLane:car_lanes,parking_lane|bicycleLaneWidth:wide,narrow',
      aggregationConfig
    )
    expect(resultSafe).toStrictEqual({
      leftOfBicycleLane: ['car_lanes', 'parking_lane'],
      bicycleLaneWidth: ['wide', 'narrow'],
    })
  })

  it('two filter (single select)', () => {
    const resultSafe = decodeFilter(
      'bicycleLaneSurface:surface_asphalt|bufferHasPhysicalProtection:true',
      aggregationConfig
    )
    expect(resultSafe).toStrictEqual({
      bicycleLaneSurface: ['surface_asphalt'],
      bufferHasPhysicalProtection: ['true'],
    })
  })

  it('one filter (single select), two options (this does work, but only via URL, not via UI)', () => {
    const resultSafe = decodeFilter(
      'bicycleLaneSurface:surface_asphalt,surface_green|bufferHasPhysicalProtection:true',
      aggregationConfig
    )
    expect(resultSafe).toStrictEqual({
      bicycleLaneSurface: ['surface_asphalt', 'surface_green'],
      bufferHasPhysicalProtection: ['true'],
    })
  })

  it('mixed filter (multi select, single select)', () => {
    const resultSafe = decodeFilter(
      'leftOfBicycleLane:car_lanes,parking_lane|bicycleLaneSurface:surface_asphalt',
      aggregationConfig
    )
    expect(resultSafe).toStrictEqual({
      leftOfBicycleLane: ['car_lanes', 'parking_lane'],
      bicycleLaneSurface: ['surface_asphalt'],
    })
  })

  it('broken url: remove the key if key is unknown', () => {
    const resultSafe = decodeFilter(
      'leftOfBicycleLaneBROKEN:car_lanes,parking_lane|bicycleLaneSurface:surface_asphalt',
      aggregationConfig
    )
    expect(resultSafe).toStrictEqual({
      bicycleLaneSurface: ['surface_asphalt'],
    })
  })

  it('broken url: remove values if values are unkown', () => {
    const resultSafe = decodeFilter(
      'leftOfBicycleLane:car_lanesBROKEN,parking_lane|bicycleLaneSurface:surface_asphaltBROKEN',
      aggregationConfig
    )
    expect(resultSafe).toStrictEqual({
      leftOfBicycleLane: ['parking_lane'],
    })
  })

  it('broken url: remove key if all values are unknown', () => {
    const resultSafe = decodeFilter(
      'leftOfBicycleLane:car_lanesBROKEN,parking_laneBROKEN|bicycleLaneSurface:surface_asphalt',
      aggregationConfig
    )
    expect(resultSafe).toStrictEqual({
      bicycleLaneSurface: ['surface_asphalt'],
    })
  })

  it('broken url: return empty object if everything is broken', () => {
    const resultSafe = decodeFilter(
      'leftOfBicycleLaneBROKEN:car_lanesBROKEN,parking_laneBROKEN|bicycleLaneSurfaceBROKEN:surface_asphaltBROKEN',
      aggregationConfig
    )
    expect(resultSafe).toStrictEqual({})
  })

  it('broken url: return empty object input is invalid', () => {
    const resultSafe = decodeFilter('INVALID', aggregationConfig)
    expect(resultSafe).toStrictEqual({})
  })

  it('broken url: return empty object input is invalid but formatted fine', () => {
    const resultSafe = decodeFilter('INVALID:INVALID', aggregationConfig)
    expect(resultSafe).toStrictEqual({})
  })
})
