const FINNHUB_API_KEY = 'ctbnq49r01qie21tadi0ctbnq49r01qie21tadig';
const FINNHUB_BASE = 'https://finnhub.io/api/v1';

export const fetchStockData = async (symbol) => {
  const upperSymbol = symbol.toUpperCase();

  const to = Math.floor(Date.now() / 1000);
  const from = to - (100 * 24 * 60 * 60);

  try {
    const response = await fetch(
      `${FINNHUB_BASE}/stock/candle?symbol=${upperSymbol}&resolution=D&from=${from}&to=${to}&token=${FINNHUB_API_KEY}`
    );

    const data = await response.json();

    if (data.s === 'no_data' || !data.c) {
      throw new Error('Invalid stock symbol or no data available');
    }

    const formattedData = data.t.map((timestamp, idx) => ({
      date: new Date(timestamp * 1000).toISOString().split('T')[0],
      open: parseFloat(data.o[idx].toFixed(2)),
      high: parseFloat(data.h[idx].toFixed(2)),
      low: parseFloat(data.l[idx].toFixed(2)),
      close: parseFloat(data.c[idx].toFixed(2)),
      volume: data.v[idx]
    }));

    return formattedData;
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch stock data');
  }
};
