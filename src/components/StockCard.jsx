const StockCard = ({ symbol, data, onRemove, onAddToWatchlist, color, isInWatchlist }) => {
  const latestData = data[data.length - 1];
  const previousData = data[data.length - 2];

  const priceChange = latestData && previousData
    ? latestData.close - previousData.close
    : 0;
  const percentChange = previousData
    ? (priceChange / previousData.close) * 100
    : 0;

  const highs = data.map(d => d.high);
  const lows = data.map(d => d.low);
  const volumes = data.map(d => d.volume);

  const fiftyTwoWeekHigh = Math.max(...highs);
  const fiftyTwoWeekLow = Math.min(...lows);
  const avgVolume = volumes.reduce((a, b) => a + b, 0) / volumes.length;

  return (
    <div className="stock-card" style={{ borderLeft: `4px solid ${color}` }}>
      <div className="stock-card-header">
        <h3>{symbol}</h3>
        <div className="card-actions">
          {!isInWatchlist && (
            <button
              onClick={() => onAddToWatchlist(symbol)}
              className="watchlist-btn"
              title="Add to watchlist"
            >
              ★
            </button>
          )}
          <button onClick={() => onRemove(symbol)} className="remove-btn">×</button>
        </div>
      </div>

      {latestData && (
        <div className="stock-info">
          <div className="price">${latestData.close.toFixed(2)}</div>
          <div className={`change ${priceChange >= 0 ? 'positive' : 'negative'}`}>
            {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)} ({percentChange >= 0 ? '+' : ''}{percentChange.toFixed(2)}%)
          </div>

          <div className="stats">
            <div className="stat">
              <span>High</span>
              <span>${latestData.high.toFixed(2)}</span>
            </div>
            <div className="stat">
              <span>Low</span>
              <span>${latestData.low.toFixed(2)}</span>
            </div>
            <div className="stat">
              <span>Volume</span>
              <span>{(latestData.volume / 1000000).toFixed(2)}M</span>
            </div>
            <div className="stat">
              <span>52W High</span>
              <span>${fiftyTwoWeekHigh.toFixed(2)}</span>
            </div>
            <div className="stat">
              <span>52W Low</span>
              <span>${fiftyTwoWeekLow.toFixed(2)}</span>
            </div>
            <div className="stat">
              <span>Avg Volume</span>
              <span>{(avgVolume / 1000000).toFixed(2)}M</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockCard;
