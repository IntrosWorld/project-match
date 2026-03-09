"use client";

import { motion } from "framer-motion";
import { Rocket, Users, ArrowRight, Zap, Globe, Target, Heart, MessageCircle, Star, X } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
    return (
        <div className="min-h-screen relative bg-black text-white overflow-hidden">
            {/* Enhanced gradient background with cinematic glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 via-red-600/15 to-pink-600/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

            {/* Floating UI elements */}
            <div className="absolute top-20 left-20 opacity-20">
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="p-4 glass-morphism rounded-2xl"
                >
                    <Heart className="w-8 h-8 text-primary" />
                </motion.div>
            </div>
            <div className="absolute top-40 right-32 opacity-15">
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="p-3 glass-morphism rounded-xl"
                >
                    <MessageCircle className="w-6 h-6 text-secondary" />
                </motion.div>
            </div>
            <div className="absolute bottom-40 left-40 opacity-25">
                <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className="p-4 glass-morphism rounded-2xl"
                >
                    <Star className="w-8 h-8 text-accent" />
                </motion.div>
            </div>

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between glass-morphism px-6 py-3 rounded-2xl border border-white/10 backdrop-blur-xl">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-gradient-to-tr from-primary via-secondary to-accent rounded-xl shadow-lg">
                            <Rocket className="w-6 h-6 text-white" />
                        </div>
                        <span className="font-black text-xl tracking-tighter">Project Match</span>
                    </div>
                    <Link
                        href="/auth/signin"
                        className="px-6 py-3 glass-morphism rounded-xl text-sm font-bold hover:bg-white/10 transition-all active:scale-95 border border-white/5"
                    >
                        Sign In
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="min-h-screen flex items-center px-6">
                <div className="max-w-7xl mx-auto w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Left side - Typography */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-8"
                        >
                            <div className="space-y-4">
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className="text-6xl md:text-8xl font-black tracking-tighter leading-tight"
                                >
                                    The Future of
                                    <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                                        Project Teams
                                    </span>
                                </motion.h1>

                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                    className="text-xl text-gray-300 max-w-lg leading-relaxed font-medium"
                                >
                                    Swipe through innovative projects, connect with brilliant minds, and build the next big thing together. Premium networking for the next generation of creators.
                                </motion.p>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                                className="flex flex-col sm:flex-row gap-4"
                            >
                                <Link
                                    href="/auth/signin"
                                    className="group relative px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:shadow-[0_0_40px_-10px_rgba(255,87,34,0.5)] transition-all active:scale-95 border border-white/10"
                                >
                                    Launch Your Vision
                                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <div className="px-6 py-4 glass-morphism rounded-2xl border border-white/10">
                                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Category</div>
                                    <div className="font-black text-white">Project Matching</div>
                                </div>
                            </motion.div>

                            {/* Stats */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                                className="grid grid-cols-3 gap-8 pt-8"
                            >
                                <div className="text-center">
                                    <div className="text-3xl font-black text-primary">500+</div>
                                    <div className="text-sm text-gray-400 font-medium">Active Projects</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-black text-secondary">2K+</div>
                                    <div className="text-sm text-gray-400 font-medium">Team Matches</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-black text-accent">50+</div>
                                    <div className="text-sm text-gray-400 font-medium">Universities</div>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Right side - Phone mockup */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="relative"
                        >
                            <div className="relative mx-auto max-w-sm">
                                {/* Phone frame */}
                                <div className="relative bg-black rounded-[3rem] p-2 shadow-2xl border border-white/10">
                                    <div className="bg-neutral-900 rounded-[2.5rem] overflow-hidden">
                                        {/* Status bar */}
                                        <div className="h-6 bg-black flex items-center justify-between px-4">
                                            <div className="text-xs text-white/60">9:41</div>
                                            <div className="flex gap-1">
                                                <div className="w-4 h-2 bg-white/60 rounded-sm"></div>
                                                <div className="w-4 h-2 bg-white/60 rounded-sm"></div>
                                                <div className="w-4 h-2 bg-white/60 rounded-sm"></div>
                                            </div>
                                        </div>

                                        {/* App interface mockup */}
                                        <div className="h-[600px] bg-gradient-to-b from-neutral-900 to-black relative overflow-hidden">
                                            {/* Header */}
                                            <div className="p-6 pb-4">
                                                <h2 className="text-xl font-black text-white">Discover Projects</h2>
                                                <p className="text-sm text-gray-400">Swipe to find your next team</p>
                                            </div>

                                            {/* Project card mockup */}
                                            <div className="px-6">
                                                <div className="bg-neutral-800 rounded-3xl overflow-hidden shadow-2xl border border-white/5">
                                                    <div className="h-64 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                                                        <Rocket className="w-16 h-16 text-white/20" />
                                                    </div>
                                                    <div className="p-6">
                                                        <h3 className="text-xl font-black text-white mb-2">AI Study Buddy</h3>
                                                        <p className="text-sm text-gray-300 mb-4">Revolutionary app that helps students learn smarter</p>
                                                        <div className="flex gap-2 mb-4">
                                                            <span className="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full font-bold">AI</span>
                                                            <span className="px-3 py-1 bg-secondary/20 text-secondary text-xs rounded-full font-bold">React</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                                                                <span className="text-xs font-black text-white">A</span>
                                                            </div>
                                                            <span className="text-sm text-gray-400">Alex Chen</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Swipe buttons */}
                                            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-8">
                                                <div className="w-14 h-14 bg-red-500/20 rounded-full flex items-center justify-center border-2 border-red-500/30">
                                                    <X className="w-6 h-6 text-red-400" />
                                                </div>
                                                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center border-2 border-primary">
                                                    <Heart className="w-8 h-8 text-primary" />
                                                </div>
                                                <div className="w-14 h-14 bg-blue-500/20 rounded-full flex items-center justify-center border-2 border-blue-500/30">
                                                    <Star className="w-6 h-6 text-blue-400" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating elements around phone */}
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                    className="absolute -top-4 -right-4 w-8 h-8 bg-primary/30 rounded-full blur-sm"
                                />
                                <motion.div
                                    animate={{ rotate: -360 }}
                                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                    className="absolute -bottom-6 -left-6 w-12 h-12 bg-secondary/20 rounded-full blur-sm"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 px-6 bg-gradient-to-b from-transparent to-black/50">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
                            Premium Features for
                            <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                Future Builders
                            </span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto font-medium">
                            Everything you need to find the perfect team and launch groundbreaking projects
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Zap,
                                title: "Smart Matching",
                                description: "AI-powered recommendations based on your skills, interests, and project goals.",
                                color: "text-primary"
                            },
                            {
                                icon: Globe,
                                title: "Global Network",
                                description: "Connect with talented individuals from universities worldwide.",
                                color: "text-secondary"
                            },
                            {
                                icon: Target,
                                title: "Goal-Oriented",
                                description: "Find teammates who share your vision and drive for success.",
                                color: "text-accent"
                            }
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                className="glass-morphism p-8 rounded-3xl border border-white/5 hover:border-white/10 transition-all group"
                            >
                                <div className={`p-4 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform`}>
                                    <feature.icon className={`w-8 h-8 ${feature.color}`} />
                                </div>
                                <h3 className="text-2xl font-black mb-4">{feature.title}</h3>
                                <p className="text-gray-400 leading-relaxed font-medium">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
