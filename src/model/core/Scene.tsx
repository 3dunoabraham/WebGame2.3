"use client";

import { Canvas } from "@react-three/fiber";
import TheButton from "./TheButton";
import SceneLight from "./SceneLight";
import { OrbitControls } from "@react-three/drei";

function Component () {
    return (
        <Canvas camera={{ fov: 30, position: [0, 3, 6], }}  >

            <OrbitControls minPolarAngle={0.5} maxPolarAngle={2} 
                minDistance={2} maxDistance={7} enablePan={false}
            />
            <SceneLight />
            <TheButton />
            
        </Canvas>
    )
}

export default Component;