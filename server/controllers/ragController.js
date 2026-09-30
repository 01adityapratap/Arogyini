import { RAGService } from "../services/ragService.js";
export const ragController = {
  /**
   * Unified RAG Query endpoint
   * POST /api/rag/query
   */
  async query(req, res) {
    try {
      const { question, pillar, userContext } = req.body;
      if (!question || question.trim() === "") {
        return res.status(400).json({ error: "Question is required" });
      }
      const ragResponse = await RAGService.query({
        question,
        pillar: pillar || "general",
        userContext,
      });
      return res.json(ragResponse);
    } catch (err) {
      console.error("[RAGController] Query execution error:", err);
      return res
        .status(500)
        .json({ error: err.message || "RAG Query processing failed" });
    }
  },
  /**
   * Pluggable RAG Status & Diagnostic check
   * GET /api/rag/status
   */
  async getStatus(req, res) {
    const status = await RAGService.checkConnection();
    return res.json({
      serviceName: "Arogyini Pluggable RAG Microservice Interface",
      ...status,
      timestamp: new Date().toISOString(),
    });
  },
};
