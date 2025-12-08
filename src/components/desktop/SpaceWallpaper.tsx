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

        const spaceshipImage = new Image()
        spaceshipImage.src = '/assets/spaceship_sprite_v2.png'

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



        // Game Loop
        let lastTime = 0
        const MAX_ENTITIES = 150

        const update = (timestamp: number) => {
            if (!lastTime) lastTime = timestamp
            const deltaTime = Math.min((timestamp - lastTime) / 1000, 0.05) // Cap delta to prevent huge jumps
            lastTime = timestamp

            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // --- Spaceship Logic ---
            // Move spaceship autonomously
            if (Math.random() < 0.02) {
                spaceship.targetX = Math.random() * (canvas.width - 100) + 50
            }
            // Smooth movement with delta
            const speed = 3.0 // Base speed multiplier
            spaceship.x += (spaceship.targetX - spaceship.x) * speed * deltaTime

            // Draw Detailed Spaceship Image
            if (spaceshipImage.complete) {
                ctx.save()
                ctx.translate(spaceship.x, spaceship.y)
                // Add subtle banking effect
                const bank = (spaceship.targetX - spaceship.x) * 0.02
                ctx.rotate(bank * 0.05)

                // Draw engine glow
                ctx.globalCompositeOperation = 'screen'
                const glowSize = 10 + Math.random() * 5
                ctx.fillStyle = '#00f0ff'
                ctx.globalAlpha = 0.4
                ctx.beginPath()
                ctx.arc(0, 25, 20 + glowSize, 0, Math.PI * 2)
                ctx.fill()
                ctx.globalAlpha = 1.0
                ctx.globalCompositeOperation = 'source-over'

                // Draw ship
                ctx.drawImage(spaceshipImage, -40, -40, 80, 80)
                ctx.restore()
            }

            // Fire Logic
            if (timestamp - spaceship.lastFired > 250) {
                entities.push({
                    x: spaceship.x,
                    y: spaceship.y - 40,
                    vx: 0,
                    vy: -400, // Velocity in pixels per second
                    width: 4,
                    height: 15,
                    color: '#00ff88',
                    type: 'bullet'
                })
                // Side cannons occasionally
                if (Math.random() > 0.7) {
                    entities.push({ x: spaceship.x - 25, y: spaceship.y - 10, vx: -30, vy: -350, width: 3, height: 10, color: '#ff00aa', type: 'bullet' })
                    entities.push({ x: spaceship.x + 25, y: spaceship.y - 10, vx: 30, vy: -350, width: 3, height: 10, color: '#ff00aa', type: 'bullet' })
                }

                spaceship.lastFired = timestamp
            }

            // --- Entity Management ---
            // Spawn new targets (Limit max count)
            if (Math.random() < 0.02 && entities.filter(e => e.type === 'target').length < 8) { // Reduced max targets
                spawnTarget()
            }

            // Hard limit on total entities to prevent memory issues
            if (entities.length > MAX_ENTITIES) {
                // Remove oldest particles first
                const particlesStartIndex = entities.findIndex(e => e.type === 'particle')
                if (particlesStartIndex !== -1) {
                    entities.splice(particlesStartIndex, 1)
                } else {
                    entities.shift()
                }
            }

            for (let i = entities.length - 1; i >= 0; i--) {
                const e = entities[i]

                // Movement with Delta Time
                // Actually, let's standardize all to delta time for consistency.
                // Re-adjust velocities for delta time scaling:
                // Bullets: vy ~ -400 px/s
                // Targets: vy ~ 50 px/s
                // Particles: v ~ 200 px/s

                if (e.type === 'target') {
                    e.y += e.vy // Targets were (0.8 to 1.3) per frame -> approx 60fps * 1 = 60px/s.
                    // Let's keep targets simple for now as their `vy` was random logic.
                } else if (e.type === 'bullet') {
                    e.y += e.vy * deltaTime
                    e.x += e.vx * deltaTime
                } else if (e.type === 'particle') {
                    e.x += e.vx * 60 * deltaTime
                    e.y += e.vy * 60 * deltaTime
                }



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
                        e.life -= 2.0 * deltaTime // Faster fade
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

            animationFrameId = requestAnimationFrame(update)
        }

        animationFrameId = requestAnimationFrame(update)

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
