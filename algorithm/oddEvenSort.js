/**
 * Odd-Even Sort (Brick Sort) implemented as an async generator.
 * Stateless: sorts the passed array in-place.
 */
export async function* oddEvenSort(array) {
  const n = array.length;
  let sorted = false;

  while (!sorted) {
    sorted = true;

    for (let i = 1; i < n - 1; i += 2) {
      yield { type: 'compare', indices: [i, i + 1] };
      if (array[i] > array[i + 1]) {
        [array[i], array[i + 1]] = [array[i + 1], array[i]];
        yield { type: 'swap', indices: [i, i + 1] };
        sorted = false;
      }
      await new Promise(resolve => setTimeout(resolve, 0));
    }

    for (let i = 0; i < n - 1; i += 2) {
      yield { type: 'compare', indices: [i, i + 1] };
      if (array[i] > array[i + 1]) {
        [array[i], array[i + 1]] = [array[i + 1], array[i]];
        yield { type: 'swap', indices: [i, i + 1] };
        sorted = false;
      }
      await new Promise(resolve => setTimeout(resolve, 0));
    }
  }
}