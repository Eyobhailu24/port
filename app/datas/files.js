export const navItems = [
  { name: 'About', link: '#about' },
  { name: 'Projects', link: '#projects' },
  { name: 'Testimonials', link: '#testimonials' },
  { name: 'Contact', link: '#contact' },
];

export const gridItems = [
  // Combined About card: profile photo + personal info (left)
  {
    id: 1,
    title: 'About Me',
    description: '',
    className: 'md:col-span-1 md:row-span-2',
    imgClassName: '',
    titleClassName: '',
    spareImg: '',
    avatarSrc: '/finalcv.jpg', // set to your image path to display a real photo
    info: {
      name: 'Eyob Hailu',
      location: 'Addis Ababa, Ethiopia',
      education:
        'Bachelor of Science in Computer Science / Hawassa University',
    },
  },
  // Empty/Bio card (middle)
  {
    id: 2,
    title: 'Bio',
    description:
      'I am a passionate Full Stack Developer with a focus on the MERN (MongoDB, Express.js, React, Node.js) stack. I graduated from Hawassa University, where I built a strong foundation in software development and problem-solving. Over time, I have worked on multiple projects that allowed me to apply both front-end and back-end skills, from designing intuitive user interfaces to developing efficient server-side applications. I enjoy turning ideas into functional, scalable solutions and thrive in collaborative environments where creativity and technology meet.', // write your bio here later
    className: 'md:col-span-1 md:row-span-2',
    imgClassName: '',
    titleClassName: '',
    spareImg: '',
  },
  // Skills on separate card (right)
  {
    id: 3,
    title: 'Skills',
    description: 'Programming proficiency',
    className: 'md:col-span-1 md:row-span-2',
    imgClassName: '',
    titleClassName: '',
    spareImg: '',
    skills: [
      { name: 'React.js', level: 90 },
      { name: 'Next.js', level: 90 },
      { name: 'Hono', level: 89 },
      { name: 'Node.js', level: 89 },
      { name: 'TailWind', level: 85 },
      { name: 'Flutter', level: 78 },
    ],
  },
];

export const projects = [
  {
    id: 1,
    title: 'Flash Delivery',
    des: 'A full-stack food delivery web application that allows users to browse restaurants, place food orders, and track their deliveries in real time. The platform includes separate interfaces for customers, restaurant managers, and delivery drivers, with order management, payment integration, and live order status updates. Tech Stack: React.js, Node.js, Express.js, MongoDB, Socket.io, and Tailwind CSS.',
    img: '/flashde.jpg',
    iconLists: [
      '/re.svg',
      '/tail.svg',
      '/ts.svg',
      '/three.svg',
      '/c.svg',
    ],
    link: 'https://flash-delivery.onrender.com/',
  },
  {
    id: 2,
    title: 'The Wild Oasis Website',
    des: 'The Wild Oasis is a sleek, modern website demo, showcasing luxury cabins and guest areas in a scenic setting. It’s built using Next.js, with authentication handled by NextAuth, providing both immediate performance and robust user flow. The site gives a sense of immersive visuals and smooth UX, suggesting a focus on both aesthetics and function.',
    img: '/wild.jpg',
    iconLists: [
      '/re.svg',
      '/tail.svg',
      '/ts.svg',
      '/three.svg',
      '/fm.svg',
    ],
    link: 'https://the-wild-oasis-website-demo-roan.vercel.app/',
  },
  {
    id: 3,
    title: 'Atomic Blog',
    des: 'The Atomic Blog is a modern, fast, and responsive blogging platform built with React. Leveraging the Context API for clean global-state management, it provides smooth client-side navigation, efficient rendering of content, and a polished UX.',
    img: '/ablog.jpg',
    iconLists: [
      '/next.svg',
      '/tail.svg',
      '/ts.svg',
      '/stream.svg',
      '/c.svg',
    ],
    link: 'https://atomic-blog-peach-seven.vercel.app/',
  },
];

export const testimonials = [
  {
    quote:
      "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
    name: 'Michael Johnson',
    title: 'Director of AlphaStream Technologies',
  },
  {
    quote:
      "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
    name: 'Michael Johnson',
    title: 'Director of AlphaStream Technologies',
  },
  {
    quote:
      "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
    name: 'Michael Johnson',
    title: 'Director of AlphaStream Technologies',
  },
  {
    quote:
      "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
    name: 'Michael Johnson',
    title: 'Director of AlphaStream Technologies',
  },
  {
    quote:
      "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
    name: 'Michael Johnson',
    title: 'Director of AlphaStream Technologies',
  },
];

export const companies = [
  {
    id: 1,
    name: 'cloudinary',
    img: '/cloud.svg',
    nameImg: '/cloudName.svg',
  },
  {
    id: 2,
    name: 'appwrite',
    img: '/app.svg',
    nameImg: '/appName.svg',
  },
  {
    id: 3,
    name: 'HOSTINGER',
    img: '/host.svg',
    nameImg: '/hostName.svg',
  },
  {
    id: 4,
    name: 'stream',
    img: '/s.svg',
    nameImg: '/streamName.svg',
  },
  {
    id: 5,
    name: 'docker.',
    img: '/dock.svg',
    nameImg: '/dockerName.svg',
  },
];

export const workExperience = [
  {
    id: 1,
    title: 'Mid-Level Developer at Abugida Robotics',
    desc: 'I worked on a project where I connected an Arduino device to a Flutter mobile application via Bluetooth using an Bluetooth module and the flutter bluetooth serial package. I programmed the Arduino to collect temperature sensor data and control a fan and heater, sending their statuses to the app in real time. On the Flutter side, I designed a responsive UI that displayed the average, minimum, and maximum temperature values, along with the fan and heater status.',
    className: 'md:col-span-4',
    thumbnail:
      'https://z-p3-scontent.fadd1-1.fna.fbcdn.net/v/t39.30808-6/301818547_460967342709720_6339210392331087449_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=haaUWV1GCDgQ7kNvwE2OgQH&_nc_oc=AdkTaJ3Yr3yDw8dN2xR1iHWRunV7_RFzOOZbi32BarFpadD9j3oADL9TRK8UeehoptU&_nc_zt=23&_nc_ht=z-p3-scontent.fadd1-1.fna&_nc_gid=blYhXGjPCGVBKyWGAI_Njw&oh=00_AflUk2WbFcVCtPL9HayO9bXu1L1gYNojeU8WH-5y7t8F8g&oe=69345CBC',
  },
  {
    id: 2,
    title: 'Full Stack Developer at Muyalogy',
    desc: 'I am contributing to the development of a comprehensive HR system using Next.js and Shadcn for the frontend and Hono for the backend API. And also incorporating various services like Drizzle ORM for efficient database management.',
    className: 'md:col-span-4',
    thumbnail:
      'https://z-p3-scontent.fadd1-1.fna.fbcdn.net/v/t39.30808-6/301818547_460967342709720_6339210392331087449_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=haaUWV1GCDgQ7kNvwE2OgQH&_nc_oc=AdkTaJ3Yr3yDw8dN2xR1iHWRunV7_RFzOOZbi32BarFpadD9j3oADL9TRK8UeehoptU&_nc_zt=23&_nc_ht=z-p3-scontent.fadd1-1.fna&_nc_gid=blYhXGjPCGVBKyWGAI_Njw&oh=00_AflUk2WbFcVCtPL9HayO9bXu1L1gYNojeU8WH-5y7t8F8g&oe=69345CBC',
  },
  {
    id: 3,
    title: 'Full Stack Developer at A and B consultancy',
    desc: 'i am developing a B2B (buyer to buyer) platform using Django for backend and Next.js for frontend.',
    className: 'md:col-span-4',
    thumbnail:
      'https://z-p3-scontent.fadd1-1.fna.fbcdn.net/v/t39.30808-6/301818547_460967342709720_6339210392331087449_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=haaUWV1GCDgQ7kNvwE2OgQH&_nc_oc=AdkTaJ3Yr3yDw8dN2xR1iHWRunV7_RFzOOZbi32BarFpadD9j3oADL9TRK8UeehoptU&_nc_zt=23&_nc_ht=z-p3-scontent.fadd1-1.fna&_nc_gid=blYhXGjPCGVBKyWGAI_Njw&oh=00_AflUk2WbFcVCtPL9HayO9bXu1L1gYNojeU8WH-5y7t8F8g&oe=69345CBC',
  },
];

export const socialMedia = [
  {
    id: 1,
    img: '/git.svg',
  },
  {
    id: 2,
    img: '/twit.svg',
  },
  {
    id: 3,
    img: '/link.svg',
  },
];
