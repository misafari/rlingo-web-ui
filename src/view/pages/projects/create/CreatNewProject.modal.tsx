import { useState } from "react";
import type { FormEvent } from "react";
import { useCreateProject } from "../../../../services/query/useProjects";
import { X, Loader2, AlertCircle } from "lucide-react";

interface CreateNewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateNewProjectModal({
  isOpen,
  onClose,
}: CreateNewProjectModalProps) {
  const [projectName, setProjectName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const createProject = useCreateProject();

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!projectName.trim()) {
      setError("Project name is required");
      return;
    }

    try {
      await createProject.mutateAsync({ name: projectName.trim() });
      setProjectName("");
      onClose();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to create project. Please try again."
      );
    }
  };

  const handleClose = () => {
    if (!createProject.isPending) {
      setProjectName("");
      setError(null);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md rounded-lg bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Create New Project
          </h2>
          <button
            onClick={handleClose}
            disabled={createProject.isPending}
            className="rounded-md p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-4">
          {/* Error Message */}
          {error && (
            <div className="mb-4 flex items-start space-x-2 rounded-md border border-red-200 bg-red-50 p-3">
              <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-500" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Project Name Input */}
          <div className="mb-6">
            <label
              htmlFor="project-name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Project Name
            </label>
            <input
              id="project-name"
              type="text"
              value={projectName}
              onChange={(e) => {
                setProjectName(e.target.value);
                setError(null);
              }}
              disabled={createProject.isPending}
              placeholder="Enter project name"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed"
              autoFocus
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={handleClose}
              disabled={createProject.isPending}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createProject.isPending || !projectName.trim()}
              className="flex items-center space-x-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {createProject.isPending && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}
              <span>
                {createProject.isPending ? "Creating..." : "Create Project"}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
