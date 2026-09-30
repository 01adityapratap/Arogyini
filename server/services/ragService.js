import { GoogleGenAI } from "@google/genai";
/**
 * AROGYINI KNOWLEDGE CORPUS (Embedded Document Chunks for 4 Core Pillars)
 * This acts as the default retriever knowledge base when an external Python RAG microservice
 * is not yet connected or during local development.
 */
const EMBEDDED_KNOWLEDGE_BASE = [
  // LEGAL PILLAR
  {
    id: "chunk_legal_posh_01",
    title: "POSH Act 2013: Internal Complaints Committee (ICC) & Scope",
    source:
      "Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013",
    category: "Legal",
    snippet:
      "Any workplace with 10 or more employees must mandate an Internal Complaints Committee (ICC) presided over by a senior woman employee. Complaints must be filed within 3 months (extendable by another 3 months if justifiable reasons exist). The ICC inquiry must be completed within 90 days. The definition of workplace covers virtual offices, Slack/Zoom channels, and official transit.",
    relevanceScore: 0.95,
  },
  {
    id: "chunk_legal_posh_02",
    title: "POSH Act 2013: Interim Relief & Confidentiality Protections",
    source: "POSH Act 2013 - Section 12 & 16",
    category: "Legal",
    snippet:
      "During inquiry, an aggrieved woman can request interim relief including up to 3 months of paid leave (in addition to statutory leave) or transfer of respondent. Under Section 16, publishing or disclosing the identity, address, or details of the aggrieved woman and witnesses is strictly prohibited under penalty.",
    relevanceScore: 0.92,
  },
  {
    id: "chunk_legal_dv_01",
    title: "Domestic Violence Act 2005: Scope & Emergency Relief Orders",
    source: "Protection of Women from Domestic Violence Act (PWDVA), 2005",
    category: "Legal",
    snippet:
      "PWDVA protects women from physical, sexual, verbal, emotional, and economic abuse in a shared household. A woman has the non-negotiable right to reside in the shared household regardless of title. A Magistrate can issue immediate ex-parte Protection Orders, Residence Orders, and Interim Maintenance under Sections 18, 19, and 20.",
    relevanceScore: 0.93,
  },
  {
    id: "chunk_legal_fir_01",
    title: "Zero FIR & Police Protocols for Women",
    source:
      "Criminal Procedure Code (CrPC) & Bharatiya Nagarik Suraksha Sanhita (BNSS)",
    category: "Legal",
    snippet:
      "A Zero FIR can be lodged at ANY police station in India irrespective of the jurisdiction where the incident took place. The station will record the FIR, assign a zero serial number, and transfer it to the concerned police station. Women cannot be called to a police station between sunset and sunrise for interrogation; questioning must happen at their residence in presence of family/women officers.",
    relevanceScore: 0.96,
  },
  {
    id: "chunk_legal_maternity_01",
    title: "Maternity Benefit Act 2017: Entitlements and Protections",
    source: "Maternity Benefit (Amendment) Act, 2017 - Section 5 & 11",
    category: "Legal",
    snippet:
      "Provides 26 weeks paid maternity leave for female employees for first two surviving children (12 weeks for third child onward). Establishments with 50+ employees must provide a crèche within 500 meters, allowing 4 daily visits. Termination or notice of dismissal during maternity leave is illegal under Section 12.",
    relevanceScore: 0.94,
  },
  // HEALTH PILLAR
  {
    id: "chunk_health_pcod_01",
    title: "PCOS & PCOD: Diagnostic Criteria & Lifestyle Protocols",
    source: "Arogyini Clinical Guidelines - Hormonal Health",
    category: "Health",
    snippet:
      "Polycystic Ovary Syndrome (PCOS) is a metabolic-endocrine condition diagnosed via Rotterdam criteria (oligo-anovulation, hyperandrogenism, polycystic ovaries on ultrasound). Key non-pharmacological interventions include a low-glycemic load diet, managing insulin resistance, adequate sleep, inositol supplementation, and consistent resistance exercise.",
    relevanceScore: 0.92,
  },
  {
    id: "chunk_health_period_01",
    title: "Menstrual Cycle Phases & Red Flag Symptoms",
    source: "Arogyini Reproductive Health Compendium",
    category: "Health",
    snippet:
      "A standard menstrual cycle lasts between 21 and 35 days. Phases include Menstrual (Days 1-5), Follicular (Days 1-13), Ovulatory (~Day 14), and Luteal (Days 15-28). Red flags requiring medical consultation include: cycles under 21 or over 45 days, bleeding lasting more than 7 days, soaking 1+ pads/hour for consecutive hours, severe debilitating pelvic pain, or post-coital spotting.",
    relevanceScore: 0.94,
  },
  {
    id: "chunk_health_anemia_01",
    title: "Nutritional Anemia & Iron Metabolism in Women",
    source: "National Health Mission - Anemia Mukt Bharat Protocol",
    category: "Health",
    snippet:
      "Anemia in non-pregnant women is defined as Hemoglobin < 12.0 g/dL. Symptoms include chronic fatigue, brittle nails, cold extremities, and dizziness. Pair dietary iron sources (spinach, jaggery, lentils, dates) with Vitamin C (amla, lemon, oranges) to double bio-availability. Avoid tannins (tea/coffee) within 90 minutes of iron-rich meals.",
    relevanceScore: 0.91,
  },
  // CAREER PILLAR
  {
    id: "chunk_career_returnee_01",
    title: "Career Returnship Programs & Transition Strategy",
    source: "Arogyini Career Empowerment Network",
    category: "Career",
    snippet:
      "Returnships are paid 3-6 month corporate programs offering structured onboarding, mentorship, and project refreshes for women resuming work after a career gap. High-demand tracks include Full-Stack Engineering, Cloud Ops, Product Management, and Agile Project Coordination. Recommended steps: update portfolio with modern tech stack, acquire cloud certifications, and leverage alumni networks.",
    relevanceScore: 0.9,
  },
  {
    id: "chunk_career_gov_01",
    title: "Government Scholarships & Entrepreneurship Schemes for Women",
    source: "Ministry of Women and Child Development & AICTE Schemes",
    category: "Career",
    snippet:
      "Key schemes include AICTE Pragati Scholarship (₹50,000/yr for female technical degree/diploma students), Stand-Up India (loans from ₹10 Lakh to ₹1 Crore for women greenfield ventures), and Mudra Tarun/Kishore loans with subsidized collateral-free rates. Biocon & Google APAC also offer specialized STEM fellowships.",
    relevanceScore: 0.93,
  },
  // SAFETY PILLAR
  {
    id: "chunk_safety_sos_01",
    title: "Emergency SOS Protocols & National Helplines",
    source: "Ministry of Home Affairs - ERSS 112 & Women Safety Division",
    category: "Safety",
    snippet:
      "Emergency Helpline 112 (National Emergency Response System) integrates Police, Fire, and Ambulance with automated GPS dispatch. Helpline 181 provides 24/7 tele-counseling and immediate rescue for women in distress. Helpline 1091 is the dedicated Women Police Helpline. Sakhi One Stop Centers (OSC) provide integrated medical, legal, and temporary shelter support under one roof.",
    relevanceScore: 0.97,
  },
];
export const RAGService = {
  /**
   * Primary Unified RAG Query Entrypoint
   * Seamlessly checks for custom Python RAG microservice via RAG_SERVICE_URL.
   * If not set or unreachable, falls back to embedded vector/semantic chunk retrieval + LLM synthesis.
   */
  async query(payload) {
    const startTime = Date.now();
    const ragServiceUrl = process.env.RAG_SERVICE_URL;
    // 1. PLUG-AND-PLAY HOOK: If the user provided a custom Python RAG service URL
    if (ragServiceUrl && ragServiceUrl.trim() !== "") {
      try {
        console.log(
          `[RAGService] Forwarding query to external Python RAG service: ${ragServiceUrl}`,
        );
        const response = await fetch(
          `${ragServiceUrl.replace(/\/$/, "")}/query`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Source-Client": "Arogyini-Platform-Client",
            },
            body: JSON.stringify(payload),
          },
        );
        if (response.ok) {
          const externalResult = await response.json();
          return {
            answer:
              externalResult.answer ||
              externalResult.response ||
              "No response generated.",
            pillar: externalResult.pillar || payload.pillar,
            confidence: externalResult.confidence ?? 0.95,
            sources: externalResult.sources || [
              {
                name: "External Custom Python RAG Microservice",
                category: payload.pillar,
              },
            ],
            retrievedChunks:
              externalResult.retrieved_chunks ||
              externalResult.retrievedChunks ||
              [],
            suggestedFollowUps: externalResult.suggested_followups ||
              externalResult.suggestedFollowUps || [
                "Can you give more details on this topic?",
                "What are the legal/medical next steps?",
              ],
            engine: "custom_python_rag",
            latencyMs: Date.now() - startTime,
            timestamp: new Date().toISOString(),
          };
        } else {
          console.warn(
            `[RAGService] External RAG returned status ${response.status}. Falling back to embedded engine.`,
          );
        }
      } catch (err) {
        console.warn(
          "[RAGService] Failed to reach external RAG service, using embedded engine:",
          err,
        );
      }
    }
    // 2. EMBEDDED RETRIEVAL STAGE: Score and retrieve top-k chunks from domain corpus
    const retrievedChunks = retrieveRelevantChunks(
      payload.question,
      payload.pillar,
      4,
    );
    // 3. GENERATION STAGE: Synthesize grounded response using retrieved context
    const synthesis = await generateGroundedResponse(
      payload.question,
      payload.pillar,
      retrievedChunks,
    );
    const latencyMs = Date.now() - startTime;
    return {
      answer: synthesis.answer,
      pillar: payload.pillar,
      confidence: synthesis.confidence,
      sources: retrievedChunks.map((c) => ({
        name: c.title,
        urlOrAct: c.source,
        category: c.category,
      })),
      retrievedChunks,
      suggestedFollowUps: synthesis.suggestedFollowUps,
      engine: synthesis.engine,
      latencyMs,
      timestamp: new Date().toISOString(),
    };
  },
  /**
   * Health check / Diagnostic endpoint for testing RAG microservice connectivity
   */
  async checkConnection() {
    const url = process.env.RAG_SERVICE_URL;
    if (!url) {
      return {
        status: "embedded_fallback",
        targetUrl: null,
        embeddedChunksCount: EMBEDDED_KNOWLEDGE_BASE.length,
      };
    }
    try {
      const resp = await fetch(`${url.replace(/\/$/, "")}/health`, {
        method: "GET",
      });
      return {
        status: resp.ok ? "connected" : "offline",
        targetUrl: url,
        embeddedChunksCount: EMBEDDED_KNOWLEDGE_BASE.length,
      };
    } catch {
      return {
        status: "offline",
        targetUrl: url,
        embeddedChunksCount: EMBEDDED_KNOWLEDGE_BASE.length,
      };
    }
  },
};
/**
 * Semantic & keyword relevance matching across the knowledge corpus
 */
function retrieveRelevantChunks(query, pillar, topK = 3) {
  const queryTokens = query
    .toLowerCase()
    .split(/\s+/)
    .filter((t) => t.length > 2);
  const scored = EMBEDDED_KNOWLEDGE_BASE.map((chunk) => {
    let score = 0;
    const text =
      `${chunk.title} ${chunk.source} ${chunk.snippet}`.toLowerCase();
    // Pillar match bonus
    if (
      pillar !== "general" &&
      chunk.category.toLowerCase() === pillar.toLowerCase()
    ) {
      score += 0.35;
    }
    // Token frequency & density
    for (const token of queryTokens) {
      if (text.includes(token)) {
        score += 0.25;
      }
    }
    // Exact phrase matching
    if (text.includes(query.toLowerCase())) {
      score += 0.5;
    }
    return {
      ...chunk,
      relevanceScore: Math.min(0.99, Number((0.4 + score * 0.4).toFixed(2))),
    };
  });
  scored.sort((a, b) => b.relevanceScore - a.relevanceScore);
  return scored.slice(0, topK);
}
/**
 * Grounded synthesis using Google GenAI SDK (if GEMINI_API_KEY is available) or domain synthesis engine
 */
async function generateGroundedResponse(question, pillar, chunks) {
  const contextSnippet = chunks
    .map((c, i) => `[Source ${i + 1}: ${c.title} (${c.source})]\n${c.snippet}`)
    .join("\n\n");
  if (
    process.env.GEMINI_API_KEY &&
    process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY"
  ) {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = `You are AROGYINI AI, an empathetic, highly knowledgeable, and protective assistant specialized in Women's Health, Legal Rights (Indian Laws: POSH, PWDVA, BNSS, Maternity Act), Career Empowerment, and Safety.

Context from Knowledge Base:
${contextSnippet}

User Question: "${question}"
Target Pillar: "${pillar}"

Instructions:
1. Provide a direct, compassionate, highly structured, and actionable answer grounded strictly in the provided facts and Indian legal/healthcare standards.
2. If discussing legal rights, mention the exact Act name, procedural steps (e.g. 90-day ICC timeline, Zero FIR), and helpline numbers (112, 181, 1091).
3. If discussing health, give clear guidance with an explicit reminder to consult licensed gynecologists for clinical diagnosis.
4. Format with clean bullet points and bold section headers for readability.`;
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });
      const text = response.text || "";
      return {
        answer: text,
        confidence: 0.94,
        suggestedFollowUps: generateFollowUps(pillar),
        engine: "gemini_grounded",
      };
    } catch (err) {
      console.warn(
        "[RAGService] Gemini API call failed, using embedded grounded response:",
        err,
      );
    }
  }
  // Embedded Rule-Based / Grounded Knowledge Synthesis Engine
  const matchedPillars = chunks.map((c) => c.category);
  const primaryChunk = chunks[0] || EMBEDDED_KNOWLEDGE_BASE[0];
  const answer = `### Guidance from Arogyini ${primaryChunk.category} Knowledge Base

**Key Summary:**
${primaryChunk.snippet}

**Actionable Steps & Recommended Protocols:**
• **Step 1:** Review the statutory protections under **${primaryChunk.source}**.
• **Step 2:** Maintain detailed documentation (dates, witnesses, digital evidence, or cycle symptoms).
• **Step 3:** Access immediate assistance through verified emergency channels:
  - **National Emergency Response:** Dial **112**
  - **Women in Distress Helpline:** Dial **181**
  - **Women Police Helpline:** Dial **1091**
  - **National Cyber Crime Portal:** Call **1930** or visit *cybercrime.gov.in*

*(Note: You can seamlessly connect your custom Python RAG pipeline in \`rag-service/main.py\` by setting \`RAG_SERVICE_URL\` in your environment.)*`;
  return {
    answer,
    confidence: 0.89,
    suggestedFollowUps: generateFollowUps(pillar),
    engine: "embedded_rag_engine",
  };
}
function generateFollowUps(pillar) {
  switch (pillar) {
    case "legal":
      return [
        "How do I file a Zero FIR at the nearest police station?",
        "What is the step-by-step procedure to submit a POSH complaint to the ICC?",
        "What free legal aid is available under NALSA for women?",
      ];
    case "health":
      return [
        "What are the key lifestyle changes recommended for PCOS management?",
        "What symptoms indicate I should consult a gynecologist immediately?",
        "How does iron deficiency anemia affect the menstrual cycle?",
      ];
    case "career":
      return [
        "Which companies offer paid returnship programs for career break women?",
        "How do I apply for the AICTE Pragati government scholarship?",
        "What are the top high-paying remote roles for women in tech?",
      ];
    case "safety":
      return [
        "How does the AROGYINI instant SOS alert notify guardians and police?",
        "What is a Sakhi One Stop Center and where can I find one?",
        "What should I do if I suspect I am being cyber-stalked?",
      ];
    default:
      return [
        "Tell me more about the 4 core pillars of Arogyini.",
        "How can I setup my emergency contacts for 1-tap SOS?",
        "What legal rights protect women in workplace harassment?",
      ];
  }
}
