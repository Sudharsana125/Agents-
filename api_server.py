import os
import sys
from fastapi import FastAPI, HTTPException

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from simulator import generate_telemetry_tick
from realtime_engine import process_realtime_tick

app = FastAPI(
    title="Smart Facility AI - Real-Time Multi-Agent API",
    description="Real-time IoT telemetry ingestion, automated agent control decisions, and facility analytics API.",
    version="2.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AnomalyRequest(BaseModel):
    facility_id: str
    anomaly_type: str  # ENERGY_SPIKE, COMPLAINT_BURST, HVAC_FAILURE

@app.get("/")
def root():
    return {
        "system": "Smart Facility AI",
        "status": "ONLINE",
        "mode": "REALTIME_MULTI_AGENT",
        "version": "2.0.0"
    }

@app.get("/api/realtime/facilities")
def get_facilities():
    """Returns latest live facility telemetry and real-time agent predictions."""
    df, _ = process_realtime_tick()
    return df.to_dict(orient="records")

@app.get("/api/realtime/insights")
def get_insights():
    """Returns aggregate real-time facility insights and health metrics."""
    _, insights = process_realtime_tick()
    return insights

@app.post("/api/realtime/simulate-anomaly")
def simulate_anomaly(request: AnomalyRequest):
    """Triggers an anomaly on a specific facility for stress testing."""
    if request.anomaly_type not in ["ENERGY_SPIKE", "COMPLAINT_BURST", "HVAC_FAILURE"]:
        raise HTTPException(status_code=400, detail="Invalid anomaly_type. Must be ENERGY_SPIKE, COMPLAINT_BURST, or HVAC_FAILURE")
    
    generate_telemetry_tick(anomaly_facility=request.facility_id, anomaly_type=request.anomaly_type)
    df, insights = process_realtime_tick()
    return {
        "message": f"Successfully injected {request.anomaly_type} for facility {request.facility_id}",
        "insights": insights
    }

@app.post("/api/realtime/tick")
def trigger_tick():
    """Triggers an immediate real-time simulation tick and multi-agent evaluation pass."""
    generate_telemetry_tick()
    df, insights = process_realtime_tick()
    return {
        "status": "SUCCESS",
        "insights": insights
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
