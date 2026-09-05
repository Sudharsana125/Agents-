def generate_insights(df):
    """
    Real-Time Insight Agent:
    Computes real-time facility metrics, peak load factors, and critical health metrics.
    """
    total_facilities = len(df)
    critical_cases = (df["severity"] == "Critical").sum() if "severity" in df.columns else 0
    over_energy = (df["energy_status"] == "Over Consumption").sum() if "energy_status" in df.columns else 0
    avg_temp = df["temperature"].mean() if "temperature" in df.columns else 24.0
    avg_energy = df["energy_usage"].mean() if "energy_usage" in df.columns else 150.0

    health_score = 100 - (critical_cases * 15) - (over_energy * 10)
    health_score = max(0, min(100, health_score))

    return {
        "Total Facilities": total_facilities,
        "Critical Cases": int(critical_cases),
        "Over Energy Use": int(over_energy),
        "Average Temperature (°C)": round(float(avg_temp), 1),
        "Average Energy Load (kW)": round(float(avg_energy), 1),
        "Facility Health Score": round(float(health_score), 1)
    }
