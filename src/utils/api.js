const TWELVE_DATA_API_KEY = import.meta.env.VITE_TWELVE_DATA_API_KEY || 'demo';

export const fetchStockData = async (symbol) => {
  const upperSymbol = symbol.toUpperCase();

  try {
    const response = await fetch(
      `https://api.twelvedata.com/time_series?symbol=${upperSymbol}&interval=1day&outputsize=100&apikey=${TWELVE_DATA_API_KEY}`
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
