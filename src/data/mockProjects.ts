export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  projectUrl?: string;
  githubUrl?: string;
  views?: number;
  likes?: number;
  platform?: string;
}

export const mockProjects: Project[] = [
  {
    id: 'proj-1',
    title: 'Doing Disney Impressions at D...',
    description: 'I did Disney impressions at Disneyland.',
    imageUrl: '/images/mock-project-1.jpg', // Placeholder image path
    projectUrl: '#',
    githubUrl: '#',
    views: 27300000,
    likes: 640000,
    platform: 'youtube',
  },
  {
    id: 'proj-2',
    title: 'Do NOT choose the wrong box...',
    description: 'Choosing the wrong box challenge.',
    imageUrl: '/images/mock-project-2.jpg', // Placeholder image path
    projectUrl: '#',
    githubUrl: '#',
    views: 19000000,
    likes: 114000,
    platform: 'youtube',
  },
  {
    id: 'proj-3',
    title: 'Singing 16 Levels of "All Star"...',
    description: 'Singing All Star in 16 different levels.',
    imageUrl: '/images/mock-project-3.jpg', // Placeholder image path
    projectUrl: '#',
    githubUrl: '#',
    views: 8400000,
    likes: 15000,
    platform: 'youtube',
  },
   {
    id: 'proj-4',
    title: 'WE MADE ALL RAINBOW FRIE...',
    description: 'Creating Rainbow Friends characters.',
    imageUrl: '/images/mock-project-4.jpg', // Placeholder image path
    projectUrl: '#',
    githubUrl: '#',
    views: 7100000,
    likes: 20000,
    platform: 'youtube',
  },
  {
    id: 'proj-5',
    title: 'I Sang a Song for a Movie! (wit...',
    description: 'Singing a song for a movie.',
    imageUrl: '/images/mock-project-5.jpg', // Placeholder image path
    projectUrl: '#',
    githubUrl: '#',
    views: 6900000,
    likes: 194000,
    platform: 'tiktok',
  },
   {
    id: 'proj-6',
    title: 'MOST INTENSE Roblox Escap...',
    description: 'Playing an intense Roblox escape game.',
    imageUrl: '/images/mock-project-6.jpg', // Placeholder image path
    projectUrl: '#',
    githubUrl: '#',
    views: 5400000,
    likes: 24000,
    platform: 'youtube',
  },
   {
    id: 'proj-7',
    title: 'Pro Singer Reacts to Best TikT...',
    description: 'A pro singer reacts to popular TikToks.',
    imageUrl: '/images/mock-project-7.jpg', // Placeholder image path
    projectUrl: '#',
    githubUrl: '#',
    views: 4900000,
    likes: 24000,
    platform: 'tiktok',
  },
   {
    id: 'proj-8',
    title: 'EXTREME TRY NOT TO CRY C...',
    description: 'Extreme try not to cry challenge.',
    imageUrl: '/images/mock-project-8.jpg', // Placeholder image path
    projectUrl: '#',
    githubUrl: '#',
    views: 4200000,
    likes: 15000,
    platform: 'youtube',
  },
  // Add more mock projects for testing load more
   {
    id: 'proj-9',
    title: 'Another Project 1',
    description: 'Description for another project 1.',
    imageUrl: '/images/mock-project-9.jpg', // Placeholder image path
    projectUrl: '#',
    githubUrl: '#',
    views: 1000000,
    likes: 10000,
    platform: 'instagram',
  },
   {
    id: 'proj-10',
    title: 'Another Project 2',
    description: 'Description for another project 2.',
    imageUrl: '/images/mock-project-10.jpg', // Placeholder image path
    projectUrl: '#',
    githubUrl: '#',
    views: 500000,
    likes: 5000,
    platform: 'facebook',
  },
]; 