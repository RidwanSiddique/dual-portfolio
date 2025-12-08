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
            {children}
        </div>
    )
}
