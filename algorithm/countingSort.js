/**
 * Counting Sort implemented as an async generator.
 * Stateless: sorts the passed array in-place.
 * Assumes non-negative integer values.
 */
export async function* countingSort(array) {
  const max = Math.max(...array);
  const count = new Array(max + 1).fill(0);

  for (let i = 0; i < array.length; i++) {
    count[array[i]]++;
    await new Promise(resolve => setTimeout(resolve, 0));
  }

  let idx = 0;
  for (let i = 0; i <= max; i++) {
    while (count[i]-- > 0) {
      yield { type: 'compare', indices: [idx, idx] };
      array[idx] = i;
      yield { type: 'swap', indices: [idx, idx] };
      idx++;
      await new Promise(resolve => setTimeout(resolve, 0));
    }
  }
}