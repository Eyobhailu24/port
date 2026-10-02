// Single source of truth for every real fact on the site.
// Replaces the old app/datas/files.js, app/datas/data.js, and root data/index.js.

export const profile = {
  name: 'Eyob Hailu',
  role: 'Full-Stack Developer',
  location: 'Missouri, United States',
  education:
    'Currently enrolled at Lincoln University (Missouri); B.Sc. in Computer Science, Hawassa University',
  avatar: '/finalcv.jpg',
  resumeUrl: '/eyob-hailu-cv.pdf',
  email: 'eyobhailu246@gmail.com',
  phone: '+15736165023',
  github: 'https://github.com/Eyobhailu24',
  linkedin:
    'https://www.linkedin.com/in/eyob-hailu-58b240202/',
  responseTime: 'Usually within 24 hours',
  bio: "I'm a passionate full-stack developer focused on the MERN stack (MongoDB, Express.js, React, and Node.js). After graduating from Hawassa University with a strong foundation in software development and problem-solving, I've worked across multiple projects — from designing intuitive user interfaces to building efficient, scalable server-side systems. I'm currently enrolled at Lincoln University in Missouri, continuing my education alongside my development work. I enjoy turning ideas into functional products and thrive in collaborative environments where creativity and technology meet.",
} as const;

export const highlights = [
  { value: '10+', label: 'Projects Delivered' },
  { value: '3', label: 'Companies Worked With' },
] as const;

export const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Education', href: '#education' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
] as const;

export type EducationItem = {
  institution: string;
  degree?: string;
  status: 'Currently enrolled' | 'Completed';
  period?: string;
};

export const education: EducationItem[] = [
  {
    institution: 'Lincoln University (Missouri)',
    status: 'Currently enrolled',
    // Enrollment confirmed by Eyob; program and dates have not been provided.
  },
  {
    degree: 'B.Sc. in Computer Science',
    institution: 'Hawassa University',
    status: 'Completed',
  },
];

export const skills = [
  { name: 'React.js', level: 90 },
  { name: 'Next.js', level: 90 },
  { name: 'Node.js', level: 89 },
  { name: 'Hono', level: 89 },
  { name: 'Tailwind CSS', level: 85 },
  { name: 'Flutter', level: 78 },
  { name: 'Express.js' },
  { name: 'MongoDB' },
  { name: 'Drizzle ORM' },
  { name: 'Socket.io' },
  { name: 'Django' },
  { name: 'REST APIs' },
  { name: 'NextAuth' },
  { name: 'Context API' },
  { name: 'React Native' },
  { name: 'Python' },
  { name: 'FastAPI' },
  { name: 'shadcn/ui' },
  { name: 'Dokploy' },
  { name: 'Coolify' },
  { name: 'AWS S3' },
  { name: 'AWS Lambda' },
  { name: 'OAuth' },
] as const;

export const services = [
  {
    title: 'Frontend Engineering',
    description:
      'Building responsive, accessible interfaces with React and Next.js.',
  },
  {
    title: 'Backend Development',
    description:
      'Designing efficient APIs and server-side logic with Node.js and Hono.',
  },
  {
    title: 'Mobile Development',
    description:
      'Building cross-platform mobile apps with Flutter.',
  },
  {
    title: 'UI Engineering',
    description:
      'Crafting clean, responsive layouts and design systems with Tailwind CSS.',
  },
  {
    title: 'Database & ORM',
    description:
      'Modeling and managing data with MongoDB and Drizzle ORM.',
  },
  {
    title: 'Realtime & APIs',
    description:
      'Building real-time features and integrations with Socket.io and REST APIs.',
  },
] as const;

export type Project = {
  id: number;
  title: string;
  description: string;
  stack: string[];
  img?: string;
  link: string;
};

export const projects: Project[] = [
  {
    id: 1,
    title: 'Yehager Bahil Libs',
    description:
      'An online storefront for Ethiopian traditional clothing, bringing regional collections together in one shopping experience. Customers can explore styles, submit custom designs, and organize group orders, with tailored garments and worldwide shipping.',
    stack: [],
    img: '/image.png',
    link: 'https://yehagerbahillibs.com/',
  },
  {
    id: 2,
    title: 'The Wild Oasis',
    description:
      'A modern, visually immersive demo site for a luxury cabin retreat, built with Next.js and authenticated via NextAuth. Focused on fast performance and a smooth, polished user experience.',
    stack: ['Next.js', 'React', 'NextAuth'],
    img: '/wild.jpg',
    link: 'https://the-wild-oasis-website-demo-roan.vercel.app/',
  },
  {
    id: 3,
    title: 'Atomic Blog',
    description:
      'A fast, responsive blogging platform built with React, using the Context API for clean global state management, smooth client-side navigation, and efficient content rendering.',
    stack: ['React', 'Context API'],
    img: '/ablog.jpg',
    link: 'https://atomic-blog-peach-seven.vercel.app/',
  },
];

export type ExperienceItem = {
  id: number;
  role: string;
  company: string;
  description: string;
};

export const experience: ExperienceItem[] = [
  {
    id: 1,
    role: 'Mid-Level Developer',
    company: 'Abugida Robotics',
    description:
      'Connected an Arduino device to a Flutter mobile app over Bluetooth, using a Bluetooth module and the flutter_bluetooth_serial package. Programmed the Arduino to collect temperature sensor data and control a fan and heater, streaming their status to the app in real time. On the Flutter side, built a responsive UI showing average, minimum, and maximum temperature alongside live fan and heater status.',
  },
  {
    id: 2,
    role: 'Full-Stack Developer',
    company: 'Muyalogy',
    description:
      'Contributing to a comprehensive HR system, using Next.js and shadcn/ui for the frontend and Hono for the backend API, with Drizzle ORM for efficient database management.',
  },
  {
    id: 3,
    role: 'Full-Stack Developer',
    company: 'A and B Consultancy',
    description:
      'Developing a B2B (business-to-business) platform, using Django for the backend and Next.js for the frontend.',
  },
];

export type Tool = {
  id: number;
  name: string;
  logo?: string;
  wordmark?: string;
};

export const tools: Tool[] = [
  {
    id: 1,
    name: 'Cloudinary',
    logo: '/cloud.svg',
    wordmark: '/cloudName.svg',
  },
  {
    id: 2,
    name: 'Appwrite',
    logo: '/app.svg',
    wordmark: '/appName.svg',
  },
  {
    id: 3,
    name: 'Hostinger',
    logo: '/host.svg',
    wordmark: '/hostName.svg',
  },
  {
    id: 4,
    name: 'Stream',
    logo: '/s.svg',
    wordmark: '/streamName.svg',
  },
  {
    id: 5,
    name: 'Docker',
    logo: '/dock.svg',
    wordmark: '/dockerName.svg',
  },
  { id: 6, name: 'Dokploy' },
  { id: 7, name: 'Coolify' },
  { id: 8, name: 'AWS S3' },
  { id: 9, name: 'AWS Lambda' },
  { id: 10, name: 'Stripe' },
];
