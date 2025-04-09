/**
 * Comb Sort implemented as an async generator.
 * Stateless: sorts the passed array in-place.
 */
export async function* combSort(array) {
  const n = array.length;
  let gap = n;
  const shrink = 1.3;
  let sorted = false;

  while (!sorted) {
    gap = Math.floor(gap / shrink);
    if (gap <= 1) {
      gap = 1;
      sorted = true;
    }

    for (let i = 0; i + gap < n; i++) {
      yield { type: 'compare', indices: [i, i + gap] };
      if (array[i] > array[i + gap]) {
        [array[i], array[i + gap]] = [array[i + gap], array[i]];
        yield { type: 'swap', indices: [i, i + gap] };
        sorted = false;
      }
      await new Promise(resolve => setTimeout(resolve, 0));
    }
  }
}