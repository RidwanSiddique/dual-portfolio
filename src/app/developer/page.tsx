'use client'

import { DevScene } from '@/components/canvas/DevScene'
import { motion } from 'framer-motion'

export default function DeveloperPage() {
    return (
        <main style={{ position: 'relative' }}>
            <div style={{ padding: '0 2rem', position: 'absolute', top: 0, left: 0, zIndex: 10, pointerEvents: 'none' }}>
                <motion.h1
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    style={{ fontSize: '3rem', margin: 0 }}
                >
                    SELECTED WORKS
                </motion.h1>
                <p style={{ maxWidth: '400px', opacity: 0.8 }}>
                    Exploring the intersection of code and design.
                    Navigate the 3D space to view projects.
                </p>
            </div>

            <div style={{ width: '100%', height: '90vh' }}>
                <DevScene />
            </div>

            <div style={{ textAlign: 'center', padding: '2rem', opacity: 0.5 }}>
                SCROLL FOR LIST VIEW
            </div>
        </main>
    )
}
