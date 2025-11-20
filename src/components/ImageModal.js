import React, { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { createPortal } from 'react-dom'
import useTranslation from 'next-translate/useTranslation'

const ImageModal = ({ isOpen, onClose, imageSrc, imageAlt }) => {
  const { t } = useTranslation('common')
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const imageContainerRef = useRef(null)
  const lastTouchDistance = useRef(null)

  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
      setScale(1)
      setPosition({ x: 0, y: 0 })
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

  // Touch and wheel event handlers using native events with { passive: false }
  useEffect(() => {
    const container = imageContainerRef.current
    if (!container || !isOpen) return

    const getTouchDistance = touches => {
      const dx = touches[0].clientX - touches[1].clientX
      const dy = touches[0].clientY - touches[1].clientY
      return Math.sqrt(dx * dx + dy * dy)
    }

    const handleTouchStart = e => {
      if (e.touches.length === 2) {
        e.preventDefault()
        lastTouchDistance.current = getTouchDistance(e.touches)
      } else if (e.touches.length === 1 && scale > 1) {
        setIsDragging(true)
        setDragStart({
          x: e.touches[0].clientX - position.x,
          y: e.touches[0].clientY - position.y,
        })
      }
    }

    const handleTouchMove = e => {
      if (e.touches.length === 2) {
        e.preventDefault()
        const currentDistance = getTouchDistance(e.touches)
        if (lastTouchDistance.current) {
          const delta = currentDistance - lastTouchDistance.current
          const newScale = Math.min(Math.max(1, scale + delta * 0.01), 4)
          setScale(newScale)

          // Reset position if zooming out to 1
          if (newScale === 1) {
            setPosition({ x: 0, y: 0 })
          }
        }
        lastTouchDistance.current = currentDistance
      } else if (e.touches.length === 1 && isDragging && scale > 1) {
        e.preventDefault()
        setPosition({
          x: e.touches[0].clientX - dragStart.x,
          y: e.touches[0].clientY - dragStart.y,
        })
      }
    }

    const handleTouchEnd = () => {
      lastTouchDistance.current = null
      setIsDragging(false)
    }

    const handleWheel = e => {
      e.preventDefault()
      const delta = e.deltaY * -0.001
      const newScale = Math.min(Math.max(1, scale + delta), 4)
      setScale(newScale)

      // Reset position if zooming out to 1
      if (newScale === 1) {
        setPosition({ x: 0, y: 0 })
      }
    }

    // Add native event listeners with { passive: false } to allow preventDefault
    container.addEventListener('touchstart', handleTouchStart, {
      passive: false,
    })
    container.addEventListener('touchmove', handleTouchMove, { passive: false })
    container.addEventListener('touchend', handleTouchEnd)
    container.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchmove', handleTouchMove)
      container.removeEventListener('touchend', handleTouchEnd)
      container.removeEventListener('wheel', handleWheel)
    }
  }, [isOpen, scale, isDragging, position, dragStart])

  const handleMouseDown = e => {
    if (scale > 1) {
      setIsDragging(true)
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
    }
  }

  const handleMouseMove = e => {
    if (isDragging && scale > 1) {
      setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={handleBackdropClick}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white/20"
        aria-label="Close modal"
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

      {/* Zoom indicator */}
      {scale > 1 && (
        <div className="absolute left-4 top-4 z-10 rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm">
          {Math.round(scale * 100)}%
        </div>
      )}

      {/* Image container with fading borders */}
      <div
        ref={imageContainerRef}
        className="relative mx-4 max-h-[90vh] max-w-[90vw] overflow-hidden"
        onMouseDown={handleMouseDown}
        style={{
          cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
          touchAction: 'none',
        }}
      >
        {/* Fading border effect - top */}
        <div className="pointer-events-none absolute left-0 right-0 top-0 z-10 h-20 bg-gradient-to-b from-black/50 to-transparent" />

        {/* Fading border effect - bottom */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-20 bg-gradient-to-t from-black/50 to-transparent" />

        {/* Fading border effect - left */}
        <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-20 bg-gradient-to-r from-black/50 to-transparent" />

        {/* Fading border effect - right */}
        <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-20 bg-gradient-to-l from-black/50 to-transparent" />

        {/* Image */}
        <div
          className="relative transition-transform duration-200 ease-out"
          style={{
            transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
            minWidth: '300px',
            minHeight: '300px',
          }}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={1200}
            height={800}
            className="h-auto max-h-[90vh] w-auto max-w-[90vw] object-contain"
            priority
          />
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 text-xs text-white/70 backdrop-blur-sm">
        <span className="hidden md:inline">
          {t('image-modal.scroll-to-zoom')} • {t('image-modal.drag-to-pan')}{' '}
          •{' '}
        </span>
        <span className="md:hidden">{t('image-modal.pinch-to-zoom')} • </span>
        {t('image-modal.click-outside-to-close')}
      </div>
    </div>
  )

  // Use portal to render modal at the root level
  return typeof document !== 'undefined'
    ? createPortal(modalContent, document.body)
    : null
}

export default ImageModal
