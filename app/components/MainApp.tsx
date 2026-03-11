"use client";

import { useState } from "react";
import Navigation from "./Navigation";
import Deck from "./Deck";
import DiscoveryProjectCard from "./feed/DiscoveryProjectCard";
import UserCard from "./feed/UserCard";
import ProfileView from "./profile/ProfileView";
import { swipeProject, swipeUser } from "../actions/swipe";
import { Coffee, Plus, Rocket, MessageSquare } from "lucide-react";
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
    projects: Project[],
    teammates: UserProfile[],
    userProfile: UserProfile,
    matches: UserProfile[],
    myProjects: Project[],
    initialTab?: string,
}) {
    const [activeTab, setActiveTab] = useState(initialTab);
    const [isSeeding, setIsSeeding] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [matchData, setMatchData] = useState<UserProfile | null>(null);
    const [isMatchModalOpen, setIsMatchModalOpen] = useState(false);

    const handleUserSwipe = async (user: UserProfile, dir: "left" | "right") => {
        const result = await swipeUser(user.id, dir === "right" ? "LIKE" : "PASS");
        if (result?.isMatch) {
            const found = teammates.find(t => t.id === result.swipedId);
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
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

            <main className="container mx-auto px-6 py-8 pb-32 max-w-5xl relative z-10">
                {activeTab === "projects" && (
                    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <header className="relative text-center space-y-4 mb-12">
                            <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mx-auto flex items-center justify-center gap-4">
                                <Rocket className="w-8 h-8 text-primary" />
                                Discover <span className="text-primary font-light">Projects</span>
                            </h1>
                            <p className="text-gray-500 text-xs tracking-[0.2em] font-bold uppercase opacity-60">Swipe right to join, left to pass</p>

                            <div className="absolute top-1/2 -translate-y-1/2 right-0">
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="p-2 glass-morphism rounded-full hover:bg-white/10 active:scale-95 transition-all outline-none"
                                >
                                    <Plus className="w-5 h-5 text-primary" />
                                </button>
                            </div>
                        </header>

                        <Deck
                            items={projects}
                            renderItem={(project: Project) => <DiscoveryProjectCard project={project} />}
                            onSwipe={(project: Project, dir: "left" | "right") => swipeProject(project.id, dir === "right" ? "LIKE" : "PASS")}
                            emptyState={
                                <div className="text-center space-y-6 py-20">
                                    <div className="p-6 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full w-fit mx-auto">
                                        <Rocket className="w-12 h-12 text-primary/60" />
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-gray-400 text-lg font-medium">No more projects in your area</p>
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
                        <header className="text-center space-y-4 mb-12">
                            <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase flex items-center justify-center gap-4">
                                <Coffee className="w-8 h-8 text-primary" />
                                Find Your <span className="text-primary font-light">Dream Team</span>
                            </h1>
                            <p className="text-gray-500 text-xs tracking-[0.2em] font-bold uppercase opacity-60">Connect with brilliant minds</p>
                        </header>

                        <Deck
                            items={teammates}
                            renderItem={(user: UserProfile) => <UserCard user={user} />}
                            onSwipe={handleUserSwipe}
                            emptyState={
                                <div className="text-center space-y-6 py-20">
                                    <div className="p-6 bg-gradient-to-tr from-secondary/20 to-accent/20 rounded-full w-fit mx-auto">
                                        <Coffee className="w-12 h-12 text-secondary/60" />
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-gray-400 text-lg font-medium">You&apos;ve seen everyone!</p>
                                        <p className="text-gray-500 text-sm">Check back later for new connections</p>
                                    </div>
                                </div>
                            }
                        />
                    </div>
                )}

                {activeTab === "messages" && (
                    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8">
                        <div className="p-8 bg-gradient-to-tr from-accent/20 to-primary/20 rounded-full">
                            <MessageSquare className="w-16 h-16 text-accent/60" />
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-4xl font-black tracking-tighter">Messages Coming Soon</h2>
                            <p className="text-gray-400 text-lg font-medium max-w-md">We&apos;re building a premium chat experience for your matches.</p>
                        </div>
                        <div className="glass-morphism px-6 py-3 rounded-xl border border-white/5">
                            <span className="text-sm font-bold text-gray-400">Expected: Q2 2026</span>
                        </div>
                    </div>
                )}

                {activeTab === "profile" && (
                    <ProfileView profile={userProfile} myProjects={myProjects} matches={matches} />
                )}
            </main>

            <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
            <CreateProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            <MatchModal
                isOpen={isMatchModalOpen}
                onClose={() => setIsMatchModalOpen(false)}
                matchUser={matchData}
            />
        </div>
    );
}
