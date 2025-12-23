const API_KEY = 'demo';
const BASE_URL = 'https://www.alphavantage.co/query';

export const fetchStockData = async (symbol, interval = 'daily') => {
  const functionType = interval === 'daily' ? 'TIME_SERIES_DAILY' : 'TIME_SERIES_INTRADAY';
  const params = new URLSearchParams({
    function: functionType,
    symbol: symbol.toUpperCase(),
    apikey: API_KEY,
    outputsize: 'compact'
  });

  if (interval === 'intraday') {
    params.append('interval', '60min');
  }

  try {
    const response = await fetch(`${BASE_URL}?${params}`);
    const data = await response.json();

    if (data['Error Message']) {
      throw new Error('Invalid stock symbol');
    }

    if (data['Note']) {
      throw new Error('API call limit reached. Please wait a moment.');
    }

    const timeSeriesKey = interval === 'daily' ? 'Time Series (Daily)' : 'Time Series (60min)';
    const timeSeries = data[timeSeriesKey];

    if (!timeSeries) {
      throw new Error('No data available');
    }

    const formattedData = Object.entries(timeSeries).map(([date, values]) => ({
      date,
      open: parseFloat(values['1. open']),
      high: parseFloat(values['2. high']),
      low: parseFloat(values['3. low']),
      close: parseFloat(values['4. close']),
      volume: parseInt(values['5. volume'])
    })).reverse();

    return formattedData;
  } catch (error) {
    throw error;
  }
};

export const searchSymbol = async (keywords) => {
  const params = new URLSearchParams({
    function: 'SYMBOL_SEARCH',
    keywords: keywords,
    apikey: API_KEY
  });

  try {
    const response = await fetch(`${BASE_URL}?${params}`);
    const data = await response.json();

    if (data['bestMatches']) {
      return data['bestMatches'].map(match => ({
        symbol: match['1. symbol'],
        name: match['2. name'],
        region: match['4. region']
      }));
    }

    return [];
  } catch (error) {
    console.error('Search failed:', error);
    return [];
  }
};
