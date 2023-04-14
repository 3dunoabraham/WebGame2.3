import { useState, useEffect } from 'react';
import { Ticker, TickerName, getTicker } from '@/../script/state/repository/ticker';

export default function useTicker (tickerName: TickerName, delay: number) {
  const [ticker, setTicker] = useState<Ticker>({ symbol: '', price: '' });

  const fetchTicker = async () => {
    const newTicker = await getTicker(tickerName);
    setTicker(newTicker);
  };

  useEffect(() => {
    fetchTicker()
    const intervalId = setInterval(fetchTicker, delay);
    return () => clearInterval(intervalId);
  }, [tickerName]);

  return ticker;
};
