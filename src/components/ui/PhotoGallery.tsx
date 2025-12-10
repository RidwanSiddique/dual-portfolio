'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'

// Sample Data Generator
const GENERATE_PHOTOS = (startId: number, count: number) => {
    const images = [
        'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=800&q=80', // Landscape
        'https://images.unsplash.com/photo-1518098268026-4e187743369b?auto=format&fit=crop&w=800&q=80', // Street
        'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=80', // Nature
        'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?auto=format&fit=crop&w=800&q=80', // Portrait style
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80', // Portrait face
        'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80', // Fashion
    ]

    return Array.from({ length: count }).map((_, i) => ({
        id: (startId + i).toString(),
        url: images[(startId + i) % images.length],
        title: `Exhibit No. ${startId + i + 1}`,
        description: 'Captured in natural light using 35mm film. The composition highlights the geometric patterns found in everyday life.',
        date: '2024'
    }))
}

export function PhotoGallery() {
    const [photos, setPhotos] = useState(GENERATE_PHOTOS(0, 5))
    const [loading, setLoading] = useState(false)

    // Limited Scroll (max 10 photos)
    const handleScroll = () => {
        if (photos.length >= 10) return // Stop loading after 10 photos
        
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
            if (!loading) {
                setLoading(true)
                // Simulate network delay
                setTimeout(() => {
                    setPhotos(prev => {
                        const newPhotos = [...prev, ...GENERATE_PHOTOS(prev.length, 5)]
                        // Ensure we don't exceed 10 photos
                        return newPhotos.slice(0, 10)
                    })
                    setLoading(false)
                }, 500)
            }
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [loading, photos.length])

    return (
        <div style={{
            minHeight: '100vh',
            background: '#f4f4f4', // Gallery Wall Color
            backgroundImage: 'radial-gradient(#e0e0e0 1px, transparent 1px)',
            backgroundSize: '20px 20px',
            padding: '120px 20px 40px 20px', // Top padding for navbar
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '150px' // Large gap between photos
        }}>
            {photos.map((photo, index) => (
                <GalleryItem key={photo.id} photo={photo} index={index} />
            ))}

            {/* Loader / Footer */}
            <div style={{ marginTop: '60px', textAlign: 'center' }}>
                {photos.length < 10 && !loading ? (
                    <div style={{ padding: '20px', color: '#666' }}>
                        Scroll down to see more exhibits...
                    </div>
                ) : loading ? (
                    <div style={{ padding: '20px', color: '#666' }}>
                        Loading more exhibits...
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{
                            padding: '60px',
                            background: '#111',
                            borderRadius: '20px',
                            border: '1px solid #333',
                            maxWidth: '600px',
                            margin: '0 auto',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '20px'
                        }}
                    >
                        <div style={{ fontSize: '48px' }}>🎨</div>
                        <h2 style={{ color: '#fff', fontSize: '24px', margin: 0 }}>Step Into The Darkroom</h2>
                        <p style={{ color: '#888', textAlign: 'center', lineHeight: '1.6' }}>
                            You've seen all 10 exhibition pieces! <br />
                            Want to see how these photos are made? Enter the editing suite to experiment with presets and adjustments.
                        </p>
                        <Link href="/photographer/editor">
                            <button style={{
                                padding: '16px 32px',
                                background: '#007AFF', // Lightroom Blue-ish
                                color: '#fff',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '16px',
                                fontWeight: 600,
                                cursor: 'pointer',
                                boxShadow: '0 4px 12px rgba(0,122,255,0.3)'
                            }}>
                                Open Lightroom Classic
                            </button>
                        </Link>
                    </motion.div>
                )}
            </div>
        </div>
    )
}

function GalleryItem({ photo, index }: { photo: any, index: number }) {
    const isEven = index % 2 === 0

    return (
        <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '60px',
                width: '100%',
                maxWidth: '1200px',
                flexDirection: isEven ? 'row' : 'row-reverse' // Alternating layout
            }}
        >
            {/* The Photo Frame */}
            <div style={{
                position: 'relative',
                padding: '15px',
                background: '#fff',
                boxShadow: '0 20px 50px rgba(0,0,0,0.15), 0 5px 15px rgba(0,0,0,0.05)',
                transform: `rotate(${isEven ? '1deg' : '-1deg'})`, // Slight natural tilt
            }}>
                {/* Hanging String (Visual) */}
                <div style={{
                    position: 'absolute',
                    top: '-100px',
                    left: '50%',
                    width: '2px',
                    height: '100px',
                    background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.1))',
                    zIndex: -1
                }} />

                <div style={{ width: '500px', height: '350px', overflow: 'hidden', background: '#eee' }}>
                    <img
                        src={photo.url}
                        alt={photo.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </div>
            </div>

            {/* The Tag/Label */}
            <div style={{
                width: '250px',
                padding: '20px',
                background: '#fff',
                border: '1px solid #ddd',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                position: 'relative'
            }}>
                {/* Pin visual */}
                <div style={{
                    position: 'absolute',
                    top: '-10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: '#d32f2f',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }} />

                <h3 style={{ margin: 0, fontSize: '18px', fontFamily: 'serif', color: '#333' }}>{photo.title}</h3>
                <div style={{ width: '100%', height: '1px', background: '#eee' }} />
                <p style={{ margin: 0, fontSize: '14px', color: '#666', lineHeight: '1.6', fontFamily: 'sans-serif' }}>
                    {photo.description}
                </p>
                <span style={{ fontSize: '12px', color: '#999', marginTop: '10px', fontStyle: 'italic' }}>
                    Date: {photo.date}
                </span>
            </div>
        </motion.div>
    )
}
