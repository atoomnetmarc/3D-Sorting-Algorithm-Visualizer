/**
 * Quick Sort implemented as an async generator.
 * Stateless: sorts the passed array in-place.
 */
export async function* quickSort(array) {
  const stack = [[0, array.length - 1]];

  while (stack.length) {
    const [low, high] = stack.pop();
    if (low >= high) continue;

    let pivotIndex = high;
    let i = low;

    for (let j = low; j < high; j++) {
      yield { type: 'compare', indices: [j, pivotIndex] };
      if (array[j] < array[pivotIndex]) {
        [array[i], array[j]] = [array[j], array[i]];
        yield { type: 'swap', indices: [i, j] };
        i++;
      }
      await new Promise(resolve => setTimeout(resolve, 0));
    }

    [array[i], array[pivotIndex]] = [array[pivotIndex], array[i]];
    yield { type: 'swap', indices: [i, pivotIndex] };

    stack.push([low, i - 1]);
    stack.push([i + 1, high]);
  }
}