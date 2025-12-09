'use client'

import { SpaceWallpaper } from './desktop/SpaceWallpaper'
import { TerminalLandingWindow } from './desktop/TerminalLandingWindow'
import { PhotoLandingWindow } from './desktop/PhotoLandingWindow'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export function LandingPage() {
    const [showSelection, setShowSelection] = useState(false)

    // Scroll Handler for Selection Overlay
    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            if (e.deltaY > 50 && !showSelection) {
                setShowSelection(true) // Scroll down -> Show
            } else if (e.deltaY < -50 && showSelection) {
                setShowSelection(false) // Scroll up -> Hide
            }
        }
        window.addEventListener('wheel', handleWheel)
        return () => window.removeEventListener('wheel', handleWheel)
    }, [showSelection])

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
                animate={{ opacity: 1, filter: showSelection ? 'blur(10px)' : 'blur(0px)' }}
                transition={{ delay: 1 }}
                style={{
                    position: 'absolute',
                    right: '30px',
                    top: '60px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    alignItems: 'center',
                    pointerEvents: showSelection ? 'none' : 'auto', // Disable when overlay active
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

            {/* Application Windows */}
            <motion.div
                animate={{
                    filter: showSelection ? 'blur(15px)' : 'blur(0px)',
                    scale: showSelection ? 0.95 : 1
                }}
                style={{ position: 'relative', width: '100%', height: '100%', pointerEvents: showSelection ? 'none' : 'none', zIndex: 20 }}
            >
                {/* Pointer events auto on windows so they are clickable */}
                <div style={{ pointerEvents: 'auto' }}>
                    <TerminalLandingWindow />
                </div>

                <div style={{ pointerEvents: 'auto' }}>
                    <PhotoLandingWindow />
                </div>
            </motion.div>

            {/* Scroll Selection Overlay */}
            {showSelection && (
                <motion.div
                    initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                    animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
                    exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: 100,
                        background: 'rgba(0,0,0,0.4)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '40px'
                    }}
                >
                    <h2 style={{ color: '#fff', fontSize: '24px', fontWeight: 300, letterSpacing: '2px' }}>CHOOSE YOUR PATH</h2>

                    <div style={{ display: 'flex', gap: '60px' }}>
                        {/* Developer Option */}
                        <motion.div
                            whileHover={{ scale: 1.1, y: -10 }}
                            onClick={() => window.location.href = '/developer'}
                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', cursor: 'pointer' }}
                        >
                            <div style={{
                                width: 120, height: 120,
                                background: 'linear-gradient(135deg, #1d1f21 0%, #282a2e 100%)',
                                borderRadius: '24px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                                border: '1px solid rgba(255,255,255,0.1)'
                            }}>
                                <span style={{ fontSize: '48px', color: '#7ee787' }}>&gt;_</span>
                            </div>
                            <span style={{ color: '#fff', fontSize: '18px', fontWeight: 500 }}>Developer</span>
                        </motion.div>

                        {/* Photographer Option */}
                        <motion.div
                            whileHover={{ scale: 1.1, y: -10 }}
                            onClick={() => window.location.href = '/photographer'}
                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', cursor: 'pointer' }}
                        >
                            <div style={{
                                width: 120, height: 120,
                                background: 'linear-gradient(135deg, #007AFF 0%, #00C6FF 100%)',
                                borderRadius: '24px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                                border: '1px solid rgba(255,255,255,0.1)'
                            }}>
                                <span style={{ fontSize: '48px' }}>📸</span>
                            </div>
                            <span style={{ color: '#fff', fontSize: '18px', fontWeight: 500 }}>Photographer</span>
                        </motion.div>
                    </div>

                    <div style={{ marginTop: '40px', color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>
                        Scroll Up to Return
                    </div>
                </motion.div>
            )}
        </div>
    )
}
