import React, { useEffect, useState } from "react";
import {
  fetchProjects,
  addProject,
  updateProject,
  deleteProject,
  Project,
  generateProject,
} from "./api";
import { SystemFlowViz, FlowStep } from "./SystemFlowViz";

const emptyProject = {
  name: "",
  location: "",
  impact_score: 0,
  description: "",
};

const stepSequence: FlowStep[] = [
  "frontend",
  "api_request",
  "backend",
  "db",
  "response",
  "table_update",
];

const stepStatusText: Record<FlowStep, string> = {
  frontend: "User action triggered",
  api_request: "Sending request to API",
  backend: "Flask processing request",
  db: "Querying/updating SQLite DB",
  response: "Sending response to frontend",
  table_update: "Updating table in UI",
};

function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState<FlowStep | null>(null);
  const [statusText, setStatusText] = useState<Partial<Record<FlowStep, string>>>({});
  const [form, setForm] = useState<Omit<Project, "id">>(emptyProject);
  const [editId, setEditId] = useState<number | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [lastApiCall, setLastApiCall] = useState<string>("");
  const [currentApiCall, setCurrentApiCall] = useState<string>("");
  const [animationEnabled, setAnimationEnabled] = useState(true);

  // Helper to animate through steps, updating status text
  const runFlow = async (finalStep: FlowStep, doWork: () => Promise<void>, apiCall?: string) => {
    setLoading(true);
    for (const step of stepSequence) {
      setActiveStep(step);
      setStatusText((prev) => ({ ...prev, [step]: stepStatusText[step] }));
      if (step === "api_request" && apiCall) {
        setCurrentApiCall(apiCall);
      }
      await new Promise((r) => setTimeout(r, animationEnabled ? 400 : 0));
      if (step === finalStep) break;
    }
    await doWork();
    // Show response and table update
    for (const step of stepSequence.slice(stepSequence.indexOf(finalStep) + 1)) {
      setActiveStep(step);
      setStatusText((prev) => ({ ...prev, [step]: stepStatusText[step] }));
      await new Promise((r) => setTimeout(r, animationEnabled ? 400 : 0));
    }
    if (apiCall) {
      setLastApiCall(apiCall);
      setCurrentApiCall("");
    }
    setActiveStep(null);
    setLoading(false);
  };

  // Fetch projects with animation
  const loadProjects = async () => {
    await runFlow(
      "db",
      async () => {
        const data = await fetchProjects();
        setProjects(data);
      },
      "GET /api/projects"
    );
  };

  useEffect(() => {
    loadProjects();
    // eslint-disable-next-line
  }, []);

  // Add or update project
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormOpen(false);
    await runFlow(
      "db",
      async () => {
        if (editId === null) {
          await addProject(form);
        } else {
          await updateProject(editId, form);
        }
        const newProjects = await fetchProjects();
        setProjects(newProjects);
        setForm(emptyProject);
        setEditId(null);
      },
      editId === null
        ? `POST /api/projects\n${JSON.stringify(form, null, 2)}`
        : `PUT /api/projects/${editId}\n${JSON.stringify(form, null, 2)}`
    );
  };

  // Delete project
  const handleDelete = async (id: number) => {
    await runFlow(
      "db",
      async () => {
        await deleteProject(id);
        const newProjects = await fetchProjects();
        setProjects(newProjects);
      },
      `DELETE /api/projects/${id}`
    );
  };

  // Open form for edit
  const handleEdit = (p: Project) => {
    setForm({
      name: p.name,
      location: p.location,
      impact_score: p.impact_score,
      description: p.description,
    });
    setEditId(p.id);
    setFormOpen(true);
  };

  // Open form for add
  const handleAdd = () => {
    setForm(emptyProject);
    setEditId(null);
    setFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl flex flex-col gap-8">
        {/* Animation/Visualization */}
        <div className="w-full flex flex-col items-center">
          <h2 className="text-xl font-bold text-cyan-400 mb-2">System Flow</h2>
          <SystemFlowViz activeStep={activeStep} statusText={statusText} />
          {/* Show current API call during API step */}
          {currentApiCall && (
            <div className="mt-4 w-full max-w-xl bg-gray-900 text-cyan-200 rounded-lg p-4 font-mono text-xs shadow border border-cyan-700">
              <div className="mb-1 font-bold text-cyan-300">API Call in Progress:</div>
              <pre className="whitespace-pre-wrap break-all">{currentApiCall}</pre>
            </div>
          )}
          {/* Show last API call */}
          {lastApiCall && !currentApiCall && (
            <div className="mt-4 w-full max-w-xl bg-gray-800 text-gray-200 rounded-lg p-4 font-mono text-xs shadow border border-gray-700">
              <div className="mb-1 font-bold text-cyan-300">Last API Call:</div>
              <pre className="whitespace-pre-wrap break-all">{lastApiCall}</pre>
            </div>
          )}
        </div>
        {/* Data Table and Controls */}
        <div className="w-full bg-gray-900 rounded-2xl shadow-xl p-6 border border-gray-800">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-extrabold text-cyan-400">Energy Resiliency Projects</h1>
            <div className="flex items-center gap-4">
              <button
                onClick={handleAdd}
                className="px-4 py-2 bg-cyan-600 text-white font-bold rounded-lg shadow hover:bg-cyan-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                + Add Project
              </button>
              {/* Delay Toggle - modern pill style */}
              <div className="flex items-center bg-gray-800 rounded-lg px-3 h-10 shadow border border-gray-700">
                <span className="text-cyan-300 font-semibold text-sm mr-2">Delay</span>
                <button
                  className={`w-10 h-5 flex items-center rounded-full p-1 transition-colors duration-200 ${animationEnabled ? 'bg-cyan-600' : 'bg-gray-700'}`}
                  onClick={() => setAnimationEnabled((v) => !v)}
                  aria-pressed={animationEnabled}
                >
                  <span
                    className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-200
                      ${animationEnabled ? 'translate-x-5 ring-2 ring-cyan-400' : 'translate-x-0 ring-2 ring-gray-400'}`}
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm bg-gray-950 border-gray-800 rounded-lg">
              <thead>
                <tr className="bg-gray-800">
                  <th className="p-2 border border-gray-800 text-cyan-300">Name</th>
                  <th className="p-2 border border-gray-800 text-cyan-300">Location</th>
                  <th className="p-2 border border-gray-800 text-cyan-300">Impact Score</th>
                  <th className="p-2 border border-gray-800 text-cyan-300">Description</th>
                  <th className="p-2 border border-gray-800 text-cyan-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-800">
                    <td className="p-2 border border-gray-800 font-semibold text-cyan-200">{p.name}</td>
                    <td className="p-2 border border-gray-800">{p.location}</td>
                    <td className="p-2 border border-gray-800 text-center">{p.impact_score}</td>
                    <td className="p-2 border border-gray-800">{p.description}</td>
                    <td className="p-2 border border-gray-800 flex gap-2">
                      <button
                        className="px-2 py-1 bg-cyan-700 text-white rounded hover:bg-cyan-800"
                        onClick={() => handleEdit(p)}
                        disabled={loading}
                      >
                        Edit
                      </button>
                      <button
                        className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                        onClick={() => handleDelete(p.id)}
                        disabled={loading}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {projects.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center text-gray-500 py-8">
                      No projects found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* Add/Edit Form Modal */}
          {formOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
              <form
                className="bg-gray-900 rounded-xl shadow-lg p-6 w-full max-w-md border border-cyan-900"
                onSubmit={handleSubmit}
              >
                <h2 className="text-xl font-bold mb-4 text-cyan-400">
                  {editId === null ? "Add Project" : "Edit Project"}
                </h2>
                <div className="mb-3">
                  <label className="block text-sm font-semibold mb-1 text-cyan-200">Name</label>
                  <input
                    className="w-full border border-gray-700 bg-gray-800 rounded px-3 py-2 text-white"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-semibold mb-1 text-cyan-200">Location</label>
                  <input
                    className="w-full border border-gray-700 bg-gray-800 rounded px-3 py-2 text-white"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-semibold mb-1 text-cyan-200">Impact Score</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    className="w-full border border-gray-700 bg-gray-800 rounded px-3 py-2 text-white"
                    value={form.impact_score}
                    onChange={(e) => setForm({ ...form, impact_score: parseFloat(e.target.value) })}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-1 text-cyan-200">Description</label>
                  <textarea
                    className="w-full border border-gray-700 bg-gray-800 rounded px-3 py-2 text-white"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    required
                  />
                </div>
                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
                    onClick={() => setFormOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600 font-bold"
                    onClick={async () => {
                      await runFlow(
                        "db",
                        async () => {
                          const data = await generateProject();
                          setForm({
                            name: data.name,
                            location: data.location,
                            impact_score: data.impact_score,
                            description: data.description,
                          });
                        },
                        "GET /api/generate_project"
                      );
                    }}
                    disabled={loading}
                  >
                    Generate
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700 font-bold"
                    disabled={loading}
                  >
                    {editId === null ? "Add" : "Update"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
      <footer className="text-gray-500 text-xs mt-4">Full-stack demo: React + Flask + SQLite</footer>
    </div>
  );
}

export default App;
