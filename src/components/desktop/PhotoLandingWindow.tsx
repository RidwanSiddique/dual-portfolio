'use client'

import { useRouter } from 'next/navigation'
import { MacWindow } from './MacWindow'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

export function PhotoLandingWindow() {
    const router = useRouter()
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isHovered, setIsHovered] = useState(false)

    // Mock images (gradients)
    const images = [
        'linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)',
        'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)',
        'linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%)',
        'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)',
        'linear-gradient(to top, #30cfd0 0%, #330867 100%)',
        'linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)',
    ]

    useEffect(() => {
        let interval: NodeJS.Timeout

        if (!isHovered) {
            interval = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % images.length)
            }, 3000) // Change image every 3 seconds
        } else {
            setCurrentIndex(0) // Reset to first image on hover
        }

        return () => clearInterval(interval)
    }, [isHovered, images.length])

    const nextImage = (e?: React.MouseEvent) => {
        e?.stopPropagation()
        setCurrentIndex((prev) => (prev + 1) % images.length)
    }

    const prevImage = (e?: React.MouseEvent) => {
        e?.stopPropagation()
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    }

    return (
        <MacWindow
            title="Ridwan's Gallery"
            width="42vw" // Responsive width
            height="70vh" // Responsive height
            x="48%" // Positioned to right half
            y="10%"
            // Removed global onClick navigation
            style={{ cursor: 'default', background: '#222', overflow: 'hidden', minWidth: '300px', minHeight: '300px' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className="photo-window-container"
                style={{
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                {/* Blur Overlay & Button on Hover */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: 20,
                        background: 'rgba(0,0,0,0.3)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer' // Only the button area or overlay indicates clickability? User said "only the button" but overlay usually covers.
                        // Actually, let's make the button the click target as requested.
                    }}
                >
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            router.push('/photographer')
                        }}
                        style={{
                            padding: '12px 24px',
                            fontSize: '16px',
                            fontWeight: 600,
                            background: '#007AFF', // Mac Blue
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            boxShadow: '0 4px 15px rgba(0, 122, 255, 0.4)',
                            transform: 'scale(1)',
                            transition: 'transform 0.1s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        Explore My Photography
                    </button>
                </motion.div>

                {/* Content Container - Gets blurred by overlay technically if using backdrop-filter on overlay,
                    OR we can animate filter on this div directly.
                    Re-reading request: "whole window will become blur".
                    Backdrop-filter on the overlay is the cleanest way to do "window becomes blur" underneath.
                */}
                <div style={{
                    height: '100%',
                    display: 'flex',
                    gap: '0',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    {/* ... rest of the existing content ... */}
                    {/* Center: Main Image Area */}
                    <div style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        background: '#1e1e1e',
                        position: 'relative'
                    }}>
                        {/* Main Image */}
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '20px' }}>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        background: images[currentIndex],
                                        borderRadius: '4px',
                                        boxShadow: '0 5px 20px rgba(0,0,0,0.3)',
                                    }}
                                />
                            </AnimatePresence>
                        </div>

                        {/* Bottom Floating Controls Overlay */}
                        <div style={{
                            position: 'absolute',
                            bottom: '90px',
                            left: 0,
                            right: 0,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            pointerEvents: 'none'
                        }}>
                            {/* Nav Buttons (Bottom Middle) */}
                            <div style={{
                                background: 'rgba(50, 50, 50, 0.8)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '20px',
                                display: 'flex',
                                padding: '4px 10px',
                                gap: '10px',
                                pointerEvents: 'auto',
                                boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                            }}>
                                <button onClick={prevImage} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '16px' }}>←</button>
                                <button onClick={nextImage} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '16px' }}>→</button>
                            </div>
                        </div>

                        {/* Zoom Buttons (Bottom Right) */}
                        <div style={{
                            position: 'absolute',
                            bottom: '90px',
                            right: '20px',
                            background: 'rgba(50, 50, 50, 0.8)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '20px',
                            display: 'flex',
                            padding: '4px 10px',
                            gap: '10px',
                            pointerEvents: 'auto',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                        }}>
                            <button style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '14px' }}>−</button>
                            <button style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '14px' }}>+</button>
                        </div>

                        {/* Bottom: Thumbnail Strip */}
                        <div style={{
                            height: '70px',
                            background: '#252525',
                            borderTop: '1px solid #333',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px',
                            padding: '0 20px',
                            overflowX: 'auto'
                        }}>
                            {images.map((img, i) => (
                                <div
                                    key={i}
                                    onClick={(e) => { e.stopPropagation(); setCurrentIndex(i) }}
                                    style={{
                                        width: '50px',
                                        height: '50px',
                                        background: img,
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        border: currentIndex === i ? '2px solid #00f0ff' : '2px solid transparent',
                                        opacity: currentIndex === i ? 1 : 0.6,
                                        transition: 'all 0.2s'
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right: Window Mode Icons Toolbar */}
                    <div style={{
                        width: '40px',
                        background: '#252525',
                        borderLeft: '1px solid #333',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        paddingTop: '20px',
                        gap: '20px'
                    }}>
                        {['⊞', '⊟', 'ℹ︎', '⚙︎'].map((icon, i) => (
                            <div key={i} style={{ color: '#888', cursor: 'pointer', fontSize: '16px' }}>{icon}</div>
                        ))}
                    </div>
                </div>
            </div>
        </MacWindow>
    )
}
