import { Box, Cylinder, Text } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef, useState } from "react"
import { MeshStandardMaterial } from "three"

function Component ({}) {
    let $wormhole:any = useRef()
    let $topPart:any = useRef()
    let $middlePart:any = useRef()
    let $text:any = useRef()
    let [totaldelta, s__totaldelta]:any = useState(0)
    let [forms, s__forms]:any = useState({
        isClicked: false,
        score: 0,
    })
    const setForm = (key:string, value:any) => {
        s__forms({...forms,...{[key]:value}})
    }
    useFrame(({ mouse }, delta)=>{
        s__totaldelta(totaldelta+delta)
        if (!$wormhole.current) {
            return
        }
        if (!forms.isClicked) 
        {
            return
        }
        console.log("forms.score", forms.score, totaldelta)
        $middlePart.current.rotation.y += 0.005
        if ($middlePart.current.position.y < -3.5) {
            $middlePart.current.position.x = Math.random()-0.5
            $middlePart.current.position.y = 2.5
            $middlePart.current.position.z = Math.random()-0.5
        } else {
            $middlePart.current.position.y -= 0.15
        }
    })
    const turnOff = ()  => {
        s__forms({
            isClicked: false,
            score: forms.score+1
        })
    }
    const turnOn = ()  => {
        setForm("isClicked",!forms.isClicked)
    }

    return (
        <group ref={$wormhole} rotation={[0, 0, 0]}>
            
            <Box args={[1,1,1]} scale={0.7}  position={[0,-1 - (forms.isClicked ? 0.3 : 0),0]} 
                onClick={forms.isClicked ? turnOff : turnOn}
            >
                <meshStandardMaterial attach="material"  color={forms.isClicked ? 0xff0000 : 0x009900} />
            </Box>
            

            <Text position={[0.5,0,0]} fontSize={0.25} rotation={[0,Math.PI,0]} material={new MeshStandardMaterial({ side: 0, color: "#009900" })}>Buy low</Text>
            <Text position={[-0.5,0,0]} fontSize={0.25} rotation={[0,0,0]} material={new MeshStandardMaterial({ side: 0, color: "#009900" })}>Buy low</Text>
            <Text position={[-0.5,0,0]} fontSize={0.25} rotation={[0,Math.PI,0]} material={new MeshStandardMaterial({ side: 0, color: "#ff0000" })}>Sell high</Text>
            <Text position={[0.5,0,0]} fontSize={0.25} rotation={[0,0,0]} material={new MeshStandardMaterial({ side: 0, color: "#ff0000" })}>Sell high</Text>
            {!!forms.score &&
                <group ref={$text}  position={[0,1.2,0]}>
                    <Text fontSize={0.5} material={new MeshStandardMaterial({ side: 0, color: "grey" })}>{forms.score}</Text>
                    <Text fontSize={0.5} rotation={[0,Math.PI,0]} material={new MeshStandardMaterial({ side: 0, color: "grey" })}>{forms.score}</Text>
                    <Text fontSize={0.5} rotation={[0,Math.PI/2,0]} material={new MeshStandardMaterial({ side: 0, color: "grey" })}>{forms.score}</Text>
                    <Text fontSize={0.5} rotation={[0,-Math.PI/2,0]} material={new MeshStandardMaterial({ side: 0, color: "grey" })}>{forms.score}</Text>
                </group>
            }

            {
                <group ref={$topPart}>
                    {
                        <Cylinder args={[3, 1, 2, 4, 3]} receiveShadow castShadow position={[0,2,0]} >
                            <meshStandardMaterial attach="material"  wireframe={!forms.isClicked}   />
                        </Cylinder>
                    }
                    {!!forms.isClicked &&
                        <Cylinder args={[0.1, 0.2, 0.2, 4, 3]} receiveShadow castShadow position={[0,0,0]}  ref={$middlePart}>
                            <meshStandardMaterial attach="material" color={0x0099ff} wireframe={true} />
                        </Cylinder>
                    }
                </group>
            }

            <Cylinder args={[1, 3, 2, 4, 3]} receiveShadow castShadow position={[0,-2,0]}>
                <meshStandardMaterial attach="material"  color={0xffffff} />
            </Cylinder>
            
        </group>
    )    
}

export default Component