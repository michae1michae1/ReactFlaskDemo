from flask import Flask, jsonify, request, send_from_directory
import sqlite3, os
from flask_cors import CORS

DB_PATH = os.path.join(os.path.dirname(__file__), "sample.db")
server = Flask(__name__)
CORS(server)

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

@server.route("/api/projects", methods=["GET"])
def list_projects():
    conn = get_db()
    cur = conn.cursor()
    cur.execute("SELECT * FROM projects;")
    rows = cur.fetchall()
    conn.close()
    return jsonify([dict(r) for r in rows])

@server.route("/api/projects", methods=["POST"])
def add_project():
    data = request.json
    conn = get_db()
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO projects (name, location, impact_score, description) VALUES (?,?,?,?)",
        (data["name"], data["location"], data["impact_score"], data["description"])
    )
    conn.commit()
    new_id = cur.lastrowid
    conn.close()
    return jsonify({"id": new_id, **data}), 201

@server.route("/api/projects/<int:pid>", methods=["PUT"])
def update_project(pid):
    data = request.json
    conn = get_db()
    cur = conn.cursor()
    cur.execute(
        "UPDATE projects SET name=?, location=?, impact_score=?, description=? WHERE id=?",
        (data["name"], data["location"], data["impact_score"], data["description"], pid)
    )
    conn.commit()
    conn.close()
    return jsonify({"id": pid, **data})

@server.route("/api/projects/<int:pid>", methods=["DELETE"])
def delete_project(pid):
    conn = get_db()
    cur = conn.cursor()
    cur.execute("DELETE FROM projects WHERE id=?", (pid,))
    conn.commit()
    conn.close()
    return "", 204

# Serve React build (optional, for production)
@server.route("/")
def index():
    return send_from_directory("build", "index.html")

@server.route("/static/<path:path>")
def static_serve(path):
    return send_from_directory("build/static", path)

if __name__ == "__main__":
    server.run(debug=True, port=8050) 