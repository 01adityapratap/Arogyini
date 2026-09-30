const API_BASE = "/api";
function getAuthHeader() {
  const token = localStorage.getItem("arogyini_token") || "usr_default_01";
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}
export const api = {
  // Authentication & Profile
  async login(email, password) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error("Login failed");
    return res.json();
  },
  async register(data) {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Registration failed");
    return res.json();
  },
  async getMe() {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: getAuthHeader(),
    });
    if (!res.ok) throw new Error("Failed to fetch profile");
    return res.json();
  },
  async updateProfile(updates) {
    const res = await fetch(`${API_BASE}/auth/profile`, {
      method: "PUT",
      headers: getAuthHeader(),
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error("Failed to update profile");
    return res.json();
  },
  async addEmergencyContact(contact) {
    const res = await fetch(`${API_BASE}/auth/emergency-contacts`, {
      method: "POST",
      headers: getAuthHeader(),
      body: JSON.stringify(contact),
    });
    if (!res.ok) throw new Error("Failed to add contact");
    return res.json();
  },
  async removeEmergencyContact(contactId) {
    const res = await fetch(
      `${API_BASE}/auth/emergency-contacts/${contactId}`,
      {
        method: "DELETE",
        headers: getAuthHeader(),
      },
    );
    if (!res.ok) throw new Error("Failed to remove contact");
    return res.json();
  },
  // Health Care
  async getHealthRecords() {
    const res = await fetch(`${API_BASE}/health/records`, {
      headers: getAuthHeader(),
    });
    if (!res.ok) throw new Error("Failed to fetch health records");
    return res.json();
  },
  async addHealthRecord(record) {
    const res = await fetch(`${API_BASE}/health/records`, {
      method: "POST",
      headers: getAuthHeader(),
      body: JSON.stringify(record),
    });
    if (!res.ok) throw new Error("Failed to save health record");
    return res.json();
  },
  async getCycleSummary() {
    const res = await fetch(`${API_BASE}/health/cycle-summary`, {
      headers: getAuthHeader(),
    });
    if (!res.ok) throw new Error("Failed to fetch cycle summary");
    return res.json();
  },
  async predictHealthRisk(input) {
    const res = await fetch(`${API_BASE}/health/predict`, {
      method: "POST",
      headers: getAuthHeader(),
      body: JSON.stringify(input),
    });
    if (!res.ok) throw new Error("ML Health prediction failed");
    return res.json();
  },
  // Career Opportunities
  async getJobs(params) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/career/jobs?${query}`);
    if (!res.ok) throw new Error("Failed to fetch jobs");
    return res.json();
  },
  async getScholarships() {
    const res = await fetch(`${API_BASE}/career/scholarships`);
    if (!res.ok) throw new Error("Failed to fetch scholarships");
    return res.json();
  },
  async toggleSaveJob(jobId) {
    const res = await fetch(`${API_BASE}/career/jobs/${jobId}/save`, {
      method: "POST",
      headers: getAuthHeader(),
    });
    if (!res.ok) throw new Error("Failed to toggle save");
    return res.json();
  },
  // Safety & Emergency SOS
  async triggerSOS(data) {
    const res = await fetch(`${API_BASE}/sos/trigger`, {
      method: "POST",
      headers: getAuthHeader(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to trigger SOS alert");
    return res.json();
  },
  async getSOSEvents() {
    const res = await fetch(`${API_BASE}/sos/events`, {
      headers: getAuthHeader(),
    });
    if (!res.ok) throw new Error("Failed to fetch SOS logs");
    const data = await res.json();
    return {
      events: data.events || [],
      sosHistory: data.events || [],
    };
  },
  async getSOSHistory() {
    const res = await this.getSOSEvents();
    return { sosHistory: res.events };
  },
  async resolveSOSEvent(id, notes) {
    const res = await fetch(`${API_BASE}/sos/events/${id}/resolve`, {
      method: "PUT",
      headers: getAuthHeader(),
      body: JSON.stringify({ notes, status: "resolved" }),
    });
    if (!res.ok) throw new Error("Failed to resolve SOS");
    return res.json();
  },
  async getSafeZones() {
    const res = await fetch(`${API_BASE}/sos/safe-zones`, {
      headers: getAuthHeader(),
    });
    if (!res.ok) throw new Error("Failed to fetch safe zones");
    return res.json();
  },
  async auditSafetyRoute(lat, lng) {
    const res = await fetch(
      `${API_BASE}/ml/audit-safety?lat=${lat}&lng=${lng}`,
    );
    if (!res.ok) throw new Error("Failed to audit route");
    return res.json();
  },
  // Legal Awareness
  async getLegalRights(params) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/legal/rights?${query}`);
    if (!res.ok) throw new Error("Failed to fetch legal rights");
    return res.json();
  },
  async generateComplaintDraft(data) {
    const res = await fetch(`${API_BASE}/legal/complaint-draft`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to generate draft");
    return res.json();
  },
  // Pluggable RAG Query Endpoint
  async queryRAG(payload) {
    const res = await fetch(`${API_BASE}/rag/query`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("RAG query failed");
    return res.json();
  },
  async getRAGStatus() {
    const res = await fetch(`${API_BASE}/rag/status`);
    if (!res.ok) throw new Error("Failed to fetch RAG status");
    return res.json();
  },
};
