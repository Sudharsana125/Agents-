def generate_insights(df):
    return {
        "Total Facilities": len(df),
        "Critical Cases": (df["severity"] == "Critical").sum(),
        "Over Energy Use": (df["energy_status"] == "Over Consumption").sum()
    }
