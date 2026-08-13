import React, { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { createPortal } from 'react-dom'
import useTranslation from 'next-translate/useTranslation'

const INITIAL_SCALE = 1.5
const MIN_SCALE = 1
const MAX_SCALE = 4

const ImageModal = ({ isOpen, onClose, imageSrc, imageAlt }) => {
  const { t } = useTranslation('common')
  const [scale, setScale] = useState(INITIAL_SCALE)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)

  const modalRef = useRef(null)
  const scaleRef = useRef(INITIAL_SCALE)
  const positionRef = useRef({ x: 0, y: 0 })
  const isDraggingRef = useRef(false)
  const dragStartRef = useRef({ x: 0, y: 0 })
  const lastTouchDistanceRef = useRef(null)
  const hasDraggedRef = useRef(false)

  const resetView = () => {
    scaleRef.current = INITIAL_SCALE
    positionRef.current = { x: 0, y: 0 }
    setScale(INITIAL_SCALE)
    setPosition({ x: 0, y: 0 })
    setIsDragging(false)
    isDraggingRef.current = false
    lastTouchDistanceRef.current = null
    hasDraggedRef.current = false
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      resetView()
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = e => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      window.addEventListener('keydown', handleEscape)
    }

    return () => {
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  useEffect(() => {
    const modal = modalRef.current
    if (!modal || !isOpen) return

    const getTouchDistance = touches => {
      const dx = touches[0].clientX - touches[1].clientX
      const dy = touches[0].clientY - touches[1].clientY
      return Math.sqrt(dx * dx + dy * dy)
    }

    const applyScale = newScale => {
      const clampedScale = Math.min(Math.max(MIN_SCALE, newScale), MAX_SCALE)
      scaleRef.current = clampedScale
      setScale(clampedScale)

      if (clampedScale === MIN_SCALE) {
        positionRef.current = { x: 0, y: 0 }
        setPosition({ x: 0, y: 0 })
      }
    }

    const handleTouchStart = e => {
      if (e.touches.length === 2) {
        e.preventDefault()
        lastTouchDistanceRef.current = getTouchDistance(e.touches)
      } else if (e.touches.length === 1 && scaleRef.current > MIN_SCALE) {
        isDraggingRef.current = true
        setIsDragging(true)
        dragStartRef.current = {
          x: e.touches[0].clientX - positionRef.current.x,
          y: e.touches[0].clientY - positionRef.current.y,
        }
      }
    }

    const handleTouchMove = e => {
      if (e.touches.length === 2) {
        e.preventDefault()
        hasDraggedRef.current = true
        const currentDistance = getTouchDistance(e.touches)
        if (lastTouchDistanceRef.current) {
          const scaleFactor = currentDistance / lastTouchDistanceRef.current
          applyScale(scaleRef.current * scaleFactor)
        }
        lastTouchDistanceRef.current = currentDistance
      } else if (
        e.touches.length === 1 &&
        isDraggingRef.current &&
        scaleRef.current > MIN_SCALE
      ) {
        e.preventDefault()
        hasDraggedRef.current = true
        const newPosition = {
          x: e.touches[0].clientX - dragStartRef.current.x,
          y: e.touches[0].clientY - dragStartRef.current.y,
        }
        positionRef.current = newPosition
        setPosition(newPosition)
      }
    }

    const handleTouchEnd = () => {
      lastTouchDistanceRef.current = null
      isDraggingRef.current = false
      setIsDragging(false)
    }

    const handleWheel = e => {
      e.preventDefault()
      hasDraggedRef.current = true
      applyScale(scaleRef.current + e.deltaY * -0.001)
    }

    const handleMouseDown = e => {
      if (e.target.closest('button')) return
      if (scaleRef.current > MIN_SCALE) {
        isDraggingRef.current = true
        setIsDragging(true)
        dragStartRef.current = {
          x: e.clientX - positionRef.current.x,
          y: e.clientY - positionRef.current.y,
        }
      }
    }

    const handleMouseMove = e => {
      if (isDraggingRef.current && scaleRef.current > MIN_SCALE) {
        hasDraggedRef.current = true
        const newPosition = {
          x: e.clientX - dragStartRef.current.x,
          y: e.clientY - dragStartRef.current.y,
        }
        positionRef.current = newPosition
        setPosition(newPosition)
      }
    }

    const handleMouseUp = () => {
      isDraggingRef.current = false
      setIsDragging(false)
    }

    modal.addEventListener('touchstart', handleTouchStart, { passive: false })
    modal.addEventListener('touchmove', handleTouchMove, { passive: false })
    modal.addEventListener('touchend', handleTouchEnd)
    modal.addEventListener('wheel', handleWheel, { passive: false })
    modal.addEventListener('mousedown', handleMouseDown)
    modal.addEventListener('mousemove', handleMouseMove)
    modal.addEventListener('mouseup', handleMouseUp)
    modal.addEventListener('mouseleave', handleMouseUp)

    return () => {
      modal.removeEventListener('touchstart', handleTouchStart)
      modal.removeEventListener('touchmove', handleTouchMove)
      modal.removeEventListener('touchend', handleTouchEnd)
      modal.removeEventListener('wheel', handleWheel)
      modal.removeEventListener('mousedown', handleMouseDown)
      modal.removeEventListener('mousemove', handleMouseMove)
      modal.removeEventListener('mouseup', handleMouseUp)
      modal.removeEventListener('mouseleave', handleMouseUp)
    }
  }, [isOpen])

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget && !hasDraggedRef.current) {
      onClose()
    }
  }

  if (!isOpen) return null

  const modalContent = (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={handleBackdropClick}
      style={{ touchAction: 'none' }}
    >
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-20 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white/20"
        aria-label="Close modal"
        type="button"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {scale > MIN_SCALE && (
        <div className="absolute left-4 top-4 z-20 rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm">
          {Math.round(scale * 100)}%
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
        <div className="absolute left-0 right-0 top-0 h-20 bg-gradient-to-b from-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 top-0 w-20 bg-gradient-to-r from-black/50 to-transparent" />
        <div className="absolute bottom-0 right-0 top-0 w-20 bg-gradient-to-l from-black/50 to-transparent" />
      </div>

      <div className="relative z-0 flex max-h-full max-w-full items-center justify-center p-4">
        <div
          className="relative will-change-transform"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            cursor: scale > MIN_SCALE ? (isDragging ? 'grabbing' : 'grab') : 'default',
          }}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={1200}
            height={800}
            className="h-auto max-h-[95vh] w-auto max-w-[95vw] select-none object-contain"
            priority
            draggable={false}
          />
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 text-xs text-white/70 backdrop-blur-sm">
        <span className="hidden md:inline">
          {t('image-modal.scroll-to-zoom')} • {t('image-modal.drag-to-pan')}{' '}
          •{' '}
        </span>
        <span className="md:hidden">{t('image-modal.pinch-to-zoom')} • </span>
        {t('image-modal.click-outside-to-close')}
      </div>
    </div>
  )

  return typeof document !== 'undefined'
    ? createPortal(modalContent, document.body)
    : null
}

export default ImageModal
