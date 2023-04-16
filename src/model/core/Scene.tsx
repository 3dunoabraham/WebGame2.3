"use client";

import { Canvas } from "@react-three/fiber";
import TheButton from "./TheButton";
import SceneLight from "./SceneLight";
import { OrbitControls } from "@react-three/drei";
import React from "react";

function Component ( {
    children
} : any ) {
    
    const childrenWithProps = React.Children.map(children, (child) => {
        if (React.isValidElement<any>(child)) {
          return React.cloneElement(child, {
            });
        }
        return child;
      });

    return (
        <Canvas camera={{ fov: 35, position: [0, 3, 6], }}  >

            <OrbitControls minPolarAngle={0.22} maxPolarAngle={2.1} 
                minDistance={2} maxDistance={7} enablePan={false}
            />

            {!!children && <>
                {childrenWithProps}
            </>}
            {!children && <>
                <SceneLight />
                <TheButton />
            </>}
            
        </Canvas>
    )
}

export default Component;