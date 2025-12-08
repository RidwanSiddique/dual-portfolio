'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Dock } from './Dock'
import { TerminalWindow } from './TerminalWindow'
import { SpaceWallpaper } from './SpaceWallpaper'

interface Project {
    id: string
    title: string
    description: string
    techStack: string[]
    demoUrl?: string
    repoUrl?: string
    imageUrl?: string
}

export function DesktopUI() {
    const [projects, setProjects] = useState<Project[]>([])
    // ... existing code ...
    const [loading, setLoading] = useState(true)
    const [openWindows, setOpenWindows] = useState<{ id: string; project: Project; x: number; y: number }[]>([])
    const [windowZIndices, setWindowZIndices] = useState<Record<string, number>>({})
    const [maxZIndex, setMaxZIndex] = useState(100)

    useEffect(() => {
        fetch('/api/projects')
            .then(res => res.json())
            .then(data => {
                setProjects(data)
                setLoading(false)
            })
            .catch(err => {
                console.error('Failed to fetch projects:', err)
                setLoading(false)
            })
    }, [])

    const handleProjectClick = (project: Project) => {
        // Check if window is already open
        const isOpen = openWindows.some(w => w.id === project.id)
        if (!isOpen) {
            // Random position with some constraints to keep it on screen
            // x: 50 to window.innerWidth - 750 (approx width)
            // y: 50 to window.innerHeight - 500 (approx height)
            // Using a safe default range if window is not available yet (SSR)
            const maxX = typeof window !== 'undefined' ? window.innerWidth - 750 : 500
            const maxY = typeof window !== 'undefined' ? window.innerHeight - 500 : 300

            const x = 50 + Math.random() * Math.max(100, maxX - 50)
            const y = 50 + Math.random() * Math.max(100, maxY - 50)

            setOpenWindows([...openWindows, { id: project.id, project, x, y }])
            setWindowZIndices({ ...windowZIndices, [project.id]: maxZIndex + 1 })
            setMaxZIndex(maxZIndex + 1)
        } else {
            // Bring to front
            handleWindowFocus(project.id)
        }
    }

    const handleWindowClose = (projectId: string) => {
        setOpenWindows(openWindows.filter(w => w.id !== projectId))
        const newIndices = { ...windowZIndices }
        delete newIndices[projectId]
        setWindowZIndices(newIndices)
    }

    const handleWindowFocus = (projectId: string) => {
        setWindowZIndices({ ...windowZIndices, [projectId]: maxZIndex + 1 })
        setMaxZIndex(maxZIndex + 1)
    }

    if (loading) {
        return (
            <div
                style={{
                    width: '100%',
                    height: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                }}
            >
                <p style={{ color: '#00f0ff', fontSize: '1.5rem', fontFamily: 'monospace' }}>
                    {'> Loading desktop...'}
                </p>
            </div>
        )
    }

    return (
        <div
            style={{
                width: '100%',
                height: '100vh',
                background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Space Battle Background */}
            <SpaceWallpaper />

            {/* Desktop Background Pattern (Optional overlay) */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `
                        radial-gradient(circle at 20% 50%, rgba(0, 240, 255, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 80% 80%, rgba(255, 0, 170, 0.1) 0%, transparent 50%)
                    `,
                    pointerEvents: 'none',
                }}
            />

            {/* Menu Bar (optional) */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '32px',
                    background: 'rgba(0, 0, 0, 0.3)',
                    backdropFilter: 'blur(10px)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 16px',
                    fontSize: '13px',
                    color: '#fff',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    fontWeight: '500',
                }}
            >
                <div style={{ marginRight: '20px' }}>🍎</div>
                <div style={{ marginRight: '20px' }}>Developer Portfolio</div>
                <div style={{ flex: 1 }} />
                <div>{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>
            </div>

            {/* Desktop Area - Windows */}
            <div
                style={{
                    position: 'absolute',
                    top: '32px',
                    left: 0,
                    right: 0,
                    bottom: '120px',
                    overflow: 'hidden',
                }}
            >
                <AnimatePresence>
                    {openWindows.map(w => (
                        <TerminalWindow
                            key={w.id}
                            project={w.project}
                            onClose={() => handleWindowClose(w.id)}
                            zIndex={windowZIndices[w.id] || 100}
                            onFocus={() => handleWindowFocus(w.id)}
                            initialPosition={{ x: w.x, y: w.y }}
                        />
                    ))}
                </AnimatePresence>
            </div>

            {/* Dock */}
            <Dock projects={projects} onProjectClick={handleProjectClick} />
        </div>
    )
}
