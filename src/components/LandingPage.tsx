'use client'

import { SpaceWallpaper } from './desktop/SpaceWallpaper'
import { TerminalLandingWindow } from './desktop/TerminalLandingWindow'
import { PhotoLandingWindow } from './desktop/PhotoLandingWindow'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export function LandingPage() {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null

    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            overflow: 'hidden',
            position: 'relative',
            background: '#000',
        }}>
            {/* Background */}
            <SpaceWallpaper />

            {/* Desktop Gradient Overlay */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `
                        radial-gradient(circle at 50% 50%, rgba(20, 20, 30, 0.4) 0%, rgba(0,0,0,0.8) 100%)
                    `,
                    pointerEvents: 'none',
                }}
            />

            {/* Application Windows */}
            <div style={{ position: 'relative', width: '100%', height: '100%', pointerEvents: 'none' }}>
                {/* Pointer events auto on windows so they are clickable */}
                <div style={{ pointerEvents: 'auto' }}>
                    <TerminalLandingWindow />
                </div>

                <div style={{ pointerEvents: 'auto' }}>
                    <PhotoLandingWindow />
                </div>
            </div>

            {/* Desktop Icons (Optional decorative elements) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                style={{
                    position: 'absolute',
                    right: '30px',
                    top: '60px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    alignItems: 'center',
                    pointerEvents: 'none' // Just visual for now
                }}
            >
                {['Macintosh HD', 'Projects', 'Camera Roll'].map((name, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                        <div style={{ width: 48, height: 48, background: '#ccc', borderRadius: '8px', opacity: 0.8 }}></div>
                        <span style={{
                            color: '#fff',
                            fontSize: '12px',
                            textShadow: '0 1px 3px rgba(0,0,0,0.8)',
                            fontWeight: 500
                        }}>{name}</span>
                    </div>
                ))}
            </motion.div>

        </div>
    )
}
