# CoinPulse

A modern React + TypeScript web application built with Vite, designed to provide real-time cryptocurrency market insights and analytics.

## Tech Stack

- **React 19.2** - UI library
- **TypeScript** - Type safety
- **Vite 7.2** - Build tool
- **Biome** - Code linting and formatting

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd coinpulse
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server with hot module replacement (HMR):

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

Create an optimized production build:

```bash
npm run build
```

### Preview

Preview the production build locally:

```bash
npm run preview
```

## Code Quality

### Linting

Run Biome linter:
```bash
npm run biom:lint
```

### Formatting

Format code with Biome:
```bash
npm run biom:format
```

### Check and Fix

Check for issues:
```bash
npm run biom:check
```

Check and automatically fix issues:
```bash
npm run biom:check:write
```

## Project Structure

```
src/
  ├── App.tsx       - Main application component
  ├── main.tsx      - Application entry point
  ├── index.css     - Global styles
  ├── App.css       - App-specific styles
  └── assets/       - Static assets
```

## License

This project is open source and available under the MIT License.
