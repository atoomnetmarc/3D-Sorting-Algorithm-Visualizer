/**
 * Merge Sort implemented as an async generator.
 * Stateless: sorts the passed array in-place.
 */
export async function* mergeSort(array) {
  const n = array.length;
  const aux = array.slice();

  for (let width = 1; width < n; width *= 2) {
    for (let left = 0; left < n; left += 2 * width) {
      const mid = Math.min(left + width, n);
      const right = Math.min(left + 2 * width, n);

      let i = left, j = mid, k = left;

      while (i < mid && j < right) {
        yield { type: 'compare', indices: [i, j] };
        if (aux[i] <= aux[j]) {
          array[k++] = aux[i++];
        } else {
          array[k++] = aux[j++];
        }
        await new Promise(resolve => setTimeout(resolve, 0));
      }

      while (i < mid) {
        array[k++] = aux[i++];
      }
      while (j < right) {
        array[k++] = aux[j++];
      }

      for (let t = left; t < right; t++) {
        aux[t] = array[t];
      }
    }
  }
}