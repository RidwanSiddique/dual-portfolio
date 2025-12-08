export const techIcons: Record<string, string> = {
    'React': 'https://cdn.simpleicons.org/react/00f0ff',
    'TypeScript': 'https://cdn.simpleicons.org/typescript/007acc',
    'Next.js': 'https://cdn.simpleicons.org/nextdotjs/ffffff',
    'Node.js': 'https://cdn.simpleicons.org/nodedotjs/339933',
    'Prisma': 'https://cdn.simpleicons.org/prisma/2d3748',
    'Tailwind': 'https://cdn.simpleicons.org/tailwindcss/06b6d4',
    'PostgreSQL': 'https://cdn.simpleicons.org/postgresql/4169e1',
    'Linux': 'https://cdn.simpleicons.org/linux/fcc624',
    'Docker': 'https://cdn.simpleicons.org/docker/2496ed',
    'Git': 'https://cdn.simpleicons.org/git/f05032',
    'MongoDB': 'https://cdn.simpleicons.org/mongodb/47a248',
    'GraphQL': 'https://cdn.simpleicons.org/graphql/e10098',
    'Redux': 'https://cdn.simpleicons.org/redux/764abc',
    'Python': 'https://cdn.simpleicons.org/python/3776ab',
    'Django': 'https://cdn.simpleicons.org/django/092e20',
    'AWS': 'https://cdn.simpleicons.org/amazonaws/232f3e',
}

export function getTechIcon(name: string): string {
    return techIcons[name] || `https://cdn.simpleicons.org/${name.toLowerCase()}/cccccc`
}
