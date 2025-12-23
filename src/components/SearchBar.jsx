import { useState } from 'react';
import { searchStockSymbols } from '../utils/api';

const SearchBar = ({ onAddStock, loading }) => {
  const [symbol, setSymbol] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (symbol.trim()) {
      onAddStock(symbol.toUpperCase());
      setSymbol('');
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSymbol(value);

    if (value.length > 0) {
      const results = searchStockSymbols(value);
      setSuggestions(results);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSymbol(suggestion);
    setSuggestions([]);
    setShowSuggestions(false);
    onAddStock(suggestion);
    setSymbol('');
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <div className="search-input-container">
        <input
          type="text"
          value={symbol}
          onChange={handleInputChange}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          onFocus={() => symbol.length > 0 && setSuggestions(searchStockSymbols(symbol)) && setShowSuggestions(true)}
          placeholder="Enter stock symbol (e.g., AAPL, MSFT, GOOGL)"
          disabled={loading}
        />
        {showSuggestions && suggestions.length > 0 && (
          <div className="suggestions">
            {suggestions.map((suggestion) => (
              <div
                key={suggestion}
                className="suggestion-item"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>
      <button type="submit" disabled={loading || !symbol.trim()}>
        {loading ? 'Loading...' : 'Add Stock'}
      </button>
    </form>
  );
};

export default SearchBar;
