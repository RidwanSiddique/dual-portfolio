'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

interface ScrollNavigationProps {
    children: React.ReactNode
    currentPage: 'gallery' | 'editor'
}

// Mac-style warning dialog component
function MacWarningDialog({ isOpen, onCancel, onProceed }: {
    isOpen: boolean
    onCancel: () => void
    onProceed: () => void
}) {
    if (!isOpen) return null

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.6)',
                    zIndex: 10000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backdropFilter: 'blur(10px)'
                }}
                onClick={onCancel}
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        background: '#f6f6f6',
                        borderRadius: '14px',
                        padding: '0',
                        width: '480px',
                        boxShadow: '0 25px 50px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1)',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif',
                        overflow: 'hidden'
                    }}
                >
                    {/* Warning Icon and Title */}
                    <div style={{
                        padding: '24px 24px 16px 24px',
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px'
                    }}>
                        {/* Mac Warning Icon */}
                        <div style={{
                            width: '64px',
                            height: '64px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '32px',
                            flexShrink: 0,
                            boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.3), 0 2px 8px rgba(255,165,0,0.3)'
                        }}>
                            ⚠️
                        </div>
                        <div style={{ flex: 1, textAlign: 'left' }}>
                            <h3 style={{
                                margin: 0,
                                fontSize: '20px',
                                fontWeight: 600,
                                color: '#1d1d1f',
                                lineHeight: '1.3'
                            }}>
                                Are you sure you want to leave the Photography Portfolio?
                            </h3>
                        </div>
                    </div>

                    {/* Message */}
                    <div style={{
                        padding: '0 24px 24px 24px',
                        fontSize: '14px',
                        color: '#666',
                        lineHeight: '1.5',
                        textAlign: 'left'
                    }}>
                        You're about to navigate to the Developer Portfolio section. Any unsaved changes to your photo edits will be lost.
                        <br /><br />
                        <strong>Tip:</strong> You can return to the Photography section anytime from the main menu.
                    </div>

                    {/* Buttons */}
                    <div style={{
                        display: 'flex',
                        background: '#e8e8ed',
                        borderTop: '1px solid #d1d1d6'
                    }}>
                        <button
                            onClick={onCancel}
                            style={{
                                flex: 1,
                                padding: '14px 16px',
                                background: 'transparent',
                                border: 'none',
                                fontSize: '16px',
                                fontWeight: 500,
                                color: '#007AFF',
                                cursor: 'pointer',
                                borderRight: '1px solid #d1d1d6',
                                transition: 'background-color 0.15s'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,122,255,0.1)'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            Stay Here
                        </button>
                        <button
                            onClick={onProceed}
                            style={{
                                flex: 1,
                                padding: '14px 16px',
                                background: 'transparent',
                                border: 'none',
                                fontSize: '16px',
                                fontWeight: 600,
                                color: '#007AFF',
                                cursor: 'pointer',
                                transition: 'background-color 0.15s'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,122,255,0.1)'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            Continue to About
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}

export function ScrollNavigation({ children, currentPage }: ScrollNavigationProps) {
    const router = useRouter()
    const [showWarning, setShowWarning] = useState(false)
    const [isScrolling, setIsScrolling] = useState(false)
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const lastScrollTime = useRef(0)
    const accumulatedDelta = useRef(0)

    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            // Only prevent default and handle navigation at scroll boundaries
            const scrollElement = document.querySelector('[data-scroll-container]') as HTMLElement
            if (!scrollElement) return
            
            const scrollTop = scrollElement.scrollTop
            const clientHeight = scrollElement.clientHeight
            const scrollHeight = scrollElement.scrollHeight
            
            const isAtTop = scrollTop <= 5 // Small buffer for precision
            const isAtBottom = scrollTop + clientHeight >= scrollHeight - 50 // Larger buffer for footer content
            
            // Handle navigation when at boundaries and not currently navigating
            if (!isScrolling) {
                if (isAtTop && e.deltaY < 0) {
                    // Scrolling up at top
                    if (currentPage === 'editor') {
                        const now = Date.now()
                        if (now - lastScrollTime.current < 500) return
                        
                        e.preventDefault()
                        setIsScrolling(true)
                        lastScrollTime.current = now
                        router.push('/photographer')
                        
                        setTimeout(() => setIsScrolling(false), 800)
                    }
                } else if (isAtBottom && e.deltaY > 0) {
                    // Scrolling down at bottom
                    const now = Date.now()
                    if (now - lastScrollTime.current < 500) return
                    
                    // Only handle editor page navigation, not gallery to editor
                    if (currentPage === 'editor') {
                        e.preventDefault()
                        setIsScrolling(true)
                        lastScrollTime.current = now
                        setShowWarning(true)
                        setTimeout(() => setIsScrolling(false), 800)
                    }
                    // For gallery page: do nothing - user must click the button
                }
            }
        }

        document.addEventListener('wheel', handleWheel, { passive: false })
        
        return () => {
            document.removeEventListener('wheel', handleWheel)
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current)
            }
        }
    }, [currentPage, router, isScrolling])

    const handleWarningCancel = () => {
        setShowWarning(false)
        setIsScrolling(false)
    }

    const handleWarningProceed = () => {
        setShowWarning(false)
        router.push('/about')
    }

    return (
        <>
            <div style={{ 
                height: '100vh', 
                overflow: 'hidden',
                position: 'relative'
            }}>
                {children}
            </div>

            <MacWarningDialog 
                isOpen={showWarning}
                onCancel={handleWarningCancel}
                onProceed={handleWarningProceed}
            />
        </>
    )
}