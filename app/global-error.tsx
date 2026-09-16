'use client';

import { useEffect } from 'react';
import { RotateCcw } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global Error caught:', error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-[#f8fafc] p-4 text-[#15151a]">
        <div className="mx-auto max-w-md rounded-3xl border border-black/10 bg-white p-8 text-center shadow-xl">
          <h2 className="text-2xl font-bold">Application Error</h2>
          <p className="mt-2 text-sm text-slate-600">
            A critical error occurred while loading the application.
          </p>
          <button
            onClick={() => reset()}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#17171d] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#34343a]"
          >
            <RotateCcw size={16} /> Reload Page
          </button>
        </div>
      </body>
    </html>
  );
}
