# 🏢 Real-Time Multi-Agent Smart Facility AI

An intelligent real-time multi-agent AI system for continuous facility monitoring, IoT telemetry ingestion, complaint severity classification, energy usage optimization, automated control actions, and interactive live dashboards.

---

## 📌 Real-Time Architecture Features

- **⚡ Real-Time IoT Telemetry Streamer (`simulator.py`)**: Continuously simulates live facility sensors (Energy kW, Temperature °C, HVAC status, Occupancy count, Tenant complaints) with real-time anomaly injection capabilities.
- **🤖 Real-Time Multi-Agent Engine (`realtime_engine.py`)**:
  - **`data_agent.py`**: Manages real-time data buffer ingestion and rolling time-window queries.
  - **`complaint_severity_agent.py`**: Evaluates live complaint bursts and sentiment.
  - **`energy_optimization_agent.py`**: Computes dynamic thermal-occupancy efficiency scores.
  - **`decision_agent.py`**: Automates real-time operational control actions (e.g. emergency dispatch, thermostat adjustments, load shedding).
  - **`insight_agent.py`**: Computes real-time facility health scores and aggregate KPIs.
  - **`llm_explanation_agent.py`**: Generates context-aware natural language decision rationale.
- **📊 Interactive Real-Time Dashboard (`app.py`)**: Live auto-refreshing interface (1s - 10s toggle) featuring KPI metric cards, streaming time-series charts, active critical decision feed, and 1-click anomaly injection controls.
- **🌐 Real-Time FastAPI Backend (`api_server.py`)**: High-performance REST API endpoints for live telemetry ingestion, alert streaming, and automated tick triggering.

---

## 📁 Repository Structure

```text
SMART FACILITY/
├── agents/
│   ├── data/
│   │   ├── facility_data.csv          # Base facility dataset
│   │   ├── live_facility_stream.csv   # Live streaming IoT telemetry buffer
│   │   └── outputs/
│   │       ├── facility_predictions.csv  # Latest multi-agent evaluation output
│   │       ├── live_history.csv       # Rolling time-series history for charts
│   │       └── dashboard/
│   │           └── app.py             # Streamlit real-time dashboard application
│   ├── complaint_severity_agent.py    # Complaint severity classification agent
│   ├── data_agent.py                  # Live telemetry ingestion agent
│   ├── decision_agent.py              # Real-time automated control & dispatch agent
│   ├── energy_optimization_agent.py   # Real-time thermal-energy optimization agent
│   ├── insight_agent.py               # Aggregation & facility health score agent
│   ├── learning_agent.py              # Adaptive learning agent
│   ├── llm_explanation_agent.py       # Real-time alert explanation agent
│   └── main.py                        # Internal pipeline entrypoint
├── api_server.py                      # FastAPI REST API server
├── main.py                            # Real-Time Multi-Agent execution entrypoint
├── realtime_engine.py                 # Core real-time multi-agent processing engine
├── simulator.py                       # Real-Time IoT telemetry & anomaly simulator
├── README.md                          # Project documentation
└── .gitignore                         # Ignored files & directories
```

---

## ⚙️ Installation & Setup

### 1. Prerequisites
- Python 3.9+
- Git

### 2. Install Dependencies
```bash
pip install pandas streamlit fastapi uvicorn
```

---

## 🚀 Quick Start Guide

### 1. Run Real-Time Multi-Agent Pipeline
Execute a real-time multi-agent pass across current telemetry feeds:
```bash
python main.py
```

### 2. Launch Real-Time Auto-Refreshing Dashboard
Launch the interactive Streamlit dashboard to monitor live telemetry, view streaming time-series charts, and inject anomalies live:
```bash
streamlit run agents/data/outputs/dashboard/app.py
```

### 3. Launch Real-Time FastAPI Server
Start the REST API server for IoT telemetry ingestion:
```bash
python api_server.py
```
*API docs available at `http://localhost:8000/docs`.*

### 4. Run Standalone Real-Time IoT Simulator
To continuously stream live telemetry updates every 3 seconds:
```bash
python simulator.py
```

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
