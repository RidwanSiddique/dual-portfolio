import { LightroomInterface } from '@/components/photographer/LightroomInterface'
import { ScrollNavigation } from '@/components/photographer/ScrollNavigation'

export const metadata = {
    title: 'Darkroom | Photographer',
    description: 'Advanced photo editing suite.',
}

export default function EditorPage() {
    return (
        <ScrollNavigation currentPage="editor">
            <LightroomInterface />
        </ScrollNavigation>
    )
}
