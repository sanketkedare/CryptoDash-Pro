"use client";

interface Props {
  error: Error | null;
  sectionName?: string;
  onReset: () => void;
}

export default function ErrorFallback({ error, sectionName, onReset }: Props) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[200px] p-6 bg-red-50 dark:bg-red-950 rounded-xl border border-red-200 dark:border-red-800">
      <p className="text-4xl mb-3">⚠️</p>
      <h3 className="font-bold text-red-700 dark:text-red-400 text-lg mb-1">
        {sectionName ? `${sectionName} failed to load` : "Something went wrong"}
      </h3>
      <p className="text-red-500 dark:text-red-500 text-sm text-center mb-4 max-w-xs">
        {error?.message ?? "An unexpected error occurred."}
      </p>
      <button
        onClick={onReset}
        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-bold transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}
