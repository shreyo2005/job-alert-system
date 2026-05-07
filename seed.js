const mongoose = require("mongoose");
const Job = require("./src/models/job");


const MONGO_URI = "mongodb+srv://admin:5.q_9BrEWEV9ZTX@cluster0.hr7fx.mongodb.net/job-alert?retryWrites=true&w=majority";



const jobs = [

  {
    name: "Backend Developer",
    company: "Amazon",
    skillsrequired: ["node", "mongodb", "redis"],
    description: "Build scalable backend APIs and optimize database performance.",
    location: "Bangalore",
    requiredExperience: 2,
    salary: 1500000,
    education: "BTech"
  },

  {
    name: "Frontend Developer",
    company: "Google",
    skillsrequired: ["react", "javascript", "css"],
    description: "Develop responsive UI and improve user experience.",
    location: "Hyderabad",
    requiredExperience: 1,
    salary: 1200000,
    education: "BTech"
  },

  {
    name: "Full Stack Developer",
    company: "Microsoft",
    skillsrequired: ["node", "react", "mongodb"],
    description: "Work across frontend and backend systems.",
    location: "Bangalore",
    requiredExperience: 3,
    salary: 1800000,
    education: "BTech"
  },

  {
    name: "DevOps Engineer",
    company: "Spotify",
    skillsrequired: ["docker", "kubernetes", "aws"],
    description: "Manage CI/CD pipelines and cloud infrastructure.",
    location: "Pune",
    requiredExperience: 2,
    salary: 1700000,
    education: "BTech"
  },

  {
    name: "Data Engineer",
    company: "Netflix",
    skillsrequired: ["python", "sql", "etl"],
    description: "Build and maintain large-scale data pipelines.",
    location: "Remote",
    requiredExperience: 3,
    salary: 2200000,
    education: "MTech"
  },

  {
    name: "ML Engineer",
    company: "OpenAI",
    skillsrequired: ["python", "machine learning", "tensorflow"],
    description: "Develop machine learning models and systems.",
    location: "Remote",
    requiredExperience: 4,
    salary: 3000000,
    education: "MTech"
  },

  {
    name: "Cloud Engineer",
    company: "AWS",
    skillsrequired: ["aws", "docker", "linux"],
    description: "Manage and deploy cloud infrastructure.",
    location: "Chennai",
    requiredExperience: 2,
    salary: 1600000,
    education: "BTech"
  },

  {
    name: "QA Engineer",
    company: "Adobe",
    skillsrequired: ["testing", "automation", "selenium"],
    description: "Ensure software quality through testing.",
    location: "Noida",
    requiredExperience: 1,
    salary: 1000000,
    education: "BTech"
  }

];

const seedData = async () => {

  try {

    await mongoose.connect(MONGO_URI);

    console.log("MongoDB connected for seeding");

    await Job.deleteMany();

    console.log("Old jobs removed");

    await Job.insertMany(jobs);

    console.log("New jobs inserted");

    process.exit();

  } catch (error) {

    console.error("Seeding error:", error);

    process.exit(1);
  }
};

seedData();