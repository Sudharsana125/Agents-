import os
import sys

# Path resolution setup to locate project root
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
curr = CURRENT_DIR
while curr and os.path.dirname(curr) != curr:
    if os.path.exists(os.path.join(curr, "realtime_engine.py")):
        if curr in sys.path:
            sys.path.remove(curr)
        sys.path.insert(0, curr)
        break
    curr = os.path.dirname(curr)
PROJECT_ROOT = curr


agents_dir = os.path.join(PROJECT_ROOT, "agents")
if agents_dir not in sys.path:
    sys.path.insert(0, agents_dir)

import streamlit as st
import pandas as pd
import numpy as np
import plotly.express as px
import plotly.graph_objects as gg
import time
from datetime import datetime

from realtime_engine import process_realtime_tick
from simulator import generate_telemetry_tick, STREAM_FILE
try:
    from agents.data_agent import auto_detect_columns
except ImportError:
    from data_agent import auto_detect_columns


# Page Configuration
st.set_page_config(
    page_title="Smart Facility AI - Universal Multi-Agent Hub",
    page_icon="⚡",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Premium Dark Glassmorphism CSS Design System
st.markdown("""
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap');
    
    html, body, [class*="css"] {
        font-family: 'Inter', sans-serif;
    }
    
    .stApp {
        background: linear-gradient(135deg, #0b0f19 0%, #111827 50%, #0d1117 100%);
        color: #e5e7eb;
    }
    
    /* Header styling */
    .hero-container {
        background: linear-gradient(135deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.8) 100%);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid rgba(56, 189, 248, 0.2);
        border-radius: 16px;
        padding: 24px 32px;
        margin-bottom: 24px;
        box-shadow: 0 10px 30px -10px rgba(0, 242, 254, 0.15);
    }
    
    .hero-title {
        font-size: 2.2rem;
        font-weight: 700;
        background: linear-gradient(90deg, #38bdf8 0%, #818cf8 50%, #c084fc 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin: 0;
    }
    
    .hero-subtitle {
        font-size: 1.0rem;
        color: #94a3b8;
        margin-top: 6px;
    }

    /* Metric Glass Cards */
    .metric-card {
        background: rgba(30, 41, 59, 0.5);
        backdrop-filter: blur(8px);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 14px;
        padding: 18px;
        text-align: center;
        transition: transform 0.2s ease, border-color 0.2s ease;
    }
    .metric-card:hover {
        transform: translateY(-3px);
        border-color: rgba(56, 189, 248, 0.4);
    }
    .metric-val {
        font-size: 1.8rem;
        font-weight: 700;
        color: #f8fafc;
    }
    .metric-label {
        font-size: 0.85rem;
        color: #94a3b8;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    /* Decision Feed Cards */
    .feed-card {
        background: rgba(15, 23, 42, 0.7);
        border-radius: 12px;
        padding: 16px 20px;
        margin-bottom: 14px;
        backdrop-filter: blur(6px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    }
    .feed-critical {
        border-left: 5px solid #ef4444;
        border-top: 1px solid rgba(239, 68, 68, 0.2);
        border-right: 1px solid rgba(239, 68, 68, 0.2);
        border-bottom: 1px solid rgba(239, 68, 68, 0.2);
    }
    .feed-medium {
        border-left: 5px solid #f59e0b;
        border-top: 1px solid rgba(245, 158, 11, 0.2);
        border-right: 1px solid rgba(245, 158, 11, 0.2);
        border-bottom: 1px solid rgba(245, 158, 11, 0.2);
    }
    .feed-low {
        border-left: 5px solid #10b981;
        border-top: 1px solid rgba(16, 185, 129, 0.2);
        border-right: 1px solid rgba(16, 185, 129, 0.2);
        border-bottom: 1px solid rgba(16, 185, 129, 0.2);
    }
    
    .badge {
        display: inline-block;
        padding: 4px 10px;
        border-radius: 20px;
        font-size: 0.75rem;
        font-weight: 600;
        margin-right: 6px;
    }
    .badge-critical { background: rgba(239, 68, 68, 0.2); color: #fca5a5; border: 1px solid #ef4444; }
    .badge-medium { background: rgba(245, 158, 11, 0.2); color: #fcd34d; border: 1px solid #f59e0b; }
    .badge-low { background: rgba(16, 185, 129, 0.2); color: #6ee7b7; border: 1px solid #10b981; }

    /* Custom Streamlit component overrides */
    div.stButton > button {
        background: linear-gradient(135deg, #0284c7 0%, #4f46e5 100%);
        color: white;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        padding: 8px 16px;
        transition: all 0.2s ease;
    }
    div.stButton > button:hover {
        box-shadow: 0 0 15px rgba(56, 189, 248, 0.5);
        transform: scale(1.02);
    }
    </style>
""", unsafe_allow_html=True)

# Hero Header Component
st.markdown("""
    <div class="hero-container">
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
                <h1 class="hero-title">🏢 Smart Facility AI Hub</h1>
                <p class="hero-subtitle">Universal Multi-Agent Monitoring, Real-Time IoT Telemetry & Control Platform</p>
            </div>
            <div style="text-align: right;">
                <span class="badge badge-low" style="font-size: 0.9rem; padding: 8px 16px;">🟢 AGENTS ONLINE</span>
            </div>
        </div>
    </div>
""", unsafe_allow_html=True)

# Sidebar Configuration & Universal CSV Uploader
st.sidebar.header("📁 Dataset & CSV Control")
uploaded_file = st.sidebar.file_uploader(
    "Upload Any Custom CSV File", 
    type=["csv"],
    help="Upload any dataset containing building, machine, sensor, or complaint metrics."
)

raw_df = None
custom_mapping = {}

if uploaded_file is not None:
    try:
        raw_df = pd.read_csv(uploaded_file)
        st.sidebar.success(f"Loaded '{uploaded_file.name}' ({len(raw_df)} rows)")
    except Exception as e:
        st.sidebar.error(f"Error reading CSV: {e}")

# If no user upload, default to live telemetry stream
if raw_df is None:
    if not os.path.exists(STREAM_FILE):
        generate_telemetry_tick()
    raw_df = pd.read_csv(STREAM_FILE)

# Auto Detect Columns & Sidebar Mapping Accordion
detected_map = auto_detect_columns(raw_df)

with st.sidebar.expander("🛠️ Custom Column Mapper", expanded=False):
    st.caption("Customize how your CSV columns map to AI Agent parameters:")
    all_cols = ["-- None --"] + list(raw_df.columns)
    
    def get_default_idx(col_key):
        val = detected_map.get(col_key)
        return all_cols.index(val) if val in all_cols else 0

    id_col_sel = st.selectbox("ID / Entity Column", all_cols, index=get_default_idx("id_col"))
    comp_col_sel = st.selectbox("Complaints / Issues Column", all_cols, index=get_default_idx("complaints_col"))
    energy_col_sel = st.selectbox("Energy / Usage Column", all_cols, index=get_default_idx("energy_col"))
    temp_col_sel = st.selectbox("Temperature Column", all_cols, index=get_default_idx("temp_col"))
    occ_col_sel = st.selectbox("Occupancy Column", all_cols, index=get_default_idx("occupancy_col"))
    time_col_sel = st.selectbox("Timestamp Column", all_cols, index=get_default_idx("timestamp_col"))

    custom_mapping = {
        "id_col": None if id_col_sel == "-- None --" else id_col_sel,
        "complaints_col": None if comp_col_sel == "-- None --" else comp_col_sel,
        "energy_col": None if energy_col_sel == "-- None --" else energy_col_sel,
        "temp_col": None if temp_col_sel == "-- None --" else temp_col_sel,
        "occupancy_col": None if occ_col_sel == "-- None --" else occ_col_sel,
        "timestamp_col": None if time_col_sel == "-- None --" else time_col_sel,
    }

st.sidebar.markdown("---")
st.sidebar.header("⚡ Real-Time Engine Settings")
auto_refresh = st.sidebar.checkbox("Enable Live Auto-Refresh", value=True)
refresh_rate = st.sidebar.slider("Refresh Interval (s)", 1, 10, 3)

st.sidebar.subheader("🕹️ Live Anomaly Injector")
facility_ids = list(raw_df[detected_map["id_col"]].astype(str).unique()) if detected_map.get("id_col") in raw_df.columns else ["F001"]
target_entity = st.sidebar.selectbox("Select Target Entity", facility_ids)
anomaly_scenario = st.sidebar.radio("Anomaly Type", ["ENERGY_SPIKE", "COMPLAINT_BURST", "HVAC_FAILURE"])

if st.sidebar.button("🚨 Inject Anomaly Live"):
    generate_telemetry_tick(anomaly_facility=target_entity, anomaly_type=anomaly_scenario)
    st.sidebar.success(f"Injected {anomaly_scenario} into {target_entity}!")

# Process Dataset through Multi-Agent Engine
df, insights, final_mapping = process_realtime_tick(input_df=raw_df, col_mapping=custom_mapping)

# Main Navigation Tabs
tab1, tab2, tab3, tab4 = st.tabs([
    "📊 Real-Time Operations & Decisions",
    "📈 Plotly Multi-Dimensional Analytics",
    "🕹️ IoT Anomaly Stress Testing",
    "📋 Interactive Data Explorer & Export"
])

# ================= TAB 1: OPERATIONS & DECISIONS =================
with tab1:
    # KPI Metrics Row
    c1, c2, c3, c4, c5, c6 = st.columns(6)
    with c1:
        st.markdown(f"""<div class="metric-card"><div class="metric-val">{insights['Total Facilities']}</div><div class="metric-label">Entities</div></div>""", unsafe_allow_html=True)
    with c2:
        st.markdown(f"""<div class="metric-card"><div class="metric-val" style="color: #ef4444;">{insights['Critical Cases']}</div><div class="metric-label">Critical Alerts</div></div>""", unsafe_allow_html=True)
    with c3:
        st.markdown(f"""<div class="metric-card"><div class="metric-val" style="color: #f59e0b;">{insights['Over Energy Use']}</div><div class="metric-label">Over Energy</div></div>""", unsafe_allow_html=True)
    with c4:
        st.markdown(f"""<div class="metric-card"><div class="metric-val">{insights['Average Energy Load (kW)']}</div><div class="metric-label">Avg Load (kW)</div></div>""", unsafe_allow_html=True)
    with c5:
        st.markdown(f"""<div class="metric-card"><div class="metric-val">{insights['Average Temperature (°C)']}°C</div><div class="metric-label">Avg Temp</div></div>""", unsafe_allow_html=True)
    with c6:
        h_color = "#10b981" if insights['Facility Health Score'] > 75 else ("#f59e0b" if insights['Facility Health Score'] > 50 else "#ef4444")
        st.markdown(f"""<div class="metric-card"><div class="metric-val" style="color: {h_color};">{insights['Facility Health Score']}</div><div class="metric-label">Health Score</div></div>""", unsafe_allow_html=True)

    st.markdown("<br/>", unsafe_allow_html=True)

    # Multi-Agent Decision Feed
    col_left, col_right = st.columns([1.3, 1])

    with col_left:
        st.subheader("🚨 Real-Time Multi-Agent Control Feed")
        sev_filter = st.selectbox("Filter Decisions by Severity", ["All", "Critical", "Medium", "Low"], key="t1_filter")
        filtered_df = df if sev_filter == "All" else df[df["severity"] == sev_filter]

        for idx, row in filtered_df.iterrows():
            sev = row["severity"]
            card_class = "feed-critical" if sev == "Critical" else ("feed-medium" if sev == "Medium" else "feed-low")
            badge_class = "badge-critical" if sev == "Critical" else ("badge-medium" if sev == "Medium" else "badge-low")
            
            st.markdown(f"""
                <div class="feed-card {card_class}">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <b style="font-size: 1.1rem; color: #f8fafc;">Facility ID: {row['facility_id']}</b>
                        <span class="badge {badge_class}">{sev.upper()} SEVERITY</span>
                    </div>
                    <div style="margin-top: 8px; color: #cbd5e1; font-size: 0.9rem;">
                        ⚡ <b>Energy Status:</b> {row['energy_status']} ({row['energy_usage']} kW) | 
                        🌡️ <b>Temp:</b> {row.get('temperature', 24.0)}°C | 
                        👥 <b>Occupancy:</b> {row.get('occupancy', 40)}
                    </div>
                    <div style="margin-top: 8px; color: #38bdf8; font-size: 0.95rem;">
                        🤖 <b>Multi-Agent Action:</b> {row.get('action', 'N/A')}
                    </div>
                    <div style="margin-top: 6px; color: #94a3b8; font-size: 0.88rem; font-style: italic;">
                        💬 {row['explanation']}
                    </div>
                </div>
            """, unsafe_allow_html=True)

    with col_right:
        st.subheader("📊 Dynamic Distribution Metrics")
        
        # Donut Chart - Severity Distribution
        if "severity" in df.columns:
            fig_sev = px.pie(
                df, names="severity", title="Severity Breakdown",
                color="severity",
                color_discrete_map={"Critical": "#ef4444", "Medium": "#f59e0b", "Low": "#10b981"},
                hole=0.5
            )
            fig_sev.update_layout(
                paper_bgcolor="rgba(0,0,0,0)", plot_bgcolor="rgba(0,0,0,0)",
                font_color="#e5e7eb", margin=dict(t=40, b=10, l=10, r=10), height=240
            )
            st.plotly_chart(fig_sev, use_container_width=True)

        # Bar Chart - Energy Status
        if "energy_status" in df.columns:
            fig_eng = px.bar(
                df, x="energy_status", title="Energy Status Counts",
                color="energy_status",
                color_discrete_map={"Over Consumption": "#ef4444", "Normal": "#f59e0b", "Optimized": "#10b981"}
            )
            fig_eng.update_layout(
                paper_bgcolor="rgba(0,0,0,0)", plot_bgcolor="rgba(0,0,0,0)",
                font_color="#e5e7eb", margin=dict(t=40, b=10, l=10, r=10), height=220,
                showlegend=False
            )
            st.plotly_chart(fig_eng, use_container_width=True)

# ================= TAB 2: PLOTLY ANALYTICS =================
with tab2:
    st.subheader("📈 Multi-Dimensional Telemetry & Scatter Analytics")
    
    c_an1, c_an2 = st.columns(2)
    
    with c_an1:
        # Scatter Plot: Energy vs Temperature
        fig_scat = px.scatter(
            df, x="temperature", y="energy_usage",
            size="complaints", color="severity",
            hover_name="facility_id",
            hover_data=["energy_status", "action"],
            title="Energy Usage (kW) vs. Temperature (°C)",
            color_discrete_map={"Critical": "#ef4444", "Medium": "#f59e0b", "Low": "#10b981"},
            size_max=30
        )
        fig_scat.update_layout(
            paper_bgcolor="rgba(15, 23, 42, 0.7)", plot_bgcolor="rgba(15, 23, 42, 0.7)",
            font_color="#e5e7eb", height=380
        )
        st.plotly_chart(fig_scat, use_container_width=True)

    with c_an2:
        # Efficiency Score Distribution
        fig_eff = px.histogram(
            df, x="efficiency_score", nbins=10,
            title="Facility Energy Efficiency Score Distribution",
            color_discrete_sequence=["#38bdf8"]
        )
        fig_eff.update_layout(
            paper_bgcolor="rgba(15, 23, 42, 0.7)", plot_bgcolor="rgba(15, 23, 42, 0.7)",
            font_color="#e5e7eb", height=380
        )
        st.plotly_chart(fig_eff, use_container_width=True)

    # Time-Series History Chart
    history_file = os.path.join(PROJECT_ROOT, "agents", "data", "outputs", "live_history.csv")
    if os.path.exists(history_file):
        try:
            hist_df = pd.read_csv(history_file)
            st.subheader("⚡ Real-Time Streaming Telemetry History")
            fig_hist = px.line(
                hist_df, x="timestamp", y="energy_usage", color="facility_id",
                title="Streaming Energy Consumption (kW) over Time"
            )
            fig_hist.update_layout(
                paper_bgcolor="rgba(15, 23, 42, 0.7)", plot_bgcolor="rgba(15, 23, 42, 0.7)",
                font_color="#e5e7eb", height=350
            )
            st.plotly_chart(fig_hist, use_container_width=True)
        except Exception as e:
            st.warning(f"Live history streaming preview unavailable: {e}")

# ================= TAB 3: IOT ANOMALY SIMULATOR =================
with tab3:
    st.subheader("🕹️ Live Anomaly & Stress Testing Center")
    st.write("Inject simulated real-time anomalies to test how the Multi-Agent system responds in real-time:")
    
    sim_col1, sim_col2, sim_col3 = st.columns(3)
    
    with sim_col1:
        st.markdown("### ⚡ Energy Spike Test")
        st.caption("Simulates a power surge or chiller failure.")
        if st.button("Trigger Power Surge", key="btn_spike"):
            generate_telemetry_tick(anomaly_facility=target_entity, anomaly_type="ENERGY_SPIKE")
            st.success(f"Power surge injected into {target_entity}!")
            st.rerun()

    with sim_col2:
        st.markdown("### 🚨 Complaint Burst")
        st.caption("Simulates a surge in tenant discomfort tickets.")
        if st.button("Trigger Ticket Burst", key="btn_burst"):
            generate_telemetry_tick(anomaly_facility=target_entity, anomaly_type="COMPLAINT_BURST")
            st.success(f"Ticket burst injected into {target_entity}!")
            st.rerun()

    with sim_col3:
        st.markdown("### 🔥 HVAC Compressor Failure")
        st.caption("Simulates an HVAC unit failure with heat spike.")
        if st.button("Trigger HVAC Failure", key="btn_hvac"):
            generate_telemetry_tick(anomaly_facility=target_entity, anomaly_type="HVAC_FAILURE")
            st.error(f"HVAC Failure injected into {target_entity}!")
            st.rerun()

# ================= TAB 4: DATA EXPLORER & EXPORT =================
with tab4:
    st.subheader("📋 Complete Multi-Agent Processed Dataset")
    
    # Table Filter Controls
    search_term = st.text_input("🔍 Search Dataset", "")
    if search_term:
        disp_df = df[df.astype(str).apply(lambda row: row.str.contains(search_term, case=False).any(), axis=1)]
    else:
        disp_df = df

    st.dataframe(disp_df, use_container_width=True)

    # Export Processed Dataset Button
    csv_data = disp_df.to_csv(index=False).encode('utf-8')
    st.download_button(
        label="📥 Download Processed Multi-Agent CSV",
        data=csv_data,
        file_name=f"facility_multi_agent_results_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv",
        mime="text/csv"
    )

# Auto Refresh Execution Loop
if auto_refresh:
    time.sleep(refresh_rate)
    generate_telemetry_tick()
    st.rerun()
