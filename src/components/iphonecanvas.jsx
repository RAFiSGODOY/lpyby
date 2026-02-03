import { useGLTF, useTexture, ContactShadows } from "@react-three/drei"
import * as THREE from "three"
import { useThree } from "@react-three/fiber"
import { useEffect } from "react"

export default function Iphone() {
  const { scene } = useGLTF("/models/iphone.glb")
  const screenTexture = useTexture("/textures/TelaHome.png")
  const { gl } = useThree()

  useEffect(() => {
    // 🔵 CONFIGURAÇÃO DA TEXTURA (OBRIGATÓRIA)
    screenTexture.colorSpace = THREE.SRGBColorSpace
    screenTexture.flipY = false
    screenTexture.anisotropy = gl.capabilities.getMaxAnisotropy()

    // 🔵 CONFIGURAÇÃO DO RENDERER
    gl.outputColorSpace = THREE.SRGBColorSpace
    gl.toneMapping = THREE.NoToneMapping
    gl.toneMappingExposure = 1

    // 🔵 MATERIAL DA TELA (SEM LUZ)
    const screenMaterial = new THREE.MeshBasicMaterial({
      map: screenTexture
    })

    // 🔍 PROCURA A MESH DA TELA
    scene.traverse((child) => {
      if (child.isMesh) {
        // Ajuste o nome conforme o modelo
        if (child.name.toLowerCase().includes("screen")) {
          child.material = screenMaterial
        }
      }
    })
  }, [scene, screenTexture, gl])

  return (
    <>
    <primitive
      object={scene}
      scale={0.13}
      position={[30, -25, 0]}
      rotation={[0, 21.50, 0]}
    />
    <ContactShadows
    position={[0, -1.35, 0]}
    opacity={1}
    scale={4}
    blur={10}
    far={1.2}
  />
  </>
  )
}

useGLTF.preload("/models/iphone.glb")
