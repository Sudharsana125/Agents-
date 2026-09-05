# 🏢 Smart Facility Management AI

An intelligent multi-agent AI system for automated facility monitoring, complaint severity classification, energy usage optimization, and actionable maintenance insights with an interactive Streamlit dashboard.

---

## 📌 Features

- **🤖 Multi-Agent Architecture**: Modular AI agents responsible for data ingestion, complaint analysis, energy optimization, decision support, and AI explanation generation.
- **🚨 Complaint Severity Classification**: Automatically categorizes tenant/facility complaints into severity levels (`Low`, `Medium`, `Critical`) to prioritize maintenance.
- **⚡ Energy Optimization Monitoring**: Analyzes facility energy usage metrics to identify inefficiencies and flag high consumption.
- **🧠 AI Explanations & Insights**: Generates readable explanations and actionable recommendations for facility managers.
- **📊 Interactive Streamlit Dashboard**: Filter and explore facility predictions, complaint severity metrics, and AI recommendations visually.

---

## 📁 Repository Structure

```text
SMART FACILITY/
├── agents/
│   ├── data/
│   │   ├── facility_data.csv          # Input facility dataset
│   │   └── outputs/
│   │       ├── facility_predictions.csv  # Generated predictions output
│   │       └── dashboard/
│   │           └── app.py             # Streamlit dashboard application
│   ├── complaint_severity_agent.py    # Classifies complaint severity
│   ├── data_agent.py                  # Ingests & queries facility data
│   ├── decision_agent.py              # Decision logic agent
│   ├── energy_optimization_agent.py   # Analyzes energy usage status
│   ├── insight_agent.py               # Derives facility insights
│   ├── learning_agent.py              # Facility learning/adaptation agent
│   ├── llm_explanation_agent.py       # Generates AI explanations
│   └── main.py                        # Pipeline entrypoint (agents folder)
├── .gitignore                         # Ignored files & directories
├── main.py                            # Main pipeline execution entrypoint
└── README.md                          # Project documentation
```

---

## ⚙️ Installation & Setup

### 1. Prerequisites
- Python 3.9+
- Git

### 2. Clone Repository
```bash
git clone https://github.com/Sudharsana125/Agents-.git
cd Agents-
```

### 3. Install Dependencies
Install required packages using pip:
```bash
pip install pandas streamlit
```

---

## 🚀 Usage

### Run AI Processing Pipeline
Execute the main pipeline to load facility data, evaluate complaint severity and energy consumption, generate explanations, and save predictions:

```bash
python main.py
```
*Output CSV will be saved to `agents/data/outputs/facility_predictions.csv`.*

### Launch Streamlit Dashboard
Launch the interactive web application to visualize data and filter by severity levels:

```bash
streamlit run agents/data/outputs/dashboard/app.py
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to enhance agent capability, add features, or improve dashboard visualizations.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
