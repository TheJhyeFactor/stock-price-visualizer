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
- Twelve Data API for real-time stock data

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

3. Get a free API key (optional but recommended)
   - Visit [Twelve Data](https://twelvedata.com/pricing) and sign up for a free account
   - Copy your API key
   - Create a `.env` file in the project root:
   ```bash
   VITE_TWELVE_DATA_API_KEY=your_api_key_here
   ```
   - The demo key works but has strict rate limits

4. Start the development server
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

This project uses the Twelve Data API for real-time stock data. A demo API key is included for basic testing, but getting your own free API key is recommended:

1. Sign up at [Twelve Data](https://twelvedata.com/pricing) (free tier available)
2. Get your API key from the dashboard
3. Create a `.env` file in the project root
4. Add: `VITE_TWELVE_DATA_API_KEY=your_api_key_here`

The free tier includes 800 API calls per day, which is plenty for testing and demo purposes.

## Usage

1. Enter a stock ticker symbol (e.g., AAPL, MSFT, GOOGL) in the search bar
2. Click "Add Stock" to fetch and display the data
3. The chart will update to show all added stocks
4. Click the × button on any stock card to remove it
5. Compare trends across multiple stocks

## Limitations

- Demo API key has very limited requests (get your own free key for better experience)
- Free API tier: 800 calls/day, 8 calls/minute
- Maximum 5 stocks can be compared at once
- Data shows the last 100 trading days

## License

MIT
