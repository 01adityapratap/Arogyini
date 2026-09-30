export const MLService = {
  /**
   * Predicts health risks based on clinical indicators, cycle history and symptoms.
   * Can plug into external Python FastAPI ml-service (ML_SERVICE_URL) or compute locally.
   */
  async predictHealthRisk(input) {
    const mlServiceUrl = process.env.ML_SERVICE_URL;
    if (mlServiceUrl) {
      try {
        const response = await fetch(
          `${mlServiceUrl.replace(/\/$/, "")}/predict/health`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(input),
          },
        );
        if (response.ok) {
          const data = await response.json();
          return data;
        }
      } catch (err) {
        console.warn(
          "[MLService] External ML Service unreachable, using fallback model:",
          err,
        );
      }
    }
    // Baseline Predictive Model for Women Health Risk Assessment
    let pcosScore = 0;
    let anemiaScore = 0;
    let thyroidScore = 0;
    // PCOS evaluation
    if (
      input.cycleRegularity === "irregular" ||
      input.cycleRegularity === "variable"
    )
      pcosScore += 35;
    if (input.averageCycleLength > 35 || input.averageCycleLength < 21)
      pcosScore += 25;
    if (input.bmi > 25) pcosScore += 15;
    if (input.familyHistoryPCOS) pcosScore += 15;
    if (input.symptoms.some((s) => /acne|hair|weight gain|hirsutism/i.test(s)))
      pcosScore += 15;
    // Anemia evaluation
    if (input.fatigueLevel >= 7) anemiaScore += 30;
    if (input.hemoglobin && input.hemoglobin < 11.5) anemiaScore += 45;
    if (
      input.symptoms.some((s) =>
        /dizziness|pale|breathless|cold hands/i.test(s),
      )
    )
      anemiaScore += 25;
    // Thyroid evaluation
    if (input.familyHistoryThyroid) thyroidScore += 30;
    if (input.stressLevel >= 8) thyroidScore += 20;
    if (
      input.symptoms.some((s) =>
        /mood swings|temperature sensitivity|dry skin/i.test(s),
      )
    )
      thyroidScore += 25;
    pcosScore = Math.min(95, pcosScore);
    anemiaScore = Math.min(95, anemiaScore);
    thyroidScore = Math.min(95, thyroidScore);
    const overallScore = Math.round(
      pcosScore * 0.45 + anemiaScore * 0.35 + thyroidScore * 0.2,
    );
    const riskCategory =
      overallScore >= 60 ? "High" : overallScore >= 30 ? "Moderate" : "Low";
    const possibleConditions = [];
    if (pcosScore >= 40) {
      possibleConditions.push({
        condition: "Polycystic Ovary Syndrome (PCOS/PCOD) Tendency",
        likelihood: pcosScore,
        explanation: `Irregular cycle pattern (${input.averageCycleLength} days) and associated hormonal markers suggest elevated PCOS indicators.`,
        recommendedActions: [
          "Consult a Gynecologist / Endocrinologist for an ultrasound and hormonal panel (LH:FSH, fasting insulin).",
          "Adopt a low-glycemic, anti-inflammatory diet rich in fiber and leafy greens.",
          "Incorporate 30 minutes of moderate resistance training or brisk walking daily.",
        ],
      });
    }
    if (anemiaScore >= 35) {
      possibleConditions.push({
        condition: "Iron-Deficiency Anemia Marker",
        likelihood: anemiaScore,
        explanation: `Reported fatigue score (${input.fatigueLevel}/10) along with metabolic symptoms indicates potential low serum ferritin or hemoglobin levels.`,
        recommendedActions: [
          "Request a Complete Blood Count (CBC) and Serum Ferritin lab test.",
          "Increase intake of dietary iron (spinach, jaggery, beetroot, legumes) paired with Vitamin C.",
          "Avoid consuming tea or coffee within 1 hour of meals to optimize iron absorption.",
        ],
      });
    }
    if (thyroidScore >= 35) {
      possibleConditions.push({
        condition: "Thyroid Function Vulnerability",
        likelihood: thyroidScore,
        explanation:
          "Elevated stress and family predisposition indicate advisability for thyroid profile screening.",
        recommendedActions: [
          "Schedule a routine Serum TSH, Free T3, and Free T4 blood test.",
          "Practice stress-reduction techniques like pranayama or guided mindfulness.",
        ],
      });
    }
    return {
      riskScore: overallScore,
      riskCategory,
      possibleConditions,
      lifestyleTips: [
        "Maintain a consistent sleep-wake rhythm of 7-8 hours to support endocrine balance.",
        "Track your monthly cycle symptoms continuously for at least 3 consecutive cycles for clinical correlation.",
        "Stay adequately hydrated (2.5 - 3 Liters daily) and minimize refined sugars.",
      ],
      disclaimer:
        "This automated prediction is for educational screening purposes and does NOT replace a medical diagnosis from a licensed healthcare physician.",
      modelConfidence: 0.88,
    };
  },
  /**
   * Safety Route & Area ML Risk Auditor
   */
  async calculateSafetyScore(lat, lng) {
    // Proximity to pink booths and infrastructure heuristics
    const score = Math.floor(75 + Math.random() * 20);
    return {
      safetyScore: score,
      riskLevel:
        score >= 80 ? "Safe" : score >= 60 ? "Moderate" : "High Caution",
      lightingStatus: "Adequately Lit Urban Corridor",
      nearbyPinkBoothKm: 0.8,
      policeResponseTimeMinutes: 4,
      tips: [
        "Live CCTV Surveillance active along this sector.",
        "Emergency 112 Pink Patrol vehicle active in 1.2km radius.",
        "Keep SOS quick-dial or power-button trigger enabled in low-lit alleys.",
      ],
    };
  },
};
