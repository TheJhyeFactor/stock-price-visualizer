# Stock Price Visualizer

A web application for visualizing and comparing historical stock prices. Built with React and Recharts.

## Features

- Search and add stocks by ticker symbol
- View historical price data with interactive charts
- Compare up to 5 stocks simultaneously
- Display key metrics (high, low, volume, price change)
- Responsive design for mobile and desktop

## Tech Stack

- React 18
- Recharts for data visualization
- Vite for build tooling
- Finnhub API for real-time stock data

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd stock-price-visualizer
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## API Configuration

This project uses the Finnhub API for real-time stock data. A demo API key is included for testing. For production use or higher rate limits, get your own free API key from [Finnhub](https://finnhub.io/register) and update it in `src/utils/api.js`:

```javascript
const FINNHUB_API_KEY = 'your-api-key-here';
```

## Usage

1. Enter a stock ticker symbol (e.g., AAPL, MSFT, GOOGL) in the search bar
2. Click "Add Stock" to fetch and display the data
3. The chart will update to show all added stocks
4. Click the × button on any stock card to remove it
5. Compare trends across multiple stocks

## Limitations

- Free API tier has rate limits (60 calls per minute)
- Maximum 5 stocks can be compared at once
- Data shows the last 100 trading days

## License

MIT
