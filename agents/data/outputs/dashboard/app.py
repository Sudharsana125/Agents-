import streamlit as st
import pandas as pd
import numpy as np
import os
import sys
import time
from datetime import datetime

# Path resolution setup
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.abspath(os.path.join(CURRENT_DIR, "..", "..", ".."))
if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)

from realtime_engine import process_realtime_tick
from simulator import generate_telemetry_tick

st.set_page_config(
    page_title="Smart Facility AI - Real-Time Dashboard",
    page_icon="🏢",
    layout="wide"
)

# Custom Styling
st.markdown("""
    <style>
    .metric-card {
        background-color: #1E222A;
        border-radius: 10px;
        padding: 15px;
        border: 1px solid #2E3440;
        text-align: center;
    }
    .alert-critical {
        background-color: #3B1C1C;
        border-left: 5px solid #FF4B4B;
        padding: 12px;
        border-radius: 5px;
        margin-bottom: 10px;
    }
    .alert-warning {
        background-color: #382E1C;
        border-left: 5px solid #FFA726;
        padding: 12px;
        border-radius: 5px;
        margin-bottom: 10px;
    }
    .alert-normal {
        background-color: #1C3322;
        border-left: 5px solid #66BB6A;
        padding: 12px;
        border-radius: 5px;
        margin-bottom: 10px;
    }
    </style>
""", unsafe_allow_html=True)

st.title("🏢 Smart Facility Management - Real-Time Multi-Agent AI")

# Sidebar Controls
st.sidebar.header("⚡ Real-Time Control Center")
auto_refresh = st.sidebar.checkbox("Enable Live Auto-Refresh", value=True)
refresh_rate = st.sidebar.slider("Refresh Interval (seconds)", min_value=1, max_value=10, value=3)

st.sidebar.subheader("🕹️ Live Anomaly Injector")
facility_list = [f"F{i:03d}" for i in range(1, 11)]
selected_fac = st.sidebar.selectbox("Select Target Facility", facility_list)
anomaly_type = st.sidebar.radio("Anomaly Scenario", ["ENERGY_SPIKE", "COMPLAINT_BURST", "HVAC_FAILURE"])

if st.sidebar.button("🚨 Inject Anomaly Live"):
    generate_telemetry_tick(anomaly_facility=selected_fac, anomaly_type=anomaly_type)
    st.sidebar.success(f"Injected {anomaly_type} into {selected_fac}!")

if st.sidebar.button("🔄 Trigger Real-Time Sensor Tick"):
    generate_telemetry_tick()
    st.sidebar.info("Live telemetry updated!")

# Execute Real-Time Multi-Agent Pass
df, insights = process_realtime_tick()

# Top KPI Metric Row
m1, m2, m3, m4, m5, m6 = st.columns(6)
m1.metric("Total Facilities", insights["Total Facilities"])
m2.metric("Critical Alerts", insights["Critical Cases"], delta_color="inverse")
m3.metric("Energy Overuse", insights["Over Energy Use"], delta_color="inverse")
m4.metric("Avg Energy", f"{insights['Average Energy Load (kW)']} kW")
m5.metric("Avg Temp", f"{insights['Average Temperature (°C)']} °C")
m6.metric("Health Score", f"{insights['Facility Health Score']}/100")

st.markdown("---")

# Split Layout: Live Feed & Analytics
col_left, col_right = st.columns([1.2, 1])

with col_left:
    st.subheader("🚨 Real-Time Multi-Agent Decision Feed")
    
    # Filter Controls
    severity_filter = st.selectbox("Filter by Severity", ["All", "Critical", "Medium", "Low"])
    filtered_df = df if severity_filter == "All" else df[df["severity"] == severity_filter]

    for idx, row in filtered_df.iterrows():
        sev = row["severity"]
        card_class = "alert-critical" if sev == "Critical" else ("alert-warning" if sev == "Medium" else "alert-normal")
        icon = "🔴" if sev == "Critical" else ("🟡" if sev == "Medium" else "🟢")
        
        st.markdown(f"""
            <div class="{card_class}">
                <b>{icon} Facility {row['facility_id']} | {sev} Severity | Energy: {row['energy_status']} ({row['energy_usage']} kW)</b><br/>
                🌡️ <b>Temp:</b> {row.get('temperature', 24.0)}°C | 👥 <b>Occupancy:</b> {row.get('occupancy', 40)} | 🛠️ <b>HVAC:</b> {row.get('hvac_status', 'Normal')}<br/>
                🤖 <b>Multi-Agent Action:</b> {row.get('action', 'N/A')}<br/>
                💬 <i>{row['explanation']}</i>
            </div>
        """, unsafe_allow_html=True)

with col_right:
    st.subheader("📈 Live Streaming Telemetry Charts")
    
    # Read history file if available
    history_file = os.path.join(PROJECT_ROOT, "agents", "data", "outputs", "live_history.csv")
    if os.path.exists(history_file):
        history_df = pd.read_csv(history_file)
        
        # Energy Trend Chart
        st.caption("⚡ Real-Time Energy Usage (kW) by Facility")
        energy_pivot = history_df.pivot(columns="facility_id", values="energy_usage")
        st.line_chart(energy_pivot.tail(30), height=220)
        
        # Temperature Trend Chart
        st.caption("🌡️ Real-Time Temperature (°C) Trend")
        temp_pivot = history_df.pivot(columns="facility_id", values="temperature")
        st.line_chart(temp_pivot.tail(30), height=220)

st.markdown("---")
st.subheader("📋 Complete Real-Time Facility State Table")
st.dataframe(df, use_container_width=True)

# Auto refresh logic
if auto_refresh:
    time.sleep(refresh_rate)
    generate_telemetry_tick()
    st.rerun()
