const mongoose = require("mongoose");
const Job = require("./src/models/job");


const MONGO_URI = "mongodb+srv://admin:5.q_9BrEWEV9ZTX@cluster0.hr7fx.mongodb.net/job-alert?retryWrites=true&w=majority";

const jobs = [
  {
    name: "Backend Developer",
    company: "Amazon",
    skillsrequired: ["node", "mongodb", "redis"],
    description: "Build scalable backend APIs and optimize database performance."
  },
  {
    name: "Frontend Developer",
    company: "Google",
    skillsrequired: ["react", "javascript", "css"],
    description: "Develop responsive UI and improve user experience."
  },
  {
    name: "Full Stack Developer",
    company: "Microsoft",
    skillsrequired: ["node", "react", "mongodb"],
    description: "Work across frontend and backend systems."
  },
  {
    name: "DevOps Engineer",
    company: "Spotify",
    skillsrequired: ["docker", "kubernetes", "aws"],
    description: "Manage CI/CD pipelines and cloud infrastructure."
  },
  {
    name: "Data Engineer",
    company: "Netflix",
    skillsrequired: ["python", "sql", "etl"],
    description: "Build and maintain large-scale data pipelines."
  },
  {
    name: "ML Engineer",
    company: "OpenAI",
    skillsrequired: ["python", "machine learning", "tensorflow"],
    description: "Develop machine learning models and systems."
  },
  {
    name: "Backend Engineer",
    company: "Uber",
    skillsrequired: ["node", "express", "postgresql"],
    description: "Develop scalable backend services."
  },
  {
    name: "Software Engineer",
    company: "Facebook",
    skillsrequired: ["c++", "algorithms", "system design"],
    description: "Build high-performance applications."
  },
  {
    name: "Cloud Engineer",
    company: "AWS",
    skillsrequired: ["aws", "docker", "linux"],
    description: "Manage and deploy cloud infrastructure."
  },
  {
    name: "QA Engineer",
    company: "Adobe",
    skillsrequired: ["testing", "automation", "selenium"],
    description: "Ensure software quality through testing."
  },
  {
    name: "Mobile Developer",
    company: "Apple",
    skillsrequired: ["swift", "ios"],
    description: "Develop mobile applications for iOS."
  },
  {
    name: "Android Developer",
    company: "Samsung",
    skillsrequired: ["kotlin", "android"],
    description: "Build Android mobile applications."
  }
];

const seedData = async () => {
  try {
    await mongoose.connect("mongodb+srv://admin:5.q_9BrEWEV9ZTX@cluster0.hr7fx.mongodb.net/job-alert?retryWrites=true&w=majority");
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