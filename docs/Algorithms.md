# Sorting Algorithms

The visualizer supports a wide range of sorting algorithms, each implemented as an **async generator** that yields steps for visualization.

---

## List of Algorithms

- Bubble Sort
- Insertion Sort
- Quicksort
- Selection Sort
- Merge Sort
- Heap Sort
- Shell Sort
- Cocktail Shaker Sort
- Counting Sort
- Comb Sort
- Gnome Sort
- Odd-Even Sort (Brick Sort)
- Cycle Sort
- Pigeonhole Sort
- Bucket Sort
- Radix Sort
- Pancake Sort

---

## Implementation Guidelines

- **Async Generators:** Each algorithm should be implemented as an asynchronous generator function that yields steps (comparisons, swaps) for visualization.
- **Stateless Design:** Algorithms must be stateless, relying solely on input data and yielding steps without maintaining internal state. This allows seamless switching between algorithms during sorting.
- **Highlighting:** When two bars are compared, highlight them (e.g., in yellow).
- **Fixed Colors:** Bars retain their fixed rainbow gradient color during sorting.

---

## Educational Features

- **Switching Algorithms Mid-Sort:** You can change algorithms during sorting. The new algorithm will continue sorting the current, partially sorted array.
- **Partially Sorted Data:** Switching mid-sort helps compare how different algorithms handle partially sorted data.
- **Reset for Fresh Sort:** To see a pure run, pause and reset the array before starting a new algorithm.

---

## Documentation Tips

When implementing algorithms, include clear comments explaining:

- The algorithm's logic
- Key steps and decisions
- Any important considerations or edge cases

Well-documented code improves maintainability and understanding.