export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  projectUrl?: string;
  githubUrl?: string;
}

export const mockProjects: Project[] = [
  {
    id: 'proj-1',
    title: 'Project Alpha',
    description: 'A description of Project Alpha.',
    imageUrl: '/images/project-alpha.jpg', // Placeholder image path
    projectUrl: 'https://example.com/alpha',
    githubUrl: 'https://github.com/testuser/alpha',
  },
  {
    id: 'proj-2',
    title: 'Project Beta',
    description: 'Details about Project Beta.',
    imageUrl: '/images/project-beta.jpg', // Placeholder image path
    projectUrl: 'https://example.com/beta',
    githubUrl: 'https://github.com/testuser/beta',
  },
  // Add more mock projects as needed
]; 