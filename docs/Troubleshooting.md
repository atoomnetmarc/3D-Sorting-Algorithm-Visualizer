# Troubleshooting & FAQ

---

## Common Pitfalls and Fixes

### 1. Visualization Too Small or Off-Center

**Cause:** Fixed camera position and bar spacing do not adapt to screen size.

**Fix:**

- Dynamically calculate camera distance based on:
  - Total width of bars (`BAR_COUNT * (BAR_WIDTH + spacing)`)
  - Camera FOV
  - Aspect ratio
- Center the camera and elevate slightly
- Shift the bar group upward by `-MAX_HEIGHT / 2` to center vertically

---

### 2. Opening `index.html` Directly Doesn't Work

**Cause:** ES module imports require a server context.

**Fix:** Use a local server (`npx serve` or `python3 -m http.server`).

---

### 3. Switching Algorithms Mid-Sort Looks Weird

**Cause:** New algorithm continues sorting the partially sorted array.

**Note:** This is intentional for educational purposes.

**Tip:** To see a fresh sort, pause and reset the array before switching.

---

### 4. Rainbow Gradient Doesn't Appear Sorted

**Cause:** Colors fixed per index instead of value.

**Fix:**

- Generate a color map based on data values (1 to 100)
- Set bar colors dynamically based on current value
- When sorted, the rainbow gradient naturally appears in order

---

## Debugging Tips

- Use `console.log()` to trace algorithm steps and UI events
- Test each feature incrementally (see [Implementation Guide](Implementation.md))
- Check browser console for errors
- Simplify the problem: isolate modules when debugging
- Use breakpoints and step through code in browser dev tools

---

## FAQ

**Q:** Why does the visualization freeze or behave unexpectedly?

- Check for infinite loops or unhandled promises in sorting algorithms.
- Ensure async generators yield control regularly.

**Q:** How can I add a new sorting algorithm?

- Implement it as an async generator in `algorithm/`.
- Follow the pattern of existing algorithms.
- Import and register it in the UI.

**Q:** Can I customize colors or animations?

- Yes! Modify `visualizer.js` for colors and animation styles.