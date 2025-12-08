'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from '@/app/page.module.css'
import clsx from 'clsx'
import { motion } from 'framer-motion'

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
                <div className={styles.content}>
                    <motion.h1
                        className={styles.title}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
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
                {/* 3D Canvas Placeholder */}
            </div>

            <div
                className={clsx(styles.split, styles.right)}
                onClick={() => handleNavigate('right')}
                role="button"
                tabIndex={0}
            >
                <div className={styles.content}>
                    <motion.h1
                        className={styles.title}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
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
