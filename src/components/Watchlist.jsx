import { useState } from 'react';

const Watchlist = ({ watchlist, onRemove, onSelect }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (watchlist.length === 0) return null;

  return (
    <div className="watchlist">
      <div className="watchlist-header" onClick={() => setIsExpanded(!isExpanded)}>
        <h3>Watchlist ({watchlist.length})</h3>
        <span className="toggle-icon">{isExpanded ? '▼' : '▶'}</span>
      </div>
      {isExpanded && (
        <div className="watchlist-items">
          {watchlist.map((symbol) => (
            <div key={symbol} className="watchlist-item">
              <span onClick={() => onSelect(symbol)} className="watchlist-symbol">
                {symbol}
              </span>
              <button onClick={() => onRemove(symbol)} className="watchlist-remove">
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
