"use client";

import { useMemo } from "react";
import FlexTable from "../molecule/FlexTable"
import useTicker from "../../../script/util/hook/useTicker";
import useKLine from "../../../script/util/hook/useKLine";
import { KLine } from "../../../script/state/repository/kline";
import { analyzeKlineData, findMaxAndMinValues } from "../../../script/util/helper/kline";


function Component ({ initialArray }:any) {
    const queryArray:any = useKLine("BTCUSDT", "1m", 60*50*1000); // SEC*CANDLE*MILISECONDS
    const activeArray = useMemo(()=>{
        // console.log("queryArray", queryArray)
        
        return queryArray.filter((x:any,i:number)=>i%50==0)
    },[queryArray]) 
    const latestArray = useMemo(()=>{
        // console.log("initialArray", initialArray)
        let rangeArray = initialArray.slice(490,500)
        let rangeValues = findMaxAndMinValues(rangeArray)
        let priceRange = rangeValues.maxValue - rangeValues.minValue 
        
        return rangeArray.map((x:any,i:any)=>{
            let side = x[4] > x[1] ? 1 : 0
            let currentRaiseDiff = (side ? x[1] : x[4]) - rangeValues.minValue 
            let high = side ? x[4] : x[1]
            let low = !side ? x[4] : x[1]
            let candleHeight = high - low

            return {
                max: x[2],
                high,
                low,
                min: x[3],
                heightPercent: candleHeight / priceRange,
                raisePercent: currentRaiseDiff / priceRange,
                side,
            }
        })
    },[initialArray]) 

    const latestSummary = useMemo(()=>{
        if (initialArray.length == 0) return null
        console.log("initialArray", initialArray.slice(490,500))
        let stats = findMaxAndMinValues(initialArray.slice(490,500))
        return {
            ...stats,

        }
    },[initialArray]) 



    return (
        <div className="flex-col w-100 pos-rel box-shadow-1 py-2 "
            style={{background: "linear-gradient(-50deg, #E6EBEC, #ffffff, #E6EBEC)"}}
        >
            <div>
                <div className="pa-2 tx-sm pos-abs left-0 top-0">{latestSummary?.minValue}</div>
                <div className="pa-2 tx-sm pos-abs left-0 bottom-0">{latestSummary?.maxValue}</div>
                <div className="pa-2 tx-sm pos-abs left-0 top-50p">{latestSummary?.avg}</div>
            </div>
            <div className="w-80 h-min-400px">
                {/* chart {latestArray.length} */}
                {/* {JSON.stringify(latestSummary)} */}
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
                                {`${(aCandle.heightPercent * 100).toFixed(2)}`}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Component
