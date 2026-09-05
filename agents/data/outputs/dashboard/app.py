import os
import sys
import time
from datetime import datetime

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

import importlib
import realtime_engine
import simulator
try:
    import agents.data_agent as data_agent_mod
except ImportError:
    import data_agent as data_agent_mod

importlib.reload(realtime_engine)
importlib.reload(simulator)
importlib.reload(data_agent_mod)

from realtime_engine import process_realtime_tick
from simulator import generate_telemetry_tick, STREAM_FILE
auto_detect_columns = data_agent_mod.auto_detect_columns

import streamlit as st
import pandas as pd
import numpy as np
import plotly.express as px
import plotly.graph_objects as go

# ---------------------------------------------------------
# Page Configuration
# ---------------------------------------------------------
st.set_page_config(
    page_title="Smart Facility AI Hub",
    page_icon="🏢",
    layout="wide",
    initial_sidebar_state="expanded"
)

# ---------------------------------------------------------
# Custom CSS Design System matching exact mockup specs
# ---------------------------------------------------------
st.markdown("""
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
    
    * {
        font-family: 'Inter', sans-serif;
    }
    
    .stApp {
        background-color: #0b0e17;
        color: #e2e8f0;
    }
    
    /* Top Header Navbar */
    .top-navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 24px;
        background: #111625;
        border-bottom: 1px solid #1e2638;
        border-radius: 12px;
        margin-bottom: 20px;
    }
    .brand-title {
        font-size: 1.4rem;
        font-weight: 700;
        color: #ffffff;
        display: flex;
        align-items: center;
        gap: 8px;
    }
    .brand-subtitle {
        font-size: 0.75rem;
        color: #64748b;
    }
    .time-badge {
        font-size: 0.8rem;
        color: #94a3b8;
        background: #1a2234;
        padding: 6px 14px;
        border-radius: 8px;
        border: 1px solid #28344e;
    }
    
    /* Hero Welcome Banner */
    .hero-banner {
        position: relative;
        background: linear-gradient(135deg, #151c2e 0%, #1e293b 100%);
        border-radius: 16px;
        padding: 24px 30px;
        border: 1px solid #26334d;
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        overflow: hidden;
    }
    .hero-text h2 {
        font-size: 1.8rem;
        font-weight: 700;
        color: #ffffff;
        margin: 0 0 6px 0;
    }
    .hero-text p {
        color: #94a3b8;
        font-size: 0.95rem;
        margin: 0 0 16px 0;
    }
    .action-btn-group {
        display: flex;
        gap: 12px;
    }
    .hero-quote {
        font-style: italic;
        color: #64748b;
        font-size: 0.85rem;
        max-width: 200px;
        text-align: right;
    }

    /* 4 Stat Summary Cards */
    .stat-card {
        background: #111625;
        border: 1px solid #1e293b;
        border-radius: 14px;
        padding: 18px 22px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }
    .stat-card-purple { border-left: 4px solid #6366f1; }
    .stat-card-green { border-left: 4px solid #10b981; }
    .stat-card-orange { border-left: 4px solid #f59e0b; }
    .stat-card-pink { border-left: 4px solid #ec4899; }

    .stat-number {
        font-size: 1.8rem;
        font-weight: 700;
        color: #ffffff;
        margin-top: 4px;
    }
    .stat-label {
        font-size: 0.82rem;
        color: #94a3b8;
        font-weight: 500;
    }
    .stat-delta {
        font-size: 0.75rem;
        font-weight: 600;
        padding: 2px 8px;
        border-radius: 12px;
        margin-left: 8px;
    }
    .delta-up { background: rgba(16, 185, 129, 0.15); color: #34d399; }
    .link-text {
        font-size: 0.78rem;
        color: #38bdf8;
        cursor: pointer;
        text-decoration: none;
    }

    /* Card Panels */
    .panel-box {
        background: #111625;
        border: 1px solid #1e2638;
        border-radius: 14px;
        padding: 20px;
        margin-bottom: 20px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    }
    .panel-title {
        font-size: 1.05rem;
        font-weight: 600;
        color: #f1f5f9;
        margin-bottom: 14px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    /* Priority Badges */
    .p-high { background: rgba(239, 68, 68, 0.2); color: #f87171; border: 1px solid #ef4444; padding: 2px 8px; border-radius: 6px; font-size: 0.75rem; }
    .p-med { background: rgba(245, 158, 11, 0.2); color: #fbbf24; border: 1px solid #f59e0b; padding: 2px 8px; border-radius: 6px; font-size: 0.75rem; }
    .p-low { background: rgba(16, 185, 129, 0.2); color: #34d399; border: 1px solid #10b981; padding: 2px 8px; border-radius: 6px; font-size: 0.75rem; }

    /* Status Badges */
    .st-pending { background: rgba(239, 68, 68, 0.15); color: #f87171; padding: 2px 8px; border-radius: 6px; font-size: 0.75rem; }
    .st-progress { background: rgba(56, 189, 248, 0.15); color: #38bdf8; padding: 2px 8px; border-radius: 6px; font-size: 0.75rem; }
    .st-completed { background: rgba(16, 185, 129, 0.15); color: #34d399; padding: 2px 8px; border-radius: 6px; font-size: 0.75rem; }

    /* Live IoT Sensor Mini Card */
    .sensor-card {
        background: #182032;
        border: 1px solid #232e48;
        border-radius: 10px;
        padding: 14px;
        margin-bottom: 10px;
    }
    .sensor-val {
        font-size: 1.3rem;
        font-weight: 700;
        color: #ffffff;
    }
    .sensor-lbl {
        font-size: 0.8rem;
        color: #94a3b8;
    }

    /* AI Chat Assistant Container */
    .ai-chat-box {
        background: #141b2d;
        border: 1px solid #222d47;
        border-radius: 12px;
        padding: 16px;
    }
    .chip-btn {
        background: #1c263d;
        border: 1px solid #2e3d61;
        color: #38bdf8;
        border-radius: 16px;
        padding: 4px 12px;
        font-size: 0.78rem;
        margin: 4px 2px;
        cursor: pointer;
        display: inline-block;
    }

    /* Sidebar Profile Card */
    .user-profile-card {
        background: #182032;
        border: 1px solid #232e48;
        border-radius: 12px;
        padding: 12px;
        margin-top: 20px;
        display: flex;
        align-items: center;
        gap: 12px;
    }
    .avatar {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: linear-gradient(135deg, #6366f1, #a855f7);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        color: white;
    }
    </style>
""", unsafe_allow_html=True)

# ---------------------------------------------------------
# Sidebar Navigation & Dataset Handling
# ---------------------------------------------------------
st.sidebar.markdown("""
    <div style="font-size: 1.2rem; font-weight: 700; color: #ffffff; margin-bottom: 4px;">🏢 Smart Facility</div>
    <div style="font-size: 0.75rem; color: #38bdf8; margin-bottom: 20px;">AI Hub • Monitoring Platform</div>
""", unsafe_allow_html=True)

nav_page = st.sidebar.radio(
    "Navigation Menu",
    [
        "📊 Dashboard",
        "🏢 Facility Overview",
        "🛠️ Maintenance",
        "📡 IoT Live Data",
        "📈 Analytics",
        "🤖 AI Assistant",
        "📁 Reports",
        "💾 Dataset",
        "⚙️ Settings"
    ],
    label_visibility="collapsed"
)

st.sidebar.markdown("---")
st.sidebar.caption("📁 Dataset & File Upload")
uploaded_file = st.sidebar.file_uploader("Upload Custom CSV", type=["csv"])

raw_df = None
if uploaded_file is not None:
    try:
        raw_df = pd.read_csv(uploaded_file)
        st.sidebar.success(f"Loaded '{uploaded_file.name}'")
    except Exception as e:
        st.sidebar.error(f"Upload error: {e}")

if raw_df is None:
    if not os.path.exists(STREAM_FILE):
        generate_telemetry_tick()
    raw_df = pd.read_csv(STREAM_FILE)

# Auto Column Mapping
detected_map = auto_detect_columns(raw_df)

with st.sidebar.expander("🛠️ Column Mapper", expanded=False):
    all_cols = ["-- None --"] + list(raw_df.columns)
    def g_idx(k):
        v = detected_map.get(k)
        return all_cols.index(v) if v in all_cols else 0
    
    c_id = st.selectbox("Facility ID", all_cols, index=g_idx("id_col"))
    c_comp = st.selectbox("Complaints", all_cols, index=g_idx("complaints_col"))
    c_eng = st.selectbox("Energy Usage", all_cols, index=g_idx("energy_col"))
    c_temp = st.selectbox("Temperature", all_cols, index=g_idx("temp_col"))

    custom_map = {
        "id_col": None if c_id == "-- None --" else c_id,
        "complaints_col": None if c_comp == "-- None --" else c_comp,
        "energy_col": None if c_eng == "-- None --" else c_eng,
        "temp_col": None if c_temp == "-- None --" else c_temp
    }

# Execute Multi-Agent Engine Pass
df, insights, final_map = process_realtime_tick(input_df=raw_df, col_mapping=custom_map)

# Sidebar Help Box & Profile
st.sidebar.markdown("""
    <div style="background: #141b2d; border: 1px solid #222d47; border-radius: 12px; padding: 14px; margin-top: 15px; text-align: center;">
        <div style="font-size: 1.2rem; margin-bottom: 4px;">🎧</div>
        <div style="font-weight: 600; font-size: 0.85rem; color: #ffffff;">Need Help?</div>
        <div style="font-size: 0.75rem; color: #94a3b8; margin-bottom: 10px;">Our AI assistant is here for you 24/7</div>
    </div>
""", unsafe_allow_html=True)
if st.sidebar.button("💬 Chat Now", use_container_width=True):
    st.session_state["nav_override"] = "🤖 AI Assistant"

st.sidebar.markdown("""
    <div class="user-profile-card">
        <div class="avatar">SK</div>
        <div>
            <div style="font-weight: 600; font-size: 0.85rem; color: #ffffff;">Sudharsana K</div>
            <div style="font-size: 0.72rem; color: #64748b;">Facility Manager</div>
        </div>
    </div>
""", unsafe_allow_html=True)

# ---------------------------------------------------------
# Top Header Navbar
# ---------------------------------------------------------
cur_time_str = datetime.now().strftime("%a, %d %b %Y | %I:%M %p")

header_col1, header_col2, header_col3 = st.columns([2.5, 2, 1.5])
with header_col1:
    st.markdown(f"""
        <div class="brand-title">
            🏢 Smart Facility <span style="color: #38bdf8;">AI Hub</span>
        </div>
        <div class="brand-subtitle">Monitor • Predict • Manage • Smarter Facilities</div>
    """, unsafe_allow_html=True)
with header_col2:
    search_q = st.text_input("Search facilities, issues...", placeholder="🔍 Search facilities, issues, or locations...", label_visibility="collapsed")
with header_col3:
    st.markdown(f"""
        <div style="text-align: right;">
            <span class="time-badge">🕒 {cur_time_str}</span>
        </div>
    """, unsafe_allow_html=True)

st.markdown("<br/>", unsafe_allow_html=True)

# Handle Session State Navigation
if "chat_history" not in st.session_state:
    st.session_state["chat_history"] = [
        {"role": "assistant", "content": "Hi! I'm your Facility AI Assistant. How can I help you manage your facilities today?"}
    ]

# =========================================================
# PAGE 1: 📊 DASHBOARD (Main View matching Mockup)
# =========================================================
if nav_page == "📊 Dashboard":

    # Hero Welcome Banner
    st.markdown("""
        <div class="hero-banner">
            <div class="hero-text">
                <h2>Welcome Back, Sudharsana! 👋</h2>
                <p>Smarter Facilities. Healthier Spaces. Happier People.</p>
            </div>
            <div class="hero-quote">
                "Well-maintained spaces build brighter tomorrows."
            </div>
        </div>
    """, unsafe_allow_html=True)

    # Quick Action Buttons
    act_col1, act_col2, act_col3, act_col4 = st.columns(4)
    with act_col1:
        if st.button("➕ Add Complaint", use_container_width=True):
            st.toast("Opening complaint intake form...")
    with act_col2:
        if st.button("🏢 View Facilities", use_container_width=True):
            st.toast("Navigating to Facility Overview...")
    with act_col3:
        if st.button("📡 Live IoT Data", use_container_width=True):
            st.toast("Telemetry Stream Active!")
    with act_col4:
        if st.button("📄 Generate Report", use_container_width=True):
            st.toast("Facility report generated successfully!")

    st.markdown("<br/>", unsafe_allow_html=True)

    # 4 Stat Summary Metric Cards
    s_col1, s_col2, s_col3, s_col4 = st.columns(4)
    
    total_fac_cnt = len(df)
    total_comp_cnt = int(df["complaints"].sum())
    pending_cnt = int((df["severity"] == "Critical").sum() + (df["severity"] == "Medium").sum())
    completed_cnt = max(0, total_comp_cnt - pending_cnt + 24)

    with s_col1:
        st.markdown(f"""
            <div class="stat-card stat-card-purple">
                <div>
                    <div class="stat-label">Total Facilities</div>
                    <div class="stat-number">{total_fac_cnt} <span class="stat-delta delta-up">↑ 4%</span></div>
                </div>
                <div style="font-size: 1.8rem;">🏢</div>
            </div>
        """, unsafe_allow_html=True)

    with s_col2:
        st.markdown(f"""
            <div class="stat-card stat-card-green">
                <div>
                    <div class="stat-label">Total Complaints</div>
                    <div class="stat-number">{total_comp_cnt} <span class="stat-delta delta-up">↑ 12%</span></div>
                </div>
                <div style="font-size: 1.8rem;">🔧</div>
            </div>
        """, unsafe_allow_html=True)

    with s_col3:
        st.markdown(f"""
            <div class="stat-card stat-card-orange">
                <div>
                    <div class="stat-label">Pending Requests</div>
                    <div class="stat-number">{pending_cnt} <span class="stat-delta delta-up">↑ 8%</span></div>
                </div>
                <div style="font-size: 1.8rem;">🕒</div>
            </div>
        """, unsafe_allow_html=True)

    with s_col4:
        st.markdown(f"""
            <div class="stat-card stat-card-pink">
                <div>
                    <div class="stat-label">Completed Requests</div>
                    <div class="stat-number">{completed_cnt} <span class="stat-delta delta-up">↑ 20%</span></div>
                </div>
                <div style="font-size: 1.8rem;">✅</div>
            </div>
        """, unsafe_allow_html=True)

    st.markdown("<br/>", unsafe_allow_html=True)

    # Middle Row: Complaints Trend Line Chart | Facility Type Distribution | Facility Locations Map
    m_col1, m_col2, m_col3 = st.columns([1.5, 1.1, 1.2])

    with m_col1:
        st.markdown('<div class="panel-box">', unsafe_allow_html=True)
        st.markdown('<div class="panel-title"><span>Complaints Trend</span> <span style="font-size: 0.8rem; color:#94a3b8;">Last 30 Days</span></div>', unsafe_allow_html=True)
        
        # Smooth Gradient Line Chart for Complaints Trend
        dates = pd.date_range(end=datetime.now(), periods=15, freq="2D").strftime("%b %d")
        trend_vals = [8, 12, 10, 15, 18, 14, 22, 28, 20, 25, 30, 26, 34, 38, 45]
        
        fig_trend = go.Figure()
        fig_trend.add_trace(go.Scatter(
            x=dates, y=trend_vals,
            mode='lines+markers',
            line=dict(color='#818cf8', width=3, shape='spline'),
            fill='tozeroy',
            fillcolor='rgba(99, 102, 241, 0.15)',
            marker=dict(size=6, color='#c084fc')
        ))
        fig_trend.update_layout(
            paper_bgcolor='rgba(0,0,0,0)',
            plot_bgcolor='rgba(0,0,0,0)',
            font=dict(color='#94a3b8', size=11),
            margin=dict(l=10, r=10, t=10, b=10),
            height=230,
            xaxis=dict(showgrid=False),
            yaxis=dict(showgrid=True, gridcolor='#1e293b')
        )
        st.plotly_chart(fig_trend, use_container_width=True)
        st.markdown('</div>', unsafe_allow_html=True)

    with m_col2:
        st.markdown('<div class="panel-box">', unsafe_allow_html=True)
        st.markdown('<div class="panel-title">Facility Type Distribution</div>', unsafe_allow_html=True)
        
        # Donut Chart for Facility Types
        types_df = pd.DataFrame({
            "Type": ["Academic", "Residential", "Administrative", "Sports", "Library", "Others"],
            "Count": [8, 5, 4, 3, 3, 2]
        })
        fig_donut = px.pie(
            types_df, names="Type", values="Count",
            hole=0.6,
            color_discrete_sequence=["#6366f1", "#38bdf8", "#34d399", "#f59e0b", "#ec4899", "#a855f7"]
        )
        fig_donut.update_layout(
            paper_bgcolor='rgba(0,0,0,0)',
            plot_bgcolor='rgba(0,0,0,0)',
            font=dict(color='#94a3b8', size=10),
            margin=dict(l=10, r=10, t=10, b=10),
            height=230,
            showlegend=True,
            legend=dict(orientation="v", y=0.5, font=dict(size=10))
        )
        st.plotly_chart(fig_donut, use_container_width=True)
        st.markdown('</div>', unsafe_allow_html=True)

    with m_col3:
        st.markdown('<div class="panel-box">', unsafe_allow_html=True)
        st.markdown('<div class="panel-title">Facility Locations Pin Map</div>', unsafe_allow_html=True)
        
        # Interactive Scatter Mapbox
        map_data = pd.DataFrame({
            'Facility': ['Main Block', 'Library', 'Hostel A', 'Sports Complex', 'Admin Block'],
            'lat': [13.0827, 13.0850, 13.0810, 13.0870, 13.0840],
            'lon': [80.2707, 80.2720, 80.2690, 80.2750, 80.2710],
            'Complaints': [5, 2, 8, 1, 4]
        })
        fig_map = px.scatter_mapbox(
            map_data, lat="lat", lon="lon", hover_name="Facility", hover_data=["Complaints"],
            color="Complaints", size="Complaints",
            color_continuous_scale="Viridis", size_max=15, zoom=13
        )
        fig_map.update_layout(
            mapbox_style="carto-darkmatter",
            paper_bgcolor='rgba(0,0,0,0)',
            margin=dict(l=0, r=0, t=0, b=0),
            height=230
        )
        st.plotly_chart(fig_map, use_container_width=True)
        st.markdown('</div>', unsafe_allow_html=True)

    st.markdown("<br/>", unsafe_allow_html=True)

    # Bottom Row: Maintenance Requests Table | Live IoT Mini Widgets | AI Assistant Box
    b_col1, b_col2, b_col3 = st.columns([1.5, 1.1, 1.2])

    with b_col1:
        st.markdown('<div class="panel-box">', unsafe_allow_html=True)
        st.markdown('<div class="panel-title"><span>Recent Maintenance Requests</span> <span class="link-text">View All →</span></div>', unsafe_allow_html=True)
        
        # Interactive Maintenance Requests Table
        maint_data = [
            {"ID": "#1001", "Facility": "Main Block", "Issue": "AC Not Working", "Priority": "High", "Status": "Pending", "Date": "2026-06-13"},
            {"ID": "#1002", "Facility": "Library", "Issue": "Lights Flickering", "Priority": "Medium", "Status": "In Progress", "Date": "2026-06-12"},
            {"ID": "#1003", "Facility": "Hostel A", "Issue": "Water Leakage", "Priority": "High", "Status": "Completed", "Date": "2026-06-12"},
            {"ID": "#1004", "Facility": "Admin Block", "Issue": "Elevator Maintenance", "Priority": "Medium", "Status": "Pending", "Date": "2026-06-11"},
            {"ID": "#1005", "Facility": "Sports Complex", "Issue": "HVAC Servicing", "Priority": "Low", "Status": "Completed", "Date": "2026-06-11"},
        ]
        
        # Display formatted HTML table
        rows_html = ""
        for r in maint_data:
            p_class = "p-high" if r["Priority"] == "High" else ("p-med" if r["Priority"] == "Medium" else "p-low")
            s_class = "st-pending" if r["Status"] == "Pending" else ("st-progress" if r["Status"] == "In Progress" else "st-completed")
            rows_html += f"""
                <tr style="border-bottom: 1px solid #1a2336;">
                    <td style="padding: 10px; font-weight: 600; color: #94a3b8;">{r['ID']}</td>
                    <td style="padding: 10px; color: #f1f5f9;">{r['Facility']}</td>
                    <td style="padding: 10px; color: #cbd5e1;">{r['Issue']}</td>
                    <td style="padding: 10px;"><span class="{p_class}">{r['Priority']}</span></td>
                    <td style="padding: 10px;"><span class="{s_class}">{r['Status']}</span></td>
                    <td style="padding: 10px; color: #64748b; font-size: 0.8rem;">{r['Date']}</td>
                </tr>
            """
        
        st.markdown(f"""
            <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.85rem;">
                <thead>
                    <tr style="border-bottom: 2px solid #232e48; color: #64748b;">
                        <th style="padding: 8px;">ID</th>
                        <th style="padding: 8px;">Facility</th>
                        <th style="padding: 8px;">Issue</th>
                        <th style="padding: 8px;">Priority</th>
                        <th style="padding: 8px;">Status</th>
                        <th style="padding: 8px;">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {rows_html}
                </tbody>
            </table>
        """, unsafe_allow_html=True)
        st.markdown('</div>', unsafe_allow_html=True)

    with b_col2:
        st.markdown('<div class="panel-box">', unsafe_allow_html=True)
        st.markdown('<div class="panel-title"><span>Live IoT Sensor Data</span> <span class="link-text">View All →</span></div>', unsafe_allow_html=True)
        
        avg_t = round(float(df["temperature"].mean()), 1) if "temperature" in df.columns else 24.0
        avg_e = round(float(df["energy_usage"].mean()), 1) if "energy_usage" in df.columns else 19.8
        avg_o = int(df["occupancy"].mean()) if "occupancy" in df.columns else 40

        # Mini Sensor Widgets
        st.markdown(f"""
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                <div class="sensor-card">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span class="sensor-lbl">🌡️ Temperature</span>
                        <span style="font-size:0.7rem; color:#34d399;">Normal</span>
                    </div>
                    <div class="sensor-val">{avg_t} °C</div>
                </div>
                <div class="sensor-card">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span class="sensor-lbl">⚡ Energy Usage</span>
                        <span style="font-size:0.7rem; color:#f87171;">+5%</span>
                    </div>
                    <div class="sensor-val">{avg_e} kWh</div>
                </div>
                <div class="sensor-card">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span class="sensor-lbl">👥 Occupancy</span>
                        <span style="font-size:0.7rem; color:#34d399;">Normal</span>
                    </div>
                    <div class="sensor-val">{avg_o}</div>
                </div>
                <div class="sensor-card">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span class="sensor-lbl">🍃 Air Quality</span>
                        <span style="font-size:0.7rem; color:#34d399;">Good</span>
                    </div>
                    <div class="sensor-val">AQI 42</div>
                </div>
            </div>
        """, unsafe_allow_html=True)
        st.markdown('</div>', unsafe_allow_html=True)

    with b_col3:
        st.markdown('<div class="panel-box">', unsafe_allow_html=True)
        st.markdown('<div class="panel-title">🤖 AI Assistant <span style="font-size:0.7rem; background:#0284c7; color:white; padding:2px 6px; border-radius:4px;">Beta</span></div>', unsafe_allow_html=True)
        
        st.markdown("""
            <div style="font-size: 0.82rem; color: #cbd5e1; margin-bottom: 8px;">
                Hi! I'm your Facility AI Assistant. You can ask me things like:
            </div>
        """, unsafe_allow_html=True)

        chip_col1, chip_col2 = st.columns(2)
        with chip_col1:
            if st.button("📌 Pending complaints"):
                st.session_state["user_msg"] = "Show pending complaints"
        with chip_col2:
            if st.button("⚡ Highest energy usage"):
                st.session_state["user_msg"] = "Which facility has highest energy usage?"

        user_input = st.text_input("Ask AI Assistant...", value=st.session_state.get("user_msg", ""), placeholder="Type your question...", key="ai_input_box")
        
        if user_input:
            if "highest energy" in user_input.lower():
                max_row = df.loc[df["energy_usage"].idxmax()]
                ans = f"Facility **{max_row['facility_id']}** has the highest energy consumption of **{max_row['energy_usage']} kW** ({max_row['energy_status']}). Action: {max_row.get('action', 'N/A')}"
            elif "pending" in user_input.lower():
                crit_cnt = (df['severity'] == 'Critical').sum()
                ans = f"There are **{crit_cnt} critical priority** and **{(df['severity']=='Medium').sum()} medium priority** pending maintenance requests."
            else:
                ans = f"Multi-Agent Evaluation for Facilities: Evaluated {len(df)} facilities. System Health Score: {insights['Facility Health Score']}/100."
            
            st.info(ans)

        st.markdown('</div>', unsafe_allow_html=True)

# =========================================================
# OTHER PAGES (Facility Overview, Maintenance, Analytics, etc.)
# =========================================================
elif nav_page == "🏢 Facility Overview":
    st.subheader("🏢 Facility Overview & Individual Deep-Dive Inspector")
    
    selected_facility = st.selectbox("Select Facility Entity", df["facility_id"].tolist())
    fac_row = df[df["facility_id"] == selected_facility].iloc[0]

    fc1, fc2, fc3 = st.columns(3)
    with fc1:
        st.metric("Energy Usage", f"{fac_row['energy_usage']} kW", delta=fac_row['energy_status'])
    with fc2:
        st.metric("Ambient Temp", f"{fac_row.get('temperature', 24.0)} °C")
    with fc3:
        st.metric("Severity Level", fac_row['severity'])

    st.markdown("### 🤖 Multi-Agent Recommendation & Diagnosis")
    st.info(f"**Action:** {fac_row.get('action', 'AUTO MAINTAIN')}\n\n**Rationale:** {fac_row['explanation']}")

elif nav_page == "🛠️ Maintenance":
    st.subheader("🛠️ Maintenance Requests & Work Orders")
    st.dataframe(df[["facility_id", "complaints", "severity", "action", "explanation"]], use_container_width=True)

elif nav_page == "📡 IoT Live Data":
    st.subheader("📡 Real-Time IoT Telemetry Streamer")
    st.write("Streaming live telemetry updates from facilities...")
    st.dataframe(df, use_container_width=True)

elif nav_page == "📈 Analytics":
    st.subheader("📈 Multi-Dimensional Analytics")
    fig = px.scatter(df, x="temperature", y="energy_usage", color="severity", size="complaints", hover_name="facility_id")
    st.plotly_chart(fig, use_container_width=True)

elif nav_page == "🤖 AI Assistant":
    st.subheader("🤖 Smart Facility AI Chat Assistant")
    for msg in st.session_state["chat_history"]:
        st.chat_message(msg["role"]).write(msg["content"])
    
    prompt = st.chat_input("Ask any question about your facilities...")
    if prompt:
        st.session_state["chat_history"].append({"role": "user", "content": prompt})
        st.chat_message("user").write(prompt)
        
        reply = f"AI Multi-Agent Response: Facility Health is {insights['Facility Health Score']}/100. Total {insights['Critical Cases']} critical alerts pending."
        st.session_state["chat_history"].append({"role": "assistant", "content": reply})
        st.chat_message("assistant").write(reply)

elif nav_page == "📁 Reports":
    st.subheader("📁 Facility Performance Reports")
    csv_bytes = df.to_csv(index=False).encode('utf-8')
    st.download_button("📥 Download Facility Analytics Report (CSV)", csv_bytes, "facility_report.csv", "text/csv")

elif nav_page == "💾 Dataset":
    st.subheader("💾 Raw Dataset Explorer & Mapper")
    st.dataframe(df, use_container_width=True)

elif nav_page == "⚙️ Settings":
    st.subheader("⚙️ System Settings & Preferences")
    st.write("Configure IoT refresh intervals, notification thresholds, and model parameters.")
