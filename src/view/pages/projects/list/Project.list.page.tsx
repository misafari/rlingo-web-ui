import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { useState } from "react";
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Loader2,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";
import { useDeleteProject } from "../../../../services/query/useProjects";
import CreateNewProjectModal from "../create/CreatNewProject.modal";
import EditProjectModal from "../edit/EditProject.modal";
import type Project from "../../../../types/projects/Project.model";

const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "id",
    enableHiding: true,
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center space-x-1 hover:text-gray-900"
        >
          <span>ID</span>
          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDown className="h-4 w-4" />
          ) : (
            <ArrowUpDown className="h-4 w-4" />
          )}
        </button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="font-mono text-sm text-gray-600">
          {row.getValue("id") || "-"}
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center space-x-1 hover:text-gray-900"
        >
          <span>Name</span>
          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDown className="h-4 w-4" />
          ) : (
            <ArrowUpDown className="h-4 w-4" />
          )}
        </button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="font-medium text-gray-900">
          {row.getValue("name") || "-"}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      const project = row.original;
      return <ActionsCell project={project} />;
    },
    enableSorting: false,
  },
];

function ActionsCell({ project }: { project: Project }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const deleteProject = useDeleteProject();

  const handleDelete = async () => {
    if (!project.id) return;
    try {
      await deleteProject.mutateAsync(project.id);
      setIsDeleteConfirmOpen(false);
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-end space-x-2">
        <button
          onClick={() => setIsEditModalOpen(true)}
          className="rounded-md p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-blue-600"
          title="Edit project"
        >
          <Pencil className="h-4 w-4" />
        </button>
        <button
          onClick={() => setIsDeleteConfirmOpen(true)}
          disabled={deleteProject.isPending}
          className="rounded-md p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Delete project"
        >
          {deleteProject.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4" />
          )}
        </button>
      </div>

      <EditProjectModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        project={project}
      />

      {/* Delete Confirmation Modal */}
      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsDeleteConfirmOpen(false)}
          />
          <div className="relative z-10 w-full max-w-md rounded-lg bg-white shadow-xl">
            <div className="px-6 py-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Delete Project
              </h3>
              <p className="mt-2 break-words text-sm text-gray-600">
                {`Are you sure you want to delete `}
                <span className="font-medium text-gray-900">
                  "{project.name}"
                </span>
                ?
                <br />
                This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center justify-end space-x-3 border-t border-gray-200 px-6 py-4">
              <button
                type="button"
                onClick={() => setIsDeleteConfirmOpen(false)}
                disabled={deleteProject.isPending}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleteProject.isPending}
                className="flex items-center space-x-2 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {deleteProject.isPending && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}
                <span>
                  {deleteProject.isPending ? "Deleting..." : "Delete"}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function ProjectListPage({ projects }: { projects: Project[] }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const table = useReactTable({
    data: projects,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage and view all your projects in one place.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        >
          <Plus className="h-4 w-4" />
          <span>Create Project</span>
        </button>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + 1}
                    className="px-6 py-12 text-center"
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <p className="text-sm font-medium text-gray-900">
                        No projects found
                      </p>
                      <p className="text-sm text-gray-500">
                        Get started by creating your first project.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="transition-colors hover:bg-gray-50"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="whitespace-nowrap px-6 py-4">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {projects.length > 0 && (
        <div className="mt-4 flex items-center justify-between text-sm text-gray-700">
          <div>
            Showing{" "}
            <span className="font-medium">
              {table.getRowModel().rows.length}
            </span>{" "}
            of <span className="font-medium">{projects.length}</span> projects
          </div>
        </div>
      )}

      <CreateNewProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
