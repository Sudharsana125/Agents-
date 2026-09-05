import pandas as pd
import os
from datetime import datetime

def load_data(file_path=None):
    current_dir = os.path.dirname(os.path.abspath(__file__))
    if file_path is None:
        live_path = os.path.join(current_dir, "data", "live_facility_stream.csv")
        if os.path.exists(live_path):
            file_path = live_path
        else:
            file_path = os.path.join(current_dir, "data", "facility_data.csv")
    
    df = pd.read_csv(file_path)
    
    # Ensure standard schema default values
    if "temperature" not in df.columns:
        df["temperature"] = 24.0
    if "occupancy" not in df.columns:
        df["occupancy"] = 45
    if "hvac_status" not in df.columns:
        df["hvac_status"] = "Normal"
    if "timestamp" not in df.columns:
        df["timestamp"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    return df

def get_facility_info(facility_id, df=None):
    if df is None:
        df = load_data()
    facility_info = df[df['facility_id'] == facility_id]
    if facility_info.empty:
        return None
    return facility_info.to_dict(orient='records')[-1]