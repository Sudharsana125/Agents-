def energy_status(usage, temperature=24.0, occupancy=45):
    """
    Real-Time Energy Optimization Agent Logic:
    Evaluates energy usage kW considering thermal load and facility occupancy.
    """
    # Dynamic threshold adjust based on occupancy & temperature load
    thermal_factor = 1.0 + max(0, (temperature - 24.0) * 0.04)
    occupancy_factor = 1.0 + max(0, (occupancy - 50) * 0.005)
    adjusted_threshold_high = 250 * thermal_factor * occupancy_factor
    adjusted_threshold_med = 150 * thermal_factor * occupancy_factor

    if usage > adjusted_threshold_high:
        return "Over Consumption"
    elif usage > adjusted_threshold_med:
        return "Normal"
    else:
        return "Optimized"

def calculate_efficiency_score(usage, temperature=24.0, occupancy=45):
    """Calculates a 0-100 real-time energy efficiency score."""
    base_score = 100 - (usage / 400.0 * 50) - (temperature / 35.0 * 25)
    return max(10.0, min(100.0, round(base_score, 1)))
