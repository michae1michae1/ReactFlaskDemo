import sqlite3

conn = sqlite3.connect("sample.db")
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

conn.commit()
conn.close()
print("✅ sample.db created with energy projects") 