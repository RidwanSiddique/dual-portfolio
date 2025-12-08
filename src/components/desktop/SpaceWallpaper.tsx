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
    image?: HTMLImageElement // Added image property
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

        // Tech Icons Configuration
        const techIcons = [
            { name: 'React', url: 'https://cdn.simpleicons.org/react/00f0ff' },
            { name: 'TypeScript', url: 'https://cdn.simpleicons.org/typescript/007acc' },
            { name: 'Next.js', url: 'https://cdn.simpleicons.org/nextdotjs/ffffff' },
            { name: 'Node.js', url: 'https://cdn.simpleicons.org/nodedotjs/339933' },
            { name: 'Prisma', url: 'https://cdn.simpleicons.org/prisma/2d3748' },
            { name: 'Tailwind', url: 'https://cdn.simpleicons.org/tailwindcss/06b6d4' },
            { name: 'PostgreSQL', url: 'https://cdn.simpleicons.org/postgresql/4169e1' },
            { name: 'Linux', url: 'https://cdn.simpleicons.org/linux/fcc624' },
            { name: 'Docker', url: 'https://cdn.simpleicons.org/docker/2496ed' },
            { name: 'Git', url: 'https://cdn.simpleicons.org/git/f05032' },
        ]

        // Preload Images
        const loadedImages: { [key: string]: HTMLImageElement } = {}
        techIcons.forEach(tech => {
            const img = new Image()
            img.src = tech.url
            loadedImages[tech.name] = img
        })

        // Game State
        const spaceship = {
            x: window.innerWidth / 2,
            y: window.innerHeight - 80,
            width: 50, // Increased size
            height: 60,
            targetX: window.innerWidth / 2,
            lastFired: 0,
            flameHeight: 0 // For engine animation
        }

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            spaceship.y = window.innerHeight - 80
        }
        window.addEventListener('resize', resize)
        resize()

        // Helper: Spawn Floating Tech Icon
        const spawnTarget = () => {
            const tech = techIcons[Math.floor(Math.random() * techIcons.length)]
            entities.push({
                x: Math.random() * (canvas.width - 50),
                y: -50,
                vx: (Math.random() - 0.5) * 1.5,
                vy: Math.random() * 0.5 + 0.8,
                width: 40,
                height: 40,
                color: '#fff',
                type: 'target',
                label: tech.name, // Keep label for reference
                image: loadedImages[tech.name] // Assign preloaded image
            })
        }

        // Helper: Spawn Particles
        const spawnExplosion = (x: number, y: number, color: string) => {
            for (let i = 0; i < 12; i++) {
                entities.push({
                    x,
                    y,
                    vx: (Math.random() - 0.5) * 6,
                    vy: (Math.random() - 0.5) * 6,
                    width: Math.random() * 3 + 1,
                    height: Math.random() * 3 + 1,
                    color: color,
                    type: 'particle',
                    life: 1.0
                })
            }
        }

        // Draw Spaceship Function
        const drawSpaceship = (x: number, y: number) => {
            ctx.save()
            ctx.translate(x, y)

            // Dynamic Engine Flame
            spaceship.flameHeight = 10 + Math.random() * 10

            // Engine Flames
            ctx.fillStyle = '#ff6600' // Inner core
            ctx.beginPath()
            ctx.moveTo(-8, 30)
            ctx.lineTo(0, 30 + spaceship.flameHeight)
            ctx.lineTo(8, 30)
            ctx.fill()

            ctx.fillStyle = '#ffff00' // Outer glow
            ctx.beginPath()
            ctx.moveTo(-5, 30)
            ctx.lineTo(0, 30 + spaceship.flameHeight * 0.6)
            ctx.lineTo(5, 30)
            ctx.fill()

            // Main Fuselage (Dark Grey Body)
            ctx.fillStyle = '#222'
            ctx.beginPath()
            ctx.moveTo(0, -30) // Nose
            ctx.lineTo(15, 10) // Right body
            ctx.lineTo(10, 30) // Right engine mount
            ctx.lineTo(-10, 30) // Left engine mount
            ctx.lineTo(-15, 10) // Left body
            ctx.closePath()
            ctx.fill()

            // Cockpit (Blue Glass)
            ctx.fillStyle = '#00f0ff'
            ctx.beginPath()
            ctx.ellipse(0, -5, 6, 12, 0, 0, Math.PI * 2)
            ctx.fill()

            // Wings (Cyber Style)
            ctx.fillStyle = '#333'
            ctx.beginPath()
            ctx.moveTo(10, 0)
            ctx.lineTo(35, 25) // Wing tip
            ctx.lineTo(15, 25)
            ctx.closePath()
            ctx.fill()

            ctx.beginPath()
            ctx.moveTo(-10, 0)
            ctx.lineTo(-35, 25) // Wing tip
            ctx.lineTo(-15, 25)
            ctx.closePath()
            ctx.fill()

            // Detail Lines (Neon Strips)
            ctx.strokeStyle = '#ff00aa'
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.moveTo(0, -30)
            ctx.lineTo(0, -17)
            ctx.stroke()

            ctx.strokeStyle = '#00f0ff'
            ctx.beginPath()
            ctx.moveTo(35, 25)
            ctx.lineTo(15, 25)
            ctx.moveTo(-35, 25)
            ctx.lineTo(-15, 25)
            ctx.stroke()

            ctx.restore()
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

            // Draw Detailed Spaceship
            drawSpaceship(spaceship.x, spaceship.y)

            // Fire Logic
            if (time - spaceship.lastFired > 250) { // Faster fire rate
                entities.push({
                    x: spaceship.x, // Center
                    y: spaceship.y - 30, // Nose
                    vx: 0,
                    vy: -12, // Faster bullets
                    width: 4,
                    height: 15,
                    color: '#00ff88', // Green laser
                    type: 'bullet'
                })
                // Side cannons occasionally
                if (Math.random() > 0.7) {
                    entities.push({ x: spaceship.x - 25, y: spaceship.y + 10, vx: -1, vy: -10, width: 3, height: 10, color: '#ff00aa', type: 'bullet' })
                    entities.push({ x: spaceship.x + 25, y: spaceship.y + 10, vx: 1, vy: -10, width: 3, height: 10, color: '#ff00aa', type: 'bullet' })
                }

                spaceship.lastFired = time
            }

            // --- Entity Management ---
            // Spawn new targets more frequently
            if (Math.random() < 0.02 && entities.filter(e => e.type === 'target').length < 12) {
                spawnTarget()
            }

            for (let i = entities.length - 1; i >= 0; i--) {
                const e = entities[i]

                // Movement
                e.x += e.vx
                e.y += e.vy

                // Boundary Checks & Removal
                if (e.type === 'bullet' && e.y < -20) {
                    entities.splice(i, 1)
                    continue
                }
                if (e.type === 'target' && e.y > canvas.height + 50) {
                    entities.splice(i, 1)
                    continue
                }
                if (e.type === 'particle') {
                    if (e.life !== undefined) {
                        e.life -= 0.03
                        if (e.life <= 0) {
                            entities.splice(i, 1)
                            continue
                        }
                    }
                }

                // Drawing & Collision
                if (e.type === 'target') {
                    // Draw Image if loaded, else fallback to text (or square)
                    if (e.image && e.image.complete) {
                        ctx.drawImage(e.image, e.x - e.width / 2, e.y - e.height / 2, e.width, e.height)
                    } else {
                        // Fallback square
                        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)'
                        ctx.fillRect(e.x - e.width / 2, e.y - e.height / 2, e.width, e.height)
                    }

                } else if (e.type === 'bullet') {
                    ctx.fillStyle = e.color
                    ctx.shadowBlur = 10
                    ctx.shadowColor = e.color
                    ctx.fillRect(e.x - e.width / 2, e.y, e.width, e.height)
                    ctx.shadowBlur = 0

                    // Collision Check vs Targets
                    for (let j = entities.length - 1; j >= 0; j--) {
                        const target = entities[j]
                        if (target.type === 'target') {
                            // Hit Box Collision
                            if (e.x > target.x - target.width / 2 && e.x < target.x + target.width / 2 &&
                                e.y > target.y - target.height / 2 && e.y < target.y + target.height / 2) {

                                // Hit!
                                spawnExplosion(target.x, target.y, '#00f0ff')
                                entities.splice(j, 1) // Remove target
                                entities.splice(i, 1) // Remove bullet
                                i--
                                break
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

    // ... existing return ...
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
                opacity: 0.6 // Increased opacity for better tech icon visibility
            }}
        />
    )
}
