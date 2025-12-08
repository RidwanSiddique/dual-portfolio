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
            <nav style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee' }}>
                <div style={{ fontWeight: 600, letterSpacing: '0.1em' }}>PHOTOGRAPHY</div>
                <a href="/" style={{ color: '#999' }}>Home</a>
            </nav>
            {children}
        </div>
    )
}
