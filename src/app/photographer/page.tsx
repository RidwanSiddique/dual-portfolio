import { PhotoGallery } from '@/components/ui/PhotoGallery'

export default function PhotographerPage() {
    return (
        <main style={{ maxWidth: '1600px', margin: '0 auto', padding: '2rem' }}>
            <header style={{ marginBottom: '4rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '4vw', fontWeight: 300, margin: 0, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Visuals
                </h1>
                <p style={{ color: '#666' }}>Capturing moments in time.</p>
            </header>

            <PhotoGallery />
        </main>
    )
}
