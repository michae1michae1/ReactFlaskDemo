import React from "react";

export type FlowStep =
  | "frontend"
  | "api_request"
  | "backend"
  | "db"
  | "response"
  | "table_update";

const nodes: {
  key: FlowStep;
  label: string;
  icon: React.ReactNode;
  defaultStatus: string;
}[] = [
  {
    key: "frontend",
    label: "Frontend",
    icon: <span role="img" aria-label="frontend">🖥️</span>,
    defaultStatus: "Waiting for user action",
  },
  {
    key: "api_request",
    label: "API Request",
    icon: <span role="img" aria-label="api">➡️</span>,
    defaultStatus: "No request sent",
  },
  {
    key: "backend",
    label: "Flask Backend",
    icon: <span role="img" aria-label="flask">🐍</span>,
    defaultStatus: "Idle",
  },
  {
    key: "db",
    label: "SQLite DB",
    icon: <span role="img" aria-label="db">🗄️</span>,
    defaultStatus: "Idle",
  },
  {
    key: "response",
    label: "Response",
    icon: <span role="img" aria-label="response">⬅️</span>,
    defaultStatus: "No response",
  },
  {
    key: "table_update",
    label: "Table Update",
    icon: <span role="img" aria-label="table">📊</span>,
    defaultStatus: "No update",
  },
];

export interface SystemFlowVizProps {
  activeStep: FlowStep | null;
  statusText: Partial<Record<FlowStep, string>>;
}

export const SystemFlowViz: React.FC<SystemFlowVizProps> = ({ activeStep, statusText }) => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-row items-center justify-center gap-4 mb-4">
        {nodes.map((node, i) => (
          <React.Fragment key={node.key}>
            <div className="flex flex-col items-center">
              <div
                className={`flex items-center justify-center w-16 h-16 rounded-full border-4 transition-all duration-300
                  ${activeStep === node.key
                    ? "border-cyan-400 bg-gray-800 scale-110 shadow-lg"
                    : "border-gray-700 bg-gray-900 opacity-60"}
                `}
              >
                <span className="text-3xl">{node.icon}</span>
              </div>
              <div className={`mt-2 text-sm font-semibold ${activeStep === node.key ? "text-cyan-300" : "text-gray-500"}`}>{node.label}</div>
            </div>
            {i < nodes.length - 1 && (
              <div className="flex items-center">
                <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 12h32m0 0l-6-6m6 6l-6 6" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="flex flex-row items-start justify-center gap-4 w-full">
        {nodes.map((node) => (
          <div key={node.key} className="flex-1 min-w-[100px] max-w-[140px]">
            <div className={`text-xs text-center rounded p-2 transition-all duration-300
              ${activeStep === node.key ? "bg-cyan-950 text-cyan-200 font-bold border border-cyan-700" : "bg-gray-800 text-gray-500 border border-gray-800"}
            `}>
              {statusText[node.key] || node.defaultStatus}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 