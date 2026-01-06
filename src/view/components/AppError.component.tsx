import { AlertCircle } from "lucide-react";

interface AppErrorProps {
  error?: unknown;
}

export default function AppError({ error }: AppErrorProps) {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="flex flex-col items-center space-y-4 rounded-lg border border-red-200 bg-red-50 p-6">
        <AlertCircle className="h-8 w-8 text-red-500" />
        <div className="text-center">
          <p className="font-semibold text-red-900">Something went wrong</p>
          <p className="mt-1 text-sm text-red-700">
            {error instanceof Error
              ? error.message
              : "An unknown error occurred"}
          </p>
        </div>
      </div>
    </div>
  );
}

