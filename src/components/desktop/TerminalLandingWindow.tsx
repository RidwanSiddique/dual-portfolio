'use client'

import { useRouter } from 'next/navigation'
import { MacWindow } from './MacWindow'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export function TerminalLandingWindow() {
    const router = useRouter()
    const [text, setText] = useState('')
    const fullText = '> initializing_developer_sequence...\n> loading_modules: [CORE, UI, DB]\n> access_granted\n> click_to_enter_studio'

    useEffect(() => {
        let index = 0
        const interval = setInterval(() => {
            setText(fullText.slice(0, index))
            index++
            if (index > fullText.length) clearInterval(interval)
        }, 30)
        return () => clearInterval(interval)
    }, [])

    return (
        <MacWindow
            title="Terminal — User: ridwan"
            width={500}
            height={320}
            x="10%"
            y="20%"
            onClick={() => router.push('/developer')}
            style={{ cursor: 'pointer' }}
        >
            <div style={{
                padding: '20px',
                fontFamily: 'monospace',
                color: '#00ff88',
                fontSize: '14px',
                lineHeight: 1.6,
                background: 'rgba(0,0,0,0.8)',
                height: '100%'
            }}>
                <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{text}<motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                >_</motion.span></pre>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    style={{ marginTop: '40px', textAlign: 'center' }}
                >
                    <button style={{
                        background: 'transparent',
                        border: '1px solid #00f0ff',
                        color: '#00f0ff',
                        padding: '10px 20px',
                        borderRadius: '4px',
                        fontFamily: 'monospace',
                        cursor: 'pointer',
                        fontSize: '14px'
                    }}>
                        ENTER DEVELOPER MODE
                    </button>
                </motion.div>
            </div>
        </MacWindow>
    )
}
