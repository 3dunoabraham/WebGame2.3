"use client";

import { useMemo } from "react";
import useKLine from "../../../script/util/hook/useKLine";
import { findMaxAndMinValues } from "../../../script/util/helper/kline";


function Component ({ initialArray }:any) {
    const candleLength = 10
    const queryArray:any = useKLine("BTCUSDT", "1m", 61000); // SEC*CANDLE*MILISECONDS
    const activeArray = useMemo(()=>{
        return queryArray.slice(500-candleLength,500)
    },[queryArray]) 
    const latestArray = useMemo(()=>{
        let rangeArray = initialArray.slice(500-candleLength,500)
        let rangeValues = findMaxAndMinValues(rangeArray)
        let priceRange = rangeValues.maxValue - rangeValues.minValue 
        
        return rangeArray.map((x:any,i:any)=>{
            let side = x[4] > x[1] ? 1 : 0
            let currentRaiseDiff = (side ? x[1] : x[4]) - rangeValues.minValue 
            let currentBottomDiff = x[3] - rangeValues.minValue 
            let high = side ? x[4] : x[1]
            let low = !side ? x[4] : x[1]
            let candleHeight = high - low
            let fullCandleHeight = x[2] - x[3]

            return {
                max: x[2],
                high,
                low,
                min: x[3],
                fullHeightPercent: fullCandleHeight / priceRange,
                heightPercent: candleHeight / priceRange,
                raisePercent: currentRaiseDiff / priceRange,
                bottomPercent: currentBottomDiff / priceRange,
                side,
            }
        })
    },[initialArray]) 

    const latestSummary = useMemo(()=>{
        if (initialArray.length == 0) return null
        console.log("initialArray", initialArray.slice(500-candleLength,500))
        let stats = findMaxAndMinValues(initialArray.slice(500-candleLength,500))

        let percentChange = -( (stats.minValue / stats.maxValue) - 1 )

        return {
            ...stats,
            percentChange,

        }
    },[initialArray]) 



    return (
        <div className="flex-col w-100 pos-rel box-shadow-1 py-2 "
            style={{background: "linear-gradient(-50deg, #E6EBEC, #ffffff, #E6EBEC)"}}
        >
            <div>
                <div className="pa-2 tx-sm pos-abs left-0 top-0 translate-y--100">{latestSummary?.percentChange}%</div>
                <div className="pa-2 tx-sm pos-abs left-0 top-0">{latestSummary?.minValue}</div>
                <div className="pa-2 tx-sm pos-abs left-0 bottom-0">{latestSummary?.maxValue}</div>
                <div className="pa-2 tx-sm pos-abs left-0 top-50p">{latestSummary?.avg}</div>
            </div>
            <div className="w-80 h-min-400px">
                <div className="flex flex-justify-between w-100   h-100 pos-rel">
                    {latestArray.map((aCandle:any, index:number) => {
                        return (
                            <div className="tx-xs pos-abs tx-gray" key={index}
                                style={{
                                    background: aCandle.side ? "green" : "red",
                                    width:"10%",
                                    height: `${aCandle.heightPercent*100}%`,
                                    left: `${index*10}%`,
                                    bottom: `${aCandle.raisePercent*100}%`,
                                }}
                            >
                            </div>
                        )
                    })}
                    {latestArray.map((aCandle:any, index:number) => {
                        return (
                            <div className="tx-xs pos-abs tx-gray" key={index}
                                style={{
                                    background: aCandle.side ? "green" : "red",
                                    width:"1%",
                                    height: `${aCandle.fullHeightPercent*100}%`,
                                    left: `${index*10 + 4}%`,
                                    bottom: `${aCandle.bottomPercent*100}%`,
                                }}
                            >
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Component
