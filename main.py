import pandas as pd
from agents.data_agent import load_data
from agents.complaint_severity_agent import assign_severity
from agents.energy_optimization_agent import energy_status
from agents.llm_explanation_agent import explain

def main():
    df = load_data()

    df["severity"] = df["complaints"].apply(assign_severity)
    df["energy_status"] = df["energy_usage"].apply(energy_status)
    df["explanation"] = df.apply(explain, axis=1)

    df.to_csv("agents/data/outputs/facility_predictions.csv", index=False)
    print("AI Processing Completed Successfully")

if __name__ == "__main__":
    main()
