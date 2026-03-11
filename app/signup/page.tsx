"use client";

import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { Github, Rocket } from "lucide-react";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
      <div className="bg-gradient" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full px-6 py-8 sm:px-10 sm:py-10 glass-morphism rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl relative z-10"
      >
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.2,
            }}
            className="w-16 h-16 sm:w-20 sm:h-20 bg-primary rounded-2xl sm:rounded-3xl mx-auto mb-6 flex items-center justify-center -rotate-12 shadow-[0_0_30px_rgba(234,40,30,0.4)]"
          >
            <Rocket className="text-white w-8 h-8 sm:w-10 sm:h-10" />
          </motion.div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tighter mb-2 text-white uppercase">
            Join Match
          </h1>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">
            Find your Dream Team.
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => signIn("github", { callbackUrl: "/?tab=projects" })}
            className="w-full py-4 px-6 rounded-2xl font-bold flex items-center justify-center gap-3 border-2 border-white/35 bg-zinc-950/90 text-white hover:bg-zinc-900 hover:border-white/60 hover:shadow-[0_0_20px_rgba(255,255,255,0.12)] transition-all active:scale-95 shadow-xl"
          >
            <Github className="w-6 h-6" />
            Sign Up with GitHub
          </button>
          <button
            onClick={() => signIn("google", { callbackUrl: "/?tab=projects" })}
            className="w-full py-4 px-6 rounded-2xl font-bold flex items-center justify-center gap-3 border-2 border-primary/45 bg-primary/10 text-white hover:bg-primary/16 hover:border-primary/70 hover:shadow-[0_0_20px_rgba(234,40,30,0.25)] transition-all active:scale-95"
          >
            Continue with Google
          </button>
        </div>

        <p className="mt-10 text-center text-sm font-bold text-gray-500">
          Already a member?{" "}
          <a
            href="/login"
            className="text-primary hover:text-white transition-colors cursor-pointer"
          >
            Sign In
          </a>
        </p>
      </motion.div>

      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-0 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -z-0 pointer-events-none" />
    </div>
  );
}
