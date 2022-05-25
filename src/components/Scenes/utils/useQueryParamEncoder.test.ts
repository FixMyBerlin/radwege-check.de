import { decodeFilter } from './useQueryParamEncoder';

describe('decodeFilter()', () => {
  it('empty input', () => {
    const resultSafe = decodeFilter('');
    expect(resultSafe).toStrictEqual({});
  });

  it('one filter, one options', () => {
    const resultSafe = decodeFilter('leftOfBicycleLane:car_lanes');
    expect(resultSafe).toStrictEqual({ leftOfBicycleLane: ['car_lanes'] });
  });

  it('one filter, two options', () => {
    const resultSafe = decodeFilter('leftOfBicycleLane:car_lanes,parking_lane');
    expect(resultSafe).toStrictEqual({
      leftOfBicycleLane: ['car_lanes', 'parking_lane'],
    });
  });

  it('two filter (multi select), two options', () => {
    const resultSafe = decodeFilter(
      'leftOfBicycleLane:car_lanes,parking_lane|bicycleLaneWidth:wide,narrow'
    );
    expect(resultSafe).toStrictEqual({
      leftOfBicycleLane: ['car_lanes', 'parking_lane'],
      bicycleLaneWidth: ['wide', 'narrow'],
    });
  });

  it('two filter (single select)', () => {
    const resultSafe = decodeFilter(
      'bicycleLaneSurface:surface_asphalt|bufferHasPhysicalProtection:true'
    );
    expect(resultSafe).toStrictEqual({
      bicycleLaneSurface: ['surface_asphalt'],
      bufferHasPhysicalProtection: ['true'],
    });
  });

  it('one filter (single select), two options (this does work, but only via URL, not via UI)', () => {
    const resultSafe = decodeFilter(
      'bicycleLaneSurface:surface_asphalt,surface_green|bufferHasPhysicalProtection:true'
    );
    expect(resultSafe).toStrictEqual({
      bicycleLaneSurface: ['surface_asphalt', 'surface_green'],
      bufferHasPhysicalProtection: ['true'],
    });
  });

  it('mixed filter (multi select, single select)', () => {
    const resultSafe = decodeFilter(
      'leftOfBicycleLane:car_lanes,parking_lane|bicycleLaneSurface:surface_asphalt'
    );
    expect(resultSafe).toStrictEqual({
      leftOfBicycleLane: ['car_lanes', 'parking_lane'],
      bicycleLaneSurface: ['surface_asphalt'],
    });
  });

  it('broken url: remove the key if key is unknown', () => {
    const resultSafe = decodeFilter(
      'leftOfBicycleLaneBROKEN:car_lanes,parking_lane|bicycleLaneSurface:surface_asphalt'
    );
    expect(resultSafe).toStrictEqual({
      bicycleLaneSurface: ['surface_asphalt'],
    });
  });

  it('broken url: remove values if values are unkown', () => {
    const resultSafe = decodeFilter(
      'leftOfBicycleLane:car_lanesBROKEN,parking_lane|bicycleLaneSurface:surface_asphaltBROKEN'
    );
    expect(resultSafe).toStrictEqual({
      leftOfBicycleLane: ['parking_lane'],
    });
  });

  it('broken url: remove key if all values are unknown', () => {
    const resultSafe = decodeFilter(
      'leftOfBicycleLane:car_lanesBROKEN,parking_laneBROKEN|bicycleLaneSurface:surface_asphalt'
    );
    expect(resultSafe).toStrictEqual({
      bicycleLaneSurface: ['surface_asphalt'],
    });
  });

  it('broken url: return empty object if everything is broken', () => {
    const resultSafe = decodeFilter(
      'leftOfBicycleLaneBROKEN:car_lanesBROKEN,parking_laneBROKEN|bicycleLaneSurfaceBROKEN:surface_asphaltBROKEN'
    );
    expect(resultSafe).toStrictEqual({});
  });

  it('broken url: return empty object input is invalid', () => {
    const resultSafe = decodeFilter('INVALID');
    expect(resultSafe).toStrictEqual({});
  });

  it('broken url: return empty object input is invalid but formatted fine', () => {
    const resultSafe = decodeFilter('INVALID:INVALID');
    expect(resultSafe).toStrictEqual({});
  });
});
