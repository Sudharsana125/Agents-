def explain(row):
    """
    Real-Time LLM Explanation Agent:
    Generates natural language explanations and diagnostic rationales for real-time facility metrics.
    """
    fac_id = row.get("facility_id", "F000")
    complaints = row.get("complaints", 0)
    energy_status = row.get("energy_status", "Optimized")
    usage = row.get("energy_usage", 120)
    temp = row.get("temperature", 24.0)
    severity = row.get("severity", "Low")
    action = row.get("action", "AUTO MAINTAIN")

    if severity == "Critical":
        return (
            f"🚨 ALERT for {fac_id}: High complaint surge ({complaints} complaints) with {energy_status} "
            f"({usage} kW at {temp}°C). Multi-Agent System Action: [{action}]."
        )
    elif energy_status == "Over Consumption":
        return (
            f"⚡ WARNING for {fac_id}: Energy spike detected ({usage} kW, {temp}°C). "
            f"Agent Recommendation: [{action}]."
        )
    else:
        return (
            f"✅ OPTIMAL for {fac_id}: Operating within parameters ({usage} kW, {temp}°C, {complaints} complaints). "
            f"Status: [{action}]."
        )
