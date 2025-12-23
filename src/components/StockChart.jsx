import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StockChart = ({ data, stocks }) => {
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
      }
    });
    return point;
  }) : [];

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
