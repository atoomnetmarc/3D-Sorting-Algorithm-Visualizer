/**
 * Shell Sort implemented as an async generator.
 * Stateless: sorts the passed array in-place.
 */
export async function* shellSort(array) {
  const n = array.length;
  let gap = Math.floor(n / 2);

  while (gap > 0) {
    for (let i = gap; i < n; i++) {
      let j = i;
      while (j >= gap) {
        yield { type: 'compare', indices: [j - gap, j] };
        if (array[j - gap] > array[j]) {
          [array[j - gap], array[j]] = [array[j], array[j - gap]];
          yield { type: 'swap', indices: [j - gap, j] };
        } else {
          break;
        }
        j -= gap;
        await new Promise(resolve => setTimeout(resolve, 0));
      }
    }
    gap = Math.floor(gap / 2);
  }
}