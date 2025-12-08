'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { useState } from 'react'

export function Navbar() {
    const pathname = usePathname()
    const [isHovered, setIsHovered] = useState<string | null>(null)

    const links = [
        { name: 'Home', path: '/' },
        { name: 'Developer', path: '/developer' },
        { name: 'Photographer', path: '/photographer' },
        { name: 'About', path: '/about' },
    ]

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                zIndex: 100,
                padding: '24px 48px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                pointerEvents: 'none', // Allow clicks through empty space
            }}
        >
            {/* Brand / Name */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                style={{ pointerEvents: 'auto' }}
            >
                <Link href="/" style={{ textDecoration: 'none' }}>
                    <h1 style={{
                        margin: 0,
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 900,
                        fontSize: '1.5rem',
                        color: pathname === '/photographer' ? '#111' : '#fff', // Dynamic color based on theme
                        letterSpacing: '-0.02em',
                        mixBlendMode: 'difference', // Cool effect against backgrounds
                    }}>
                        RIDWAN SIDDIQUE
                    </h1>
                </Link>
            </motion.div>

            {/* Navigation Links */}
            <div style={{
                display: 'flex',
                gap: '32px',
                pointerEvents: 'auto',
                background: 'rgba(20, 20, 20, 0.4)',
                backdropFilter: 'blur(12px)',
                padding: '12px 24px',
                borderRadius: '100px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            }}>
                {links.map((link) => (
                    <Link key={link.path} href={link.path} style={{ position: 'relative', textDecoration: 'none' }}>
                        <motion.span
                            onHoverStart={() => setIsHovered(link.name)}
                            onHoverEnd={() => setIsHovered(null)}
                            style={{
                                color: pathname === link.path ? '#fff' : '#aaa',
                                fontFamily: "'Inter', sans-serif",
                                fontWeight: 500,
                                fontSize: '0.9rem',
                                transition: 'color 0.2s',
                            }}
                            whileHover={{ color: '#fff' }}
                        >
                            {link.name}
                            {pathname === link.path && (
                                <motion.div
                                    layoutId="activeTab"
                                    style={{
                                        position: 'absolute',
                                        bottom: -4,
                                        left: 0,
                                        right: 0,
                                        height: '2px',
                                        background: '#fff',
                                        borderRadius: '2px',
                                    }}
                                />
                            )}
                        </motion.span>
                    </Link>
                ))}
            </div>
        </motion.nav>
    )
}
