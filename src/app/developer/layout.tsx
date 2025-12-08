export default function DeveloperLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div style={{
            background: '#050505',
            minHeight: '100vh',
            color: '#00f0ff',
            fontFamily: '"Fira Code", monospace' // Cyber coding feel
        }}>
            <nav style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ fontWeight: 'bold' }}>DEV.PORTFOLIO</div>
                <a href="/" style={{ opacity: 0.5 }}>EXIT_</a>
            </nav>
            {children}
        </div>
    )
}
