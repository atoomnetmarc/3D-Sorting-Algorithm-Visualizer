/**
 * Insertion Sort implemented as an async generator.
 * Stateless: sorts the passed array in-place.
 */
export async function* insertionSort(array) {
  const n = array.length;
  for (let i = 1; i < n; i++) {
    let j = i;
    while (j > 0) {
      yield { type: 'compare', indices: [j - 1, j] };
      if (array[j - 1] > array[j]) {
        [array[j - 1], array[j]] = [array[j], array[j - 1]];
        yield { type: 'swap', indices: [j - 1, j] };
      } else {
        break;
      }
      j--;
      await new Promise(resolve => setTimeout(resolve, 0));
    }
  }
}