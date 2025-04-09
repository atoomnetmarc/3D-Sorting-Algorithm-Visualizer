/**
 * Bubble Sort implemented as an async generator.
 * Yields indices being compared at each step.
 * Stateless: sorts the passed array in-place.
 */

export async function* bubbleSort(array) {
  const n = array.length;
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < n - 1; i++) {
      yield { type: 'compare', indices: [i, i + 1] };
      if (array[i] > array[i + 1]) {
        [array[i], array[i + 1]] = [array[i + 1], array[i]];
        swapped = true;
        yield { type: 'swap', indices: [i, i + 1] };
      }
      // Yield control to avoid blocking UI
      await new Promise(resolve => setTimeout(resolve, 0));
    }
  } while (swapped);
}