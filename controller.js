import { dataArray, highlightComparedIndices, updateScaleAndBars } from './visualizer.js';
import { bubbleSort } from './algorithm/bubbleSort.js';
import { insertionSort } from './algorithm/insertionSort.js';
import { selectionSort } from './algorithm/selectionSort.js';
import { quickSort } from './algorithm/quickSort.js';
import { mergeSort } from './algorithm/mergeSort.js';
import { heapSort } from './algorithm/heapSort.js';
import { shellSort } from './algorithm/shellSort.js';
import { cocktailShakerSort } from './algorithm/cocktailShakerSort.js';
import { countingSort } from './algorithm/countingSort.js';
import { combSort } from './algorithm/combSort.js';
import { gnomeSort } from './algorithm/gnomeSort.js';
import { oddEvenSort } from './algorithm/oddEvenSort.js';
import { cycleSort } from './algorithm/cycleSort.js';
import { pigeonholeSort } from './algorithm/pigeonholeSort.js';
import { bucketSort } from './algorithm/bucketSort.js';
import { radixSort } from './algorithm/radixSort.js';
import { pancakeSort } from './algorithm/pancakeSort.js';

const algorithmDescriptions = {
  bubbleSort: 'Bubble Sort repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
  insertionSort: 'Insertion Sort builds the sorted array one item at a time by comparing and inserting elements into their correct position.',
  selectionSort: 'Selection Sort repeatedly selects the minimum element from the unsorted part and moves it to the sorted part.',
  quickSort: 'Quick Sort partitions the array around a pivot, recursively sorting the partitions.',
  mergeSort: 'Merge Sort divides the array into halves, recursively sorts them, and then merges the sorted halves.',
  heapSort: 'Heap Sort builds a max heap and repeatedly extracts the maximum element to sort the array.',
  shellSort: 'Shell Sort sorts elements far apart and reduces the gap, improving insertion sort.',
  cocktailShakerSort: 'Cocktail Shaker Sort is a bidirectional bubble sort that sorts in both directions each pass.',
  countingSort: 'Counting Sort counts occurrences of each value and reconstructs the sorted array.',
  combSort: 'Comb Sort improves bubble sort by comparing elements with a gap that shrinks over time.',
  gnomeSort: 'Gnome Sort moves elements to their correct place by swapping backward like a garden gnome.',
  oddEvenSort: 'Odd-Even Sort repeatedly compares odd and even indexed pairs to sort the array.',
  cycleSort: 'Cycle Sort minimizes writes by rotating cycles of elements into place.',
  pigeonholeSort: 'Pigeonhole Sort distributes elements into holes and collects them in order.',
  bucketSort: 'Bucket Sort distributes elements into buckets, sorts each, then concatenates.',
  radixSort: 'Radix Sort sorts numbers digit by digit from least to most significant.',
  pancakeSort: 'Pancake Sort repeatedly flips subarrays to move the largest unsorted element to its place.'
};

let fsmState = 'IDLE';
let sortLoopPromise = null;
let cancelRequested = false;
let currentAlgorithm = 'bubbleSort';
let speed = 50;
let countdownSeconds = 3;
let countdownInterval = null;

function updateFSMDisplay() {
  const el = document.getElementById('fsmStateDisplay');
  if (el) el.textContent = `${fsmState}`;
}

function updateAlgorithmDescription() {
  const desc = algorithmDescriptions[currentAlgorithm] || '';
  document.getElementById('algorithmDescription').textContent = desc;
}

function updateStartPauseButton() {
  const btn = document.getElementById('startPauseBtn');
  if (fsmState === 'IDLE') {
    btn.textContent = 'Start';
  } else if (fsmState === 'SORTING') {
    btn.textContent = 'Pause';
  } else if (fsmState === 'PAUSED') {
    btn.textContent = 'Resume';
  } else {
    btn.textContent = 'Start';
  }
}

function getAlgorithmGenerator() {
  switch (currentAlgorithm) {
    case 'bubbleSort': return bubbleSort(dataArray);
    case 'insertionSort': return insertionSort(dataArray);
    case 'selectionSort': return selectionSort(dataArray);
    case 'quickSort': return quickSort(dataArray);
    case 'mergeSort': return mergeSort(dataArray);
    case 'heapSort': return heapSort(dataArray);
    case 'shellSort': return shellSort(dataArray);
    case 'cocktailShakerSort': return cocktailShakerSort(dataArray);
    case 'countingSort': return countingSort(dataArray);
    case 'combSort': return combSort(dataArray);
    case 'gnomeSort': return gnomeSort(dataArray);
    case 'oddEvenSort': return oddEvenSort(dataArray);
    case 'cycleSort': return cycleSort(dataArray);
    case 'pigeonholeSort': return pigeonholeSort(dataArray);
    case 'bucketSort': return bucketSort(dataArray);
    case 'radixSort': return radixSort(dataArray);
    case 'pancakeSort': return pancakeSort(dataArray);
    default: return bubbleSort(dataArray);
  }
}

async function sortLoop() {
  const sorter = getAlgorithmGenerator();
  for await (const step of sorter) {
    if (cancelRequested) break;
    if (fsmState === 'PAUSED') {
      while (fsmState === 'PAUSED' && !cancelRequested) {
        await new Promise(r => setTimeout(r, 50));
      }
      if (cancelRequested) break;
    }
    if (step.type === 'compare') {
      const [i, j] = step.indices;
      highlightComparedIndices(i, j);
    } else if (step.type === 'swap') {
      updateScaleAndBars();
    }
    const delay = Math.max(1, 201 - speed * 2);
    await new Promise(r => setTimeout(r, delay));
  }
  highlightComparedIndices(-1, -1);
  sortLoopPromise = null;
  if (!cancelRequested) {
    transitionTo('COUNTDOWN');
  }
}

function reshuffleArray() {
  for (let i = dataArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [dataArray[i], dataArray[j]] = [dataArray[j], dataArray[i]];
  }
  updateScaleAndBars();
}

function transitionTo(newState) {
  fsmState = newState;
  updateFSMDisplay();
  updateStartPauseButton();

  if (newState === 'IDLE') {
    cancelRequested = false;
    document.getElementById('countdownDisplay').textContent = '';
  }

  if (newState === 'SORTING') {
    cancelRequested = false;
    if (!sortLoopPromise) {
      sortLoopPromise = sortLoop();
    }
    document.getElementById('countdownDisplay').textContent = '';
  }

  if (newState === 'PAUSED') {
    // nothing special, sortLoop respects pause
  }

  if (newState === 'CANCELING') {
    cancelRequested = true;
    if (sortLoopPromise) {
      sortLoopPromise.then(() => {
        cancelRequested = false;
        transitionTo('SORTING');
      });
    } else {
      cancelRequested = false;
      transitionTo('SORTING');
    }
  }

  if (newState === 'COUNTDOWN') {
    let secondsLeft = countdownSeconds;
    const countdownEl = document.getElementById('countdownDisplay');
    countdownEl.textContent = `Next sort in ${secondsLeft}...`;
    countdownInterval = setInterval(() => {
      secondsLeft--;
      if (secondsLeft > 0) {
        countdownEl.textContent = `Next sort in ${secondsLeft}...`;
      } else {
        clearInterval(countdownInterval);
        reshuffleArray();
        pickNextAlgorithm();
        transitionTo('SORTING');
      }
    }, 1000);
  }
}

function pickNextAlgorithm() {
  const select = document.getElementById('algorithmSelect');
  const options = Array.from(select.options);
  const currentIndex = options.findIndex(opt => opt.value === currentAlgorithm);
  const nextIndex = (currentIndex + 1) % options.length;
  currentAlgorithm = options[nextIndex].value;
  select.value = currentAlgorithm;
  updateAlgorithmDescription();
}

export function initController() {
  const algorithmSelect = document.getElementById('algorithmSelect');
  currentAlgorithm = algorithmSelect.value;

  const speedSlider = document.getElementById('speedSlider');
  speed = parseInt(speedSlider.value, 10);
  document.getElementById('startPauseBtn').addEventListener('click', () => {
    if (fsmState === 'IDLE') {
      transitionTo('SORTING');
    } else if (fsmState === 'SORTING') {
      transitionTo('PAUSED');
    } else if (fsmState === 'PAUSED') {
      transitionTo('SORTING');
    } else if (fsmState === 'COUNTDOWN') {
      clearInterval(countdownInterval);
      transitionTo('SORTING');
    }
  });

  document.getElementById('stepBtn').addEventListener('click', () => {
    // Optional: implement step mode if desired
  });

  document.getElementById('algorithmSelect').addEventListener('change', async (e) => {
    currentAlgorithm = e.target.value;
    updateAlgorithmDescription();
    if (fsmState === 'SORTING' || fsmState === 'PAUSED' || fsmState === 'COUNTDOWN') {
      transitionTo('CANCELING');
    }
  });

  speedSlider.addEventListener('input', () => {
    speed = parseInt(speedSlider.value, 10);
  });

  updateAlgorithmDescription();
  updateFSMDisplay();
  updateStartPauseButton();

  // Start automatically
  transitionTo('SORTING');
}