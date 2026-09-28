"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContactClick?: () => void;
  [key: string]: any;
}

export default function ProfileModal({ isOpen, onClose, onContactClick }: ProfileModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          key="profile-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm select-none"
          onClick={onClose}
        >
          {/* 
            Main Card: Exact 1:1 Dimensions from Reference 
            Forced pure white background (#ffffff) with 42px corner curves
          */}
          <motion.div
            key="profile-card-modal"
            initial={{ opacity: 0, scale: 0.94, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -8 }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 30,
              opacity: { duration: 0.2 } 
            }}
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#ffffff",
              color: "#000000",
              maxWidth: "380px",
              width: "100%",
              borderRadius: "42px",
            }}
            className="overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.6)] relative border border-black/5"
          >
        {/* Top Minimal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md text-white/90 hover:bg-black/60 flex items-center justify-center transition-all cursor-pointer"
        >
          <X size={15} />
        </button>

        {/* 1. Top Cover Photo Section (Dark Image with Socials) */}
        <div className="relative w-full h-[260px] bg-neutral-900 overflow-hidden">
          <img
            src="/image_8.png"
            alt="Cover"
            className="w-full h-full object-cover object-top"
          />

          {/* Social Icons at Bottom-Right of Cover Photo */}
          <div className="absolute bottom-4 right-7 flex items-center gap-3.5 text-white/80 z-10">
            {/* Instagram */}
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition-opacity">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            {/* Twitter / X */}
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition-opacity">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            {/* Facebook */}
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-white transition-opacity">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* 2. Middle Seam Row: Big Avatar + Wide Pill Button */}
        <div className="relative px-7 flex items-start justify-between z-20">
          {/* Big Avatar Badge on Seam */}
          <div 
            style={{ borderColor: "#ffffff", backgroundColor: "#000000" }}
            className="-mt-12 w-[96px] h-[96px] rounded-full border-[6px] flex items-center justify-center shadow-md shrink-0 overflow-hidden"
          >
            {/* Monogram Stylized Logo matching reference */}
            <span className="text-white text-4xl font-black tracking-tighter select-none font-sans">
              B
            </span>
          </div>

          {/* Prominent Action Button sitting in white zone */}
          <button
            onClick={() => {
              if (onContactClick) {
                onContactClick();
                onClose();
              } else {
                window.location.href = "mailto:hello@borshonkabir.online";
              }
            }}
            style={{ backgroundColor: "#000000", color: "#ffffff" }}
            className="mt-3.5 px-7 h-[42px] rounded-full text-sm font-semibold tracking-normal hover:bg-neutral-800 transition-all shadow-md active:scale-95 cursor-pointer"
          >
            Email me
          </button>
        </div>

        {/* 3. Bottom White Body Section */}
        <div className="px-7 pt-4 pb-9" style={{ color: "#000000" }}>
          {/* Name & Blue Verified Badge */}
          <div className="flex items-center gap-1.5">
            <h3 style={{ color: "#000000" }} className="text-2xl font-bold tracking-tight">
              Borshon
            </h3>
            <svg className="w-5 h-5 text-blue-500 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>

          {/* Username / Handle */}
          <p style={{ color: "#9ca3af" }} className="text-sm font-normal mt-0.5">
            @borshonkabir
          </p>

          {/* Bio text */}
          <p style={{ color: "#525252" }} className="text-[13px] leading-[1.6] font-normal mt-4 pr-1">
            Passionate video editor crafting high-impact cinematic videos, dynamic pacing, and frame-by-frame visual storytelling for ambitious brands.
          </p>

          {/* Stats Row */}
          <div className="flex items-center gap-7 mt-6 text-sm">
            <div className="flex items-baseline gap-1.5">
              <span style={{ color: "#000000" }} className="font-bold text-base">
                500
              </span>
              <span style={{ color: "#737373" }} className="text-sm font-normal">
                Following
              </span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span style={{ color: "#000000" }} className="font-bold text-base">
                22.2K
              </span>
              <span style={{ color: "#737373" }} className="text-sm font-normal">
                Followers
              </span>
            </div>
          </div>
        </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}