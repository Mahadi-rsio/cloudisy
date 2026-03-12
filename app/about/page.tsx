"use client"

import { CheckCircle2, Zap, CreditCard, Github, Rocket, ShieldCheck, Cpu, Code2, Globe, Zap as ZapIcon, ArrowRight } from "lucide-react";
import { GridBackground } from "@/components/grid-bg";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutPage() {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };
    return (
        <>
            <main className="relative overflow-hidden">
                <GridBackground />

                <Image
                    src="/logo.png"
                    alt="Cloudisy Logo - Cloud Hosting for Bangladeshi Developers"
                    width={250}
                    height={180}
                    className='mx-auto mt-8'
                    priority
                />

                <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 sm:py-32">
                    {/* 1. Enhanced Hero Section */}
                    <motion.div
                        initial="initial"
                        animate="animate"
                        variants={fadeIn}
                        className="max-w-3xl mb-20"
                    >
                        <motion.h1
                            className="text-5xl font-extrabold tracking-tight sm:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            Cloud Infrastructure Built for Bangladeshi Developers
                        </motion.h1>
                        <motion.p
                            className="mt-6 text-xl text-muted-foreground leading-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            Cloudisy eliminates barriers to world-class cloud deployment. We combine enterprise-grade infrastructure with local accessibility—BDIX optimization, BDT-based billing, and instant payment integration for developers in Bangladesh.
                        </motion.p>
                    </motion.div>

                    {/* 2. Our Story Section - Enhanced with Better Content */}
                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32 items-center">
                        <motion.div
                            whileInView={{ opacity: 1, x: 0 }}
                            initial={{ opacity: 0, x: -30 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <h2 className="text-4xl font-bold text-primary">The Cloudisy Story</h2>
                            <div className="space-y-4">
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    In late 2024, our team of Bangladeshi engineers identified a critical gap in the global cloud infrastructure landscape. Thousands of talented developers across Bangladesh were building exceptional projects—only to hit an insurmountable wall at deployment. International credit card requirements, prohibitive latency from distant data centers, and pricing models unfamiliar to local markets made "going live" feel impossible.
                                </p>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    We spent the following year architecting a fundamentally different approach. Rather than forcing developers to adapt to Western infrastructure, we built infrastructure that adapts to developers. Our platform integrates <strong>BDIX-optimized routing</strong> for local-speed performance, <strong>bKash, Nagad, and Upay merchant integration</strong> for seamless BDT billing, and <strong>Next.js-native optimization</strong> that understands the needs of modern web developers.
                                </p>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    Cloudisy isn't a compromise. It's enterprise cloud infrastructure that happens to be built for Bangladesh.
                                </p>
                            </div>
                        </motion.div>
                        <motion.div
                            whileInView={{ opacity: 1, y: 0 }}
                            initial={{ opacity: 0, y: 20 }}
                            viewport={{ once: true }}
                            className="grid grid-cols-2 gap-4"
                        >
                            <div className="p-8 rounded-2xl bg-secondary/50 border border-white/5 text-center hover:border-primary/30 transition-colors">
                                <h4 className="text-4xl font-bold text-primary mb-2">100+</h4>
                                <p className="text-sm text-muted-foreground">Beta Testers</p>
                                <p className="text-xs text-muted-foreground/60 mt-2">Across Bangladesh</p>
                            </div>
                            <div className="p-8 rounded-2xl bg-secondary/50 border border-white/5 text-center hover:border-primary/30 transition-colors">
                                <h4 className="text-4xl font-bold text-primary mb-2">99.9%</h4>
                                <p className="text-sm text-muted-foreground">Uptime SLA</p>
                                <p className="text-xs text-muted-foreground/60 mt-2">Industry Standard</p>
                            </div>
                            <div className="p-8 rounded-2xl bg-secondary/50 border border-white/5 text-center hover:border-primary/30 transition-colors">
                                <h4 className="text-4xl font-bold text-primary mb-2">&lt;50ms</h4>
                                <p className="text-sm text-muted-foreground">Avg Latency</p>
                                <p className="text-xs text-muted-foreground/60 mt-2">From Dhaka</p>
                            </div>
                            <div className="p-8 rounded-2xl bg-secondary/50 border border-white/5 text-center hover:border-primary/30 transition-colors">
                                <h4 className="text-4xl font-bold text-primary mb-2">Free</h4>
                                <p className="text-sm text-muted-foreground">Setup Fees</p>
                                <p className="text-xs text-muted-foreground/60 mt-2">Get started instantly</p>
                            </div>
                        </motion.div>
                    </section>

                    {/* 3. The Problem We Solve - Better SEO Context */}
                    <section className="mb-32 bg-secondary/20 rounded-3xl p-12 border border-white/5">
                        <h2 className="text-3xl font-bold mb-8">The Global Infrastructure Gap</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 mb-4">
                                    <CreditCard className="w-6 h-6 text-primary flex-shrink-0" />
                                    <h3 className="font-bold text-lg">Payment Barriers</h3>
                                </div>
                                <p className="text-muted-foreground">
                                    Major cloud providers require international credit cards—a luxury most Bangladeshi developers don't have. We accept local payment methods from day one.
                                </p>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 mb-4">
                                    <Globe className="w-6 h-6 text-primary flex-shrink-0" />
                                    <h3 className="font-bold text-lg">Latency Issues</h3>
                                </div>
                                <p className="text-muted-foreground">
                                    Servers hosted in Singapore or beyond create 150+ ms latency. BDIX-integrated infrastructure keeps your users' experience snappy from within Bangladesh.
                                </p>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 mb-4">
                                    <Zap className="w-6 h-6 text-primary flex-shrink-0" />
                                    <h3 className="font-bold text-lg">Support Gaps</h3>
                                </div>
                                <p className="text-muted-foreground">
                                    English-only support and timezone misalignment frustrate developers. We operate in Bangladesh time with Bengali and English support.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* 4. Technical Excellence Section - Enhanced */}
                    <section className="mb-32">
                        <h2 className="text-3xl font-bold text-center mb-12">Enterprise-Grade Infrastructure</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                {
                                    icon: <ShieldCheck />,
                                    title: "Enterprise Security",
                                    desc: "DDoS protection, isolated compute environments, automatic SSL/TLS, and compliance with modern security standards."
                                },
                                {
                                    icon: <Cpu />,
                                    title: "High-Performance Infrastructure",
                                    desc: "NVMe SSD storage, high-RAM instances, and CPU optimization for demanding Next.js and Nuxt applications."
                                },
                                {
                                    icon: <Code2 />,
                                    title: "Framework-Native Optimization",
                                    desc: "Deep optimization for Next.js (SSR/ISR/Static), Nuxt, Astro, and modern JavaScript frameworks."
                                },
                                {
                                    icon: <Globe />,
                                    title: "BDIX-Integrated Peering",
                                    desc: "Direct peering on Bangladesh Internet Exchange for lowest possible latency and fastest local access."
                                }
                            ].map((feature, i) => (
                                <motion.div
                                    key={i}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-6 rounded-xl bg-secondary/20 border border-white/5 hover:border-primary/30 transition-colors"
                                >
                                    <div className="text-primary mb-4 w-8 h-8">{feature.icon}</div>
                                    <h4 className="font-bold mb-3">{feature.title}</h4>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* 5. Core Principles Section */}
                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32 items-center">
                        <motion.div
                            whileInView={{ opacity: 1, x: 0 }}
                            initial={{ opacity: 0, x: -30 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl font-bold mb-8">Our Core Principles</h2>
                            <ul className="space-y-6">
                                {[
                                    {
                                        title: "Zero Friction Deployment",
                                        desc: "Push to Git and go live in seconds. No complicated configurations, no deployment anxiety."
                                    },
                                    {
                                        title: "True Inclusion",
                                        desc: "Students, startups, and enterprises deserve equal access to cloud power. Pricing in BDT with local payment methods."
                                    },
                                    {
                                        title: "Performance by Default",
                                        desc: "Next.js optimization, edge caching, and BDIX peering make fast applications the easy path."
                                    },
                                    {
                                        title: "Community-First Development",
                                        desc: "Built with feedback from Bangladeshi developers, for Bangladeshi developers."
                                    }
                                ].map((item, i) => (
                                    <motion.li
                                        key={i}
                                        className="flex gap-4 group"
                                        whileInView={{ opacity: 1, x: 0 }}
                                        initial={{ opacity: 0, x: -20 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                                        <div>
                                            <h4 className="font-bold mb-2">{item.title}</h4>
                                            <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                                        </div>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                        <motion.div
                            whileInView={{ opacity: 1, x: 30 }}
                            initial={{ opacity: 0, x: 30 }}
                            viewport={{ once: true }}
                            className="hidden lg:block"
                        >
                            <div className="bg-gradient-to-br from-primary/10 to-blue-400/10 rounded-3xl p-12 border border-primary/20">
                                <h3 className="font-mono text-primary mb-4">Why Cloudisy?</h3>
                                <ul className="space-y-3 font-mono text-sm">
                                    <li className="flex items-center gap-2">
                                        <ArrowRight className="w-4 h-4 text-primary" />
                                        <span>Local Payment Integration</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <ArrowRight className="w-4 h-4 text-primary" />
                                        <span>BDIX Optimization</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <ArrowRight className="w-4 h-4 text-primary" />
                                        <span>Bangladesh Timezone Support</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <ArrowRight className="w-4 h-4 text-primary" />
                                        <span>Pricing in Bengali Taka</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <ArrowRight className="w-4 h-4 text-primary" />
                                        <span>Next.js-Native Performance</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <ArrowRight className="w-4 h-4 text-primary" />
                                        <span>99.9% Uptime SLA</span>
                                    </li>
                                </ul>
                            </div>
                        </motion.div>
                    </section>

                    {/* 6. Roadmap Section */}
                    <section className="mb-32 bg-secondary/20 rounded-3xl p-12 border border-white/5">
                        <h2 className="text-3xl font-bold mb-10 text-center">Product Roadmap</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                            <motion.div
                                className="p-6 border-l-4 border-primary bg-primary/5 rounded-r-lg"
                                whileInView={{ opacity: 1, x: 0 }}
                                initial={{ opacity: 0, x: -20 }}
                                viewport={{ once: true }}
                            >
                                <div className="text-primary font-mono font-bold mb-3 text-sm">Q1-Q2 2026 (Now)</div>
                                <h4 className="font-bold mb-2 text-lg">Next.js Core Platform</h4>
                                <ul className="text-sm text-muted-foreground space-y-2">
                                    <li>• Stable SSR/ISR/Static hosting</li>
                                    <li>• Automatic deployments from Git</li>
                                    <li>• bKash auto-billing integration</li>
                                </ul>
                            </motion.div>
                            <motion.div
                                className="p-6 border-l-4 border-white/20 rounded-r-lg opacity-60"
                                whileInView={{ opacity: 1, x: 0 }}
                                initial={{ opacity: 0, x: -20 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                            >
                                <div className="text-muted-foreground font-mono font-bold mb-3 text-sm">Q3-Q4 2026</div>
                                <h4 className="font-bold mb-2 text-lg">Managed Databases</h4>
                                <ul className="text-sm text-muted-foreground space-y-2">
                                    <li>• PostgreSQL managed clusters</li>
                                    <li>• Automatic backups & failover</li>
                                    <li>• Local billing in BDT</li>
                                </ul>
                            </motion.div>
                            <motion.div
                                className="p-6 border-l-4 border-white/20 rounded-r-lg opacity-60"
                                whileInView={{ opacity: 1, x: 0 }}
                                initial={{ opacity: 0, x: -20 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                            >
                                <div className="text-muted-foreground font-mono font-bold mb-3 text-sm">2027</div>
                                <h4 className="font-bold mb-2 text-lg">Edge Functions & CDN</h4>
                                <ul className="text-sm text-muted-foreground space-y-2">
                                    <li>• Serverless edge computing</li>
                                    <li>• Global CDN with BDIX origin</li>
                                    <li>• Advanced analytics & monitoring</li>
                                </ul>
                            </motion.div>
                        </div>
                    </section>

                    {/* 7. Final CTA Section */}
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        className="text-center bg-gradient-to-r from-primary/10 to-blue-400/10 rounded-3xl p-12 border border-primary/20"
                    >
                        <h2 className="text-4xl font-bold mb-4">Ready to Deploy Without Barriers?</h2>
                        <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                            Join hundreds of Bangladeshi developers building world-class applications on Cloudisy.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="/signup" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all hover:scale-105">
                                <Rocket className="w-5 h-5" /> Get Early Access
                            </a>
                            <a href="https://github.com/cloudisy" className="bg-secondary hover:bg-secondary/80 text-secondary-foreground px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
                                <Github className="w-5 h-5" /> Star on GitHub
                            </a>
                        </div>
                    </motion.div>
                </div>
            </main>
        </>
    );
}
