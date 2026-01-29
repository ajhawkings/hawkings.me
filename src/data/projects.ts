export interface Project {
  title: string
  description: string
  url?: string
  github?: string
  tags: string[]
}

export const projects: Project[] = 
[
  {
    title: 'Conrad Margoles Architects',
    description:
      'A website for a professional architecture firm based in London, built with Next.js and deployed on Vercel.',
    url: 'https://conradmargoles.com',
    github: 'https://github.com/ajhawkings/conradmargoles',
    tags: ['Next.js', 'TypeScript', 'React'],
  },
  {
    title: 'Node.js Extensions',
    description:
      'A VS Code extension pack to streamline the Node.js development experience. Over 25,000 installs on the marketplace.',
    url: 'https://marketplace.visualstudio.com/items?itemName=AJHawkings.nodejs-extensions',
    github: 'https://github.com/ajhawkings/nodejs-extensions',
    tags: ['VS Code', 'TypeScript', 'Node.js'],
  },
  {
    title: 'hawkings.me',
    description:
      'This personal website, built with Astro 5 and deployed to Cloudflare Workers with server-side rendering.',
    url: 'https://hawkings.me',
    github: 'https://github.com/ajhawkings/hawkings.me',
    tags: ['Astro', 'Cloudflare', 'TypeScript'],
  },
  {
    title: 'Squabble',
    description:
      'A quick vanilla HTML/CSS/JS website created for a Young Enterprise project during school.',
    github: 'https://github.com/ajhawkings/squabble',
    tags: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    title: 'Roundel Randomiser',
    description:
      'An application for the Connecting London board game to randomise station selections.',
    github: 'https://github.com/ajhawkings/roundel-randomiser',
    tags: ['JavaScript', 'CSS', 'HTML'],
  },
  {
    title: 'YearInfo',
    description:
      'A school information portal providing timetables, notices, and resources for students. Being open-sourced soon.',
    tags: ['TypeScript', 'React', 'Node.js'],
  },
]
