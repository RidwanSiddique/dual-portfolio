'use client'

import { useRouter } from 'next/navigation'
import { MacWindow } from './MacWindow'
import { motion } from 'framer-motion'

export function PhotoLandingWindow() {
    const router = useRouter()

    return (
        <MacWindow
            title="Gallery Viewer"
            width={500}
            height={320}
            x="50%"
            y="30%"
            onClick={() => router.push('/photographer')}
            style={{ cursor: 'pointer' }}
        >
            <div style={{
                height: '100%',
                background: '#1a1a1a',
                padding: '10px',
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '10px',
                alignContent: 'start'
            }}>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        style={{
                            aspectRatio: '1',
                            background: `linear-gradient(45deg, #333, #555)`,
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '24px',
                            color: '#777'
                        }}
                    >
                        🖼️
                    </motion.div>
                ))}

                <div style={{
                    gridColumn: '1 / -1',
                    marginTop: '20px',
                    textAlign: 'center',
                    color: '#fff',
                    fontFamily: 'system-ui'
                }}>
                    <p style={{ margin: 0, fontSize: '14px', color: '#888' }}>6 Photos Selected</p>
                    <button style={{
                        marginTop: '10px',
                        background: '#007AFF', // Mac Blue
                        border: 'none',
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '5px',
                        fontSize: '13px',
                        cursor: 'pointer'
                    }}>
                        Open Gallery
                    </button>
                </div>
            </div>
        </MacWindow>
    )
}
