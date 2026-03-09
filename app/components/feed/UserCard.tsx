"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, Code, Star } from "lucide-react";

interface User {
    id: string;
    name: string | null;
    image: string | null;
    bio: string | null;
    skills: string | null;
    major: string | null;
    university: string | null;
}

export default function UserCard({ user }: { user: User }) {
    const skillsList = user.skills?.split(",").map(s => s.trim()).slice(0, 4) || [];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full h-full bg-neutral-900 rounded-[3rem] overflow-hidden flex flex-col shadow-2xl border border-white/10 group hover:border-white/20 transition-all duration-300"
        >
            <div className="relative h-[65%] w-full overflow-hidden bg-black">
                {user.image ? (
                    <motion.img
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6 }}
                        src={user.image}
                        alt={user.name || ""}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-secondary/30 via-neutral-900 to-accent/30 relative">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,140,66,0.2),transparent_70%)]" />
                        <div className="p-6 bg-gradient-to-tr from-secondary/20 to-accent/20 rounded-full">
                            <span className="text-7xl font-black text-white/[0.05] select-none tracking-tighter">
                                {(user.name || "??").substring(0, 1)}
                            </span>
                        </div>
                    </div>
                )}

                <div className="absolute top-6 left-6">
                    <div className="px-4 py-2 bg-black/80 backdrop-blur-xl rounded-full border border-white/10 flex items-center gap-2">
                        <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">Top Teammate</span>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-neutral-950 via-neutral-950/90 to-transparent">
                    <h3 className="text-5xl font-black text-white tracking-tighter leading-tight mb-4">
                        {user.name || "Anonymous"}
                    </h3>
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3 text-primary">
                            <div className="p-2 bg-primary/20 rounded-xl">
                                <Briefcase className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-black uppercase tracking-widest leading-none">
                                {user.major || "Undisclosed Program"}
                            </span>
                        </div>
                        <div className="flex items-center gap-3 text-white/70">
                            <div className="p-2 bg-white/10 rounded-xl">
                                <MapPin className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-bold leading-none">{user.university || "Secret Location"}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 p-8 flex flex-col gap-6 bg-neutral-900">
                <div className="relative flex-1">
                    <p className="text-gray-200 text-base leading-relaxed font-medium">
                        {user.bio || "Crafting the next big digital experience. Let's build something world-changing together."}
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/20 rounded-xl">
                            <Code className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-sm font-black uppercase tracking-widest text-primary/60">Tech Stack</span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {skillsList.map((skill, i) => (
                            <span
                                key={i}
                                className="px-4 py-2 bg-neutral-950 border border-white/5 rounded-xl text-sm font-black text-white/80 uppercase tracking-tighter hover:bg-white/5 transition-colors"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
