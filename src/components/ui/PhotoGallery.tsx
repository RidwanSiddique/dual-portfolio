'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FilterCanvas } from '@/components/canvas/FilterCanvas'

// Placeholder data - connect to DB later
const SAMPLE_PHOTOS = [
    { id: '1', url: 'https://picsum.photos/id/64/800/1200', title: 'City Fog' },
    { id: '2', url: 'https://picsum.photos/id/111/1200/800', title: 'Vintage Car' },
    { id: '3', url: 'https://picsum.photos/id/234/800/800', title: 'Abstract' },
    { id: '4', url: 'https://picsum.photos/id/15/1200/800', title: 'Waterfall' },
    { id: '5', url: 'https://picsum.photos/id/98/800/1200', title: 'Coastline' },
]

export function PhotoGallery() {
    const [selectedPhoto, setSelectedPhoto] = useState<typeof SAMPLE_PHOTOS[0] | null>(null)

    // Editor State
    const [settings, setSettings] = useState({
        brightness: 0,
        contrast: 0,
        saturation: 0,
        sepia: 0,
        vignette: 0
    })

    const resetSettings = () => setSettings({
        brightness: 0,
        contrast: 0,
        saturation: 0,
        sepia: 0,
        vignette: 0
    })

    // Presets
    const applyPreset = (type: string) => {
        switch (type) {
            case 'bw': setSettings({ ...settings, saturation: -1, contrast: 0.2 }); break;
            case 'vintage': setSettings({ ...settings, sepia: 0.5, vignette: 0.5, contrast: 0.1 }); break;
            case 'cyber': setSettings({ ...settings, saturation: 0.5, contrast: 0.3, brightness: 0.1 }); break;
            default: resetSettings();
        }
    }

    return (
        <>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '20px'
            }}>
                {SAMPLE_PHOTOS.map((photo) => (
                    <motion.div
                        key={photo.id}
                        layoutId={photo.id}
                        onClick={() => {
                            setSelectedPhoto(photo)
                            resetSettings()
                        }}
                        style={{ cursor: 'pointer', overflow: 'hidden', borderRadius: '8px' }}
                        whileHover={{ scale: 1.02 }}
                    >
                        <img
                            src={photo.url}
                            alt={photo.title}
                            style={{ width: '100%', height: 'auto', display: 'block' }}
                        />
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedPhoto && (
                    <motion.div
                        layoutId={selectedPhoto.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            top: 0, left: 0,
                            width: '100vw', height: '100vh',
                            background: 'rgba(0,0,0,0.95)',
                            zIndex: 100,
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <div style={{ flex: 1, position: 'relative' }}>
                            <FilterCanvas url={selectedPhoto.url} settings={settings} />
                        </div>

                        {/* Editor UI */}
                        <div style={{
                            height: '250px',
                            background: '#111',
                            borderTop: '1px solid #333',
                            padding: '1rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h3 style={{ margin: 0 }}>DARKROOM</h3>
                                <button
                                    onClick={() => setSelectedPhoto(null)}
                                    style={{ background: 'transparent', border: '1px solid white', color: 'white', padding: '0.5rem 1rem', cursor: 'pointer' }}
                                >
                                    CLOSE
                                </button>
                            </div>

                            <div style={{ display: 'flex', gap: '2rem', height: '100%' }}>
                                {/* Sliders */}
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem', justifyContent: 'center' }}>
                                    <label>Brightness <input type="range" min="-0.5" max="0.5" step="0.01" value={settings.brightness} onChange={e => setSettings({ ...settings, brightness: parseFloat(e.target.value) })} /></label>
                                    <label>Contrast <input type="range" min="-0.5" max="0.5" step="0.01" value={settings.contrast} onChange={e => setSettings({ ...settings, contrast: parseFloat(e.target.value) })} /></label>
                                    <label>Saturation <input type="range" min="-1" max="1" step="0.01" value={settings.saturation} onChange={e => setSettings({ ...settings, saturation: parseFloat(e.target.value) })} /></label>
                                </div>

                                {/* Presets */}
                                <div style={{ width: '200px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <div>PRESETS</div>
                                    <button onClick={() => applyPreset('bw')}>BW</button>
                                    <button onClick={() => applyPreset('vintage')}>Vintage</button>
                                    <button onClick={() => applyPreset('cyber')}>Cyber</button>
                                    <button onClick={resetSettings}>Reset</button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
