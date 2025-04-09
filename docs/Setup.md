# Setup Instructions

## Prerequisites

- A modern web browser (Chrome, Firefox, Edge)
- [Node.js](https://nodejs.org/) **or** Python 3 (for local server)

## Running Locally

Because ES module imports require a server context, **do not** open `index.html` directly from the filesystem.

### Using Node.js

If you have Node.js installed, run:

```bash
npx serve
```

This starts a local server (default: http://localhost:3000). Open the URL in your browser.

### Using Python

Alternatively, run:

```bash
python3 -m http.server
```

Then open [http://localhost:8000](http://localhost:8000).

## Including Three.js

### Using a CDN

Add this to your HTML:

```html
<script type="importmap">
  {
    "imports": {
      "three": "https://unpkg.com/three@0.175.0/build/three.module.js",
      "three/addons/": "https://unpkg.com/three@0.175.0/examples/jsm/"
    }
  }
</script>
```

### Importing in JavaScript

```js
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
```

> The `three/addons` directory is part of the `three` package and can be imported as shown.

## Project Structure

- `index.html`: Canvas and UI controls
- `style.css`: Styling
- `app.js`: Rendering, sorting, UI logic
- `algorithm/`: Folder containing individual sorting algorithms
- `ui.js`, `visualizer.js`, `sortController.js`: Modular JavaScript components