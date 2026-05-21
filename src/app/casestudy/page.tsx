"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import CaseStudyData from "@/data/casestudy.json";
import { TbArrowLeft, TbCpu, TbActivity, TbLock, TbFlame } from "react-icons/tb";

export default function CaseStudyPage() {
  const { project, client, industry, year, case_study } = CaseStudyData;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div
      className="min-h-screen text-slate-100 flex flex-col font-sans select-none"
      style={{
        backgroundColor: "#080B14",
        backgroundImage: `
          radial-gradient(ellipse at 20% 20%, rgba(99, 102, 241, 0.05) 0%, transparent 60%),
          radial-gradient(ellipse at 80% 80%, rgba(6, 182, 212, 0.04) 0%, transparent 50%)
        `,
      }}
    >
      {/* Top Navbar */}
      <header
        className="w-full shrink-0 sticky top-0 z-50 border-b border-white/5 backdrop-blur-xl"
        style={{ background: "rgba(8, 11, 20, 0.7)" }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/icon-192x192.png"
              alt="CryptoDash Pro Logo"
              width={32}
              height={32}
              className="rounded-lg shadow-[0_0_12px_rgba(99,102,241,0.3)] border border-indigo-500/20"
              unoptimized
            />
            <span className="font-bold text-sm tracking-wider gradient-text font-space">
              CRYPTODASH PRO
            </span>
          </div>

          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl transition-all border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/10"
            style={{ color: "var(--text-primary)" }}
          >
            <TbArrowLeft className="text-sm" />
            Back to Terminal
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12 flex flex-col gap-12">
        {/* Banner Title */}
        <section className="text-center flex flex-col items-center gap-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border border-indigo-500/20 bg-indigo-500/5 text-indigo-400">
            Institutional FinTech Case Study
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-space leading-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            {case_study.title}
          </h1>
          <p className="text-sm sm:text-base leading-relaxed text-slate-400 font-light">
            {case_study.executive_summary}
          </p>
        </section>

        {/* Project Meta Info Grid */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-md">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Project Name
            </span>
            <span className="text-sm font-semibold text-slate-200">{project}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Client
            </span>
            <span className="text-sm font-semibold text-indigo-400">{client}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Industry
            </span>
            <span className="text-sm font-semibold text-slate-200">{industry}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Deployment Year
            </span>
            <span className="text-sm font-mono font-semibold text-cyan-400">{year}</span>
          </div>
        </section>

        {/* High-Performance Metrics Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] relative overflow-hidden group hover:border-indigo-500/20 transition-all">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4 text-indigo-400 text-lg">
              <TbLock />
            </div>
            <h3 className="text-sm font-bold tracking-wider uppercase text-slate-200 mb-2 font-space">
              Type Safety Profile
            </h3>
            <p className="text-2xl font-extrabold text-white mb-2 font-mono">100% Safe</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              {case_study.key_outcomes.type_safety} — compiled under rigid tsc environments with
              zero warnings.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] relative overflow-hidden group hover:border-cyan-500/20 transition-all">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4 text-cyan-400 text-lg">
              <TbActivity />
            </div>
            <h3 className="text-sm font-bold tracking-wider uppercase text-slate-200 mb-2 font-space">
              Offline Capability
            </h3>
            <p className="text-2xl font-extrabold text-white mb-2 font-mono">PWA Enabled</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              {case_study.key_outcomes.offline_availability} — custom Service Workers enable
              complete standalone caching.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] relative overflow-hidden group hover:border-rose-500/20 transition-all">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-4 text-rose-400 text-lg">
              <TbFlame />
            </div>
            <h3 className="text-sm font-bold tracking-wider uppercase text-slate-200 mb-2 font-space">
              Service Resiliency
            </h3>
            <p className="text-2xl font-extrabold text-white mb-2 font-mono">Dynamic Proxy</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              {case_study.key_outcomes.resiliency} — immediate INR base forex fallback converter
              layer triggers on 429 blocks.
            </p>
          </div>
        </section>

        {/* Challenges & Solutions */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-2.5">
            <div className="h-4 w-1 rounded bg-indigo-500" />
            <h2 className="text-lg font-bold tracking-wider uppercase font-space text-slate-200">
              Engineering Challenges & Dynamic Solutions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {case_study.challenges.map((item, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                variants={cardVariants}
                className="p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] hover:border-white/10 transition-all flex flex-col gap-4"
              >
                <div>
                  <div className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/10 mb-2 uppercase tracking-wider font-mono">
                    Challenge {index + 1}
                  </div>
                  <h3 className="text-base font-bold text-slate-200 leading-snug font-space">
                    {item.issue}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{item.description}</p>
                </div>
                <div className="pt-4 border-t border-white/5 mt-auto">
                  <div className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/10 mb-2 uppercase tracking-wider font-mono">
                    Solution Implemented
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.solution}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Architecture & Decisions */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-2.5">
            <div className="h-4 w-1 rounded bg-indigo-500" />
            <h2 className="text-lg font-bold tracking-wider uppercase font-space text-slate-200">
              Core Architecture Stack Decisions
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.01] flex flex-col gap-3">
              <TbCpu className="text-indigo-400 text-xl" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-space">
                Core Engine
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-mono">
                {case_study.architecture_decisions.framework}
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.01] flex flex-col gap-3">
              <TbActivity className="text-cyan-400 text-xl" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-space">
                State Management
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {case_study.architecture_decisions.state_management}
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.01] flex flex-col gap-3">
              <TbFlame className="text-rose-400 text-xl" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-space">
                Data Streaming
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {case_study.architecture_decisions.data_streaming}
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.01] flex flex-col gap-3">
              <TbLock className="text-emerald-400 text-xl" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-space">
                PWA Strategy
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {case_study.architecture_decisions.pwa}
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full shrink-0 border-t border-white/5 py-8 mt-12 bg-black/10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <span>© 2026 {client}. All Rights Reserved.</span>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-indigo-400 transition-colors">
              Trading Terminal
            </Link>
            <span>•</span>
            <Link
              href="/api/case-study"
              className="hover:text-indigo-400 transition-colors"
              target="_blank"
            >
              Case Study API
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
