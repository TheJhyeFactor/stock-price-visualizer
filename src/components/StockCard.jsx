const StockCard = ({ symbol, data, onRemove, color }) => {
  const latestData = data[data.length - 1];
  const previousData = data[data.length - 2];

  const priceChange = latestData && previousData
    ? latestData.close - previousData.close
    : 0;
  const percentChange = previousData
    ? (priceChange / previousData.close) * 100
    : 0;

  return (
    <div className="stock-card" style={{ borderLeft: `4px solid ${color}` }}>
      <div className="stock-card-header">
        <h3>{symbol}</h3>
        <button onClick={() => onRemove(symbol)} className="remove-btn">×</button>
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
          </div>
        </div>
      )}
    </div>
  );
};

export default StockCard;
