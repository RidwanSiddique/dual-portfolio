'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from '@/app/page.module.css'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { CodeRain } from './ui/CodeRain'
import { BokehParticles } from './ui/BokehParticles'

export function LandingPage() {
    const router = useRouter()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [expanded, setExpanded] = useState<'left' | 'right' | null>(null)

    const handleNavigate = (side: 'left' | 'right') => {
        setExpanded(side)
        // Future: Add exit animation trigger here
        setTimeout(() => {
            router.push(side === 'left' ? '/developer' : '/photographer')
        }, 500)
    }

    return (
        <div className={styles.container}>
            <div
                className={clsx(styles.split, styles.left)}
                onClick={() => handleNavigate('left')}
                role="button"
                tabIndex={0}
            >
                {/* Background Animation */}
                <div className={styles.backgroundCanvas}>
                    <CodeRain />
                </div>

                {/* Overlay Gradient for readability */}
                <div style={{
                    position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 0%, #000 100%)', opacity: 0.6, pointerEvents: 'none'
                }} />

                <div className={styles.content}>
                    <motion.h1
                        className={styles.title}
                        initial={{ y: 0, opacity: 0, scale: 0.9 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.1, textShadow: "0 0 20px #00f0ff" }}
                        transition={{ delay: 0.2, type: 'spring' }}
                    >
                        Developer
                    </motion.h1>
                    <motion.div
                        className={styles.subtitle}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        The Architect
                    </motion.div>
                </div>
            </div>

            <div
                className={clsx(styles.split, styles.right)}
                onClick={() => handleNavigate('right')}
                role="button"
                tabIndex={0}
            >
                {/* Background Animation */}
                <div className={styles.backgroundCanvas}>
                    <BokehParticles />
                </div>

                {/* Overlay Gradient for readability */}
                <div style={{
                    position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 0%, #000 40%)', opacity: 0.3, pointerEvents: 'none'
                }} />

                <div className={styles.content}>
                    <motion.h1
                        className={styles.title}
                        initial={{ y: 0, opacity: 0, scale: 0.9 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.1, textShadow: "0 0 20px #ff00aa" }}
                        transition={{ delay: 0.3, type: 'spring' }}
                    >
                        Photographer
                    </motion.h1>
                    <motion.div
                        className={styles.subtitle}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        The Artist
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
