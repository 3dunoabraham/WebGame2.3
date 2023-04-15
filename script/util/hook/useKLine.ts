import { useState, useEffect } from 'react';
import { Ticker, TickerName,  } from '@/../script/state/repository/ticker';
import { KLine, getKLine } from '../../state/repository/kline';

export default function useKLine(tickerName: TickerName, timeframe: string, delay: number): KLine[] {
    const [kline, setKLine] = useState<KLine[]>([]);
  
    const fetchKLine = async () => {
      try {
        const newKLine = await getKLine(tickerName, timeframe);
        setKLine(newKLine);
      } catch (e) {
        return
      }
    };
  
    useEffect(() => {
      fetchKLine();
      const intervalId = setInterval(fetchKLine, delay);
      return () => clearInterval(intervalId);
    }, [tickerName, timeframe]);
  
    return kline;
  };