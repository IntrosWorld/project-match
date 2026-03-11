"use client";

import { useState } from "react";
import Link from "next/link";
import Navigation from "./Navigation";
import Deck from "./Deck";
import DiscoveryProjectCard from "./feed/DiscoveryProjectCard";
import UserCard from "./feed/UserCard";
import ProfileView from "./profile/ProfileView";
import { swipeProject, swipeUser } from "../actions/swipe";
import { Coffee, Plus, Rocket, MessageSquare, House } from "lucide-react";
import { seedData } from "../actions/profile";
import CreateProjectModal from "./CreateProjectModal";
import MatchModal from "./MatchModal";

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string | null;
  videoUrl?: string;
  category?: string;
  year?: string;
  tags: string;
  owner: { name: string | null };
}

export interface UserProfile {
  id: string;
  name: string | null;
  image: string | null;
  bio: string | null;
  skills: string | null;
  major: string | null;
  university: string | null;
  year: string | null;
  email?: string | null;
}

export default function MainApp({
  projects,
  teammates,
  userProfile,
  matches,
  myProjects,
  initialTab = "projects",
}: {
  projects: Project[];
  teammates: UserProfile[];
  userProfile: UserProfile;
  matches: UserProfile[];
  myProjects: Project[];
  initialTab?: string;
}) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isSeeding, setIsSeeding] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [matchData, setMatchData] = useState<UserProfile | null>(null);
  const [isMatchModalOpen, setIsMatchModalOpen] = useState(false);

  const handleUserSwipe = async (user: UserProfile, dir: "left" | "right") => {
    const result = await swipeUser(user.id, dir === "right" ? "LIKE" : "PASS");
    if (result?.isMatch) {
      const found = teammates.find((t) => t.id === result.swipedId);
      if (found) {
        setMatchData(found);
        setIsMatchModalOpen(true);
      }
    }
  };

  const handleSeed = async () => {
    setIsSeeding(true);
    try {
      await seedData();
      window.location.reload();
    } catch (error) {
      console.error("Seeding failed", error);
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="min-h-screen relative bg-black text-white">
      {/* Enhanced background with cinematic glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(234,40,30,0.1),transparent_70%)]" />
      <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />

      <main className="container mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 pb-28 sm:pb-32 max-w-5xl relative z-10">
        {activeTab === "projects" && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="mb-10 sm:mb-12">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="text-center lg:text-left space-y-2 px-1 sm:px-0">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase leading-tight">
                    <span className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-1 align-middle">
                      <Rocket className="w-7 h-7 sm:w-8 sm:h-8 text-primary shrink-0" />
                      <span className="leading-none">Discover</span>
                      <span className="text-primary font-light leading-none">
                        Projects
                      </span>
                    </span>
                  </h1>
                  <p className="text-gray-500 text-[11px] sm:text-xs tracking-[0.14em] sm:tracking-[0.2em] font-bold uppercase opacity-60 px-2 sm:px-0">
                    Swipe right to join, left to pass
                  </p>
                </div>

                <div className="flex w-full flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 lg:w-auto">
                  <Link
                    href="/landing"
                    className="group relative inline-flex h-12 min-w-35 sm:min-w-37.5 items-center justify-center gap-2 px-6 sm:px-7 rounded-xl border border-white/20 bg-white/3 text-xs font-bold uppercase tracking-[0.16em] text-gray-100 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/45 hover:bg-white/9 hover:shadow-[0_10px_25px_rgba(255,255,255,0.12)] active:translate-y-0 active:scale-[0.99] cursor-pointer text-center"
                  >
                    <span className="pointer-events-none absolute inset-0 rounded-xl bg-linear-to-b from-white/8 to-transparent opacity-70" />
                    <span className="relative inline-flex h-full items-center justify-center gap-2 w-full leading-none">
                      <House className="w-4 h-4 text-primary transition-transform duration-300 group-hover:scale-110" />
                      Home
                    </span>
                  </Link>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="group relative inline-flex h-12 min-w-42.5 sm:min-w-47.5 items-center justify-center gap-2 px-7 sm:px-10 rounded-xl border border-primary/45 bg-linear-to-r from-zinc-950 via-neutral-900 to-zinc-950 text-xs font-bold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/70 hover:from-zinc-900 hover:via-neutral-800 hover:to-zinc-900 hover:shadow-[0_12px_30px_rgba(234,40,30,0.28)] active:translate-y-0 active:scale-[0.99] outline-none cursor-pointer"
                  >
                    <span className="pointer-events-none absolute inset-0 rounded-xl bg-linear-to-b from-primary/20 to-transparent opacity-70" />
                    <span className="relative inline-flex h-full items-center justify-center gap-2 w-full leading-none">
                      <Plus className="w-4 h-4 text-white transition-transform duration-300 group-hover:rotate-90" />
                      Add Project
                    </span>
                  </button>
                </div>
              </div>
            </header>

            <Deck
              items={projects}
              renderItem={(project: Project) => (
                <DiscoveryProjectCard project={project} />
              )}
              onSwipe={(project: Project, dir: "left" | "right") =>
                swipeProject(project.id, dir === "right" ? "LIKE" : "PASS")
              }
              emptyState={
                <div className="text-center space-y-6 py-20">
                  <div className="p-6 bg-linear-to-tr from-primary/20 to-secondary/20 rounded-full w-fit mx-auto">
                    <Rocket className="w-12 h-12 text-primary/60" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-400 text-lg font-medium">
                      No more projects in your area
                    </p>
                    <button
                      onClick={handleSeed}
                      disabled={isSeeding}
                      className="px-6 py-3 glass-morphism rounded-xl text-sm font-bold hover:bg-white/10 transition-colors border border-white/5"
                    >
                      {isSeeding ? "Seeding..." : "Discover More"}
                    </button>
                  </div>
                </div>
              }
            />
          </div>
        )}

        {activeTab === "teammates" && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="text-center space-y-4 mb-10 sm:mb-12 px-1 sm:px-0">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase flex flex-wrap items-center justify-center gap-3 leading-tight">
                <Coffee className="w-8 h-8 text-primary" />
                Find Your{" "}
                <span className="text-primary font-light">Dream Team</span>
              </h1>
              <p className="text-gray-500 text-[11px] sm:text-xs tracking-[0.14em] sm:tracking-[0.2em] font-bold uppercase opacity-60 px-2 sm:px-0">
                Connect with brilliant minds
              </p>
            </header>

            <Deck
              items={teammates}
              renderItem={(user: UserProfile) => <UserCard user={user} />}
              onSwipe={handleUserSwipe}
              emptyState={
                <div className="text-center space-y-6 py-20">
                  <div className="p-6 bg-linear-to-tr from-secondary/20 to-accent/20 rounded-full w-fit mx-auto">
                    <Coffee className="w-12 h-12 text-secondary/60" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-400 text-lg font-medium">
                      You&apos;ve seen everyone!
                    </p>
                    <p className="text-gray-500 text-sm">
                      Check back later for new connections
                    </p>
                  </div>
                </div>
              }
            />
          </div>
        )}

        {activeTab === "messages" && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 px-2 sm:px-0">
            <div className="p-8 bg-linear-to-tr from-accent/20 to-primary/20 rounded-full">
              <MessageSquare className="w-16 h-16 text-accent/60" />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tighter leading-tight">
                Messages Coming Soon
              </h2>
              <p className="text-gray-400 text-base sm:text-lg font-medium max-w-md">
                We&apos;re building a premium chat experience for your matches.
              </p>
            </div>
            <div className="glass-morphism px-6 py-3 rounded-xl border border-white/5">
              <span className="text-sm font-bold text-gray-400">
                Expected: Q2 2026
              </span>
            </div>
          </div>
        )}

        {activeTab === "profile" && (
          <ProfileView
            profile={userProfile}
            myProjects={myProjects}
            matches={matches}
          />
        )}
      </main>

      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <MatchModal
        isOpen={isMatchModalOpen}
        onClose={() => setIsMatchModalOpen(false)}
        matchUser={matchData}
      />
    </div>
  );
}
