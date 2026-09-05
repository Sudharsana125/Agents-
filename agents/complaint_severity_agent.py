def assign_severity(complaints):
    if complaints >= 8:
        return "Critical"
    elif complaints >= 4:
        return "Medium"
    else:
        return "Low"
