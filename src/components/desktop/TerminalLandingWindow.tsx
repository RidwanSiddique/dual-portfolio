'use client'

import { useRouter } from 'next/navigation'
import { MacWindow } from './MacWindow'
import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

export function TerminalLandingWindow() {
    const router = useRouter()
    const [lines, setLines] = useState<string[]>([])
    const [showButton, setShowButton] = useState(false)
    const endRef = useRef<HTMLDivElement>(null)

    const bootSequence = [
        "Welcome to RidwanOS v2.0-LTS (GNU/Linux 5.15.0-76-generic x86_64)",
        "",
        " * Documentation:  https://github.com/RidwanSiddique",
        " * Management:     https://linkedin.com/in/RidwanSiddique",
        " * Support:        ridwan@example.com",
        "",
        "System functionality status:",
        " [ OK ]  Core Kernel Modules loaded.",
        " [ OK ]  React Framework initialized.",
        " [ OK ]  Next.js Runtime Environment ready.",
        " [ OK ]  Creative Engines... ONLINE.",
        "",
        "0 packages can be updated.",
        "0 updates are security updates.",
        "",
        "ridwan@portfolio:~$ "
    ]

    useEffect(() => {
        let lineIndex = 0
        const interval = setInterval(() => {
            if (lineIndex < bootSequence.length) {
                setLines(prev => [...prev, bootSequence[lineIndex]])
                lineIndex++
            } else {
                clearInterval(interval)
                setShowButton(true)
            }
        }, 150) // Typing speed for lines

        return () => clearInterval(interval)
    }, [])

    // Auto-scroll to bottom
    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [lines])

    return (
        <MacWindow
            title="Terminal — ridwan@portfolio: ~"
            width={1000}
            height={800}
            x="10%"
            y="20%"
            // Removed default onClick to make button exclusive
            style={{ cursor: 'text', background: '#300a24' }} // Ubuntu terminal bg color
        >
            <div style={{
                padding: '10px 10px',
                fontFamily: '"Ubuntu Mono", "Courier New", monospace',
                color: '#fff',
                fontSize: '16px',
                lineHeight: 1.4,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
            }}>
                <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '80px' }}>
                    {lines.map((line, i) => (
                        <div key={i} style={{ whiteSpace: 'pre-wrap', minHeight: '1.2em' }}>
                            {line.startsWith(" [ OK ]") ? (
                                <span>
                                    <span style={{ color: '#00ff00' }}>[ OK ]</span>{line.substring(7)}
                                </span>
                            ) : line === "ridwan@portfolio:~$ " ? (
                                <span>
                                    <span style={{ color: '#00ff00', fontWeight: 'bold' }}>ridwan@portfolio</span>:<span style={{ color: '#0000ff', fontWeight: 'bold' }}>~</span>$ <motion.span
                                        animate={{ opacity: [0, 1, 0] }}
                                        transition={{ repeat: Infinity, duration: 0.8 }}
                                        style={{ display: 'inline-block', width: '10px', height: '1.2em', background: '#fff', verticalAlign: 'middle' }}
                                    />
                                </span>
                            ) : (
                                line
                            )}
                        </div>
                    ))}
                    <div ref={endRef} />
                </div>

                {/* Fixed "Enter Developer Mode" Button Area at Bottom */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: showButton ? 1 : 0, y: showButton ? 0 : 20 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        position: 'absolute',
                        bottom: '20px',
                        left: 0,
                        right: 0,
                        display: 'flex',
                        justifyContent: 'center',
                        pointerEvents: showButton ? 'auto' : 'none'
                    }}
                >
                    <button
                        onClick={() => router.push('/developer')}
                        style={{
                            background: '#4e9a06', // Ubuntu green
                            color: 'white',
                            border: 'none',
                            padding: '12px 30px',
                            fontSize: '18px',
                            fontFamily: 'monospace',
                            fontWeight: 'bold',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#8ae234'} // Lighter green on hover
                        onMouseLeave={(e) => e.currentTarget.style.background = '#4e9a06'}
                    >
                        &gt;_ Enter Developer Mode
                    </button>
                </motion.div>
            </div>
        </MacWindow>
    )
}
