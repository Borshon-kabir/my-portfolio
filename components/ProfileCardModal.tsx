'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { X, MapPin, Clock, Film, Linkedin, Youtube, Instagram, Mail } from 'lucide-react';

interface ProfileCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContactClick?: () => void;
}

export default function ProfileCardModal({ isOpen, onClose, onContactClick }: ProfileCardModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-modal-name"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-3xl bg-white dark:bg-[#111522] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden text-slate-900 dark:text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close profile card"
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/40 text-white hover:bg-black/70 transition-colors"
        >
          <X size={16} />
        </button>

        {/* Header Banner */}
        <div className="h-24 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        </div>

        {/* Profile Image (Centered Avatar Overlapping Banner) */}
        <div className="relative w-24 h-24 rounded-full border-4 border-white dark:border-[#111522] -mt-12 mx-auto overflow-hidden shadow-md bg-slate-900">
          <Image
            src="/images/profile-dark.jpeg"
            alt="Borshon Kabir"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Profile Content */}
        <div className="px-6 pt-2 pb-6 flex flex-col items-center">
          {/* Name & Title */}
          <h3 id="profile-modal-name" className="text-xl font-bold text-center mt-2 text-slate-900 dark:text-white">
            Borshon Kabir
          </h3>
          <p className="text-xs text-center text-blue-600 dark:text-blue-400 font-medium mt-0.5">
            Video Editor &amp; Motion Graphics Artist
          </p>

          {/* Short Bio Details */}
          <p className="text-xs text-center text-slate-600 dark:text-slate-400 mt-3 leading-relaxed px-1">
            Passionate about crafting high-impact video edits, visual stories, and dynamic motion graphics with precision.
          </p>

          {/* Quick Info Badges (Pills) */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60 shadow-sm">
              <MapPin size={12} className="text-blue-500 shrink-0" />
              <span>Bangladesh</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60 shadow-sm">
              <Clock size={12} className="text-indigo-500 shrink-0" />
              <span>1.5+ Years</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60 shadow-sm">
              <Film size={12} className="text-purple-500 shrink-0" />
              <span>Premiere Pro &amp; After Effects</span>
            </span>
          </div>

          {/* Action Button & Social Links */}
          <div className="w-full mt-5 flex flex-col gap-3">
            <a
              href="#contact"
              onClick={() => {
                onClose();
                if (onContactClick) onContactClick();
              }}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-colors text-center shadow-md block"
            >
              Get in Touch
            </a>

            {/* Social Media Icons row */}
            <div className="flex items-center justify-center gap-3 pt-1 text-slate-500 dark:text-slate-400">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube Channel"
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              >
                <Youtube size={18} />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Profile"
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="mailto:borshonkabiredits@gmail.com"
                aria-label="Send Email"
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
