'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

// Mock Data for Filmstrip (using Unsplash)
const FILMSTRIP_IMAGES = [
    "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1554080353-a576cf803bda?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1551316679-9c6ae9dec224?auto=format&fit=crop&w=800&q=80",
]

type Adjustments = {
    exposure: number;
    contrast: number;
    highlights: number;
    shadows: number;
    saturation: number;
    warmth: number;
};

const DEFAULT_ADJUSTMENTS: Adjustments = {
    exposure: 100,
    contrast: 100,
    highlights: 100,
    shadows: 100,
    saturation: 100,
    warmth: 100,
}

const PRESETS = [
    { name: "Default", values: { ...DEFAULT_ADJUSTMENTS } },
    { name: "Matte B&W", values: { ...DEFAULT_ADJUSTMENTS, saturation: 0, contrast: 120, exposure: 110 } },
    { name: "Vivid Warm", values: { ...DEFAULT_ADJUSTMENTS, saturation: 140, warmth: 120, contrast: 110 } },
    { name: "Cinema Cold", values: { ...DEFAULT_ADJUSTMENTS, saturation: 80, warmth: 80, contrast: 130, shadows: 90 } },
    { name: "Fade Film", values: { ...DEFAULT_ADJUSTMENTS, contrast: 90, exposure: 110, saturation: 90, shadows: 120 } },
]

export function LightroomInterface() {
    const [selectedImage, setSelectedImage] = useState(FILMSTRIP_IMAGES[0])
    const [adjustments, setAdjustments] = useState<Adjustments>(DEFAULT_ADJUSTMENTS)
    const [activePreset, setActivePreset] = useState("Default")

    // Reset adjustments when image changes (optional, but typical behavior is usually keeping edits)
    // We will keep edits for now to allow batch-like feel, or reset if desired.

    const handleAdjustmentChange = (key: keyof Adjustments, value: number) => {
        setAdjustments(prev => ({ ...prev, [key]: value }))
        setActivePreset("Custom")
    }

    const applyPreset = (preset: typeof PRESETS[0]) => {
        setAdjustments(preset.values)
        setActivePreset(preset.name)
    }

    // Convert adjustments to CSS filters
    const getImageStyle = () => {
        // Approximate mappings
        // Warmth is tricky in pure CSS filter, typically needs sepia/hue-rotate mix. 
        // We'll use sepia for warmth approximation nicely.
        const brightness = adjustments.exposure / 100;
        const contrast = adjustments.contrast / 100;
        const saturate = adjustments.saturation / 100;
        const sepia = adjustments.warmth > 100 ? (adjustments.warmth - 100) / 100 : 0;
        // Shadows/Highlights are hard in pure CSS filter without SVG, we'll mimic with brightness/contrast combo tweak

        return {
            filter: `brightness(${brightness}) contrast(${contrast}) saturate(${saturate}) sepia(${sepia})`
        }
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            background: '#1a1a1a', // Adobe Dark Grey
            color: '#bbb',
            fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            overflow: 'hidden'
        }}>
            {/* Top Bar */}
            <div style={{
                height: '40px',
                background: '#2a2a2a',
                display: 'flex',
                alignItems: 'center',
                padding: '0 20px',
                fontSize: '12px',
                fontWeight: 600,
                borderBottom: '1px solid #111',
                justifyContent: 'space-between'
            }}>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <span style={{ color: '#fff' }}>Ridwan's Darkroom</span>
                    <span>Library</span>
                    <span style={{ color: '#aaa', borderBottom: '2px solid #ccc' }}>Develop</span>
                    <span>Print</span>
                </div>
                <div>Adobe Lightroom Classic (Simulated)</div>
            </div>

            {/* Main Content Area */}
            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

                {/* Left Sidebar: Presets */}
                <div style={{
                    width: '250px',
                    background: '#222',
                    borderRight: '1px solid #111',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <PanelHeader title="Presets" />
                    <div style={{ padding: '10px', overflowY: 'auto' }}>
                        {PRESETS.map(preset => (
                            <div
                                key={preset.name}
                                onClick={() => applyPreset(preset)}
                                style={{
                                    padding: '8px 12px',
                                    fontSize: '13px',
                                    cursor: 'pointer',
                                    color: activePreset === preset.name ? '#fff' : '#aaa',
                                    background: activePreset === preset.name ? '#333' : 'transparent',
                                    borderRadius: '4px',
                                    marginBottom: '2px'
                                }}
                            >
                                {preset.name}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Center Canvas */}
                <div style={{
                    flex: 1,
                    background: '#111',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    padding: '40px'
                }}>
                    <motion.img
                        key={selectedImage} // Flash animation on change
                        initial={{ opacity: 0.8 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        src={selectedImage}
                        style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            boxShadow: '0 0 40px rgba(0,0,0,0.5)',
                            ...getImageStyle(), // Apply Filters
                            transition: 'filter 0.2s ease-out' // Smooth slider updates
                        }}
                    />

                    {/* Image Info Overlay (Bottom Left of Canvas) */}
                    <div style={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '10px',
                        fontSize: '11px',
                        color: '#666'
                    }}>
                        ISO 400 | f/2.8 | 1/125s
                    </div>
                </div>

                {/* Right Sidebar: Adjustments */}
                <div style={{
                    width: '280px',
                    background: '#222',
                    borderLeft: '1px solid #111',
                    display: 'flex',
                    flexDirection: 'column',
                    overflowY: 'auto'
                }}>
                    <PanelHeader title="Histogram" />
                    <div style={{ height: '100px', background: '#1a1a1a', borderBottom: '1px solid #111', display: 'flex', alignItems: 'flex-end', padding: '0 5px', gap: '2px' }}>
                        {/* Fake Histogram Bars */}
                        {Array.from({ length: 40 }).map((_, i) => (
                            <div key={i} style={{ flex: 1, background: '#444', height: `${Math.random() * 80 + 10}%` }} />
                        ))}
                    </div>

                    <PanelHeader title="Basic" />
                    <div style={{ padding: '15px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <SliderControl label="Exposure" value={adjustments.exposure} min={0} max={200} onChange={(v) => handleAdjustmentChange('exposure', v)} />
                        <SliderControl label="Contrast" value={adjustments.contrast} min={0} max={200} onChange={(v) => handleAdjustmentChange('contrast', v)} />
                        <SliderControl label="Highlights" value={adjustments.highlights} min={0} max={200} onChange={(v) => handleAdjustmentChange('highlights', v)} />
                        <SliderControl label="Shadows" value={adjustments.shadows} min={0} max={200} onChange={(v) => handleAdjustmentChange('shadows', v)} />

                        <div style={{ height: '1px', background: '#333', margin: '5px 0' }} />

                        <SliderControl label="Warmth" value={adjustments.warmth} min={0} max={200} onChange={(v) => handleAdjustmentChange('warmth', v)} />
                        <SliderControl label="Saturation" value={adjustments.saturation} min={0} max={200} onChange={(v) => handleAdjustmentChange('saturation', v)} />
                    </div>

                    <div style={{ padding: '20px', textAlign: 'center' }}>
                        <button
                            onClick={() => alert("Export functionality simulated. Image optimized for web.")}
                            style={{
                                width: '100%',
                                padding: '8px',
                                background: '#444',
                                border: '1px solid #555',
                                color: '#ddd',
                                borderRadius: '3px',
                                cursor: 'pointer',
                                fontSize: '12px'
                            }}
                        >
                            Export Photo...
                        </button>
                    </div>
                </div>

            </div>

            {/* Bottom Filmstrip */}
            <div style={{
                height: '100px',
                background: '#222',
                borderTop: '1px solid #111',
                display: 'flex',
                overflowX: 'auto',
                alignItems: 'center',
                padding: '0 10px',
                gap: '10px'
            }}>
                {FILMSTRIP_IMAGES.map((src, i) => (
                    <div
                        key={i}
                        onClick={() => setSelectedImage(src)}
                        style={{
                            height: '80px',
                            minWidth: '80px',
                            border: selectedImage === src ? '2px solid #ccc' : '1px solid #333',
                            backgroundImage: `url(${src})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            cursor: 'pointer',
                            opacity: selectedImage === src ? 1 : 0.6,
                            transition: 'opacity 0.2s'
                        }}
                    />
                ))}
            </div>
        </div>
    )
}

// Subcomponents

function PanelHeader({ title }: { title: string }) {
    return (
        <div style={{
            padding: '8px 12px',
            background: '#2a2a2a',
            fontSize: '13px',
            fontWeight: 600,
            borderBottom: '1px solid #111',
            borderTop: '1px solid #111',
            color: '#ddd',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <span>{title}</span>
            <span style={{ fontSize: '10px', color: '#666' }}>▼</span>
        </div>
    )
}

function SliderControl({ label, value, min, max, onChange }: { label: string, value: number, min: number, max: number, onChange: (val: number) => void }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#aaa' }}>
                <span>{label}</span>
                <span>{value - 100}</span>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                style={{
                    width: '100%',
                    height: '2px',
                    background: '#555',
                    appearance: 'none',
                    outline: 'none',
                    cursor: 'pointer'
                }}
            />
        </div>
    )
}
