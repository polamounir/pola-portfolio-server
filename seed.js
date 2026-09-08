const mongoose = require('mongoose');
require('dotenv').config();

const Project = require('./src/models/project.model');
const Experience = require('./src/models/experience.model');
const Skill = require('./src/models/skill.model');
const Profile = require('./src/models/profile.model');
const NavigationLink = require('./src/models/navigationLink.model');

// Authentic portfolio data from https://pola-mounir.vercel.app/
const profile = {
  name: "Pola Mounir",
  title: "React Frontend Developer",
  shortBio: "Frontend Developer with experience in building responsive and user-friendly web applications using React.js and modern web technologies. Skilled in creating efficient and maintainable code with a focus on performance and accessibility.",
  detailedBio: "Frontend Developer with experience in building responsive and user-friendly web applications using React.js and modern web technologies. Skilled in creating efficient and maintainable code with a focus on performance and accessibility.",
  contact: {
    email: "polamounir103@gmail.com",
    location: "Giza, Egypt",
    phone: ""
  },
  socialLinks: {
    github: "https://github.com/polamounir",
    linkedin: "https://www.linkedin.com/in/pola-mounir-samir/",
    twitter: ""
  }
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
    title: "Fast-Box",
    description: "Fastest and reliable courier service",
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
    order: 1
  },
  {
    title: "Electroo E-commerce",
    description: "A full-featured e-commerce platform for electronic products with user authentication, product catalog, shopping cart, and checkout functionality.",
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
    order: 2
  },
  {
    title: "Medical Prediction System",
    description: "A healthcare application for predicting medical conditions using machine learning algorithms.",
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
    order: 3
  },
  {
    title: "SEF Gold",
    description: "A dynamic course platform with exam systems, CV builders, and user role-based dashboards, improving user engagement and accessibility.",
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
    order: 4
  },
  {
    title: "Weather Application",
    description: "Real-time weather forecast application with location-based weather data and interactive maps.",
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
    order: 5
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
    
    // Seed Profile
    await Profile.create(profile);
    console.log('Profile seeded');

    // Seed Skills
    await Skill.insertMany(skills);
    console.log('Skills seeded');

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
