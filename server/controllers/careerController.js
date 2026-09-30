import { JobModel } from "../models/Job.js";
import { UserModel } from "../models/User.js";
export const careerController = {
  async getJobs(req, res) {
    const { category, type, search } = req.query;
    let jobs = await JobModel.findAll();
    if (category && category !== "All") {
      jobs = jobs.filter(
        (j) => j.category.toLowerCase() === String(category).toLowerCase(),
      );
    }
    if (type && type !== "All") {
      jobs = jobs.filter(
        (j) => j.type.toLowerCase() === String(type).toLowerCase(),
      );
    }
    if (search) {
      const q = String(search).toLowerCase();
      jobs = jobs.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.company.toLowerCase().includes(q) ||
          j.description.toLowerCase().includes(q),
      );
    }
    return res.json({ jobs, total: jobs.length });
  },
  async getJobById(req, res) {
    const { id } = req.params;
    const job = await JobModel.findById(id);
    if (!job) return res.status(404).json({ error: "Job not found" });
    return res.json({ job });
  },
  async getScholarships(req, res) {
    const scholarships = await JobModel.getScholarships();
    return res.json({ scholarships });
  },
  async toggleSaveJob(req, res) {
    const userId = req.user?.id || "usr_default_01";
    const { jobId } = req.params;
    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    let saved = user.savedJobs || [];
    if (saved.includes(jobId)) {
      saved = saved.filter((id) => id !== jobId);
    } else {
      saved.push(jobId);
    }
    await UserModel.update(userId, { savedJobs: saved });
    return res.json({ savedJobs: saved, isSaved: saved.includes(jobId) });
  },
  async applyJob(req, res) {
    const { jobId, coverLetter, resumeUrl } = req.body;
    return res.json({
      success: true,
      message:
        "Application submitted successfully to employer recruitment portal.",
      applicationId: `app_${Date.now()}`,
      jobId,
    });
  },
};
