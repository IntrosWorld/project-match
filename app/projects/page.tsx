"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ProjectCard from "../components/feed/ProjectCard";
import Deck from "../components/Deck";

// dummy data for discovery
const dummyProjects = [
  { id: "1", title: "AI Medical Diagnosis System", description: "Real-time diagnostic tool using deep learning", tags: "AI,ML,Healthcare", owner: { name: "Dr. A" } },
  { id: "2", title: "Gesture Controlled Calculator", description: "Hand gesture recognition UI", tags: "UX,JS,ComputerVision", owner: { name: "Designer B" } },
  { id: "3", title: "Underwater Drone", description: "Smart underwater exploration vehicle", tags: "Hardware,Robotics", owner: { name: "Engineer C" } },
];

// Navigation
const Navigation = () => {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-white/10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(234,40,30,0.5)]">
              <span className="text-white font-black text-sm">PM</span>
            </div>
            <span className="font-bold text-xl">Project Match</span>
          </Link>
          <Link
            href="/auth/signin"
            className="px-6 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState(dummyProjects);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero Section */}
      <motion.section
        className="pt-32 pb-20 px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0, 0.7, 0.29, 0.97] }}
            className="space-y-8 mb-12"
          >
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-black leading-tight uppercase tracking-widest text-primary">
                Discover Projects
              </h1>
              <p className="text-sm uppercase tracking-wide text-gray-400 max-w-2xl">
                Swipe right to join amazing projects. Swipe left to pass. Find your next big opportunity.
              </p>
            </div>

            {/* Filter/Sort buttons */}
            <div className="flex gap-4 flex-wrap">
              {["All", "AI/ML", "Web3", "Hardware", "Design"].map((filter, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.05, ease: [0, 0.7, 0.29, 0.97] }}
                  whileHover={{ scale: 1.05, borderColor: 'rgba(234, 40, 30, 0.5)' }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-white/5 border border-white/10 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-primary/20 transition-all duration-300"
                >
                  {filter}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Deck Section */}
      <section className="px-6 pb-20">
        <motion.div
          className="max-w-7xl mx-auto h-96"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Deck
            items={projects}
            renderItem={(project) => <ProjectCard project={project} />}
            onSwipe={(project, dir) => {
              console.log("swiped", project, dir);
              setProjects((prev) => prev.filter((p) => p.id !== project.id));
            }}
            emptyState={
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-20 space-y-4"
              >
                <div className="text-6xl">🎉</div>
                <p className="text-xl text-gray-400">No more projects right now</p>
                <button className="px-6 py-3 bg-primary text-white rounded-lg font-bold uppercase tracking-wide hover:shadow-[0_0_20px_rgba(234,40,30,0.4)] transition-all">
                  Check Back Later
                </button>
              </motion.div>
            }
          />
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10 bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(234,40,30,0.5)]">
                <span className="text-white font-black text-sm">PM</span>
              </div>
              <span className="font-bold text-xl">Project Match</span>
            </div>
            <div className="text-sm text-gray-400">
              © 2026 Project Match. Connecting builders worldwide.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}