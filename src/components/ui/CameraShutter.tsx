'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function CameraShutter({ isOpen, onAnimationComplete }: { isOpen: boolean; onAnimationComplete?: () => void }) {
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        // Shorter timing for a "Flash" feel
        const FLASH_DURATION = 400

        if (isOpen) {
            // Opening: Start visible (white), fade out, then remove
            const timer = setTimeout(() => {
                setIsVisible(false)
                onAnimationComplete?.()
            }, FLASH_DURATION)
            return () => clearTimeout(timer)
        } else {
            // Closing: Start invisible, flash to white, then trigger callback
            setIsVisible(true)
            const timer = setTimeout(() => {
                onAnimationComplete?.()
                // We keep it visible (white) so it covers the navigation flicker
            }, FLASH_DURATION)
            return () => clearTimeout(timer)
        }
    }, [isOpen, onAnimationComplete])

    if (!isVisible) return null

    return (
        <motion.div
            initial={{ opacity: isOpen ? 1 : 0 }}
            animate={{ opacity: isOpen ? 0 : 1 }}
            transition={{
                duration: isOpen ? 0.8 : 0.15, // Fade out slowly, Flash IN quickly
                ease: isOpen ? "easeOut" : "easeIn"
            }}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                background: '#fff', // White flash
                pointerEvents: 'none', // Flash shouldn't block clicks? Actually it should block while transitioning.
            }}
        />
    )
}
// Using the "ShutterClean" implementation logic
