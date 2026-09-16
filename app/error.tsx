'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { RotateCcw, Home } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Next.js Runtime Error Caught:', error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="mx-auto max-w-md rounded-3xl border border-black/10 bg-white/80 p-8 shadow-xl backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-500 mb-4">
          <RotateCcw className="h-6 w-6" />
        </span>
        <h2 className="display text-2xl font-bold text-slate-900 dark:text-slate-100">
          Something went wrong
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          An unexpected error occurred while rendering this page.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500"
          >
            <RotateCcw size={16} /> Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <Home size={16} /> Home
          </Link>
        </div>
      </div>
    </div>
  );
}
