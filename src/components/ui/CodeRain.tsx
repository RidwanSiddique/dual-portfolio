'use client'

import { useEffect, useRef } from 'react'

export function CodeRain() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let width = canvas.width = canvas.offsetWidth
        let height = canvas.height = canvas.offsetHeight

        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>{}/[];:.,*&^%$#@!~'
        const fontSize = 14
        const columns = Math.floor(width / fontSize)
        const drops: number[] = []

        for (let i = 0; i < columns; i++) {
            drops[i] = 1
        }

        const draw = () => {
            if (!ctx) return
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
            ctx.fillRect(0, 0, width, height)

            ctx.fillStyle = '#0f0' // Green text
            ctx.font = `${fontSize}px monospace`

            for (let i = 0; i < drops.length; i++) {
                const text = characters.charAt(Math.floor(Math.random() * characters.length))
                const x = i * fontSize
                const y = drops[i] * fontSize

                // Randomly vary opacity/color for "glitch" feel
                const isBright = Math.random() > 0.95
                ctx.fillStyle = isBright ? '#fff' : '#003300' // Dark green vs bright white
                if (Math.random() > 0.9) ctx.fillStyle = '#00ff00' // Occasional bright green

                ctx.fillText(text, x, y)

                if (y > height && Math.random() > 0.975) {
                    drops[i] = 0
                }
                drops[i]++
            }
        }

        const interval = setInterval(draw, 33)

        const handleResize = () => {
            width = canvas.width = canvas.offsetWidth
            height = canvas.height = canvas.offsetHeight
            // Re-calc columns
            const newCols = Math.floor(width / fontSize)
            // Preserve drops or reset? Reset is safer
            drops.length = 0
            for (let i = 0; i < newCols; i++) {
                drops[i] = 1
            }
        }

        window.addEventListener('resize', handleResize)

        return () => {
            clearInterval(interval)
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            style={{
                width: '100%',
                height: '100%',
                display: 'block',
                background: '#000',
            }}
        />
    )
}
