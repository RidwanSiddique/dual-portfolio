'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export function Navbar() {
    const pathname = usePathname()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isHovered, setIsHovered] = useState<string | null>(null)
    const [time, setTime] = useState<string>('')

    useEffect(() => {
        // Initial set
        const updateTime = () => {
            const now = new Date()
            setTime(now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) + '  ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }))
        }
        updateTime()
        const interval = setInterval(updateTime, 1000)
        return () => clearInterval(interval)
    }, [])

    const links = [
        { name: 'Home', path: '/' },
        { name: 'Developer', path: '/developer' },
        { name: 'Photographer', path: '/photographer' },
        { name: 'About', path: '/about' },
    ]

    return (
        <motion.header
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                zIndex: 1000,
                height: '40px',
                background: 'rgba(20, 20, 20, 0.4)',
                backdropFilter: 'blur(15px)',
                WebkitBackdropFilter: 'blur(15px)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                padding: '0 20px',
                fontSize: '20px',
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontWeight: 500,
                color: '#fff',
                userSelect: 'none',
                boxShadow: '0 1px 5px rgba(0,0,0,0.1)'
            }}
        >
            {/* Left Side: Logo & Name */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1 }}>
                <Link href="/" style={{ textDecoration: 'none', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: 700 }}>Ridwan Siddique</span>
                </Link>

                {/* Navigation Links */}
                <nav style={{ display: 'flex', gap: '20px', marginLeft: '20px' }}>
                    {links.map((link) => (
                        <Link key={link.path} href={link.path} style={{ textDecoration: 'none' }}>
                            <span
                                style={{
                                    color: pathname === link.path ? '#fff' : 'rgba(255,255,255,0.7)',
                                    transition: 'color 0.2s',
                                    fontWeight: pathname === link.path ? 600 : 500,
                                }}
                            >
                                {link.name}
                            </span>
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Right Side: Date & Time */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                {/* Status Icons (Mock) */}
                <div style={{ display: 'flex', gap: '15px', opacity: 0.9 }}>
                </div>
                <span>{time}</span>
            </div>
        </motion.header>
    )
}
