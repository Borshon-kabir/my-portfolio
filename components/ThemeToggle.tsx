'use client';

import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Enable light mode' : 'Enable dark mode'}
      title={isDark ? 'Enable light mode' : 'Enable dark mode'}
      className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 bg-slate-200/80 hover:bg-slate-300 dark:bg-slate-800/80 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300/50 dark:border-slate-700/50 whitespace-nowrap shrink-0"
    >
      <motion.span
        key={theme}
        initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="flex items-center"
      >
        {isDark ? (
          <Sun size={14} className="text-amber-400" />
        ) : (
          <Moon size={14} className="text-slate-700 dark:text-slate-300" />
        )}
      </motion.span>
      <span className="hidden sm:inline">{isDark ? 'Enable Light Mode' : 'Enable Dark Mode'}</span>
      <span className="inline sm:hidden text-[11px] font-medium">{isDark ? 'Light' : 'Dark'}</span>
    </button>
  );
}