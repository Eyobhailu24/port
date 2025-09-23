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
    avatarSrc: '', // set to your image path to display a real photo
    info: {
      name: 'Eyob Hailu',
      location: 'Addis Ababa, Ethiopia',
      education: 'Bachelor Degree / Hawassa University',
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
      { name: 'JavaScript', level: 87 },
      { name: 'React.js', level: 84 },
      { name: 'Node.js', level: 83 },
      { name: 'HTML / CSS / Tailwind', level: 80 },
      { name: 'Next.js', level: 75 },
      { name: 'Flutter', level: 63 },
    ],
  },
];

export const projects = [
  {
    id: 1,
    title: 'The Wild Oasis Website',
    des: 'Wild Oasis Cabin Booking offers a seamless way to find and reserve cozy cabins surrounded by nature. Explore stunning locations, check availability, and book your perfect getaway with ease.',
    img: '/wild project.png',
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
    id: 2,
    title: 'Smart Parking System',
    des: 'Smart Parking System simplifies urban parking by helping users find available spots in real-time. Reserve, navigate, and manage parking effortlessly, saving time and reducing stress.',
    img: '/p2.svg',
    iconLists: [
      '/next.svg',
      '/tail.svg',
      '/ts.svg',
      '/stream.svg',
      '/c.svg',
    ],
    link: '',
  },
  {
    id: 3,
    title: 'Flash Delivery',
    des: 'Flash Food Delivery brings your favorite meals to your doorstep quickly and reliably. Browse local restaurants, place orders in seconds, and enjoy fast, contactless delivery.',
    img: '/p3.svg',
    iconLists: [
      '/re.svg',
      '/tail.svg',
      '/ts.svg',
      '/three.svg',
      '/c.svg',
    ],
    link: '',
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
    title: 'Frontend Engineer Intern',
    desc: 'Assisted in the development of a web-based platform using React.js, enhancing interactivity.',
    className: 'md:col-span-2',
    thumbnail: '/exp1.svg',
  },
  {
    id: 2,
    title: 'Mobile App Dev - JSM Tech',
    desc: 'Designed and developed mobile app for both iOS & Android platforms using React Native.',
    className: 'md:col-span-2', // change to md:col-span-2
    thumbnail: '/exp2.svg',
  },
  {
    id: 3,
    title: 'Freelance App Dev Project',
    desc: 'Led the dev of a mobile app for a client, from initial concept to deployment on app stores.',
    className: 'md:col-span-2', // change to md:col-span-2
    thumbnail: '/exp3.svg',
  },
  {
    id: 4,
    title: 'Lead Frontend Developer',
    desc: 'Developed and maintained user-facing features using modern frontend technologies.',
    className: 'md:col-span-2',
    thumbnail: '/exp4.svg',
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
