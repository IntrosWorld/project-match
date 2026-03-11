"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Heart, Github, X } from "lucide-react";
import Image from "next/image";

export default function MatchModal({
    isOpen,
    onClose,
    matchUser
}: {
    isOpen: boolean;
    onClose: () => void;
    matchUser: { name: string | null; image: string | null; major: string | null; university: string | null } | null
}) {
    if (!matchUser) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[200]"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.5, rotate: 10 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-[201] p-6 text-center"
                    >
                        <div className="glass-morphism rounded-[3rem] p-12 shadow-2xl border border-white/10 backdrop-blur-xl relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />

                            {/* Animated background elements */}
                            <div className="absolute top-10 right-10 opacity-20">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                    className="w-16 h-16 border-2 border-primary/30 rounded-full"
                                />
                            </div>
                            <div className="absolute bottom-10 left-10 opacity-15">
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                    className="w-12 h-12 bg-secondary/20 rounded-full blur-sm"
                                />
                            </div>

                            <div className="relative z-10 text-center">
                                <div className="mb-12">
                                    <motion.div
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ repeat: Infinity, duration: 1.5 }}
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-primary/20 rounded-full blur-3xl -z-10"
                                    />
                                    <motion.div
                                        animate={{ rotate: [0, 10, -10, 0] }}
                                        transition={{ repeat: Infinity, duration: 2 }}
                                        className="inline-block"
                                    >
                                        <Heart className="w-32 h-32 text-primary fill-primary mx-auto drop-shadow-[0_0_30px_rgba(255,87,34,0.5)]" />
                                    </motion.div>
                                </div>

                                <h2 className="text-6xl font-black italic tracking-tighter text-white mb-4">IT&apos;S A MATCH!</h2>
                                <p className="text-gray-400 mb-12 font-bold uppercase tracking-widest text-lg">You both liked each other</p>

                                <div className="glass-morphism rounded-[2.5rem] p-10 border border-white/10 mb-10 max-w-md mx-auto">
                                    <div className="w-40 h-40 rounded-[2rem] border-4 border-primary bg-gray-900 overflow-hidden relative shadow-2xl mx-auto mb-6">
                                        {matchUser.image ? (
                                            <Image src={matchUser.image} alt={matchUser.name || "Match"} fill className="object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-white/10 text-6xl font-black">
                                                ?
                                            </div>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-3xl font-black text-white">{matchUser.name}</h3>
                                        <p className="text-primary font-bold text-lg">{matchUser.major} @ {matchUser.university}</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <button
                                        onClick={() => window.open(`https://github.com/${matchUser.name?.toLowerCase().replace(/\s+/g, '')}`, '_blank')}
                                        className="w-full py-5 bg-white text-black rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:scale-105 transition-all shadow-lg"
                                    >
                                        <Github className="w-6 h-6" />
                                        View GitHub Profile
                                    </button>
                                    <button
                                        onClick={onClose}
                                        className="w-full py-5 glass-morphism text-white/70 rounded-2xl font-bold hover:text-white hover:bg-white/10 transition-all border border-white/5"
                                    >
                                        Keep Swiping
                                    </button>
                                </div>

                                <button
                                    onClick={onClose}
                                    className="absolute -top-16 -right-4 p-4 text-white/40 hover:text-white transition-colors glass-morphism rounded-full border border-white/5"
                                >
                                    <X className="w-10 h-10" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
