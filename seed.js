const mongoose = require('mongoose');
require('dotenv').config();

const Project = require('./src/models/project.model');
const Experience = require('./src/models/experience.model');
const Skill = require('./src/models/skill.model');
const Profile = require('./src/models/profile.model');
const NavigationLink = require('./src/models/navigationLink.model');
const Faq = require('./src/models/faq.model');
const Certification = require('./src/models/certification.model');
const Tool = require('./src/models/tool.model');

// Authentic portfolio profile data
const profile = {
  name: "Pola Mounir",
  title: "React Frontend Developer",
  headline: "Pola Mounir is a React Frontend Developer based in Giza, Egypt, specializing in responsive web applications, component-driven architecture, and high-performance user interfaces using React.js, TypeScript, and Tailwind CSS.",
  shortBio: "Frontend Developer with experience in building responsive and user-friendly web applications using React.js and modern web technologies. Skilled in creating efficient and maintainable code with a focus on performance and accessibility.",
  detailedBio: "Frontend Developer with experience in building responsive and user-friendly web applications using React.js and modern web technologies. Skilled in creating efficient and maintainable code with a focus on performance and accessibility.",
  yearsOfExperience: "1+",
  linesOfCode: "40K+",
  aboutParagraphs: [
    "Pola Mounir is a React Frontend Developer based in Giza, Egypt. He specializes in designing and implementing high-performance, responsive web applications utilizing React.js, TypeScript, JavaScript, and Tailwind CSS.",
    "With a strong focus on modular component design, state management with Redux Toolkit, and accessible user interfaces, Pola crafts maintainable software tailored for real-world production environments.",
    "Explore his work across multiple live projects, including e-commerce platforms, shipment tracking dashboards, medical prediction applications, and educational platforms."
  ],
  contact: {
    email: "polamounir103@gmail.com",
    location: "Giza, Egypt",
    phone: ""
  },
  socialLinks: {
    github: "https://github.com/polamounir",
    linkedin: "https://www.linkedin.com/in/pola-mounir-samir/",
    twitter: ""
  },
  resumeUrl: "/Pola_Mounir_Resume.pdf"
};

const skills = [
  { name: "HTML5", level: 95, category: "Frontend", order: 1 },
  { name: "CSS3", level: 90, category: "Frontend", order: 2 },
  { name: "Tailwind CSS", level: 90, category: "Frontend", order: 3 },
  { name: "JavaScript", level: 95, category: "Frontend", order: 4 },
  { name: "TypeScript", level: 85, category: "Frontend", order: 5 },
  { name: "React.js", level: 95, category: "Frontend", order: 6 },
  { name: "Redux Toolkit", level: 85, category: "Frontend", order: 7 },
  { name: "Node.js", level: 75, category: "Backend/DB", order: 8 },
  { name: "Express.js", level: 75, category: "Backend/DB", order: 9 },
  { name: "MongoDB", level: 70, category: "Backend/DB", order: 10 },
  { name: "Bootstrap", level: 80, category: "Frontend", order: 11 }
];

const certifications = [
  { name: "React.JS internship", year: "2023", order: 1 },
  { name: "Frontend using React.JS", year: "2024", order: 2 },
  { name: "Backend using Node.JS", year: "2024", order: 3 }
];

const tools = [
  { name: "VS Code", order: 1 },
  { name: "Git", order: 2 },
  { name: "Postman", order: 3 },
  { name: "Figma", order: 4 },
  { name: "Terminal", order: 5 }
];

const faqs = [
  {
    question: "What does Pola Mounir specialize in?",
    answer: "Pola Mounir specializes in frontend web development with React.js, TypeScript, JavaScript, and Tailwind CSS, building responsive, accessible, and performant web applications.",
    order: 1
  },
  {
    question: "Where is Pola Mounir based?",
    answer: "Pola Mounir is based in Giza, Egypt, and is available for remote frontend engineering roles, contract projects, and freelance collaboration.",
    order: 2
  },
  {
    question: "What core technologies are in Pola Mounir's stack?",
    answer: "The core stack includes React.js, TypeScript, JavaScript, Tailwind CSS, Redux Toolkit, REST APIs, and Node.js.",
    order: 3
  },
  {
    question: "Where can I see Pola Mounir's projects?",
    answer: "Featured projects include Fast-Box (courier tracking), Electroo (e-commerce), Medical Predictions (healthcare ML), SEF Gold (course platform), and a real-time Weather Application, all accessible on this portfolio and GitHub.",
    order: 4
  },
  {
    question: "How can I contact Pola Mounir for collaboration or hire?",
    answer: "You can reach Pola Mounir via email at polamounir103@gmail.com, GitHub at github.com/polamounir, or LinkedIn at linkedin.com/in/pola-mounir-samir/.",
    order: 5
  }
];

const experience = [
  { 
    type: "Experience",
    title: "Frontend Developer", 
    organization: "Freelance", 
    startDate: new Date("2023-01-01"), 
    current: true, 
    description: "• Developed responsive web applications using React.js, TypeScript, and modern frontend technologies.\n• Implemented user interfaces following design specifications and best practices.\n• Created reusable components and maintained clean, efficient code.",
    order: 1
  }
];

const projects = [
  {
    slug: "fast-box",
    title: "Fast-Box",
    description: "Fastest and reliable courier service with real-time shipment tracking, route visualization, and responsive customer interface.",
    fullDescription: "Fastest and reliable courier service with real-time shipment tracking, route visualization, and responsive customer interface.",
    technologies: ["React.js", "React Router", "JavaScript", "Tailwind CSS"],
    links: {
      github: "https://github.com/polamounir/Fast-box",
      liveDemo: "https://fast-box-shipment.vercel.app/"
    },
    images: {
      thumbnail: "https://res.cloudinary.com/lsqotite/image/upload/v1788627553/portfolio/projects/p11_wr8v13.png",
      gallery: []
    },
    status: "Active Dev",
    lines: "1,000+",
    iconEmoji: "🚚",
    datePublished: "2024-05-15",
    dateModified: "2026-06-15",
    order: 1
  },
  {
    slug: "electroo",
    title: "Electroo E-commerce",
    description: "A full-featured e-commerce platform for electronic products with user authentication, product catalog, shopping cart, and checkout functionality.",
    fullDescription: "A full-featured e-commerce platform for electronic products with user authentication, product catalog, shopping cart, and checkout functionality.",
    technologies: ["React.js", "JavaScript", "Tailwind CSS", "Redux Toolkit", "Axios", "React Query", "Charts.js"],
    links: {
      github: "https://github.com/polamounir/electroo",
      liveDemo: "https://electroo.vercel.app/"
    },
    images: {
      thumbnail: "https://res.cloudinary.com/lsqotite/image/upload/v1788627554/portfolio/projects/p21_vbqcxj.png",
      gallery: []
    },
    status: "Production",
    lines: "15,000+",
    iconEmoji: "🛒",
    datePublished: "2024-08-10",
    dateModified: "2026-07-20",
    order: 2
  },
  {
    slug: "medical-predictions",
    title: "Medical Prediction System",
    description: "A healthcare application for predicting medical conditions using machine learning algorithms and interactive medical data forms.",
    fullDescription: "A healthcare application for predicting medical conditions using machine learning algorithms and interactive medical data forms.",
    technologies: ["React.js", "JavaScript", "Tailwind CSS", "AI Integration"],
    links: {
      github: "https://github.com/polamounir/medical-predictions",
      liveDemo: "https://medical-prediction.vercel.app/"
    },
    images: {
      thumbnail: "https://res.cloudinary.com/lsqotite/image/upload/v1788627555/portfolio/projects/p31_qzn4kp.png",
      gallery: []
    },
    status: "Beta",
    lines: "8,000+",
    iconEmoji: "🧠",
    datePublished: "2024-11-05",
    dateModified: "2025-09-12",
    order: 3
  },
  {
    slug: "sef-gold",
    title: "SEF Gold",
    description: "A dynamic course platform with exam systems, CV builders, and user role-based dashboards, improving user engagement and accessibility.",
    fullDescription: "A dynamic course platform with exam systems, CV builders, and user role-based dashboards, improving user engagement and accessibility.",
    technologies: ["React.js", "JavaScript", "Bootstrap", "Redux Toolkit"],
    links: {
      github: "https://github.com/polamounir/SEF",
      liveDemo: "https://sef-gold.vercel.app/"
    },
    images: {
      thumbnail: "https://res.cloudinary.com/lsqotite/image/upload/v1788627557/portfolio/projects/p41_bbh3go.png",
      gallery: []
    },
    status: "Production",
    lines: "12,000+",
    iconEmoji: "🎓",
    datePublished: "2024-03-20",
    dateModified: "2025-06-18",
    order: 4
  },
  {
    slug: "weather-app",
    title: "Weather Application",
    description: "Real-time weather forecast application with location-based weather data, dynamic meteorological conditions, and interactive maps.",
    fullDescription: "Real-time weather forecast application with location-based weather data, dynamic meteorological conditions, and interactive maps.",
    technologies: ["React.js", "JavaScript", "Tailwind CSS", "Weather API", "Geolocation"],
    links: {
      github: "https://github.com/polamounir/Weather-app",
      liveDemo: "https://weather-app-eight-kappa-91.vercel.app/"
    },
    images: {
      thumbnail: "https://res.cloudinary.com/lsqotite/image/upload/v1788627558/portfolio/projects/p51_rviq6s.png",
      gallery: []
    },
    status: "Production",
    lines: "5,000+",
    iconEmoji: "🌦️",
    datePublished: "2023-11-10",
    dateModified: "2024-10-05",
    order: 5
  },
  {
    slug: "khelzam-exam-management-system",
    title: "Khelzam Exam Management System",
    description: "Comprehensive exam platform with 3 standalone components (Student App, Admin Dashboard, REST API), real-time tab-switch integrity tracking, and device fingerprinting.",
    fullDescription: "Built a comprehensive platform with 3 standalone components: a Student App, Admin Dashboard, and a REST API using React 19, Node.js, and MongoDB.\n\nKey Highlights:\n• Engineered a real-time integrity monitoring service that logs tab-switches and prevents duplicate attempts via device fingerprinting, ensuring 100% exam validity.\n• Implemented secure JWT authentication with role-based permissions, protecting sensitive exam data and administrative management features.\n• Reduced application load time by 40% through dynamic code splitting, lazy loading, and implementing Gzip compression on the backend.",
    technologies: ["React 19", "Node.js", "MongoDB", "Express.js", "JWT", "Tailwind CSS"],
    links: {
      github: "https://github.com/polamounir",
      liveDemo: ""
    },
    images: {
      thumbnail: "https://res.cloudinary.com/lsqotite/image/upload/v1788627557/portfolio/projects/p41_bbh3go.png",
      gallery: []
    },
    status: "Production",
    lines: "10,000+",
    iconEmoji: "📝",
    datePublished: "2025-01-10",
    dateModified: "2026-02-15",
    order: 6
  },
  {
    slug: "3arfny",
    title: "3arfny",
    description: "Full-stack anonymous messaging platform built with Next.js 16, React 19, and Supabase with custom OTP authentication, cursor pagination, and Arabic RTL PWA.",
    fullDescription: "Developed 3arfny, a full-stack anonymous messaging platform using Next.js 16, React 19, and Supabase, achieving a 40% improvement in initial load times compared to traditional SPAs.\n\nKey Highlights:\n• Engineered a custom OTP authentication system and server-side rate limiter in Next.js Middleware to prevent spam and ensure secure, passwordless user access.\n• Implemented a high-performance messaging dashboard with cursor-based pagination and optimistic UI updates, handling real-time data synchronization with Supabase.\n• Integrated PWA capabilities and Web Push Notifications using Serwist, increasing user retention through native-like offline support and real-time alerts.\n• Designed a premium, responsive UI with Tailwind CSS v4 and Framer Motion, focusing on right-to-left (RTL) support for Arabic-speaking users.\n• Automated deployment pipelines on Vercel, utilizing environment-specific configurations for seamless scaling on free-tier infrastructure.",
    technologies: ["Next.js 16", "React 19", "Supabase", "Tailwind CSS v4", "Framer Motion", "Serwist PWA", "TypeScript"],
    links: {
      github: "https://github.com/polamounir",
      liveDemo: ""
    },
    images: {
      thumbnail: "https://res.cloudinary.com/lsqotite/image/upload/v1788627554/portfolio/projects/p21_vbqcxj.png",
      gallery: []
    },
    status: "Production",
    lines: "14,000+",
    iconEmoji: "💬",
    datePublished: "2025-03-01",
    dateModified: "2026-03-10",
    order: 7
  }
];

const navLinks = [
  { name: "Home", path: "#home", icon: "home", order: 1 },
  { name: "Skills", path: "#skills", icon: "lightbulb", order: 2 },
  { name: "Projects", path: "#projects", icon: "folder", order: 3 },
  { name: "Experience", path: "#experience", icon: "briefcase", order: 4 },
  { name: "Contact", path: "#contact", icon: "mail", order: 5 }
];

async function seed() {
  try {
    const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
    await mongoose.connect(mongoUri, { dbName: process.env.DB_NAME || "portfolio" });
    console.log('Connected to MongoDB');

    // Clear old data
    await Profile.deleteMany({});
    await Skill.deleteMany({});
    await Experience.deleteMany({});
    await Project.deleteMany({});
    await NavigationLink.deleteMany({});
    await Faq.deleteMany({});
    await Certification.deleteMany({});
    await Tool.deleteMany({});
    
    // Seed Profile
    await Profile.create(profile);
    console.log('Profile seeded');

    // Seed Skills
    await Skill.insertMany(skills);
    console.log('Skills seeded');

    // Seed Certifications
    await Certification.insertMany(certifications);
    console.log('Certifications seeded');

    // Seed Tools
    await Tool.insertMany(tools);
    console.log('Daily Tools seeded');

    // Seed FAQs
    await Faq.insertMany(faqs);
    console.log('FAQs seeded');

    // Seed Experience
    await Experience.insertMany(experience);
    console.log('Experience seeded');

    // Seed Projects
    await Project.insertMany(projects);
    console.log('Projects seeded');

    // Seed Navigation Links
    await NavigationLink.insertMany(navLinks);
    console.log('Navigation links seeded');

    console.log('Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seed();
