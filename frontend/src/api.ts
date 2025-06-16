const BASE = process.env.REACT_APP_API_BASE_URL || "";

export async function fetchUsers() {
  const res = await fetch(`${BASE}/api/users`);
  return res.json();
}

export async function fetchProjects() {
  const res = await fetch(`${BASE}/api/projects`);
  return res.json();
}

export async function addProject(project: Omit<Project, "id">) {
  const res = await fetch(`${BASE}/api/projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(project),
  });
  return res.json();
}

export async function updateProject(id: number, project: Omit<Project, "id">) {
  const res = await fetch(`${BASE}/api/projects/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(project),
  });
  return res.json();
}

export async function deleteProject(id: number) {
  await fetch(`${BASE}/api/projects/${id}`, { method: "DELETE" });
}

export async function generateProject() {
  const res = await fetch(`${BASE}/api/generate_project`);
  return res.json();
}

export interface Project {
  id: number;
  name: string;
  location: string;
  impact_score: number;
  description: string;
} 