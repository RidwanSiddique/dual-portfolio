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

            {/* Desktop Icons (Behind windows by default due to DOM order) */}
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
                    pointerEvents: 'auto', // Enable clicks
                    zIndex: 10
                }}
            >
                {[
                    { name: 'Home', route: '/about', color: '#ccc' },
                    { name: 'Developer', route: '/developer', color: '#4e9a06' }, // Green folder
                    { name: 'Photographer', route: '/photographer', color: '#007AFF' }, // Blue folder
                    { name: 'Projects', route: '/developer/projects', color: '#FF9500' } // Orange folder
                ].map((item, i) => (
                    <div
                        key={i}
                        onClick={() => window.location.href = item.route} // Simple navigation
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '5px',
                            cursor: 'pointer',
                            width: '80px'
                        }}
                        className="desktop-icon"
                    >
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                width: 56,
                                height: 56,
                                background: item.color,
                                borderRadius: '12px',
                                opacity: 0.9,
                                boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '24px',
                                color: 'rgba(255,255,255,0.8)'
                            }}
                        >
                            {/* Simple icon representation */}
                            {i === 0 ? '' : i === 1 ? '>_' : i === 2 ? '📸' : '📂'}
                        </motion.div>
                        <span style={{
                            color: '#fff',
                            fontSize: '13px',
                            textShadow: '0 1px 4px rgba(0,0,0,0.9)',
                            fontWeight: 600,
                            textAlign: 'center',
                            background: 'rgba(0,0,0,0.5)',
                            padding: '2px 6px',
                            borderRadius: '4px'
                        }}>{item.name}</span>
                    </div>
                ))}
            </motion.div>

            {/* Application Windows (On top) */}
            <div style={{ position: 'relative', width: '100%', height: '100%', pointerEvents: 'none', zIndex: 20 }}>
                {/* Pointer events auto on windows so they are clickable */}
                <div style={{ pointerEvents: 'auto' }}>
                    <TerminalLandingWindow />
                </div>

                <div style={{ pointerEvents: 'auto' }}>
                    <PhotoLandingWindow />
                </div>
            </div>

        </div>
    )
}
