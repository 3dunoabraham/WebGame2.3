"use client";

import { analyzeKlineData } from "../../../script/util/helper/kline"

function Component ({ theArray }:any) {
    const analizedData = analyzeKlineData(theArray)
    
    console.log("analizedData", analizedData)

    return (
        <div className="flex-wrap gap-4">
            <div> trendDirection: {analizedData.trendDirection}</div>

            <div>
            pivots:
            {analizedData.pivots.map((aLevel, index) => {
                return <div key={index}>{aLevel}</div>
            })}
            </div>
            


            <div> minValue: {analizedData.minValue}</div>

            <div> maxValue: {analizedData.maxValue}</div>

        </div>
    )
}

export default Component