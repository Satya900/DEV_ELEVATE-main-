import { Project } from '../types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'AI Image Generator',
    description: 'A cutting-edge AI-powered image generation platform using stable diffusion',
    category: 'ai',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
    technologies: ['React', 'TypeScript', 'Python', 'TensorFlow'],
    demoUrl: 'https://ai-image-generator-demo.netlify.app',
    sourceUrl: 'https://github.com/devcrafters/ai-image-generator',
    markdownFile: 'ai-image-generator.md'
  },
  {
    id: '2',
    title: 'NFT Marketplace',
    description: 'Decentralized marketplace for trading digital collectibles',
    category: 'blockchain',
    image: 'https://images.unsplash.com/photo-1644658722893-2f8b7e296513?auto=format&fit=crop&w=800&q=80',
    technologies: ['React', 'Solidity', 'Ethereum', 'Web3.js'],
    demoUrl: 'https://nft-marketplace-demo.netlify.app',
    sourceUrl: 'https://github.com/devcrafters/nft-marketplace',
    markdownFile: 'nft-marketplace.md'
  },
  {
    id: '3',
    title: 'Pixel Adventure',
    description: 'A retro-style platformer game with modern gameplay mechanics',
    category: 'game',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    technologies: ['React', 'TypeScript', 'Canvas API', 'Howler.js'],
    demoUrl: 'https://pixel-adventure-demo.netlify.app',
    sourceUrl: 'https://github.com/devcrafters/pixel-adventure',
    markdownFile: 'pixel-adventure.md'
  },
  {
    id: '4',
    title: 'FitTrack Pro',
    description: 'Comprehensive fitness tracking and workout planning application',
    category: 'mobile',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
    technologies: ['React Native', 'TypeScript', 'Firebase', 'Redux'],
    demoUrl: 'https://fittrack-pro-demo.netlify.app',
    sourceUrl: 'https://github.com/devcrafters/fittrack-pro',
    markdownFile: 'fittrack-pro.md'
  },
  {
    id: '5',
    title: 'Analytics Dashboard',
    description: 'Interactive analytics dashboard with real-time data visualization',
    category: 'web',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    technologies: ['React', 'D3.js', 'TypeScript', 'WebSocket'],
    demoUrl: 'https://analytics-dashboard-demo.netlify.app',
    sourceUrl: 'https://github.com/devcrafters/analytics-dashboard',
    markdownFile: 'analytics-dashboard.md'
  }
];