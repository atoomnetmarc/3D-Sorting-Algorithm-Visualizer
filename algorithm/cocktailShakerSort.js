/**
 * Cocktail Shaker Sort implemented as an async generator.
 * Stateless: sorts the passed array in-place.
 */
export async function* cocktailShakerSort(array) {
  let start = 0;
  let end = array.length - 1;
  let swapped = true;

  while (swapped) {
    swapped = false;
    for (let i = start; i < end; i++) {
      yield { type: 'compare', indices: [i, i + 1] };
      if (array[i] > array[i + 1]) {
        [array[i], array[i + 1]] = [array[i + 1], array[i]];
        yield { type: 'swap', indices: [i, i + 1] };
        swapped = true;
      }
      await new Promise(resolve => setTimeout(resolve, 0));
    }
    if (!swapped) break;
    swapped = false;
    end--;
    for (let i = end; i > start; i--) {
      yield { type: 'compare', indices: [i - 1, i] };
      if (array[i - 1] > array[i]) {
        [array[i - 1], array[i]] = [array[i], array[i - 1]];
        yield { type: 'swap', indices: [i - 1, i] };
        swapped = true;
      }
      await new Promise(resolve => setTimeout(resolve, 0));
    }
    start++;
  }
}