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
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 via-neutral-950 to-accent/30 relative">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(234,40,30,0.15),transparent_70%)]" />
                        <div className="p-5 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full">
                            <span className="text-5xl font-black text-white/10 select-none tracking-tighter">
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

                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-neutral-950 via-neutral-950/90 to-transparent">
                    <h3 className="text-3xl font-black text-white tracking-widest uppercase leading-tight mb-3">
                        {user.name || "Anonymous"}
                    </h3>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3 text-primary">
                            <div className="p-1.5 bg-primary/20 rounded-lg">
                                <Briefcase className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-sm font-black uppercase tracking-widest leading-none">
                                {user.major || "Undisclosed Program"}
                            </span>
                        </div>
                        <div className="flex items-center gap-3 text-white/50">
                            <div className="p-1.5 bg-white/5 rounded-lg">
                                <MapPin className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-xs font-bold leading-none tracking-wide">{user.university || "Secret Location"}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 p-6 flex flex-col justify-between gap-4 bg-neutral-900">
                <div className="relative">
                    <p className="text-gray-300 text-sm leading-relaxed font-medium">
                        {user.bio || "Crafting the next big digital experience. Let's build something world-changing together."}
                    </p>
                </div>

                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-primary/10 rounded-lg">
                            <Code className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <span className="text-xs font-black uppercase tracking-widest text-primary/60">Tech Stack</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {skillsList.map((skill, i) => (
                            <span
                                key={i}
                                className="px-3 py-1.5 bg-neutral-950 border border-white/5 rounded-lg text-xs font-bold text-white/70 uppercase tracking-widest hover:border-primary/30 transition-colors"
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
