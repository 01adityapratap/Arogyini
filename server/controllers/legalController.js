import { db } from "../config/db.js";
export const legalController = {
  async getRights(req, res) {
    const { category, search } = req.query;
    let rights = [...db.legalRights];
    if (category && category !== "All") {
      rights = rights.filter(
        (r) => r.category.toLowerCase() === String(category).toLowerCase(),
      );
    }
    if (search) {
      const q = String(search).toLowerCase();
      rights = rights.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.actName.toLowerCase().includes(q) ||
          r.summary.toLowerCase().includes(q),
      );
    }
    return res.json({ legalRights: rights });
  },
  async getRightById(req, res) {
    const { id } = req.params;
    const right = db.legalRights.find((r) => r.id === id);
    if (!right)
      return res
        .status(404)
        .json({ error: "Legal right documentation not found" });
    return res.json({ legalRight: right });
  },
  async generateComplaintDraft(req, res) {
    const {
      complainantName,
      incidentDate,
      location,
      respondentName,
      incidentDescription,
      actCategory,
    } = req.body;
    const draft = `FORMAL COMPLAINT UNDER ${actCategory === "POSH" ? "THE POSH ACT 2013" : "THE PROTECTION OF WOMEN ACT"}

To:
The Presiding Officer / Internal Complaints Committee / Station House Officer
Date: ${new Date().toLocaleDateString("en-GB")}

Subject: Formal Grievance & Request for Immediate Inquiry / Legal Action

Respected Authority,

I, ${complainantName || "[Complainant Name]"}, am submitting this formal complaint regarding incidents of harassment/abuse that occurred on or around ${incidentDate || "[Date]"} at ${location || "[Location/Department]"}.

Details of Respondent:
Name/Designation: ${respondentName || "[Respondent Name & Designation]"}

Statement of Facts & Chronology:
${incidentDescription || "[Detailed description of the incident, including quotes, digital logs, or witnesses present.]"}

Relief / Action Requested:
1. Initiate a prompt, confidential inquiry as mandated under the statutory guidelines.
2. Provide necessary interim protection measures to safeguard the complainant from retaliatory conduct.
3. Keep all proceedings strictly confidential under Section 16 of the POSH Act / Relevant Privacy provisions.

Yours sincerely,
${complainantName || "[Complainant Name]"}
Contact: [Phone / Email]`;
    return res.json({ draft });
  },
};
