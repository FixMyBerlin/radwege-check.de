import { useResults } from './useResults';

describe('useResults()', () => {
  it('No results', () => {
    const results = useResults({
      total: 0,
      bucketCount: 0,
      bucketSelected: false,
    });
    expect(results).toMatchObject({
      resultTotal: 0,
      resultFuture: 0,
      uiSelected: false,
      uiCanpress: false,
    });
  });

  it('Button hovered', () => {
    const results = useResults({
      total: 100,
      bucketCount: 10,
      bucketSelected: false,
    });
    expect(results).toMatchObject({
      resultTotal: 100,
      resultFuture: 10,
      uiSelected: false,
      uiCanpress: true,
    });
  });

  it('Button selected', () => {
    const results = useResults({
      total: 100,
      bucketCount: 100,
      bucketSelected: true,
    });
    expect(results).toMatchObject({
      resultTotal: 100,
      resultFuture: 100,
      uiSelected: true,
      uiCanpress: false,
    });
  });
});
