/**
 * Selection Sort implemented as an async generator.
 * Stateless: sorts the passed array in-place.
 */
export async function* selectionSort(array) {
  const n = array.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      yield { type: 'compare', indices: [minIdx, j] };
      if (array[j] < array[minIdx]) {
        minIdx = j;
      }
      await new Promise(resolve => setTimeout(resolve, 0));
    }
    if (minIdx !== i) {
      [array[i], array[minIdx]] = [array[minIdx], array[i]];
      yield { type: 'swap', indices: [i, minIdx] };
    }
  }
}