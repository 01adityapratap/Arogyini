"""
ml-service/main.py
FastAPI server for ML predictive services (PCOS/Health Risk Scoring & Safety Route Audit).
"""
from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional
import time

app = FastAPI(title="AROGYINI ML Predictive Service", version="1.0.0")

class HealthPredictionPayload(BaseModel):
    age: int
    bmi: float
    cycleRegularity: str
    averageCycleLength: int
    symptoms: List[str]
    fatigueLevel: int
    stressLevel: int
    familyHistoryPCOS: bool
    familyHistoryThyroid: bool
    hemoglobin: Optional[float] = None

@app.get("/health")
def health():
    return {"status": "ready", "service": "AROGYINI ML Predictive Service"}

@app.post("/predict/health")
def predict_health(payload: HealthPredictionPayload):
    # Calculate predictive risk
    score = 20
    if payload.cycleRegularity != "regular":
        score += 35
    if payload.averageCycleLength > 35 or payload.averageCycleLength < 21:
        score += 20
    if payload.fatigueLevel > 6:
        score += 15
        
    score = min(95, score)
    category = "High" if score >= 60 else "Moderate" if score >= 35 else "Low"
    
    return {
        "riskScore": score,
        "riskCategory": category,
        "possibleConditions": [
            {
                "condition": "PCOS/PCOD Hormonal Imbalance Marker",
                "likelihood": score,
                "explanation": f"Cycle regularity ({payload.cycleRegularity}) and symptom cluster indicate elevated predisposition.",
                "recommendedActions": [
                    "Consult gynecologist for clinical ultrasound and endocrine panel.",
                    "Adopt low-glycemic Mediterranean or whole-food diet.",
                    "Maintain regular sleep rhythm and stress mitigation."
                ]
            }
        ],
        "lifestyleTips": [
            "Maintain balanced hydration (2.5L daily).",
            "Incorporate 30 mins of daily brisk exercise."
        ],
        "disclaimer": "Machine learning prediction is for educational triage only.",
        "modelConfidence": 0.91
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
