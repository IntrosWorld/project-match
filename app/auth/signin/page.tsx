"use client";

import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { Github, Sparkles } from "lucide-react";

export default function SignInPage() {
    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
            <div className="bg-gradient" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-md w-full p-8 glass-morphism rounded-[2.5rem] shadow-2xl relative z-10"
            >
                <div className="text-center mb-10">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
                        className="w-20 h-20 bg-primary rounded-3xl mx-auto mb-6 flex items-center justify-center rotate-12 shadow-[0_0_30px_rgba(234,40,30,0.4)]"
                    >
                        <Sparkles className="text-white w-10 h-10" />
                    </motion.div>
                    <h1 className="text-5xl font-black tracking-tighter mb-2 text-white uppercase">
                        Project Match
                    </h1>
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">Connect. Build. Innovate.</p>
                </div>

                <button
                    onClick={() => signIn("github", { callbackUrl: "/" })}
                    className="w-full py-4 bg-white text-black rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-gray-200 transition-all active:scale-95 shadow-xl"
                >
                    <Github className="w-6 h-6" />
                    Continue with GitHub
                </button>

                <p className="mt-10 text-center text-sm text-gray-500">
                    By continuing, you agree to our <span className="text-gray-400 underline cursor-pointer">Terms</span>
                </p>
            </motion.div>

            {/* Background Decorative Elements */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-0" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -z-0" />
        </div>
    );
}
