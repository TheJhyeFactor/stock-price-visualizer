import { useState } from 'react';

const SearchBar = ({ onAddStock, loading }) => {
  const [symbol, setSymbol] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (symbol.trim()) {
      onAddStock(symbol.toUpperCase());
      setSymbol('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        placeholder="Enter stock symbol (e.g., AAPL, MSFT, GOOGL)"
        disabled={loading}
      />
      <button type="submit" disabled={loading || !symbol.trim()}>
        {loading ? 'Loading...' : 'Add Stock'}
      </button>
    </form>
  );
};

export default SearchBar;
