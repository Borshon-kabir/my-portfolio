import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#f8fafc] px-4 text-center dark:bg-[#0a0b10] dark:text-[#f8fafc]">
      <div className="mx-auto max-w-md rounded-3xl border border-black/10 bg-white/80 p-8 shadow-xl backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
        <span className="font-mono text-5xl font-extrabold text-blue-600 dark:text-blue-400">
          404
        </span>
        <h1 className="mt-4 text-2xl font-bold text-slate-900 dark:text-slate-100">
          Page Not Found
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-[#17171d] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#34343a] dark:bg-blue-600 dark:hover:bg-blue-500"
          >
            <Home size={16} /> Return Home
          </Link>
        </div>
      </div>
    </main>
  );
}
