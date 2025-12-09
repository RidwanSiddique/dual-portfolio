import { PhotoGallery } from '@/components/ui/PhotoGallery'
import { CameraShutter } from '@/components/ui/CameraShutter'

export default function PhotographerPage() {
    return (
        <main style={{ width: '100vw', minHeight: '100vh', background: '#f4f4f4' }}>
            {/* Shutter Opening Animation */}
            <CameraShutter isOpen={true} />

            <PhotoGallery />
        </main>
    )
}
