const TWELVE_DATA_API_KEY = import.meta.env.VITE_TWELVE_DATA_API_KEY || 'demo';

export const timeRanges = {
  '1W': { days: 7, label: '1 Week' },
  '1M': { days: 30, label: '1 Month' },
  '3M': { days: 90, label: '3 Months' },
  '6M': { days: 180, label: '6 Months' },
  '1Y': { days: 365, label: '1 Year' }
};

export const fetchStockData = async (symbol, outputSize = 365) => {
  const upperSymbol = symbol.toUpperCase();

  try {
    const response = await fetch(
      `https://api.twelvedata.com/time_series?symbol=${upperSymbol}&interval=1day&outputsize=${outputSize}&apikey=${TWELVE_DATA_API_KEY}`
    );

    const data = await response.json();

    if (data.status === 'error' || !data.values) {
      throw new Error(data.message || 'Invalid stock symbol or no data available');
    }

    const formattedData = data.values.map((item) => ({
      date: item.datetime,
      open: parseFloat(parseFloat(item.open).toFixed(2)),
      high: parseFloat(parseFloat(item.high).toFixed(2)),
      low: parseFloat(parseFloat(item.low).toFixed(2)),
      close: parseFloat(parseFloat(item.close).toFixed(2)),
      volume: parseInt(item.volume)
    })).reverse();

    return formattedData;
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch stock data');
  }
};

export const exportToCSV = (stocks) => {
  if (!stocks || stocks.length === 0) return;

  const headers = ['Date', ...stocks.map(s => `${s.symbol} Close`), ...stocks.map(s => `${s.symbol} Volume`)];
  const rows = [headers];

  const maxLength = Math.max(...stocks.map(s => s.data.length));

  for (let i = 0; i < maxLength; i++) {
    const row = [stocks[0].data[i]?.date || ''];
    stocks.forEach(stock => {
      row.push(stock.data[i]?.close?.toFixed(2) || '');
    });
    stocks.forEach(stock => {
      row.push(stock.data[i]?.volume || '');
    });
    rows.push(row);
  }

  const csvContent = rows.map(row => row.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `stock-data-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  window.URL.revokeObjectURL(url);
};

const popularStocks = [
  'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'META', 'NVDA', 'AMD', 'NFLX', 'DIS',
  'JPM', 'V', 'WMT', 'PG', 'JNJ', 'UNH', 'MA', 'HD', 'BAC', 'XOM'
];

export const searchStockSymbols = (query) => {
  if (!query) return [];
  const upperQuery = query.toUpperCase();
  return popularStocks.filter(symbol => symbol.includes(upperQuery));
};
