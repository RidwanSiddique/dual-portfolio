import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import 'dotenv/config'

const connectionString = process.env.DATABASE_URL as string
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)

const prisma = new PrismaClient({ adapter })

async function main() {
    console.log('🌱 Seeding database...')

    // Clear existing data
    await prisma.project.deleteMany()
    await prisma.photo.deleteMany()
    await prisma.profile.deleteMany()

    // Create a profile
    const profile = await prisma.profile.create({
        data: {
            email: 'ridwan@example.com',
            bio: 'Full-stack developer and photographer passionate about creating beautiful digital experiences.',
            githubUrl: 'https://github.com/ridwansiddique',
            linkedinUrl: 'https://linkedin.com/in/ridwansiddique',
        },
    })

    console.log('✅ Created profile')

    // Create dummy projects
    const projects = await Promise.all([
        prisma.project.create({
            data: {
                title: 'E-Commerce Platform',
                description: 'A full-stack e-commerce platform with real-time inventory management, payment processing, and admin dashboard. Built with modern technologies for optimal performance and scalability.',
                techStack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Stripe', 'Tailwind CSS', 'Redis'],
                demoUrl: 'https://demo-ecommerce.example.com',
                repoUrl: 'https://github.com/ridwansiddique/ecommerce-platform',
                imageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80',
                profileId: profile.id,
            },
        }),
        prisma.project.create({
            data: {
                title: 'AI Chat Application',
                description: 'Real-time chat application powered by AI with natural language processing, sentiment analysis, and smart reply suggestions. Features WebSocket connections for instant messaging.',
                techStack: ['React', 'Node.js', 'Socket.io', 'OpenAI', 'MongoDB', 'Express'],
                demoUrl: 'https://ai-chat.example.com',
                repoUrl: 'https://github.com/ridwansiddique/ai-chat',
                imageUrl: 'https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=800&q=80',
                profileId: profile.id,
            },
        }),
        prisma.project.create({
            data: {
                title: 'Task Management System',
                description: 'Collaborative task management tool with drag-and-drop interface, team collaboration features, and productivity analytics. Includes real-time updates and notifications.',
                techStack: ['Vue.js', 'Express', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes'],
                demoUrl: 'https://taskmaster.example.com',
                repoUrl: 'https://github.com/ridwansiddique/task-manager',
                imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
                profileId: profile.id,
            },
        }),
        prisma.project.create({
            data: {
                title: 'Weather Dashboard',
                description: 'Beautiful weather dashboard with interactive maps, 7-day forecasts, and severe weather alerts. Features stunning visualizations and smooth animations powered by D3.js.',
                techStack: ['React', 'TypeScript', 'D3.js', 'Mapbox', 'Weather API', 'Framer Motion'],
                demoUrl: 'https://weather-dash.example.com',
                repoUrl: 'https://github.com/ridwansiddique/weather-dashboard',
                imageUrl: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&q=80',
                profileId: profile.id,
            },
        }),
        prisma.project.create({
            data: {
                title: 'Social Media Analytics',
                description: 'Comprehensive analytics platform for social media metrics with real-time data visualization, engagement tracking, and automated reporting. Uses machine learning for trend prediction.',
                techStack: ['Next.js', 'Python', 'TensorFlow', 'PostgreSQL', 'Chart.js', 'FastAPI'],
                demoUrl: 'https://social-analytics.example.com',
                repoUrl: 'https://github.com/ridwansiddique/social-analytics',
                imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
                profileId: profile.id,
            },
        }),
        prisma.project.create({
            data: {
                title: 'Fitness Tracker App',
                description: 'Mobile-first fitness tracking application with workout plans, nutrition logging, and progress visualization. Includes social features for community support and challenges.',
                techStack: ['React Native', 'Firebase', 'Node.js', 'GraphQL', 'MongoDB', 'Apollo'],
                demoUrl: 'https://fittrack.example.com',
                repoUrl: 'https://github.com/ridwansiddique/fitness-tracker',
                imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',
                profileId: profile.id,
            },
        }),
        prisma.project.create({
            data: {
                title: 'Video Streaming Platform',
                description: 'Netflix-style video streaming platform with adaptive bitrate streaming, user recommendations, and content management system. Supports multiple video formats and resolutions.',
                techStack: ['Next.js', 'AWS S3', 'CloudFront', 'PostgreSQL', 'FFmpeg', 'Redis'],
                demoUrl: 'https://streamify.example.com',
                repoUrl: 'https://github.com/ridwansiddique/video-streaming',
                imageUrl: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&q=80',
                profileId: profile.id,
            },
        }),
        prisma.project.create({
            data: {
                title: 'Real Estate Marketplace',
                description: 'Modern real estate marketplace with property listings, virtual tours, and mortgage calculators. Features advanced search filters and map-based property discovery.',
                techStack: ['React', 'Node.js', 'PostgreSQL', 'Google Maps API', 'Stripe', 'AWS'],
                demoUrl: 'https://realestate.example.com',
                repoUrl: 'https://github.com/ridwansiddique/real-estate',
                imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
                profileId: profile.id,
            },
        }),
    ])

    console.log(`✅ Created ${projects.length} projects`)
    console.log('✅ Seeding completed!')
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
