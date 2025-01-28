import simulationVertexShader from "@/assets/shaders/simulation/vertexShader.glsl"
import simulationFragmentShader from "@/assets/shaders/simulation/fragmentShader.glsl"
import * as THREE from "three"

interface SimulationUniforms {
  [uniform: string]: THREE.IUniform<THREE.DataTexture | number>
  positions: { value: THREE.DataTexture }
  uFrequency: { value: number }
  uTime: { value: number }
}

const getRandomData = (width: number, height: number) => {
  const length = width * height
  const data = new Float32Array(length * 4)

  // Pre-calculate constants
  const TWO_PI = Math.PI * 2

  for (let i = 0; i < length; i++) {
    const stride = i * 4

    // Using more efficient random distribution
    const r = Math.sqrt(Math.random()) * 2.0
    const theta = Math.random() * TWO_PI
    const phi = Math.acos(2 * Math.random() - 1)

    // More efficient spherical coordinate calculation
    const sinPhi = Math.sin(phi)
    data[stride] = r * sinPhi * Math.cos(theta)
    data[stride + 1] = r * sinPhi * Math.sin(theta)
    data[stride + 2] = r * Math.cos(phi)
    data[stride + 3] = 1.0
  }

  return data
}

class SimulationMaterial extends THREE.ShaderMaterial {
  private positionsTexture: THREE.DataTexture

  constructor(size: number) {
    const positionsTexture = new THREE.DataTexture(
      getRandomData(size, size),
      size,
      size,
      THREE.RGBAFormat,
      THREE.FloatType
    )
    positionsTexture.needsUpdate = true

    const simulationUniforms: SimulationUniforms = {
      positions: { value: positionsTexture },
      uFrequency: { value: 0.25 },
      uTime: { value: 0 },
    }

    super({
      uniforms: simulationUniforms,
      vertexShader: simulationVertexShader,
      fragmentShader: simulationFragmentShader,
    })

    this.positionsTexture = positionsTexture
  }

  dispose(): void {
    this.positionsTexture.dispose()
    super.dispose()
  }
}

export default SimulationMaterial
