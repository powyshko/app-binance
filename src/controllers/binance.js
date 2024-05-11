import axios from 'axios';

export const getDepthSnapshot = async (symbol, limit) => {
  const { data } = await axios.get('https://api.binance.com/api/v3/depth', {
    params: { symbol, limit }
  });

  return data;
};

export const openWebSocket = (symbol) => {
  const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}@depth`);
  return ws;
};
