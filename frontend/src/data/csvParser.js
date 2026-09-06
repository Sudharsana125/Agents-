import Papa from 'papaparse';

export const DEFAULT_FACILITY_DATA = [
  { id: "#1001", facility: "Main Block", issue: "AC not working", priority: "HIGH", status: "Pending", date: "2026-06-13", complaints: 10, energy: 320, temp: 28.5, occupancy: 85, type: "Administrative", lat: 13.0827, lon: 80.2707 },
  { id: "#1002", facility: "Library", issue: "Lights flickering", priority: "MEDIUM", status: "In Progress", date: "2026-06-12", complaints: 4, energy: 180, temp: 23.0, occupancy: 42, type: "Library", lat: 13.0850, lon: 80.2720 },
  { id: "#1003", facility: "Hostel A", issue: "Water leakage", priority: "HIGH", status: "Completed", date: "2026-06-12", complaints: 9, energy: 310, temp: 29.0, occupancy: 120, type: "Residential", lat: 13.0810, lon: 80.2690 },
  { id: "#1004", facility: "Admin Block", issue: "Lift issue", priority: "MEDIUM", status: "Pending", date: "2026-06-11", complaints: 6, energy: 260, temp: 25.5, occupancy: 60, type: "Administrative", lat: 13.0840, lon: 80.2710 },
  { id: "#1005", facility: "Sports Complex", issue: "HVAC maintenance", priority: "LOW", status: "Completed", date: "2026-06-11", complaints: 2, energy: 130, temp: 22.0, occupancy: 30, type: "Sports", lat: 13.0870, lon: 80.2750 },
  { id: "#1006", facility: "Science Lab", issue: "Ventilation fan noisy", priority: "MEDIUM", status: "In Progress", date: "2026-06-10", complaints: 5, energy: 210, temp: 24.5, occupancy: 45, type: "Academic", lat: 13.0860, lon: 80.2730 },
  { id: "#1007", facility: "Auditorium", issue: "Projector power fault", priority: "HIGH", status: "Pending", date: "2026-06-09", complaints: 8, energy: 305, temp: 27.0, occupancy: 200, type: "Academic", lat: 13.0835, lon: 80.2680 },
  { id: "#1008", facility: "Cafeteria", issue: "Freezer temperature high", priority: "HIGH", status: "Pending", date: "2026-06-08", complaints: 7, energy: 290, temp: 31.0, occupancy: 90, type: "Others", lat: 13.0815, lon: 80.2740 },
  { id: "#1009", facility: "Hostel B", issue: "WiFi router fault", priority: "LOW", status: "Completed", date: "2026-06-07", complaints: 1, energy: 90, temp: 23.5, occupancy: 110, type: "Residential", lat: 13.0805, lon: 80.2695 },
  { id: "#1010", facility: "IT Center", issue: "UPS battery backup failure", priority: "HIGH", status: "In Progress", date: "2026-06-06", complaints: 11, energy: 410, temp: 26.0, occupancy: 75, type: "Academic", lat: 13.0845, lon: 80.2725 },
];

export function autoDetectColumns(headers) {
  const norm = headers.map(h => String(h).toLowerCase().trim());
  
  const findCol = (matches) => {
    for (const m of matches) {
      const idx = norm.findIndex(h => h.includes(m));
      if (idx !== -1) return headers[idx];
    }
    return null;
  };

  return {
    idCol: findCol(["id", "code", "num"]) || headers[0],
    facilityCol: findCol(["facility", "building", "name", "block", "location"]) || headers[1] || headers[0],
    issueCol: findCol(["issue", "problem", "complaint", "description", "fault"]) || headers[2] || headers[0],
    priorityCol: findCol(["priority", "severity", "level"]) || headers[3] || null,
    statusCol: findCol(["status", "state", "stage"]) || headers[4] || null,
    dateCol: findCol(["date", "time", "created", "timestamp"]) || null,
    energyCol: findCol(["energy", "power", "kw", "kwh", "usage"]) || null,
    tempCol: findCol(["temp", "celsius", "degree", "heat"]) || null,
    occupancyCol: findCol(["occupancy", "people", "count", "users"]) || null,
    typeCol: findCol(["type", "category", "zone", "group"]) || null,
  };
}

export function parseCSVFile(file, onComplete, onError) {
  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: (results) => {
      if (!results.data || results.data.length === 0) {
        if (onError) onError("CSV file is empty");
        return;
      }
      
      const mapping = autoDetectColumns(results.meta.fields || []);
      const parsedData = results.data.map((row, idx) => {
        const rawFac = row[mapping.facilityCol] || row[mapping.idCol] || `Facility ${idx + 1}`;
        const complaintsVal = parseInt(row[mapping.complaintsCol] || row["complaints"] || Math.floor(Math.random() * 8)) || 0;
        const energyVal = parseFloat(row[mapping.energyCol] || row["energy_usage"] || row["energy"] || (120 + idx * 15)) || 150;
        const tempVal = parseFloat(row[mapping.tempCol] || row["temperature"] || row["temp"] || 24) || 24;
        const occVal = parseInt(row[mapping.occupancyCol] || row["occupancy"] || 40) || 40;
        const prioVal = String(row[mapping.priorityCol] || row["priority"] || (complaintsVal > 7 ? "HIGH" : complaintsVal > 3 ? "MEDIUM" : "LOW")).toUpperCase();
        const statVal = String(row[mapping.statusCol] || row["status"] || (idx % 3 === 0 ? "Pending" : idx % 3 === 1 ? "In Progress" : "Completed"));

        return {
          id: row[mapping.idCol] || `#${1001 + idx}`,
          facility: rawFac,
          issue: row[mapping.issueCol] || row["explanation"] || "Routine System Check",
          priority: prioVal.includes("HIGH") || prioVal.includes("CRITICAL") ? "HIGH" : prioVal.includes("MED") ? "MEDIUM" : "LOW",
          status: statVal.includes("PEND") ? "Pending" : statVal.includes("PROG") ? "In Progress" : "Completed",
          date: row[mapping.dateCol] || "2026-06-13",
          complaints: complaintsVal,
          energy: energyVal,
          temp: tempVal,
          occupancy: occVal,
          type: row[mapping.typeCol] || (idx % 2 === 0 ? "Academic" : "Residential"),
          lat: 13.0827 + (idx * 0.002) - 0.005,
          lon: 80.2707 + (idx * 0.002) - 0.005
        };
      });

      if (onComplete) onComplete(parsedData);
    },
    error: (err) => {
      if (onError) onError(err.message);
    }
  });
}
