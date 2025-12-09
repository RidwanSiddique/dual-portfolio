'use client'

import { DesktopUI } from '@/components/desktop/DesktopUI'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function DeveloperPage() {
    const router = useRouter()

    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            // Scroll Down -> Go to Projects
            if (e.deltaY > 50) {
                router.push('/developer/projects')
            }
        }
        window.addEventListener('wheel', handleWheel)
        return () => window.removeEventListener('wheel', handleWheel)
    }, [router])

    return <DesktopUI />
}
