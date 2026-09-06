import os
import sys
import random
import time
import pandas as pd
from datetime import datetime

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "agents", "data")
STREAM_FILE = os.path.join(DATA_DIR, "live_facility_stream.csv")
BASE_FILE = os.path.join(DATA_DIR, "facility_data.csv")

FACILITIES = ["F001", "F002", "F003", "F004", "F005", "F006", "F007", "F008", "F009", "F010"]

def initialize_stream():
    """Initializes streaming data buffer if not present."""
    os.makedirs(DATA_DIR, exist_ok=True)
    if not os.path.exists(STREAM_FILE):
        if os.path.exists(BASE_FILE):
            df = pd.read_csv(BASE_FILE)
        else:
            rows = []
            for fid in FACILITIES:
                rows.append({
                    "facility_id": fid,
                    "complaints": random.randint(0, 5),
                    "energy_usage": random.randint(80, 200),
                    "sentiment_score": round(random.uniform(-0.5, 0.8), 2),
                    "temperature": round(random.uniform(21.0, 25.5), 1),
                    "occupancy": random.randint(20, 80),
                    "hvac_status": "Normal",
                    "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                })
            df = pd.DataFrame(rows)
        
        if "temperature" not in df.columns:
            df["temperature"] = [round(random.uniform(21.0, 26.0), 1) for _ in range(len(df))]
        if "occupancy" not in df.columns:
            df["occupancy"] = [random.randint(15, 75) for _ in range(len(df))]
        if "hvac_status" not in df.columns:
            df["hvac_status"] = "Normal"
        if "timestamp" not in df.columns:
            df["timestamp"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        df.to_csv(STREAM_FILE, index=False)
    return STREAM_FILE

def generate_telemetry_tick(anomaly_facility=None, anomaly_type=None):
    """Simulates a single real-time IoT telemetry update tick across all facilities."""
    initialize_stream()
    df = pd.read_csv(STREAM_FILE)

    now_str = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    updated_rows = []

    for idx, row in df.iterrows():
        fid = row["facility_id"]
        
        # Base realistic fluctuations
        energy = max(50, int(row["energy_usage"] + random.randint(-15, 15)))
        temp = max(18.0, min(35.0, round(float(row.get("temperature", 23.0)) + random.uniform(-0.5, 0.5), 1)))
        complaints = max(0, int(row["complaints"] + random.choice([-1, 0, 0, 1])))
        occupancy = max(5, min(120, int(row.get("occupancy", 40)) + random.randint(-5, 5)))
        hvac = row.get("hvac_status", "Normal")

        # Inject requested manual anomaly if specified
        if fid == anomaly_facility:
            if anomaly_type == "ENERGY_SPIKE":
                energy = random.randint(320, 480)
                temp = round(random.uniform(28.0, 33.0), 1)
                hvac = "Overloaded"
            elif anomaly_type == "COMPLAINT_BURST":
                complaints = random.randint(8, 15)
                hvac = "Degraded"
            elif anomaly_type == "HVAC_FAILURE":
                temp = round(random.uniform(30.0, 36.0), 1)
                energy = random.randint(350, 500)
                hvac = "FAILED"

        updated_rows.append({
            "facility_id": fid,
            "complaints": complaints,
            "energy_usage": energy,
            "sentiment_score": round(max(-1.0, min(1.0, float(row.get("sentiment_score", 0.0)) + random.uniform(-0.1, 0.1))), 2),
            "temperature": temp,
            "occupancy": occupancy,
            "hvac_status": hvac,
            "timestamp": now_str
        })

    updated_df = pd.DataFrame(updated_rows)
    updated_df.to_csv(STREAM_FILE, index=False)
    return updated_df

def run_simulation_loop(interval_seconds=3):
    """Runs a continuous streaming telemetry background loop."""
    print(f"📡 Real-Time IoT Telemetry Streamer running (Interval: {interval_seconds}s)...")
    try:
        while True:
            generate_telemetry_tick()
            print(f"[{datetime.now().strftime('%H:%M:%S')}] Telemetry stream updated.")
            time.sleep(interval_seconds)
    except KeyboardInterrupt:
        print("Telemetry streamer stopped.")

if __name__ == "__main__":
    run_simulation_loop()
