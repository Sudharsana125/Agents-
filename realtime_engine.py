import os
import pandas as pd
from datetime import datetime

from agents.data_agent import load_data
from agents.complaint_severity_agent import assign_severity
from agents.energy_optimization_agent import energy_status, calculate_efficiency_score
from agents.decision_agent import determine_action
from agents.insight_agent import generate_insights
from agents.llm_explanation_agent import explain

OUTPUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "agents", "data", "outputs")
PREDICTIONS_FILE = os.path.join(OUTPUT_DIR, "facility_predictions.csv")
HISTORY_FILE = os.path.join(OUTPUT_DIR, "live_history.csv")

def process_realtime_tick():
    """
    Executes a single real-time multi-agent processing evaluation pass across active telemetry feeds.
    """
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    # 1. Ingest streaming telemetry via data_agent
    df = load_data()

    # 2. Multi-Agent Processing Pipeline
    df["severity"] = df["complaints"].apply(assign_severity)
    
    # Energy optimization agent
    df["energy_status"] = df.apply(
        lambda r: energy_status(r["energy_usage"], r.get("temperature", 24.0), r.get("occupancy", 45)),
        axis=1
    )
    df["efficiency_score"] = df.apply(
        lambda r: calculate_efficiency_score(r["energy_usage"], r.get("temperature", 24.0), r.get("occupancy", 45)),
        axis=1
    )

    # Decision Agent
    df["action"] = df.apply(determine_action, axis=1)

    # LLM Explanation Agent
    df["explanation"] = df.apply(explain, axis=1)

    # Save latest facility status
    df.to_csv(PREDICTIONS_FILE, index=False)

    # Append to rolling live history for dashboard line charts
    history_df = df[["timestamp", "facility_id", "energy_usage", "temperature", "complaints", "severity", "energy_status"]].copy()
    if os.path.exists(HISTORY_FILE):
        existing_history = pd.read_csv(HISTORY_FILE)
        combined = pd.concat([existing_history, history_df], ignore_index=True)
        # Keep last 200 ticks for smooth UI rendering
        combined = combined.tail(200)
        combined.to_csv(HISTORY_FILE, index=False)
    else:
        history_df.to_csv(HISTORY_FILE, index=False)

    insights = generate_insights(df)
    return df, insights

if __name__ == "__main__":
    df, insights = process_realtime_tick()
    print("⚡ Real-Time Multi-Agent Pass Complete!")
    print(f"Metrics: {insights}")
