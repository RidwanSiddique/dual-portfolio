'use client'

import styles from './page.module.css'
import { motion } from 'framer-motion'

export default function AboutPage() {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                {/* Hero Section */}
                <motion.section
                    className={styles.heroSection}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className={styles.title}>About Me</h1>
                    <p className={styles.bio}>
                        I am a multidisciplinary creator bridging the gap between logic and logic.
                        As a Full Stack Developer, I architect robust digital solutions.
                        As a Photographer, I capture the fleeting moments of the world.
                        Two disciplines, one vision.
                    </p>
                </motion.section>

                <div className={styles.divider} />

                {/* Details Grid */}
                <div className={styles.grid}>
                    {/* Developer Card */}
                    <motion.div
                        className={styles.card}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        <h2 className={styles.cardTitle}>
                            <span style={{ color: '#00f0ff' }}>&lt;/&gt;</span> Developer
                        </h2>
                        <p className={styles.cardText}>
                            Specializing in React, Next.js, and Node.js ecosystems.
                            I build performant web applications with a focus on interactive UI and complex data visualization.
                        </p>
                        <p className={styles.cardText}>
                            Obsessed with clean code, scalability, and pixel-perfect implementation.
                        </p>
                    </motion.div>

                    {/* Photographer Card */}
                    <motion.div
                        className={styles.card}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        <h2 className={styles.cardTitle}>
                            <span style={{ color: '#ff00aa' }}>📸</span> Photographer
                        </h2>
                        <p className={styles.cardText}>
                            Visual storyteller with a passion for street, portrait, and landscape photography.
                            I believe every frame should evoke an emotion and tell a story.
                        </p>
                        <p className={styles.cardText}>
                            Experiementing with light, shadow, and composition to create compelling imagery.
                        </p>
                    </motion.div>

                    {/* Contact Card */}
                    <motion.div
                        className={styles.card}
                        style={{ gridColumn: '1 / -1' }}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                    >
                        <h2 className={styles.cardTitle}>
                            Let's Connect
                        </h2>
                        <p className={styles.cardText}>
                            Always open to new opportunities, collaborations, or just a chat about tech and art.
                        </p>
                        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                            <a href="mailto:contact@ridwansiddique.com" className={styles.contactLink}>Email Me -&gt;</a>
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>GitHub -&gt;</a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>LinkedIn -&gt;</a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>Instagram -&gt;</a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
