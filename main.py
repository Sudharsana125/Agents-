import sys
import os

# Ensure local directory is on pythonpath
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from realtime_engine import process_realtime_tick

def main():
    df, insights = process_realtime_tick()
    print("=" * 60)
    print("SMART FACILITY MANAGEMENT AI - REAL-TIME MULTI-AGENT ENGINE")
    print("=" * 60)
    print(f"Total Facilities Evaluated: {insights['Total Facilities']}")
    print(f"Critical Facility Cases   : {insights['Critical Cases']}")
    print(f"Over Energy Consumption   : {insights['Over Energy Use']}")
    print(f"Average Facility Load     : {insights['Average Energy Load (kW)']} kW")
    print(f"Average Ambient Temp      : {insights['Average Temperature (deg C)']} deg C" if 'Average Temperature (deg C)' in insights else f"Average Ambient Temp      : {insights.get('Average Temperature (°C)', 24.0)} deg C")
    print(f"Overall Facility Health   : {insights['Facility Health Score']} / 100")
    print("=" * 60)
    print("AI Processing Completed Successfully!")

if __name__ == "__main__":
    main()
