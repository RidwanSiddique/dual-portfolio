'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface MacWindowProps {
    title: string
    children: ReactNode
    onClose?: () => void
    width?: string | number
    height?: string | number
    x?: number | string
    y?: number | string
    className?: string
    style?: React.CSSProperties
    onClick?: () => void
}

export function MacWindow({ title, children, onClose, width = 600, height = 400, x = 0, y = 0, className, style, onClick }: MacWindowProps) {
    return (
        <motion.div
            className={className}
            drag
            dragMomentum={false}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{
                position: 'absolute',
                left: x,
                top: y,
                width,
                height,
                background: 'rgba(30, 30, 30, 0.6)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                ...style
            }}
            onClick={onClick}
        >
            {/* Title Bar */}
            <div style={{
                height: '38px',
                background: 'rgba(50, 50, 50, 0.4)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                display: 'flex',
                alignItems: 'center',
                padding: '0 16px',
                userSelect: 'none',
            }}>
                {/* Traffic Lights */}
                <div style={{ display: 'flex', gap: '8px' }}>
                    <div onClick={onClose} style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57', cursor: 'pointer' }} />
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e' }} />
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840' }} />
                </div>
                {/* Title */}
                <div style={{ flex: 1, textAlign: 'center', color: '#ccc', fontSize: '13px', fontWeight: 500 }}>
                    {title}
                </div>
                <div style={{ width: 52 }} /* Spacer to balance title */ />
            </div>

            {/* Content */}
            <div style={{ flex: 1, overflow: 'auto', position: 'relative' }}>
                {children}
            </div>
        </motion.div>
    )
}
