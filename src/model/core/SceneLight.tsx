import { useRef } from "react"

function Component ({}) {
    let $lightSetup:any = useRef()

    return (
        <group ref={$lightSetup}>
            <ambientLight intensity={0.5} />
            <pointLight intensity={1.5} position={[3,0,4]} />
        </group>
    )    
}

export default Component