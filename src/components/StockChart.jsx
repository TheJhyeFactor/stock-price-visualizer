import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ComposedChart, Bar, Area
} from 'recharts';

const StockChart = ({ data, stocks, chartType = 'line' }) => {
  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const mergedData = data.length > 0 ? data[0].data.map((item, idx) => {
    const point = { date: item.date };
    data.forEach((stock, stockIdx) => {
      if (stock.data[idx]) {
        point[stock.symbol] = stock.data[idx].close;
        point[`${stock.symbol}_open`] = stock.data[idx].open;
        point[`${stock.symbol}_high`] = stock.data[idx].high;
        point[`${stock.symbol}_low`] = stock.data[idx].low;
        point[`${stock.symbol}_volume`] = stock.data[idx].volume;
      }
    });
    return point;
  }) : [];

  const CustomCandlestick = ({ x, y, width, height, payload, symbol, color }) => {
    const open = payload[`${symbol}_open`];
    const close = payload[symbol];
    const high = payload[`${symbol}_high`];
    const low = payload[`${symbol}_low`];

    if (!open || !close || !high || !low) return null;

    const isRising = close > open;
    const candleColor = isRising ? '#10b981' : '#ef4444';

    const yHigh = y;
    const yLow = y + height;
    const yOpen = y + (height * (high - open) / (high - low));
    const yClose = y + (height * (high - close) / (high - low));
    const candleHeight = Math.abs(yClose - yOpen);

    return (
      <g>
        <line
          x1={x + width / 2}
          y1={yHigh}
          x2={x + width / 2}
          y2={yLow}
          stroke={candleColor}
          strokeWidth={1}
        />
        <rect
          x={x}
          y={Math.min(yOpen, yClose)}
          width={width}
          height={Math.max(candleHeight, 1)}
          fill={candleColor}
          stroke={candleColor}
        />
      </g>
    );
  };

  if (chartType === 'candlestick' && data.length === 1) {
    const symbol = stocks[0];
    const color = colors[0];

    return (
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart data={mergedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis
              dataKey="date"
              tickFormatter={formatDate}
              stroke="#94a3b8"
            />
            <YAxis
              stroke="#94a3b8"
              domain={['dataMin - 5', 'dataMax + 5']}
              tickFormatter={(value) => `$${value.toFixed(2)}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '8px'
              }}
              labelFormatter={formatDate}
              formatter={(value, name) => {
                if (name.includes('volume')) {
                  return [`${(value / 1000000).toFixed(2)}M`, 'Volume'];
                }
                return [`$${value.toFixed(2)}`, name.replace(/_/g, ' ')];
              }}
            />
            <Legend />
            <Bar
              dataKey={`${symbol}_volume`}
              fill="#334155"
              opacity={0.3}
              yAxisId="volume"
            />
            <Line
              type="monotone"
              dataKey={`${symbol}_high`}
              stroke={color}
              strokeWidth={2}
              dot={false}
              name={`${symbol} High`}
            />
            <Line
              type="monotone"
              dataKey={`${symbol}_low`}
              stroke={color}
              strokeWidth={2}
              dot={false}
              name={`${symbol} Low`}
            />
            <Line
              type="monotone"
              dataKey={symbol}
              stroke={color}
              strokeWidth={3}
              dot={false}
              name={`${symbol} Close`}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={mergedData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            stroke="#94a3b8"
          />
          <YAxis
            stroke="#94a3b8"
            tickFormatter={(value) => `$${value.toFixed(2)}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '8px'
            }}
            labelFormatter={formatDate}
            formatter={(value) => [`$${value.toFixed(2)}`, '']}
          />
          <Legend />
          {stocks.map((symbol, idx) => (
            <Line
              key={symbol}
              type="monotone"
              dataKey={symbol}
              stroke={colors[idx % colors.length]}
              strokeWidth={2}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockChart;
