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
            { name: 'All DSA Topics', path: '/dsa' },
            { name: 'DSA Basics', path: '/dsa?subcategory=basics' },
            { name: 'Arrays & Strings', path: '/dsa?subcategory=arrays' },
            { name: 'Linked Lists', path: '/dsa?subcategory=linked-lists' },
            { name: 'Stack', path: '/dsa?subcategory=Stack' },
        ]
    },
    {
        name: 'Web Dev',
        path: '/web-dev',
        hasDropdown: true,
        subItems: [
            { name: 'All Web Dev', path: '/web-dev' },
            { name: 'Frontend', path: '/web-dev?subcategory=frontend' },
            { name: 'Backend', path: '/web-dev?subcategory=backend' },
        ]
    },
    {
        name: 'System Design',
        path: '/system-design',
        hasDropdown: true,
        subItems: [
            { name: 'All System Design', path: '/system-design' },
            { name: 'Fundamentals', path: '/system-design?subcategory=fundamentals' },
            { name: 'High Availability & FT', path: '/system-design?subcategory=HA%20%26%20FT' },
        ]
    },
    { name: 'Projects', path: '/projects' },
    { name: 'Prepare', path: '/topics' },
    { name: 'DevCompiler', path: '/compiler' },
    {
        name: 'Blog',
        path: '/techbuzz',
        hasDropdown: true,
        subItems: [
            { name: 'All Articles', path: '/techbuzz' },
            { name: 'AI & ML Trends', path: '/techbuzz?category=AI' },
            { name: 'Web3 & Blockchain', path: '/techbuzz?category=Web3' },
            { name: 'Cloud & DevOps', path: '/techbuzz?category=Cloud' },
            { name: 'Developer Tools', path: '/techbuzz?category=DevTools' },
        ]
    },
];