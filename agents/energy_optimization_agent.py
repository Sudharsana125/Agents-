def energy_status(usage):
    if usage > 250:
        return "Over Consumption"
    elif usage > 150:
        return "Normal"
    else:
        return "Optimized"
