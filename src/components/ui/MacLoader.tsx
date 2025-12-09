import { motion } from 'framer-motion'

export function MacLoader() {
    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: '#000',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px'
        }}>
            {/* iOS/Mac Style Spinner */}
            <div style={{ position: 'relative', width: '40px', height: '40px' }}>
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        style={{
                            position: 'absolute',
                            left: '50%',
                            top: '0',
                            width: '3px',
                            height: '10px',
                            background: '#fff',
                            borderRadius: '2px',
                            transformOrigin: '50% 20px', // Rotate around center of container
                            transform: `translateX(-50%) rotate(${i * 30}deg)`,
                            opacity: 0.3
                        }}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            delay: i * 0.066, // Staggered delay for spinning effect
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>
        </div>
    )
}
