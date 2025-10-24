// Navigation link types
export interface SubNavItem {
    name: string;
    path: string;
}

export interface NavLink {
    name: string;
    path: string;
    hasDropdown?: boolean;
    subItems?: SubNavItem[];
}

export const nav_links: NavLink[] = [
    { 
        name: 'DSA', 
        path: '/dsa',
        hasDropdown: true,
        subItems: [
            { name: 'Arrays', path: '/dsa/arrays/arrays-basics' },
            { name: 'Linked Lists', path: '/dsa/linked-lists/linked-list-basics' },
            { name: 'Stacks & Queues', path: '/dsa/Stack/introduction-to-stack' },
            { name: 'Time & Space Complexity', path: '/dsa/basics/time-space-complexity' },
        ]
    },
    { 
        name: 'Web Dev', 
        path: '/web-dev',
        hasDropdown: true,
        subItems: [
            { name: 'HTML & CSS', path: '/web-dev/frontend/html-css-fundamentals' },
            { name: 'React', path: '/web-dev/frontend/react-tailwind-fundamentals' },
            { name: 'Node.js', path: '/web-dev/backend/nodejs-fundamentals' }
        ]
    },
    { 
        name: 'System Design', 
        path: '/system-design',
        hasDropdown: true,
        subItems: [
            { name: 'Microservices', path: '/system-design/fundamentals/intro-to-microservices-architecture' },
            { name: 'Scalability', path: '/system-design/fundamentals/scalability-patterns' },
            { name: 'High Availability & Fault Tolerance', path: '/system-design/HA & FT/introduction-to-ha-ft' }
        ]
    },
    { name: 'Projects', path: '/projects' },
    { name: 'Prepare', path: '/topics' },
    { name: 'DevCompiler', path: '/compiler' },
    { name: 'TechBuzz', path: '/techbuzz' },
    { name: 'Blog', path: '/blog' },
];