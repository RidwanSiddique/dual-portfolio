'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function AboutPage() {
    // Resume Data
    const skills = [
        "React", "Next.js", "TypeScript", "Node.js", "GraphQL",
        "TailwindCSS", "Framer Motion", "PostgreSQL", "Prisma",
        "Photography", "Lightroom", "Adobe Creative Suite"
    ]

    const education = [
        {
            degree: "B.Sc. in Computer Science",
            school: "University of Technology",
            year: "2019 - 2023",
            description: "Specialized in Software Engineering and Human-Computer Interaction. graduated with Honors."
        },
        {
            degree: "Certified Professional Photographer",
            school: "Institute of Visual Arts",
            year: "2018 - 2019",
            description: "Focus on composition, lighting dynamics, and visual storytelling."
        }
    ]

    return (
        <div style={{
            width: '100vw',
            minHeight: '100vh',
            background: '#111', // Dark background
            color: '#eee',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            overflowY: 'auto',
            paddingBottom: '80px'
        }}>
            {/* Main Container */}
            <div style={{
                maxWidth: '800px',
                margin: '0 auto',
                padding: '60px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '60px'
            }}>
                {/* Header Section */}
                <motion.header
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}
                >
                    {/* Headshot */}
                    <div style={{
                        width: '180px',
                        height: '180px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        border: '4px solid #333',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
                    }}>
                        <img
                            src='/assets/dp.JPG'
                            alt="Ridwan Siddique"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }}
                        />
                    </div>

                    {/* Name & Title */}
                    <div>
                        <h1 style={{ fontSize: '3rem', fontWeight: 700, margin: '0 0 10px 0', background: 'linear-gradient(to right, #fff, #aaa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Ridwan Siddique
                        </h1>
                        <h2 style={{ fontSize: '1.2rem', fontWeight: 400, color: '#888', margin: 0 }}>
                            Full Stack Developer & Photographer
                        </h2>
                    </div>

                    {/* Contact Info */}
                    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center', color: '#ccc', fontSize: '0.95rem' }}>
                        <a href="mailto:rsiddique244@gmail.com" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span>✉️</span> rsiddique244@gmail.com
                        </a>
                        <span style={{ color: '#444' }}>|</span>
                        <a href="https://github.com/RidwanSiddique" target="_blank" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span>🐙</span> GitHub
                        </a>
                        <span style={{ color: '#444' }}>|</span>
                        <a href="https://linkedin.com/in/RidwanSiddique" target="_blank" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span>💼</span> LinkedIn
                        </a>
                    </div>
                </motion.header>

                {/* Divider */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    style={{ height: '1px', background: 'linear-gradient(to right, transparent, #333, transparent)', width: '100%' }}
                />

                {/* Professional Summary */}
                <Section title="Professional Summary" delay={0.2}>
                    <p style={{ lineHeight: '1.8', color: '#ccc', fontSize: '1.05rem', margin: 0 }}>
                        I am a multidisciplinary creator bridging the gap between logic and art.
                        With a robust background in software engineering, I architect scalable digital solutions that solve real-world problems.
                        Simultaneously, my passion for photography allows me to see the world through a creative lens, influencing my design philosophy with a keen eye for aesthetics and detail.
                        I build applications that not only work flawlessly but feel premium.
                    </p>
                </Section>

                {/* Education */}
                <Section title="Education" delay={0.4}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                        {education.map((edu, i) => (
                            <div key={i} style={{ paddingLeft: '20px', borderLeft: '2px solid #333' }}>
                                <h3 style={{ fontSize: '1.2rem', margin: '0 0 5px 0', color: '#fff' }}>{edu.degree}</h3>
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#666', marginBottom: '10px', fontSize: '0.9rem' }}>
                                    <span>{edu.school}</span>
                                    <span>{edu.year}</span>
                                </div>
                                <p style={{ color: '#999', fontSize: '0.95rem', margin: 0 }}>{edu.description}</p>
                            </div>
                        ))}
                    </div>
                </Section>

                {/* Skills */}
                <Section title="Technical Expertise" delay={0.6}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                        {skills.map((skill, i) => (
                            <span key={i} style={{
                                background: '#222',
                                padding: '8px 16px',
                                borderRadius: '20px',
                                fontSize: '0.9rem',
                                color: '#ddd',
                                border: '1px solid #333'
                            }}>
                                {skill}
                            </span>
                        ))}
                    </div>
                </Section>

                {/* Footer / Resume Download */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                    style={{ textAlign: 'center', marginTop: '40px' }}
                >
                    <button style={{
                        padding: '16px 40px',
                        fontSize: '1rem',
                        fontWeight: 600,
                        color: '#111',
                        background: '#fff',
                        border: 'none',
                        borderRadius: '30px',
                        cursor: 'pointer',
                        boxShadow: '0 10px 20px rgba(255,255,255,0.1)',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                    }}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 15px 30px rgba(255,255,255,0.2)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 20px rgba(255,255,255,0.1)'; }}
                        onClick={() => alert("Resume download simulation started.")}
                    >
                        Download Full Resume
                    </button>
                </motion.div>
            </div>
        </div>
    )
}

function Section({ title, children, delay }: { title: string, children: React.ReactNode, delay: number }) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay, duration: 0.6 }}
        >
            <h2 style={{
                fontSize: '1.5rem',
                marginBottom: '24px',
                color: '#fff',
                borderBottom: '1px solid #333',
                paddingBottom: '10px',
                display: 'inline-block',
                paddingRight: '20px'
            }}>
                {title}
            </h2>
            <div>{children}</div>
        </motion.section>
    )
}
