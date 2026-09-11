import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

/**
 * ============================================================================
 * INSTRUCTIONS FOR ASSET DROP:
 * To load your custom Toyota Innova or luxury MPV 3D model:
 * Place your GLB file directly at:
 *    `public/innova.glb`  (or `public/models/innova.glb`)
 *
 * The loader will automatically load it, center it on the ground plane,
 * normalize its scale, and apply ultra-premium luxury PBR materials.
 * ============================================================================
 */

export interface CarElements {
  carGroup: THREE.Group
  wheels: THREE.Object3D[]
  headlights: THREE.Mesh[]
  headlightCones: THREE.Mesh[]
  taillight: THREE.Mesh | null
  setHeadlightsActive: (active: boolean, intensity?: number) => void
  updateWheels: (speed: number) => void
}

export function createLuxuryCar(): CarElements {
  const carGroup = new THREE.Group()

  const wheels: THREE.Object3D[] = []
  const headlights: THREE.Mesh[] = []
  const headlightCones: THREE.Mesh[] = []
  let taillightMesh: THREE.Mesh | null = null

  // 1. Core High-End PBR Materials
  // Deep Obsidian Metallic Clearcoat Body Paint (Veloce Signature)
  const bodyPaintMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#0E0F13'),
    metalness: 0.88,
    roughness: 0.16,
    clearcoat: 1.0,
    clearcoatRoughness: 0.08,
    reflectivity: 1.0,
    envMapIntensity: 1.4,
  })

  // Tinted Privacy Glass (High Transmission & Specular Reflections)
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#0A0B0E'),
    metalness: 0.1,
    roughness: 0.04,
    transmission: 0.75,
    thickness: 0.5,
    transparent: true,
    opacity: 0.9,
    ior: 1.52,
    envMapIntensity: 1.2,
  })

  // Headlight Projector Lens (Dynamic Emissive Intensity)
  const headlightMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#FFFFFF'),
    emissive: new THREE.Color('#EBF3FF'),
    emissiveIntensity: 0.3,
    roughness: 0.1,
    metalness: 0.2,
  })

  // OLED Rear Lightbar Material
  const taillightMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#FF1525'),
    emissive: new THREE.Color('#FF1525'),
    emissiveIntensity: 2.5,
    roughness: 0.2,
    metalness: 0.1,
  })

  // Volumetric Headlight Light Cones Material
  const beamMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color('#E8F1FF'),
    transparent: true,
    opacity: 0.0,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  })

  // 2. Volumetric Headlight Cones (projected in front of vehicle)
  const coneGeo = new THREE.ConeGeometry(1.5, 6.5, 24, 1, true)
  coneGeo.rotateX(-Math.PI / 2)

  const leftBeam = new THREE.Mesh(coneGeo, beamMaterial)
  leftBeam.position.set(-0.7, 0.55, 5.2)
  carGroup.add(leftBeam)
  headlightCones.push(leftBeam)

  const rightBeam = new THREE.Mesh(coneGeo, beamMaterial)
  rightBeam.position.set(0.7, 0.55, 5.2)
  carGroup.add(rightBeam)
  headlightCones.push(rightBeam)

  // 3. Ground Contact Shadow Plane (Soft diffused ground ambient occlusion)
  const shadowCanvas = document.createElement('canvas')
  shadowCanvas.width = 512
  shadowCanvas.height = 512
  const ctx = shadowCanvas.getContext('2d')
  if (ctx) {
    const grad = ctx.createRadialGradient(256, 256, 40, 256, 256, 235)
    grad.addColorStop(0, 'rgba(0, 0, 0, 0.95)')
    grad.addColorStop(0.35, 'rgba(0, 0, 0, 0.65)')
    grad.addColorStop(0.7, 'rgba(0, 0, 0, 0.22)')
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)')
    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.ellipse(256, 256, 230, 115, 0, 0, Math.PI * 2)
    ctx.fill()
  }

  const shadowTexture = new THREE.CanvasTexture(shadowCanvas)
  const shadowPlaneGeo = new THREE.PlaneGeometry(3.6, 6.0)
  const shadowPlaneMat = new THREE.MeshBasicMaterial({
    map: shadowTexture,
    transparent: true,
    opacity: 0.88,
    depthWrite: false,
  })
  const shadowMesh = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat)
  shadowMesh.rotation.x = -Math.PI / 2
  shadowMesh.position.set(0, 0.015, 0)
  carGroup.add(shadowMesh)

  // 4. Setup GLTF Loader with DRACO Support
  const loader = new GLTFLoader()
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/')
  loader.setDRACOLoader(dracoLoader)

  // Model file candidate paths in priority order
  const modelCandidates = [
    '/innova.glb',
    '/models/innova.glb',
    'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/models/gltf/ferrari.glb',
  ]

  // Recursive loader across candidates
  function loadCandidate(index: number) {
    if (index >= modelCandidates.length) {
      console.error('[Veloce 3D] All candidate models failed to load.')
      return
    }

    const currentPath = modelCandidates[index]
    loader.load(
      currentPath,
      (gltf) => {
        console.log(`[Veloce 3D] Successfully loaded vehicle from: ${currentPath}`)
        const model = gltf.scene

        // ----------------------------------------------------
        // A. Auto-Center & Normalize Scale via Box3
        // ----------------------------------------------------
        const box = new THREE.Box3().setFromObject(model)
        const size = new THREE.Vector3()
        box.getSize(size)

        // Target length for executive vehicle ~ 4.8 units
        const targetLength = 4.8
        const maxHorizontal = Math.max(size.x, size.z)
        const scaleFactor = targetLength / (maxHorizontal > 0.01 ? maxHorizontal : 1)
        model.scale.setScalar(scaleFactor)

        // Recompute bounding box after scale
        box.setFromObject(model)
        const center = new THREE.Vector3()
        box.getCenter(center)

        // Center on X and Z, and place min.y exactly on ground (y = 0)
        model.position.x = -center.x
        model.position.y = -box.min.y // flush on ground plane
        model.position.z = -center.z

        // Check front vs rear orientation:
        // We identify front wheels/lights; if front is towards -Z, rotate by Math.PI
        let hasFrontAtNegativeZ = false
        model.traverse((child) => {
          const lowerName = child.name.toLowerCase()
          if (lowerName.includes('front') || lowerName.includes('headlight') || lowerName.includes('fl') || lowerName.includes('fr')) {
            const worldPos = new THREE.Vector3()
            child.getWorldPosition(worldPos)
            if (worldPos.z < 0) {
              hasFrontAtNegativeZ = true
            }
          }
        })

        if (hasFrontAtNegativeZ) {
          model.rotation.y = Math.PI
        }

        // ----------------------------------------------------
        // B. Intelligent PBR Material Traversal
        // ----------------------------------------------------
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh
            mesh.castShadow = true
            mesh.receiveShadow = true

            const meshName = (mesh.name || '').toLowerCase()
            const matName = ((mesh.material as THREE.Material)?.name || '').toLowerCase()
            const identifier = `${meshName} ${matName}`

            // Wheels & Rims
            if (
              identifier.includes('wheel') ||
              identifier.includes('rim') ||
              identifier.includes('tire') ||
              identifier.includes('tyre')
            ) {
              wheels.push(mesh)
            }

            // Headlights & Front Indicators
            if (
              identifier.includes('headlight') ||
              identifier.includes('projector') ||
              identifier.includes('turn_signal') ||
              (identifier.includes('light') && !identifier.includes('red') && !identifier.includes('tail'))
            ) {
              mesh.material = headlightMaterial
              headlights.push(mesh)
            }
            // Taillights & Rear LED Bar
            else if (
              identifier.includes('taillight') ||
              identifier.includes('tail_light') ||
              identifier.includes('light_red') ||
              identifier.includes('brake_light')
            ) {
              mesh.material = taillightMaterial
              taillightMesh = mesh
            }
            // Glass, Windows & Windshield
            else if (
              identifier.includes('glass') ||
              identifier.includes('window') ||
              identifier.includes('windshield') ||
              identifier.includes('windscreen')
            ) {
              mesh.material = glassMaterial
            }
            // Body Paint & Exterior Panels
            else if (
              identifier.includes('body') ||
              identifier.includes('paint') ||
              identifier.includes('car_body') ||
              identifier.includes('chassis') ||
              identifier.includes('hood') ||
              identifier.includes('door') ||
              identifier.includes('fender') ||
              identifier.includes('bumper') ||
              identifier.includes('roof')
            ) {
              mesh.material = bodyPaintMaterial
            }
            // Fallback for generic materials: refine metalness/roughness for luxury look
            else if (mesh.material && (mesh.material as THREE.MeshStandardMaterial).isMeshStandardMaterial) {
              const stdMat = mesh.material as THREE.MeshStandardMaterial
              stdMat.envMapIntensity = 1.2
            }
          }
        })

        carGroup.add(model)
      },
      undefined,
      (error) => {
        console.warn(`[Veloce 3D] Failed to load ${currentPath}, falling back to candidate ${index + 1}...`, error)
        loadCandidate(index + 1)
      }
    )
  }

  // Start loading primary candidate
  loadCandidate(0)

  // 5. Interactive Control Handlers
  const setHeadlightsActive = (active: boolean, intensity: number = 3.5) => {
    headlightMaterial.emissiveIntensity = active ? intensity : 0.3
    beamMaterial.opacity = active ? 0.22 : 0.0
  }

  const updateWheels = (speed: number) => {
    wheels.forEach((w) => {
      w.rotation.x += speed
    })
  }

  return {
    carGroup,
    wheels,
    headlights,
    headlightCones,
    taillight: taillightMesh,
    setHeadlightsActive,
    updateWheels,
  }
}
