import os
import pandas as pd
from datetime import datetime

from agents.data_agent import load_data, parse_universal_csv
from agents.complaint_severity_agent import assign_severity
from agents.energy_optimization_agent import energy_status, calculate_efficiency_score
from agents.decision_agent import determine_action
from agents.insight_agent import generate_insights
from agents.llm_explanation_agent import explain

OUTPUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "agents", "data", "outputs")
PREDICTIONS_FILE = os.path.join(OUTPUT_DIR, "facility_predictions.csv")
HISTORY_FILE = os.path.join(OUTPUT_DIR, "live_history.csv")

def process_realtime_tick(input_df=None, col_mapping=None):
    """
    Executes a single real-time multi-agent processing evaluation pass across any dataset.
    """
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    # Ingest streaming telemetry or universal custom CSV
    if input_df is not None:
        df, detected_mapping = parse_universal_csv(input_df, col_mapping)
    else:
        df = load_data()
        detected_mapping = {}

    # Multi-Agent Processing Pipeline
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
    if "facility_id" in df.columns:
        history_df = df[["timestamp", "facility_id", "energy_usage", "temperature", "complaints", "severity", "energy_status"]].copy()
        if os.path.exists(HISTORY_FILE):
            try:
                existing_history = pd.read_csv(HISTORY_FILE)
                combined = pd.concat([existing_history, history_df], ignore_index=True)
                combined = combined.tail(300)
                combined.to_csv(HISTORY_FILE, index=False)
            except Exception:
                history_df.to_csv(HISTORY_FILE, index=False)
        else:
            history_df.to_csv(HISTORY_FILE, index=False)

    insights = generate_insights(df)
    return df, insights, detected_mapping

if __name__ == "__main__":
    df, insights, mapping = process_realtime_tick()
    print("⚡ Real-Time Multi-Agent Pass Complete!")
    print(f"Metrics: {insights}")
