import { Canvas } from "@react-three/fiber"
import { Bounds } from "@react-three/drei"
import Iphone from "../iphone"
import { ContactShadows } from "@react-three/drei"
import { OrbitControls } from "@react-three/drei"
import { Environment } from "@react-three/drei"

export default function IphoneScene() {
    return (
        <div className="w-full h-full">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 35 }}
                gl={{ antialias: true, shadowMap: true }}
                shadows
                className="w-full h-full"
            >
                {/* LUZES COM SOMBRAS */}
                <ambientLight intensity={0.6} />
                <directionalLight
                    position={[5, 5, 5]}
                    intensity={0.8}
                    castShadow
                    shadow-mapSize-width={2048}
                    shadow-mapSize-height={2048}
                    shadow-camera-far={50}
                    shadow-camera-left={-10}
                    shadow-camera-right={10}
                    shadow-camera-top={10}
                    shadow-camera-bottom={-10}
                />

                <Iphone />

                {/* Sombra de contato realista */}
                <ContactShadows
                    position={[30, -35, 0]}
                    opacity={0.4}
                    scale={40}
                    blur={2.5}
                    far={50}
                    resolution={512}
                />

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    enableRotate={false}
                    minDistance={200}
                />

                <Environment preset="studio" />
            </Canvas>
        </div>
    )
}
