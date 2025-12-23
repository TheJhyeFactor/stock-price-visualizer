import { useState } from 'react';
import SearchBar from './components/SearchBar';
import StockChart from './components/StockChart';
import StockCard from './components/StockCard';
import { fetchStockData } from './utils/api';
import './App.css';

function App() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const handleAddStock = async (symbol) => {
    if (stocks.find(s => s.symbol === symbol)) {
      setError('Stock already added');
      setTimeout(() => setError(''), 3000);
      return;
    }

    if (stocks.length >= 5) {
      setError('Maximum 5 stocks allowed');
      setTimeout(() => setError(''), 3000);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = await fetchStockData(symbol);
      setStocks([...stocks, { symbol, data }]);
    } catch (err) {
      setError(err.message || 'Failed to fetch stock data');
      setTimeout(() => setError(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveStock = (symbol) => {
    setStocks(stocks.filter(s => s.symbol !== symbol));
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Stock Price Visualizer</h1>
        <p>Compare historical stock prices and track market trends</p>
      </header>

      <main className="main-content">
        <SearchBar onAddStock={handleAddStock} loading={loading} />

        {error && <div className="error-message">{error}</div>}

        {stocks.length > 0 && (
          <>
            <div className="chart-section">
              <h2>Price Comparison</h2>
              <StockChart
                data={stocks}
                stocks={stocks.map(s => s.symbol)}
              />
            </div>

            <div className="stocks-grid">
              {stocks.map((stock, idx) => (
                <StockCard
                  key={stock.symbol}
                  symbol={stock.symbol}
                  data={stock.data}
                  onRemove={handleRemoveStock}
                  color={colors[idx % colors.length]}
                />
              ))}
            </div>
          </>
        )}

        {stocks.length === 0 && !loading && (
          <div className="empty-state">
            <h2>No stocks added yet</h2>
            <p>Enter a stock symbol above to get started (e.g., AAPL, MSFT, GOOGL)</p>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>Data provided by Alpha Vantage | For educational purposes only</p>
      </footer>
    </div>
  );
}

export default App;
