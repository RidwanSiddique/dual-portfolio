'use client'

import { useEffect, useRef } from 'react'

export function BokehParticles() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let width = canvas.width = canvas.offsetWidth
        let height = canvas.height = canvas.offsetHeight

        interface Particle {
            x: number
            y: number
            radius: number
            color: string
            velocity: { x: number; y: number }
            alpha: number
            targetAlpha: number
        }

        const particles: Particle[] = []
        const particleCount = 50

        const createParticle = (): Particle => {
            const hue = Math.random() * 60 + 200 // Blue-ish/Purple range
            return {
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 20 + 5,
                color: `hsla(${hue}, 70%, 60%, `,
                velocity: {
                    x: (Math.random() - 0.5) * 0.5,
                    y: (Math.random() - 0.5) * 0.5
                },
                alpha: 0,
                targetAlpha: Math.random() * 0.5 + 0.1
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(createParticle())
        }

        const draw = () => {
            if (!ctx) return
            ctx.clearRect(0, 0, width, height)

            // Composite operation for nice blending
            ctx.globalCompositeOperation = 'screen'

            particles.forEach(p => {
                p.x += p.velocity.x
                p.y += p.velocity.y

                // Wrap around screen
                if (p.x < -50) p.x = width + 50
                if (p.x > width + 50) p.x = -50
                if (p.y < -50) p.y = height + 50
                if (p.y > height + 50) p.y = -50

                // Fade in/out
                if (p.alpha < p.targetAlpha) p.alpha += 0.01

                ctx.beginPath()
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
                ctx.fillStyle = p.color + p.alpha + ')'
                ctx.fill()
            })
        }

        let animationFrameId: number

        const animate = () => {
            draw()
            animationFrameId = requestAnimationFrame(animate)
        }
        animate()

        const handleResize = () => {
            width = canvas.width = canvas.offsetWidth
            height = canvas.height = canvas.offsetHeight
        }

        window.addEventListener('resize', handleResize)

        return () => {
            cancelAnimationFrame(animationFrameId)
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
                background: '#1a1a1a', // Dark grey background
            }}
        />
    )
}
