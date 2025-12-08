'use client'

import { useEffect, useRef } from 'react'

interface Entity {
    x: number
    y: number
    vx: number
    vy: number
    width: number
    height: number
    color: string
    type: 'spaceship' | 'bullet' | 'target' | 'particle'
    label?: string
    life?: number
}

export function SpaceWallpaper() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let animationFrameId: number
        let entities: Entity[] = []
        const techStacks = ['React', 'TypeScript', 'Next.js', 'Node.js', 'Prisma', 'GraphQL', 'Tailwind', 'PostgreSQL', 'Three.js', 'Framer']

        // Game State
        const spaceship = {
            x: window.innerWidth / 2,
            y: window.innerHeight - 80,
            width: 40,
            height: 40,
            targetX: window.innerWidth / 2,
            lastFired: 0
        }

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            spaceship.y = window.innerHeight - 80
        }
        window.addEventListener('resize', resize)
        resize()

        // Helper: Spawn Floating Tech
        const spawnTarget = () => {
            const label = techStacks[Math.floor(Math.random() * techStacks.length)]
            entities.push({
                x: Math.random() * canvas.width,
                y: -50,
                vx: (Math.random() - 0.5) * 1,
                vy: Math.random() * 0.5 + 0.5,
                width: 80, // Approximate width for collision
                height: 30,
                color: '#00f0ff',
                type: 'target',
                label
            })
        }

        // Helper: Spawn Particles
        const spawnExplosion = (x: number, y: number, color: string) => {
            for (let i = 0; i < 8; i++) {
                entities.push({
                    x,
                    y,
                    vx: (Math.random() - 0.5) * 4,
                    vy: (Math.random() - 0.5) * 4,
                    width: 2,
                    height: 2,
                    color: color,
                    type: 'particle',
                    life: 1.0
                })
            }
        }

        // Game Loop
        const update = (time: number) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // --- Spaceship Logic ---
            // Move spaceship autonomously
            if (Math.random() < 0.02) {
                spaceship.targetX = Math.random() * (canvas.width - 100) + 50
            }
            spaceship.x += (spaceship.targetX - spaceship.x) * 0.05

            // Draw Spaceship
            ctx.fillStyle = '#ff00aa'
            ctx.beginPath()
            ctx.moveTo(spaceship.x, spaceship.y)
            ctx.lineTo(spaceship.x - 15, spaceship.y + 30)
            ctx.lineTo(spaceship.x + 15, spaceship.y + 30)
            ctx.fill()

            // Fire Logic
            if (time - spaceship.lastFired > 300) { // Fire every 300ms
                entities.push({
                    x: spaceship.x,
                    y: spaceship.y,
                    vx: 0,
                    vy: -8,
                    width: 4,
                    height: 10,
                    color: '#ffff00',
                    type: 'bullet'
                })
                spaceship.lastFired = time
            }

            // --- Entity Management ---
            // Spawn new targets occasionally
            if (Math.random() < 0.015 && entities.filter(e => e.type === 'target').length < 10) {
                spawnTarget()
            }

            for (let i = entities.length - 1; i >= 0; i--) {
                const e = entities[i]

                // Movement
                e.x += e.vx
                e.y += e.vy

                // Boundary Checks & Removal
                if (e.type === 'bullet' && e.y < -10) {
                    entities.splice(i, 1)
                    continue
                }
                if (e.type === 'target' && e.y > canvas.height + 50) {
                    entities.splice(i, 1)
                    continue
                }
                if (e.type === 'particle') {
                    if (e.life !== undefined) {
                        e.life -= 0.02
                        if (e.life <= 0) {
                            entities.splice(i, 1)
                            continue
                        }
                    }
                }

                // Drawing & Collision
                if (e.type === 'target' && e.label) {
                    ctx.font = '14px monospace'
                    ctx.fillStyle = 'rgba(0, 240, 255, 0.6)'
                    ctx.fillText(e.label, e.x, e.y)

                    // Simple hit box for drawing (optional debug)
                    // ctx.strokeStyle = 'red'; ctx.strokeRect(e.x, e.y - 15, ctx.measureText(e.label).width, 20)

                } else if (e.type === 'bullet') {
                    ctx.fillStyle = e.color
                    ctx.fillRect(e.x - e.width / 2, e.y, e.width, e.height)

                    // Collision Check vs Targets
                    for (let j = entities.length - 1; j >= 0; j--) {
                        const target = entities[j]
                        if (target.type === 'target' && target.label) {
                            // Rough text dimensions collision
                            const textWidth = ctx.measureText(target.label).width
                            const textHeight = 20

                            if (e.x > target.x && e.x < target.x + textWidth &&
                                e.y > target.y - textHeight && e.y < target.y) {

                                // Hit!
                                spawnExplosion(target.x + textWidth / 2, target.y - textHeight / 2, '#00f0ff')
                                entities.splice(j, 1) // Remove target
                                entities.splice(i, 1) // Remove bullet
                                i-- // Adjust outer loop index since we removed bullet
                                break // Bullet handled
                            }
                        }
                    }

                } else if (e.type === 'particle') {
                    ctx.globalAlpha = e.life || 0
                    ctx.fillStyle = e.color
                    ctx.fillRect(e.x, e.y, e.width, e.height)
                    ctx.globalAlpha = 1.0
                }
            }

            animationFrameId = requestAnimationFrame((t) => update(t))
        }

        animationFrameId = requestAnimationFrame((t) => update(t))

        return () => {
            window.removeEventListener('resize', resize)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                pointerEvents: 'none',
                opacity: 0.4
            }}
        />
    )
}
