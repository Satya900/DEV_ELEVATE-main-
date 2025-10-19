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
            { name: 'Arrays', path: '/dsa/arrays' },
            { name: 'Linked Lists', path: '/dsa/linked-lists' },
            { name: 'Stacks & Queues', path: '/dsa/stacks-queues' },
            { name: 'Trees', path: '/dsa/trees' },
            { name: 'Graphs', path: '/dsa/graphs' },
            { name: 'Dynamic Programming', path: '/dsa/dynamic-programming' },
            { name: 'Sorting & Searching', path: '/dsa/sorting-searching' }
        ]
    },
    { 
        name: 'Web Dev', 
        path: '/web-dev',
        hasDropdown: true,
        subItems: [
            { name: 'Frontend', path: '/web-dev/frontend' },
            { name: 'Backend', path: '/web-dev/backend' },
            { name: 'Full Stack', path: '/web-dev/fullstack' },
            { name: 'JavaScript', path: '/web-dev/javascript' },
            { name: 'React', path: '/web-dev/react' },
            { name: 'Node.js', path: '/web-dev/nodejs' }
        ]
    },
    { 
        name: 'System Design', 
        path: '/system-design',
        hasDropdown: true,
        subItems: [
            { name: 'Microservices', path: '/system-design/microservices' },
            { name: 'Databases', path: '/system-design/databases' },
            { name: 'Caching', path: '/system-design/caching' },
            { name: 'Load Balancing', path: '/system-design/load-balancing' },
            { name: 'Scalability', path: '/system-design/scalability' },
            { name: 'Security', path: '/system-design/security' }
        ]
    },
    { name: 'Projects', path: '/projects' },
    { name: 'Prepare', path: '/topics' },
    { name: 'DevCompiler', path: '/compiler' },
    { name: 'TechBuzz', path: '/techbuzz' },
    { name: 'Blog', path: '/blog' },
];