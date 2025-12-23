import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import StockChart from './components/StockChart';
import StockCard from './components/StockCard';
import TimeRangeSelector from './components/TimeRangeSelector';
import Watchlist from './components/Watchlist';
import { fetchStockData, exportToCSV, timeRanges } from './utils/api';
import './App.css';

function App() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [timeRange, setTimeRange] = useState('3M');
  const [chartType, setChartType] = useState('line');
  const [watchlist, setWatchlist] = useState([]);

  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  useEffect(() => {
    const saved = localStorage.getItem('watchlist');
    if (saved) {
      setWatchlist(JSON.parse(saved));
    }
  }, []);

  const filterDataByTimeRange = (data, range) => {
    const days = timeRanges[range].days;
    return data.slice(-days);
  };

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
      const data = await fetchStockData(symbol, 365);
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

  const handleAddToWatchlist = (symbol) => {
    if (!watchlist.includes(symbol)) {
      const newWatchlist = [...watchlist, symbol];
      setWatchlist(newWatchlist);
      localStorage.setItem('watchlist', JSON.stringify(newWatchlist));
    }
  };

  const handleRemoveFromWatchlist = (symbol) => {
    const newWatchlist = watchlist.filter(s => s !== symbol);
    setWatchlist(newWatchlist);
    localStorage.setItem('watchlist', JSON.stringify(newWatchlist));
  };

  const handleExportCSV = () => {
    const filteredStocks = stocks.map(stock => ({
      ...stock,
      data: filterDataByTimeRange(stock.data, timeRange)
    }));
    exportToCSV(filteredStocks);
  };

  const filteredStocks = stocks.map(stock => ({
    ...stock,
    data: filterDataByTimeRange(stock.data, timeRange)
  }));

  return (
    <div className="app">
      <header className="header">
        <h1>Stock Price Visualizer</h1>
        <p>Compare historical stock prices and track market trends</p>
      </header>

      <main className="main-content">
        <div className="top-section">
          <SearchBar onAddStock={handleAddStock} loading={loading} />
          {stocks.length > 0 && (
            <button onClick={handleExportCSV} className="export-btn">
              Export to CSV
            </button>
          )}
        </div>

        {error && <div className="error-message">{error}</div>}

        <Watchlist
          watchlist={watchlist}
          onAdd={handleAddToWatchlist}
          onRemove={handleRemoveFromWatchlist}
          onSelect={handleAddStock}
        />

        {stocks.length > 0 && (
          <>
            <div className="chart-section">
              <div className="chart-header">
                <h2>Price Comparison</h2>
                <div className="chart-controls">
                  <TimeRangeSelector
                    selectedRange={timeRange}
                    onRangeChange={setTimeRange}
                  />
                  <div className="chart-type-selector">
                    <button
                      className={chartType === 'line' ? 'active' : ''}
                      onClick={() => setChartType('line')}
                    >
                      Line
                    </button>
                    <button
                      className={chartType === 'candlestick' ? 'active' : ''}
                      onClick={() => setChartType('candlestick')}
                    >
                      Candlestick
                    </button>
                  </div>
                </div>
              </div>
              <StockChart
                data={filteredStocks}
                stocks={filteredStocks.map(s => s.symbol)}
                chartType={chartType}
              />
            </div>

            <div className="stocks-grid">
              {stocks.map((stock, idx) => (
                <StockCard
                  key={stock.symbol}
                  symbol={stock.symbol}
                  data={stock.data}
                  onRemove={handleRemoveStock}
                  onAddToWatchlist={handleAddToWatchlist}
                  color={colors[idx % colors.length]}
                  isInWatchlist={watchlist.includes(stock.symbol)}
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
        <p>Data provided by Twelve Data | For educational purposes only</p>
      </footer>
    </div>
  );
}

export default App;
