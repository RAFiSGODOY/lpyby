import { Canvas } from "@react-three/fiber"
import { Bounds } from "@react-three/drei"
import Ipad from "../ipad"
import { ContactShadows } from "@react-three/drei"
import { OrbitControls } from "@react-three/drei"
import { Environment } from "@react-three/drei"
import { useGLTF } from "@react-three/drei"
export default function IpadScene() {
    const { scene } = useGLTF("/models/ipad.glb")
    return (
        <div className="w-full h-full">
            <Canvas
                shadows
                camera={{ position: [0, 0, 0], fov: 40 }}
            >
                <ambientLight intensity={0.6} />

                <directionalLight
                    position={[5, 5, 5]}
                    intensity={1}
                    castShadow
                    shadow-mapSize-width={2048}
                    shadow-mapSize-height={2048}
                />
                

                <Bounds fit clip margin={1.2}>
                    <Ipad />
                </Bounds>

                <Environment preset="studio" intensity={0.6} />

                
                




            </Canvas>

        </div>
    )
}
