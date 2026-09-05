def explain(row):
    return (
        f"Facility {row['facility_id']} has "
        f"{row['complaints']} complaints with "
        f"{row['energy_status']} energy usage."
    )
