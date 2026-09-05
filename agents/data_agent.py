import pandas as pd
import os
from datetime import datetime

def auto_detect_columns(df):
    """
    Intelligently auto-detects column mappings for any arbitrary CSV dataset.
    """
    cols = [str(c).lower().strip() for c in df.columns]
    col_raw = list(df.columns)
    mapping = {}

    # 1. ID Column
    id_matches = ["facility_id", "building_id", "machine_id", "device_id", "asset_id", "id", "name", "building", "machine"]
    found_id = None
    for match in id_matches:
        for orig, c in zip(col_raw, cols):
            if match in c:
                found_id = orig
                break
        if found_id:
            break
    if not found_id:
        str_cols = df.select_dtypes(include=["object", "string"]).columns
        found_id = str_cols[0] if len(str_cols) > 0 else col_raw[0]
    mapping["id_col"] = found_id

    # 2. Complaints / Issues Column
    complaint_matches = ["complaint", "issue", "ticket", "fault", "error", "alert", "bug", "count"]
    found_complaints = None
    for match in complaint_matches:
        for orig, c in zip(col_raw, cols):
            if match in c:
                found_complaints = orig
                break
        if found_complaints:
            break
    if not found_complaints:
        num_cols = df.select_dtypes(include=["int64", "float64", "int32"]).columns
        found_complaints = num_cols[0] if len(num_cols) > 0 else None
    mapping["complaints_col"] = found_complaints

    # 3. Energy / Usage Column
    energy_matches = ["energy", "power", "usage", "kw", "kwh", "consumption", "load", "metric", "val"]
    found_energy = None
    for match in energy_matches:
        for orig, c in zip(col_raw, cols):
            if match in c and orig != found_complaints:
                found_energy = orig
                break
        if found_energy:
            break
    if not found_energy:
        num_cols = [c for c in df.select_dtypes(include=["int64", "float64", "int32"]).columns if c != found_complaints]
        found_energy = num_cols[0] if len(num_cols) > 0 else None
    mapping["energy_col"] = found_energy

    # 4. Temperature Column
    temp_matches = ["temp", "temperature", "heat", "celsius", "degree"]
    found_temp = None
    for match in temp_matches:
        for orig, c in zip(col_raw, cols):
            if match in c:
                found_temp = orig
                break
        if found_temp:
            break
    mapping["temp_col"] = found_temp

    # 5. Occupancy Column
    occ_matches = ["occupancy", "people", "headcount", "capacity", "users"]
    found_occ = None
    for match in occ_matches:
        for orig, c in zip(col_raw, cols):
            if match in c:
                found_occ = orig
                break
        if found_occ:
            break
    mapping["occupancy_col"] = found_occ

    # 6. Timestamp Column
    time_matches = ["timestamp", "time", "date", "created_at", "datetime"]
    found_time = None
    for match in time_matches:
        for orig, c in zip(col_raw, cols):
            if match in c:
                found_time = orig
                break
        if found_time:
            break
    mapping["timestamp_col"] = found_time

    return mapping

def parse_universal_csv(df, custom_mapping=None):
    """
    Standardizes any user-uploaded CSV into unified DataFrame for multi-agent analysis.
    """
    if df is None or df.empty:
        return df

    mapping = auto_detect_columns(df)
    if custom_mapping:
        mapping.update({k: v for k, v in custom_mapping.items() if v})

    parsed = pd.DataFrame()

    # ID mapping
    id_col = mapping.get("id_col")
    if id_col and id_col in df.columns:
        parsed["facility_id"] = df[id_col].astype(str)
    else:
        parsed["facility_id"] = [f"ENTITY_{i+1:03d}" for i in range(len(df))]

    # Complaints mapping
    c_col = mapping.get("complaints_col")
    if c_col and c_col in df.columns:
        parsed["complaints"] = pd.to_numeric(df[c_col], errors="coerce").fillna(0).astype(int)
    else:
        parsed["complaints"] = 0

    # Energy mapping
    e_col = mapping.get("energy_col")
    if e_col and e_col in df.columns:
        parsed["energy_usage"] = pd.to_numeric(df[e_col], errors="coerce").fillna(120).astype(float)
    else:
        parsed["energy_usage"] = 120.0

    # Temperature mapping
    t_col = mapping.get("temp_col")
    if t_col and t_col in df.columns:
        parsed["temperature"] = pd.to_numeric(df[t_col], errors="coerce").fillna(24.0).astype(float)
    else:
        parsed["temperature"] = 24.0

    # Occupancy mapping
    o_col = mapping.get("occupancy_col")
    if o_col and o_col in df.columns:
        parsed["occupancy"] = pd.to_numeric(df[o_col], errors="coerce").fillna(40).astype(int)
    else:
        parsed["occupancy"] = 40

    # Timestamp mapping
    ts_col = mapping.get("timestamp_col")
    if ts_col and ts_col in df.columns:
        parsed["timestamp"] = df[ts_col].astype(str)
    else:
        parsed["timestamp"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    parsed["sentiment_score"] = 0.0
    parsed["hvac_status"] = "Normal"

    # Retain all original CSV columns alongside mapped standard columns
    for col in df.columns:
        if col not in parsed.columns:
            parsed[f"orig_{col}"] = df[col]

    return parsed, mapping

def load_data(file_path=None):
    current_dir = os.path.dirname(os.path.abspath(__file__))
    if file_path is None:
        live_path = os.path.join(current_dir, "data", "live_facility_stream.csv")
        if os.path.exists(live_path):
            file_path = live_path
        else:
            file_path = os.path.join(current_dir, "data", "facility_data.csv")
    
    df = pd.read_csv(file_path)
    parsed_df, _ = parse_universal_csv(df)
    return parsed_df

def get_facility_info(facility_id, df=None):
    if df is None:
        df = load_data()
    facility_info = df[df['facility_id'] == facility_id]
    if facility_info.empty:
        return None
    return facility_info.to_dict(orient='records')[-1]