def determine_action(row):
    """
    Real-Time Decision Agent:
    Evaluates real-time state to determine automated operational controls & maintenance dispatch.
    """
    severity = row.get("severity", "Low")
    energy_status = row.get("energy_status", "Optimized")
    hvac_status = row.get("hvac_status", "Normal")
    temp = row.get("temperature", 24.0)

    if severity == "Critical" and energy_status == "Over Consumption":
        return "CRITICAL DISPATCH: Send Emergency HVAC Maintenance & Lower Thermostat -2°C"
    elif severity == "Critical":
        return "HIGH PRIORITY: Dispatch On-Site Tenant Relations & Facilities Team"
    elif energy_status == "Over Consumption" or temp > 28.0:
        return "OPTIMIZE CONTROL: Shed Non-Essential Lighting & Increase Chiller Rate"
    elif hvac_status == "Degraded":
        return "SCHEDULE SERVICE: Schedule Routine HVAC Compressor Inspection"
    else:
        return "AUTO MAINTAIN: Optimal Operating State - No Intervention Required"

def predict(model, X):
    if hasattr(model, "predict"):
        return model.predict(X)
    return "AUTO MAINTAIN"
