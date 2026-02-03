import { useGLTF } from "@react-three/drei"

export default function Ipad() {
  const { scene } = useGLTF("/models/ipad.glb")

  return (
    <primitive
      object={scene}
      scale={4}
      position={[-80, -40, -100]}
      rotation={[-18.8, 17.5, -20]}
    />
  )
}

useGLTF.preload("/models/ipad.glb")
