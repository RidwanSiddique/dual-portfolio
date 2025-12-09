'use client'

import { useRouter } from 'next/navigation'
import { MacWindow } from './MacWindow'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

export function PhotoLandingWindow() {
    const router = useRouter()
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isHovered, setIsHovered] = useState(false)

    // Mock images (gradients) - in real app, use photos
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
        }

        return () => clearInterval(interval)
    }, [isHovered, images.length])

    return (
        <MacWindow
            title="Exhibition Preview"
            width="42vw"
            height="70vh"
            x="48%"
            y="10%"
            style={{ cursor: 'default', background: '#f0f0f0', overflow: 'hidden', minWidth: '300px', minHeight: '300px' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                style={{
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundImage: 'radial-gradient(#e0e0e0 1px, transparent 1px)', // Wall texture
                    backgroundSize: '20px 20px',
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
                        background: 'rgba(255,255,255,0.4)',
                        backdropFilter: 'blur(5px)',
                        WebkitBackdropFilter: 'blur(5px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
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
                            background: '#333',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                            transform: 'scale(1)',
                            transition: 'transform 0.1s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        Enter Gallery
                    </button>
                </motion.div>

                {/* Framed Photo */}
                <div style={{
                    position: 'relative',
                    padding: '12px',
                    background: '#fff',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
                    transform: 'rotate(-1deg)',
                    maxWidth: '80%',
                    maxHeight: '70%',
                    aspectRatio: '4/3', // maintain standard aspect ratio frame
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {/* Hanging String (Visual Detail) */}
                    <div style={{
                        position: 'absolute',
                        top: '-100px',
                        left: '50%',
                        width: '1px',
                        height: '100px',
                        background: 'rgba(0,0,0,0.1)',
                        zIndex: -1
                    }} />

                    {/* Image Container */}
                    <div style={{ width: '100%', height: '100%', background: '#eee', overflow: 'hidden', position: 'relative' }}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.8 }}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    background: images[currentIndex],
                                }}
                            />
                        </AnimatePresence>
                    </div>
                </div>

                {/* Gallery Label/Tag next to frame - visible only on large enough screens/windows */}
                <div style={{
                    position: 'absolute',
                    right: '10%',
                    bottom: '10%',
                    background: '#fff',
                    padding: '8px 12px',
                    border: '1px solid #ddd',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                    transform: 'rotate(2deg)',
                    maxWidth: '120px'
                }}>
                    <div style={{ fontSize: '10px', color: '#999', marginBottom: '4px' }}>EXHIBIT NO. {currentIndex + 1}</div>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: '#333' }}>Abstract Collection</div>
                </div>

            </div>
        </MacWindow>
    )
}
