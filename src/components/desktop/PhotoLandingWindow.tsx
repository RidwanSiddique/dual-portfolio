'use client'

import { useRouter } from 'next/navigation'
import { MacWindow } from './MacWindow'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

interface PhotoLandingWindowProps {
    onNavigate?: () => void
}

export function PhotoLandingWindow({ onNavigate }: PhotoLandingWindowProps) {
    const router = useRouter()
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isHovered, setIsHovered] = useState(false)

    // Real photos from the gallery
    const images = [
        'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1518098268026-4e187743369b?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80',
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

    const handleEnter = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (onNavigate) {
            onNavigate()
        } else {
            router.push('/photographer')
        }
    }

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
                        onClick={handleEnter}
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

                {/* Framed Photo - Larger Size */}
                <div style={{
                    position: 'relative',
                    padding: '15px', // Thicker frame
                    background: '#fff',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
                    transform: 'rotate(-1deg)',
                    width: '85%',  // Increased from max-width to fixed percentage
                    height: '80%', // Increased height
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {/* Hanging String (Visual Detail) */}
                    <div style={{
                        position: 'absolute',
                        top: '-150px', // Adjusted for larger frame
                        left: '50%',
                        width: '1px',
                        height: '150px',
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
                                }}
                            >
                                <img
                                    src={images[currentIndex]}
                                    alt="Gallery Preview"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Gallery Label/Tag next to frame */}
                <div style={{
                    position: 'absolute',
                    right: '20px',
                    bottom: '20px',
                    background: '#fff',
                    padding: '8px 12px',
                    border: '1px solid #ddd',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                    transform: 'rotate(2deg)',
                    maxWidth: '120px',
                    zIndex: 10
                }}>
                    <div style={{ fontSize: '10px', color: '#999', marginBottom: '4px' }}>EXHIBIT NO. {currentIndex + 1}</div>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: '#333' }}>Portfolio Highlights</div>
                </div>

            </div>
        </MacWindow>
    )
}
