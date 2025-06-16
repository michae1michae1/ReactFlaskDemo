import sqlite3
import os

db_path = os.path.join(os.path.dirname(__file__), "sample.db")
conn = sqlite3.connect(db_path)
cur = conn.cursor()

cur.execute("""
CREATE TABLE IF NOT EXISTS projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  location TEXT,
  impact_score REAL,
  description TEXT
)
""")

sample_projects = [
  ("Solar Microgrid Upgrade", "Dallas, TX", 8.7, "Solar microgrid installation for Tier 3 data center, reducing grid dependency and improving uptime."),
  ("Battery Storage Expansion", "Ashburn, VA", 7.9, "Lithium-ion battery system added to support critical loads during outages."),
  ("Wind Power PPA", "Chicago, IL", 9.2, "Long-term wind power purchase agreement, offsetting 80% of annual energy use."),
  ("Fuel Cell Backup", "San Jose, CA", 6.8, "Hydrogen fuel cell backup for edge data center, providing 24h resiliency."),
  ("Grid Interconnect Modernization", "Atlanta, GA", 7.5, "Smart grid controls and redundant feeds for improved disaster recovery."),
  ("Onsite Diesel Reduction", "London, UK", 5.4, "Hybrid generator system to reduce diesel runtime by 60%.")
]
cur.executemany("INSERT INTO projects (name, location, impact_score, description) VALUES (?,?,?,?)", sample_projects)

# Create locations table
cur.execute("""
CREATE TABLE IF NOT EXISTS locations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  city TEXT
)
""")

us_cities = [
  "New York, NY", "Los Angeles, CA", "Chicago, IL", "Houston, TX", "Phoenix, AZ",
  "Philadelphia, PA", "San Antonio, TX", "San Diego, CA", "Dallas, TX", "San Jose, CA",
  "Austin, TX", "Jacksonville, FL", "Fort Worth, TX", "Columbus, OH", "Charlotte, NC",
  "San Francisco, CA", "Indianapolis, IN", "Seattle, WA", "Denver, CO", "Washington, DC"
]
cur.executemany("INSERT INTO locations (city) VALUES (?)", [(c,) for c in us_cities])

# Create project_templates table
cur.execute("""
CREATE TABLE IF NOT EXISTS project_templates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  description TEXT
)
""")

project_templates = [
  ("Solar Microgrid Upgrade", "Solar microgrid installation for Tier 3 data center, reducing grid dependency and improving uptime."),
  ("Battery Storage Expansion", "Lithium-ion battery system added to support critical loads during outages."),
  ("Wind Power PPA", "Long-term wind power purchase agreement, offsetting 80% of annual energy use."),
  ("Fuel Cell Backup", "Hydrogen fuel cell backup for edge data center, providing 24h resiliency."),
  ("Grid Interconnect Modernization", "Smart grid controls and redundant feeds for improved disaster recovery."),
  ("Onsite Diesel Reduction", "Hybrid generator system to reduce diesel runtime by 60%."),
  ("EV Charging Rollout", "Deployment of EV charging stations for fleet electrification."),
  ("Data Center Cooling Retrofit", "Upgrade to liquid cooling for improved energy efficiency."),
  ("Biogas CHP Installation", "Combined heat and power system using biogas for local energy supply."),
  ("Microturbine Deployment", "Microturbine generators for distributed backup power."),
  ("Hydro Storage Pilot", "Pumped hydro storage system for peak shaving and backup."),
  ("Smart Metering Initiative", "Advanced metering infrastructure for real-time energy monitoring."),
  ("Demand Response Automation", "Automated demand response to reduce peak load charges."),
  ("Geothermal HVAC Conversion", "Switch to geothermal heating/cooling for main office campus."),
  ("LED Lighting Overhaul", "Full facility LED lighting upgrade for energy savings."),
  ("Wind-Diesel Hybrid", "Hybrid wind and diesel system for remote site reliability."),
  ("Battery Recycling Program", "Facility-wide battery recycling and safe disposal program."),
  ("Hydrogen Pilot Project", "Small-scale hydrogen production and storage for backup power."),
  ("Solar Carport Installation", "Solar carports for employee parking, offsetting grid use."),
  ("AI Energy Optimization", "AI-driven controls to optimize energy use and reduce costs.")
]
cur.executemany("INSERT INTO project_templates (title, description) VALUES (?,?)", project_templates)

conn.commit()
conn.close()
print("✅ sample.db created with energy projects") 