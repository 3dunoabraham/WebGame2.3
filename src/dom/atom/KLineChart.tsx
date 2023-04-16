"use client";

import { useMemo } from "react";
import useKLine from "../../../script/util/hook/useKLine";
import { findMaxAndMinValues } from "../../../script/util/helper/kline";


function Component ({ initialArray }:any) {
    const candleLength = 10
    const queryArray:any = useKLine("BTCUSDT", "1m", 61000); // SEC*CANDLE*MILISECONDS
    const latestCandles = useMemo(()=>{
        return queryArray
        let latestLatest = queryArray.slice(500-candleLength,500)
        console.log("latestLatest", latestLatest)
        return latestLatest
    },[queryArray]) 
    const latestArray = useMemo(()=>{
        let theArray = latestCandles.length == 0 ? initialArray : latestCandles
        let rangeArray = theArray.slice(500-candleLength,500)
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
    },[initialArray, latestCandles]) 

    
    const latestFullArray = useMemo(()=>{
        let theArray = latestCandles.length == 0 ? initialArray : latestCandles
        let rangeArray = theArray.slice(0,500)
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
    },[initialArray, latestCandles]) 
    

    const latestSummary = useMemo(()=>{
        if (initialArray.length == 0 && latestCandles.length == 0) return null
        // console.log("initialArray", initialArray.slice(500-candleLength,500))
        let theArray = latestCandles.length == 0 ? initialArray : latestCandles
        let slicedArray = theArray.slice(500-candleLength,500)
        let stats = findMaxAndMinValues(slicedArray)

        let start = slicedArray[0][1]
        let end = slicedArray[9][4]
        let side = end > start ? 1 : 0
        let percentChange = side ? start / end : end / start


        return {
            ...stats,
            percentChange,

        }
    },[initialArray, latestCandles]) 



    return (<>
        <div className="flex-col w-100 pos-rel box-shadow-1 py-2  "
            style={{background: "linear-gradient(-50deg, #E6EBEC, #ffffff, #E6EBEC)"}}
        >
            <div>
                <div className="pa-2 tx-sm pos-abs left-0 top-0 translate-y--100">{100 - ( (latestSummary?.percentChange || 100) *100 )}%</div>
                <div className="pa-2 tx-sm pos-abs left-0 bottom-0">{latestSummary?.minValue}</div>
                <div className="pa-2 tx-sm pos-abs left-0 top-0">{latestSummary?.maxValue}</div>
                <div className="pa-2 tx-sm pos-abs left-0 top-50p">{latestSummary?.avg}</div>
            </div>
            <div className="w-80 h-min-400px">
                <div className="flex flex-justify-between w-100   h-100 pos-rel">
                    {latestArray.map((aCandle:any, index:number) => {
                        return (
                            <div className="tx-xs pos-abs tx-gray" key={index}
                                style={{
                                    background: aCandle.side ? "green" : "red",
                                    width:`${100/candleLength}%`,
                                    height: `${aCandle.heightPercent*100}%`,
                                    left: `${index*candleLength}%`,
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
                                    left: `${index*candleLength + 4}%`,
                                    bottom: `${aCandle.bottomPercent*100}%`,
                                }}
                            >
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
            
        <div className="flex-col pos-rel box-shadow-1 py-2  h-min-200px w-100"
            
        >
            <div className="w-100 flex-col   h-min-200px">
                <div className="flex  flex-justify-between w-100    h-100 pos-rel">
                    {latestFullArray.map((aCandle:any, index:number) => {
                        return (
                            <div className="tx-xs pos-abs tx-gray" key={index}
                                style={{
                                    background: aCandle.side ? "green" : "red",
                                    width:"1px",
                                    height: `${aCandle.fullHeightPercent*100}%`,
                                    left: `${index}px`,
                                    bottom: `${aCandle.bottomPercent*100}%`,
                                }}
                            >
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    </>)
}

export default Component
