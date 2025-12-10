import { PhotoGallery } from '@/components/ui/PhotoGallery'
import { CameraShutter } from '@/components/ui/CameraShutter'
import { ScrollNavigation } from '@/components/photographer/ScrollNavigation'

export default function PhotographerPage() {
    return (
        <ScrollNavigation currentPage="gallery">
            <main style={{ width: '100vw', minHeight: '100vh', background: '#f4f4f4' }}>
                {/* Shutter Opening Animation */}
                <CameraShutter isOpen={true} />

                <PhotoGallery enableScrollNavigation={true} />
            </main>
        </ScrollNavigation>
    )
}
