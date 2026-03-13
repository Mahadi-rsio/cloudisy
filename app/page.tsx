"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useSpring, useInView, AnimatePresence } from "framer-motion"
import {
    Zap, Github, Twitter, Mail, Menu, X, Terminal, Shield,
    Globe2, CreditCard, MousePointer2, Infinity, ArrowRight, ChevronRight,
    Star, Users, Activity, GitBranch, BarChart3, Clock,
    CheckCircle, Database, Linkedin, Youtube,
    type LucideIcon,
    Clock5,
    Wallet
} from "lucide-react"
import Footer from "@/components/web/footer"
import { useRouter } from "next/navigation"

// ── helpers ────────────────────────────────────────────────────────────────────

const cn = (...c: (string | boolean | undefined | null)[]) => c.filter(Boolean).join(" ")

const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    show: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] as const }
    })
}

// ── types ──────────────────────────────────────────────────────────────────────

interface Framework {
    name: string
    logo: string
}

interface Feature {
    icon: LucideIcon
    tag: string
    color: ColorKey
    title: string
    desc: string
}

interface Stat {
    value: string
    label: string
    icon: LucideIcon
}

interface Plan {
    name: string
    price: string
    sub: string
    color: string
    highlight?: boolean
    badge?: string
    features: string[]
    cta: string
}

interface Social {
    icon: LucideIcon
    label: string
    href: string
}

type ColorKey = "blue" | "violet" | "sky" | "teal" | "indigo" | "purple" | "cyan"

interface ColorConfig {
    bg: string
    border: string
    icon: string
    tag: string
}

// ── data ───────────────────────────────────────────────────────────────────────

const NAV_LINKS: string[] = ["Platform", "Features", "Pricing", "Docs", "Blog"]

const FRAMEWORKS: Framework[] = [
    { name: "React", logo: "https://cdn.worldvectorlogo.com/logos/react-2.svg" },
    { name: "Next.js", logo: "https://cdn.worldvectorlogo.com/logos/next-js.svg" },
    { name: "Vue", logo: "https://cdn.worldvectorlogo.com/logos/vue-9.svg" },
    { name: "Svelte", logo: "https://cdn.worldvectorlogo.com/logos/svelte-1.svg" },
    { name: "Angular", logo: "https://cdn.worldvectorlogo.com/logos/angular-icon.svg" },
    { name: "Nuxt", logo: "https://cdn.worldvectorlogo.com/logos/nuxt-2.svg" },
]

const FEATURES: Feature[] = [
    { icon: MousePointer2, tag: "Free tier", color: "blue", title: "Free to Start", desc: "100 GB bandwidth and unlimited projects on the hobby plan. No credit card needed." },
    { icon: Terminal, tag: "CLI", color: "violet", title: "Powerful CLI", desc: "Deploy, rollback, and manage infrastructure from your terminal in one command." },
    { icon: CreditCard, tag: "Billing", color: "sky", title: "Pay as You Go", desc: "Transparent per-second billing. Zero idle costs. Scale to zero automatically." },
    { icon: Globe2, tag: "DNS", color: "teal", title: "Custom Domains", desc: "Instant DNS propagation and auto-renewing SSL certs via Let's Encrypt." },
    { icon: Shield, tag: "Security", color: "indigo", title: "DDoS Protection", desc: "Enterprise-grade Anycast network absorbs volumetric attacks at the edge." },
    { icon: Infinity, tag: "Edge", color: "purple", title: "Edge Functions", desc: "300+ global PoPs. Sub-10ms cold starts. Deploy compute close to your users." },
    { icon: BarChart3, tag: "Analytics", color: "cyan", title: "Real-time Analytics", desc: "Request logs, error rates, p99 latency — live in your dashboard." },
    { icon: GitBranch, tag: "CI/CD", color: "blue", title: "Git Integration", desc: "Push-to-deploy for every branch. Preview environments for every PR." },
    { icon: Wallet, tag: "Payments", color: 'purple', title: "Payments", desc: "Pay with Bkash, Nagad, Upay" }
]


const PLANS: Plan[] = [
    {
        name: "Hobby",
        price: "Free",
        sub: "For personal projects",
        color: "slate",
        features: [
            "1 GB bandwidth/mo",
            "1GB storage",
            "15 projects",
            "Free Subdomain",
            "Medium latency",
            "Free SSL",
            "Analytics",
            "Community support",
        ],
        cta: "Start Free"
    },
    {
        name: "Pro",
        price: "$3",
        sub: "/month per seat",
        color: "blue",
        highlight: true,
        badge: "Most popular",
        features: [
            "30 GB bandwidth/mo",
            "15GB storage",
            "Included 3M Request",
            "Included 3M edge Invocation",
            "Analytics & logs",
            "Edge Functions",
            "Priority support",
            "Team collaboration",
            "Unlimited Projects",
            "Acces to Custom Domains",
            "Then 0.5$ per 1GB bandwidth",
            "Then 1$ per 1M Request",
            "Then 0.8$ per edge Invocation",
            "Unlimited Deployment",
            "Free SSL",
            "Free Subdomain",
            "Low Latency"
        ],
        cta: "Get Pro"
    },
    {
        name: "Pay as you Go",
        price: "On demand",
        sub: "No Limit. Pay just what you use",
        color: "violet",
        features: [
            "Per 1GB bandwidth 0.15$",
            "Free SSL",
            "Unlimited Projects",
            "Per 1GB storage .2$",
            "Acces To set Custom Domains",
            "1M Request 1$",
            "Github workflows and automation",
            "No hidden charges",
            "Team collaboration",
            "Analytics",
            "Per 1M edge Invocation 0.8$",
            "Low latency"
        ],
        cta: "Deploy Now"
    }
]

// ── colour map ─────────────────────────────────────────────────────────────────

const COLOR: Record<ColorKey, ColorConfig> = {
    blue: { bg: "bg-blue-500/10", border: "hover:border-blue-500/50", icon: "text-blue-400", tag: "bg-blue-500/10 text-blue-400" },
    violet: { bg: "bg-violet-500/10", border: "hover:border-violet-500/50", icon: "text-violet-400", tag: "bg-violet-500/10 text-violet-400" },
    sky: { bg: "bg-sky-500/10", border: "hover:border-sky-500/50", icon: "text-sky-400", tag: "bg-sky-500/10 text-sky-400" },
    teal: { bg: "bg-teal-500/10", border: "hover:border-teal-500/50", icon: "text-teal-400", tag: "bg-teal-500/10 text-teal-400" },
    indigo: { bg: "bg-indigo-500/10", border: "hover:border-indigo-500/50", icon: "text-indigo-400", tag: "bg-indigo-500/10 text-indigo-400" },
    purple: { bg: "bg-purple-500/10", border: "hover:border-purple-500/50", icon: "text-purple-400", tag: "bg-purple-500/10 text-purple-400" },
    cyan: { bg: "bg-cyan-500/10", border: "hover:border-cyan-500/50", icon: "text-cyan-400", tag: "bg-cyan-500/10 text-cyan-400" },
}

// ── sub-components ─────────────────────────────────────────────────────────────

function GradientOrb({ className }: { className: string }) {
    return (
        <div className={cn("absolute rounded-full blur-[120px] opacity-20 pointer-events-none", className)} />
    )
}

interface FeatureCardProps {
    icon: LucideIcon
    title: string
    desc: string
    tag: string
    color: ColorKey
    index: number
}

function FeatureCard({ icon: Icon, title, desc, tag, color = "blue", index = 0 }: FeatureCardProps) {
    const c = COLOR[color]
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, margin: "-60px" })
    return (
        <motion.div
            ref={ref}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            custom={index % 3}
            whileHover={{ y: -6, scale: 1.01 }}
            className={cn(
                "group relative p-7 rounded-2xl bg-slate-900/40 border border-slate-800/80 transition-colors duration-300",
                c.border
            )}
        >
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />

            <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center mb-5", c.bg)}>
                <Icon className={c.icon} size={20} />
            </div>

            {tag && (
                <span className={cn("text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md", c.tag)}>
                    {tag}
                </span>
            )}
            <h3 className="text-[17px] text-white font-bold mt-3 mb-1.5 leading-snug">{title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
        </motion.div>
    )
}

function PlanCard({ plan }: { plan: Plan }) {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true })
    return (
        <motion.div
            ref={ref}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            whileHover={{ y: -6 }}
            className={cn(
                "relative flex flex-col p-8 rounded-2xl border transition-all duration-300",
                plan.highlight
                    ? "bg-gradient-to-b from-blue-600/20 to-blue-900/10 border-blue-500/50 shadow-2xl shadow-blue-500/10"
                    : "bg-slate-900/40 border-slate-800 hover:border-slate-600"
            )}
        >
            {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                    {plan.badge}
                </span>
            )}
            <p className="text-slate-400 text-sm font-medium mb-1">{plan.name}</p>
            <div className="flex items-end gap-1 mb-1">
                <span className="text-4xl font-black text-white">{plan.price}</span>
            </div>
            <p className="text-slate-500 text-xs mb-7">{plan.sub}</p>

            <ul className="flex flex-col gap-3 mb-8 flex-1">
                {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-slate-300">
                        <CheckCircle size={15} className="text-blue-400 shrink-0" />
                        {f}
                    </li>
                ))}
            </ul>

            <button className={cn(
                "w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200",
                plan.highlight
                    ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20"
                    : "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
            )}>
                {plan.cta}
            </button>
        </motion.div>
    )
}

// ── Marquee ────────────────────────────────────────────────────────────────────

interface MarqueeProps {
    items: Framework[]
    speed?: number
}

function Marquee({ items, speed = 35 }: MarqueeProps) {
    return (
        <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#020617] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#020617] to-transparent z-10 pointer-events-none" />

            <div
                className="flex w-max"
                style={{ animation: `marquee ${speed}s linear infinite` }}
            >
                {[...items, ...items, ...items].map((fw, i) => (
                    <div key={i} className="flex items-center gap-3 mx-10 opacity-40 hover:opacity-100 transition-opacity duration-300">
                        <img src={fw.logo} alt={fw.name} className="h-7 w-7 object-contain" />
                        <span className="text-white font-semibold text-sm whitespace-nowrap">{fw.name}</span>
                    </div>
                ))}
            </div>

            <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }
      `}</style>
        </div>
    )
}



// ── MAIN ──────────────────────────────────────────────────────────────────────

export default function NexusPlatform() {
    const [menu, setMenu] = useState<boolean>(false)
    const [scrolled, setScrolled] = useState<boolean>(false)

    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })
    const router = useRouter()

    const handleStart = () => {
        router.push('/login')
    }

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener("scroll", onScroll)
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    return (
        <div className="min-h-screen bg-[#020617] text-slate-300 overflow-x-hidden font-sans">

            {/* ── Scroll Progress ── */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 z-50 origin-left"
                style={{ scaleX }}
            />

            {/* ── Navbar ── */}
            <nav className={cn(
                "fixed w-full top-0 z-40 transition-all duration-500",
                scrolled
                    ? "backdrop-blur-2xl bg-[#020617]/80 border-b border-white/[0.06] shadow-2xl shadow-black/40"
                    : "bg-transparent"
            )}>
                <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">

                    <img src='/logo.png' className="h-14" />

                    <div className="hidden md:flex items-center gap-1">
                        {NAV_LINKS.map(l => (
                            <a key={l} href="#" className="px-4 py-2 hover:underline rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200">
                                {l}
                            </a>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center gap-3">
                        <a onClick={handleStart} className="text-sm border rounded-lg text-slate-400 hover:text-white transition px-4 py-2">Sign in (Beta)</a>
                        <button onClick={handleStart} className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-all duration-200 shadow-lg shadow-blue-500/20">
                            Join Us For Early Access
                        </button>
                    </div>

                    <button className="md:hidden p-2 rounded-lg text-slate-300 hover:bg-white/5 transition" onClick={() => setMenu(!menu)}>
                        {menu ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>

                <AnimatePresence>
                    {menu && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden overflow-hidden border-t border-white/5 bg-[#020617]/95 backdrop-blur-xl"
                        >
                            <div className="px-6 py-5 flex flex-col gap-2">
                                {NAV_LINKS.map(l => (
                                    <a key={l} href="#" className="px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition text-sm">
                                        {l}
                                    </a>
                                ))}
                                <div className="pt-3 border-t border-white/5 mt-1 flex flex-col gap-2">
                                    <a href="#" className="text-center py-2.5 text-sm text-slate-400">Sign in</a>
                                    <button onClick={handleStart} className="py-2.5 rounded-lg bg-blue-600 text-white font-semibold text-sm">Join Us</button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* ── Hero ── */}
            <section className="relative pt-40 pb-28 text-center px-6 overflow-hidden">
                <GradientOrb className="w-[600px] h-[600px] bg-blue-600 -top-48 left-1/2 -translate-x-1/2" />
                <GradientOrb className="w-[400px] h-[400px] bg-violet-600 top-20 -right-40" />
                <GradientOrb className="w-[300px] h-[300px] bg-cyan-600 top-40 -left-32" />

                <motion.div
                    variants={fadeUp} initial="hidden" animate="show" custom={0}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium mb-8"
                >
                    <Star size={13} className="fill-blue-400" />
                    Cloudisy is in beta
                    <ChevronRight size={13} />
                </motion.div>

                <motion.h1
                    variants={fadeUp} initial="hidden" animate="show" custom={1}
                    className="text-6xl md:text-8xl font-black text-white leading-[1.05] tracking-tight"
                >
                    Deploy in{" "}
                    <span className="relative inline-block">
                        <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-violet-400 text-transparent bg-clip-text">
                            Seconds.
                        </span>
                        <motion.span
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
                            className="absolute bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full origin-left"
                        />
                    </span>
                    <br />
                    <span className="text-slate-400">Scale to Millions.</span>
                </motion.h1>

                <motion.p
                    variants={fadeUp} initial="hidden" animate="show" custom={2}
                    className="mt-7 text-lg text-slate-400 max-w-xl mx-auto leading-relaxed"
                >
                    Cloudisy automates your entire deployment pipeline — from Git push to a globally distributed edge network in under 30 seconds
                </motion.p>

                <motion.div
                    variants={fadeUp} initial="hidden" animate="show" custom={3}
                    className="flex justify-center gap-4 mt-10 flex-wrap"
                >
                    <button onClick={handleStart} className="group px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold flex items-center gap-2 transition-all duration-200 shadow-xl shadow-blue-500/25">
                        Join Us Now
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </motion.div>

                <motion.p
                    variants={fadeUp} initial="hidden" animate="show" custom={4}
                    className="mt-5 text-slate-600 text-sm "
                >
                    No credit card required · Pay with Bkash, Nagad, Upay
                </motion.p>

                {/* terminal mockup */}
                <motion.div
                    variants={fadeUp} initial="hidden" animate="show" custom={5}
                    className="relative mt-20 max-w-2xl mx-auto"
                >
                    <div className="absolute inset-0 bg-blue-500/10 rounded-2xl blur-xl" />
                    <div className="relative bg-slate-900/80 border border-slate-700/60 rounded-2xl overflow-hidden backdrop-blur-sm">
                        <div className="flex items-center gap-2 px-5 py-3.5 border-b border-slate-800">
                            <div className="w-3 h-3 rounded-full bg-red-500/70" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                            <div className="w-3 h-3 rounded-full bg-green-500/70" />
                            <span className="ml-2 text-slate-500 text-xs font-mono">Terminal</span>
                        </div>
                        <div className="px-5 py-5 font-mono text-sm text-left space-y-2">
                            <div><span className="text-slate-500">$</span> <span className="text-blue-400">npx cloudisy</span> <span className="text-slate-300">deploy</span></div>
                            <div className="text-slate-500">  ✓ Building project…</div>
                            <div className="text-slate-500">  ✓ Uploading to Cloud…</div>
                            <div className="text-green-400">  ✓ Deployed in 4.2s</div>
                            <div className="flex items-center gap-2">
                                <span className="text-slate-500">  →</span>
                                <span className="text-blue-400 underline">https://myapp.cloudisy.top</span>
                            </div>
                            <div className="flex items-center gap-1 pt-1">
                                <span className="text-slate-500">$</span>
                                <span className="inline-block w-2 h-4 bg-blue-400 animate-pulse" />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>


            {/* ── Marquee ── */}
            <div className="border-y border-white/[0.05] py-8">
                <p className="text-center text-slate-600 text-xs font-semibold uppercase tracking-widest mb-6">Works with your favourite frameworks</p>
                <Marquee items={FRAMEWORKS} speed={30} />
            </div>


            {/* ── Features ── */}
            <section id="features" className="relative max-w-7xl mx-auto px-6 py-20 overflow-hidden">
                <GradientOrb className="w-[500px] h-[500px] bg-violet-700 top-0 right-0 translate-x-1/2" />

                <div className="text-center mb-16 relative">
                    <motion.span
                        variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                        className="inline-block text-xs font-bold uppercase tracking-widest text-blue-400 mb-4"
                    >
                        Platform
                    </motion.span>
                    <motion.h2
                        variants={fadeUp} initial="hidden" whileInView="show" custom={1} viewport={{ once: true }}
                        className="text-5xl font-black text-white"
                    >
                        Built for Developers
                    </motion.h2>
                    <motion.p
                        variants={fadeUp} initial="hidden" whileInView="show" custom={2} viewport={{ once: true }}
                        className="text-slate-400 mt-3 max-w-xl mx-auto"
                    >
                        Every tool you need to ship faster, scale effortlessly, and sleep better at night.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-5 relative">
                    {FEATURES.map((f, i) => <FeatureCard key={i} {...f} index={i} />)}
                </div>
            </section>

            {/* ── Pricing ── */}
            <section id="pricing" className="relative max-w-7xl mx-auto px-6 py-24 overflow-hidden">
                <GradientOrb className="w-[500px] h-[500px] bg-blue-700 bottom-0 left-0 -translate-x-1/2" />

                <div className="text-center mb-16">
                    <motion.span
                        variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                        className="inline-block text-xs font-bold uppercase tracking-widest text-blue-400 mb-4"
                    >
                        Pricing
                    </motion.span>
                    <motion.h2
                        variants={fadeUp} initial="hidden" whileInView="show" custom={1} viewport={{ once: true }}
                        className="text-5xl font-black text-white"
                    >
                        Simple, Transparent Pricing
                    </motion.h2>
                    <motion.p
                        variants={fadeUp} initial="hidden" whileInView="show" custom={2} viewport={{ once: true }}
                        className="text-slate-400 mt-3"
                    >
                        Start for free. Scale as you grow. We are Comming Soon
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 relative">
                    {PLANS.map((p, i) => <PlanCard key={i} plan={p} />)}
                </div>
            </section>

            {/* ── CTA Banner ── */}
            <section className="relative mx-6 mb-24 rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-violet-700" />
                <div className="absolute inset-0 opacity-20"
                    style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }}
                />
                <GradientOrb className="w-[400px] h-[400px] bg-white top-0 right-0 opacity-5" />

                <div className="relative text-center py-24 px-6">
                    <h2 className="text-5xl md:text-6xl font-black text-white mb-5 leading-tight">
                        Ready to Ship Faster?
                    </h2>
                    <div className="flex justify-center gap-4 flex-wrap">
                        <button onClick={handleStart} className="group px-8 py-3.5 rounded-xl bg-white text-blue-700 font-bold text-sm hover:bg-blue-50 transition flex items-center gap-2 shadow-xl">
                            Sign In For Early Acces
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button onClick={handleStart} className="px-8 py-3.5 rounded-xl border border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition flex items-center gap-2">
                            <Github size={16} />
                            Connect GitHub To Join Us
                        </button>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}
