export default function PhotographerLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div style={{
            background: '#ffffff',
            minHeight: '100vh',
            color: '#1a1a1a',
            fontFamily: '"Helvetica Neue", sans-serif'
        }}>
            {children}
        </div>
    )
}
