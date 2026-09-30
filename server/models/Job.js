import { db } from "../config/db.js";
export const JobModel = {
  async findAll() {
    return [...db.jobs];
  },
  async findById(id) {
    const job = db.jobs.find((j) => j.id === id);
    return job ? { ...job } : null;
  },
  async create(jobData) {
    const newJob = {
      ...jobData,
      id: `job_${Date.now()}`,
      postedDate: new Date().toISOString().split("T")[0],
    };
    db.jobs.unshift(newJob);
    return newJob;
  },
  async getScholarships() {
    return [...db.scholarships];
  },
};
