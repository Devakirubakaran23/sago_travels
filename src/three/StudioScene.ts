import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { createLuxuryCar, type CarElements } from './CarModel'

export interface SceneController {
  setScrollProgress: (progress: number) => void
  setMousePosition: (x: number, y: number) => void
  setMobileRotation: (deltaX: number) => void
  destroy: () => void
}

export function initStudioScene(container: HTMLElement): SceneController {
  // 1. Scene Setup
  const scene = new THREE.Scene()
  scene.background = new THREE.Color('#0B0B0C')
  scene.fog = new THREE.FogExp2('#0B0B0C', 0.038)

  // 2. Camera Setup
  const camera = new THREE.PerspectiveCamera(
    40,
    container.clientWidth / container.clientHeight,
    0.1,
    100
  )
  const currentCamPos = new THREE.Vector3(0, 0.9, 4.9)
  const targetCamPos = new THREE.Vector3(0, 0.9, 4.9)
  const currentLookAt = new THREE.Vector3(0, 0.45, 0)
  const targetLookAt = new THREE.Vector3(0, 0.45, 0)

  camera.position.copy(currentCamPos)
  camera.lookAt(currentLookAt)

  // 3. WebGL Renderer
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: 'high-performance',
    alpha: false,
  })
  renderer.setSize(container.clientWidth, container.clientHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.25
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap

  container.appendChild(renderer.domElement)

  // 4. HDR Environment Map via PMREMGenerator & RoomEnvironment
  // Generates real physical reflections across all car paint, chrome, and glass panels,
  // completely eliminating dark silhouette issues.
  const pmremGenerator = new THREE.PMREMGenerator(renderer)
  pmremGenerator.compileEquirectangularShader()
  const roomEnv = new RoomEnvironment()
  const envTexture = pmremGenerator.fromScene(roomEnv, 0.04).texture
  scene.environment = envTexture

  // 5. Studio Lighting Architecture
  // Subtle ambient fill
  const ambientLight = new THREE.AmbientLight('#262832', 1.1)
  scene.add(ambientLight)

  // Overhead Key Softbox (Champagne Ivory)
  const overheadLight = new THREE.DirectionalLight('#FFF8ED', 3.4)
  overheadLight.position.set(0, 8, 1.5)
  overheadLight.castShadow = true
  overheadLight.shadow.mapSize.width = 2048
  overheadLight.shadow.mapSize.height = 2048
  overheadLight.shadow.bias = -0.0008
  scene.add(overheadLight)

  // Dedicated Front Grille Fill Light (illuminates front bumper, grille & headlights)
  const frontFillLight = new THREE.DirectionalLight('#EAF0FF', 2.4)
  frontFillLight.position.set(0, 1.8, 6.5)
  scene.add(frontFillLight)

  // Left Rim Spotlight (Ice-Blue metallic contour)
  const leftRimLight = new THREE.DirectionalLight('#8CB0FF', 2.2)
  leftRimLight.position.set(-6.5, 3.2, 2.0)
  scene.add(leftRimLight)

  // Right Rim Spotlight (Veloce Champagne-Gold signature)
  const rightRimLight = new THREE.DirectionalLight('#E5C378', 2.8)
  rightRimLight.position.set(6.5, 3.6, 1.8)
  scene.add(rightRimLight)

  // Rear Lightbar Outline Accent
  const rearRimLight = new THREE.DirectionalLight('#FF6677', 1.5)
  rearRimLight.position.set(0, 2.5, -6.5)
  scene.add(rearRimLight)

  // Dynamic Headlight Spotlights (projected on the floor ahead of vehicle)
  const leftHeadlightSpot = new THREE.SpotLight('#FFFFFF', 0, 20, Math.PI / 5.5, 0.5, 1.4)
  leftHeadlightSpot.position.set(-0.7, 0.55, 2.4)
  const leftSpotTarget = new THREE.Object3D()
  leftSpotTarget.position.set(-0.7, 0, 9)
  scene.add(leftSpotTarget)
  leftHeadlightSpot.target = leftSpotTarget
  scene.add(leftHeadlightSpot)

  const rightHeadlightSpot = new THREE.SpotLight('#FFFFFF', 0, 20, Math.PI / 5.5, 0.5, 1.4)
  rightHeadlightSpot.position.set(0.7, 0.55, 2.4)
  const rightSpotTarget = new THREE.Object3D()
  rightSpotTarget.position.set(0.7, 0, 9)
  scene.add(rightSpotTarget)
  rightHeadlightSpot.target = rightSpotTarget
  scene.add(rightHeadlightSpot)

  // 6. Studio Floor with Balanced Reflectivity & Shadow Catcher
  const floorGeo = new THREE.PlaneGeometry(60, 60)
  const floorMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#0A0B0E'),
    roughness: 0.55,
    metalness: 0.45,
  })
  const floor = new THREE.Mesh(floorGeo, floorMat)
  floor.rotation.x = -Math.PI / 2
  floor.position.y = 0
  floor.receiveShadow = true
  scene.add(floor)

  // Subtle studio runway accent lines (gold edge strips on the ground)
  const runwayGeo = new THREE.PlaneGeometry(0.04, 32)
  const runwayMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color('#D4AF37'),
    transparent: true,
    opacity: 0.16,
  })
  const leftRunwayLine = new THREE.Mesh(runwayGeo, runwayMat)
  leftRunwayLine.rotation.x = -Math.PI / 2
  leftRunwayLine.position.set(-2.2, 0.005, 0)
  scene.add(leftRunwayLine)

  const rightRunwayLine = new THREE.Mesh(runwayGeo, runwayMat)
  rightRunwayLine.rotation.x = -Math.PI / 2
  rightRunwayLine.position.set(2.2, 0.005, 0)
  scene.add(rightRunwayLine)

  // 7. Load & Spawn the Real 3D Vehicle
  const car: CarElements = createLuxuryCar()
  scene.add(car.carGroup)

  // 8. Dynamic Storyboard Interpolation States
  let scrollProgress = 0
  let targetHeadlightIntensity = 0.2
  let currentHeadlightIntensity = 0.2
  let targetCarZ = 0
  let currentCarZ = 0
  let mouseX = 0
  let mouseY = 0
  let mobileRotationY = 0

  // Waypoints mapped across scroll progress [0.0 - 1.0]
  const waypoints = [
    // Act 1: The Arrival (Hero - Dormant studio)
    {
      progress: 0.0,
      camPos: new THREE.Vector3(0, 0.88, 4.9),
      lookAt: new THREE.Vector3(0, 0.45, 0),
      headlights: 0.2,
      carZ: 0,
    },
    // Act 1: Awakening (Headlights flare & camera swoop)
    {
      progress: 0.12,
      camPos: new THREE.Vector3(2.3, 1.08, 4.0),
      lookAt: new THREE.Vector3(0, 0.45, 0.2),
      headlights: 3.5,
      carZ: 0,
    },
    // Act 2A: Service Precision (Front-quarter - Airport Transfers)
    {
      progress: 0.28,
      camPos: new THREE.Vector3(3.8, 1.25, 2.5),
      lookAt: new THREE.Vector3(0, 0.5, 0.3),
      headlights: 3.5,
      carZ: 0,
    },
    // Act 2B: Service Precision (Side Window Dolly - Outstation Freedom)
    {
      progress: 0.42,
      camPos: new THREE.Vector3(3.5, 1.35, -0.1),
      lookAt: new THREE.Vector3(0, 0.58, 0),
      headlights: 3.2,
      carZ: 0,
    },
    // Act 2C: Service Precision (Low Stance & Wheel Detail - White Town Chauffeur)
    {
      progress: 0.54,
      camPos: new THREE.Vector3(2.4, 0.55, -1.8),
      lookAt: new THREE.Vector3(0.9, 0.38, -1.4),
      headlights: 3.0,
      carZ: 0,
    },
    // Act 3: Interactive Glass Booking Console (Elevated 3/4 showcase view offset)
    {
      progress: 0.68,
      camPos: new THREE.Vector3(-3.4, 2.1, 3.4),
      lookAt: new THREE.Vector3(0.5, 0.45, 0),
      headlights: 3.5,
      carZ: 0,
    },
    // Act 4: Chauffeur Standards (Architectural frontal perspective)
    {
      progress: 0.84,
      camPos: new THREE.Vector3(0, 1.45, 4.5),
      lookAt: new THREE.Vector3(0, 0.45, 0),
      headlights: 3.0,
      carZ: 0,
    },
    // Act 5: Cinematic Finale (Bird's-Eye top-down view with departure glide)
    {
      progress: 1.0,
      camPos: new THREE.Vector3(0, 7.2, 0.6),
      lookAt: new THREE.Vector3(0, 0, 0),
      headlights: 4.2,
      carZ: 1.8,
    },
  ]

  function updateScrollWaypoints(p: number) {
    const clamped = Math.max(0, Math.min(1, p))

    let idx = 0
    for (let i = 0; i < waypoints.length - 1; i++) {
      if (clamped >= waypoints[i].progress && clamped <= waypoints[i + 1].progress) {
        idx = i
        break
      }
    }

    const w1 = waypoints[idx]
    const w2 = waypoints[idx + 1] || waypoints[waypoints.length - 1]
    const range = (w2.progress - w1.progress) || 0.0001
    const t = Math.max(0, Math.min(1, (clamped - w1.progress) / range))

    const easeT = t * t * (3 - 2 * t)

    targetCamPos.lerpVectors(w1.camPos, w2.camPos, easeT)
    targetLookAt.lerpVectors(w1.lookAt, w2.lookAt, easeT)
    targetHeadlightIntensity = THREE.MathUtils.lerp(w1.headlights, w2.headlights, easeT)
    targetCarZ = THREE.MathUtils.lerp(w1.carZ, w2.carZ, easeT)
  }

  // 9. Animation & Render Loop
  let animationFrameId: number
  let lastTime = performance.now()

  function animate(now: number) {
    const delta = (now - lastTime) / 1000
    lastTime = now

    // Smooth camera position lerping (0.055 damping)
    const lerpFactor = 0.055
    currentCamPos.lerp(targetCamPos, lerpFactor)
    currentLookAt.lerp(targetLookAt, lerpFactor)

    // Mouse parallax
    const parallaxX = mouseX * 0.35
    const parallaxY = mouseY * 0.18

    camera.position.set(
      currentCamPos.x + parallaxX,
      currentCamPos.y + parallaxY,
      currentCamPos.z
    )
    camera.lookAt(
      currentLookAt.x + parallaxX * 0.2,
      currentLookAt.y,
      currentLookAt.z
    )

    // Smooth car translation (Act 5 departure glide)
    currentCarZ += (targetCarZ - currentCarZ) * 0.05
    car.carGroup.position.z = currentCarZ

    // Mobile swipe rotation
    if (mobileRotationY !== 0) {
      car.carGroup.rotation.y = mobileRotationY
    } else {
      car.carGroup.rotation.y = 0
    }

    // Headlight intensity smoothing & spotlight sync
    currentHeadlightIntensity += (targetHeadlightIntensity - currentHeadlightIntensity) * 0.06
    car.setHeadlightsActive(true, currentHeadlightIntensity)

    const spotIntensity = Math.max(0, (currentHeadlightIntensity - 0.5) * 5)
    leftHeadlightSpot.intensity = spotIntensity
    rightHeadlightSpot.intensity = spotIntensity

    // Wheel spin when car moves or during scroll delta
    if (scrollProgress > 0.02 && scrollProgress < 0.98) {
      car.updateWheels(delta * 0.8)
    }

    renderer.render(scene, camera)
    animationFrameId = requestAnimationFrame(animate)
  }

  animationFrameId = requestAnimationFrame(animate)

  // 10. Window Resize Handler
  const handleResize = () => {
    if (!container) return
    const width = container.clientWidth
    const height = container.clientHeight
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  }

  window.addEventListener('resize', handleResize)

  // 11. Public API Controller
  return {
    setScrollProgress: (progress: number) => {
      scrollProgress = progress
      updateScrollWaypoints(progress)
    },
    setMousePosition: (x: number, y: number) => {
      mouseX = x
      mouseY = y
    },
    setMobileRotation: (deltaX: number) => {
      mobileRotationY += deltaX
    },
    destroy: () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      pmremGenerator.dispose()
      envTexture.dispose()
      renderer.dispose()
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement)
      }
    },
  }
}
