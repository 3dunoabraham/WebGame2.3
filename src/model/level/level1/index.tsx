"use client";

import Scene from "@/model/core/Scene"
import ActBuySell from "./ActBuySell";
import SceneLight from "@/model/core/SceneLight";

function Component ({}) {
    return (
        <>
            <Scene>

                <SceneLight />
                
                <ActBuySell />

            </Scene>

        </>
    )
}

export default Component