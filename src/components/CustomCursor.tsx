import React, { useEffect, useState, useRef } from 'react'

export const CustomCursor: React.FC = () => {
  const [isPointer, setIsPointer] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isTouch] = useState(() => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches)

  const cursorDotRef = useRef<HTMLDivElement>(null)
  const cursorRingRef = useRef<HTMLDivElement>(null)

  const mousePos = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })

  useEffect(() => {
    // Disable custom cursor on touch devices
    if (isTouch) return

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      if (!isVisible) setIsVisible(true)

      // Check if hovering interactive target
      const target = e.target as HTMLElement | null
      const isInteractive = Boolean(
        target?.closest('button') ||
        target?.closest('a') ||
        target?.closest('input') ||
        target?.closest('select') ||
        target?.closest('[role="button"]') ||
        target?.classList.contains('cursor-pointer')
      )
      setIsPointer(isInteractive)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    // Smooth ring lerping loop
    let animationId: number
    const render = () => {
      // Lerp ring towards dot
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.18
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.18

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`
      }
      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`
      }

      animationId = requestAnimationFrame(render)
    }
    animationId = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      cancelAnimationFrame(animationId)
    }
  }, [isTouch, isVisible])

  if (isTouch || !isVisible) return null

  return (
    <>
      {/* Central pinpoint dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 -ml-[3px] -mt-[3px] w-[6px] height-[6px] h-[6px] bg-[#D4AF37] rounded-full pointer-events-none z-[9999] transition-transform duration-75"
      />
      {/* Delicate outer champagne ring */}
      <div
        ref={cursorRingRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9999] border transition-[width,height,margin,border-color,background-color] duration-200 ease-out ${
          isPointer
            ? 'w-[48px] h-[48px] -ml-[24px] -mt-[24px] border-[#D4AF37] bg-[#D4AF37]/10 backdrop-blur-[1px]'
            : 'w-[28px] h-[28px] -ml-[14px] -mt-[14px] border-[#D4AF37]/40'
        }`}
      />
    </>
  )
}
