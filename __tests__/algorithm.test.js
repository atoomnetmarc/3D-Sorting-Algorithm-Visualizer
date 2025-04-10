import { algorithms } from '../algorithm/index.js';

function isSorted(arr) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i - 1] > arr[i]) return false;
  }
  return true;
}

function arraysHaveSameElements(arr1, arr2) {
  const countMap = new Map();
  for (const el of arr1) {
    countMap.set(el, (countMap.get(el) || 0) + 1);
  }
  for (const el of arr2) {
    if (!countMap.has(el)) return false;
    countMap.set(el, countMap.get(el) - 1);
    if (countMap.get(el) < 0) return false;
  }
  return Array.from(countMap.values()).every(count => count === 0);
}

const testCases = [
  [],
  [1],
  [1, 2, 3, 4, 5],
  [5, 4, 3, 2, 1],
  [3, 1, 2, 3, 1],
  [-3, -1, -2, 0, 2, 1],
  Array.from({ length: 100 }, () => Math.floor(Math.random() * 1000))
];

describe('Sorting Algorithms', () => {
  for (const [key, algo] of Object.entries(algorithms)) {
    describe(algo.name || key, () => {
      for (const input of testCases) {
        it(`sorts array: [${input}]`, async () => {
          const arr = [...input];
          const original = [...input];
          let iterations = 0;

          const gen = algo.generator(arr);
          while (true) {
            const { done } = await gen.next();
            iterations++;
            if (done) break;
          }

          expect(isSorted(arr)).toBe(true);
          expect(arraysHaveSameElements(arr, original)).toBe(true);

          // Conservative iteration threshold: n^2 for quadratic sorts, n log n for better ones
          const n = arr.length;
          const maxIterations = n <= 1 ? 1 : n * n * 2; // generous upper bound
          expect(iterations).toBeLessThanOrEqual(maxIterations);
        });
      }
    });
  }
});