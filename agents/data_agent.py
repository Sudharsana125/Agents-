import pandas as pd
import os

def load_data():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    csv_path = os.path.join(current_dir, "data", "facility_data.csv")
    df = pd.read_csv(csv_path)
    return df
def get_facility_info(facility_id):
    df = load_data()
    facility_info = df[df['facility_id'] == facility_id]
    if facility_info.empty:
        return None
    return facility_info.to_dict(orient='records')[0]