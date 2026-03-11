"use client"

import Link from "next/link";
import { Github, Twitter, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/mode-toggle"; // Assuming your Shadcn theme toggle location

export default function Footer() {
    return (
        <footer className="border-t bg-background">
            <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    {/* Brand and Newsletter Section */}
                    <div className="space-y-8">
                        <Link href="/" className="text-2xl font-bold tracking-tight">
                            <img src='/logo.png' className="h-6" />
                        </Link>
                        <p className="text-sm text-muted-foreground max-w-xs">
                            Making the web a more beautiful place, one component at a time.
                        </p>
                        <div className="flex flex-col gap-4">
                            <h3 className="text-sm font-semibold">Subscribe to our newsletter</h3>
                            <div className="flex w-full max-w-sm items-center space-x-2">
                                <Input type="email" placeholder="Email" />
                                <Button type="submit">Join</Button>
                            </div>
                        </div>
                    </div>

                    {/* Links Grid */}
                    <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold">Product</h3>
                                <ul className="mt-4 space-y-2">
                                    <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition">Features</Link></li>
                                    <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition">Integrations</Link></li>
                                    <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition">Pricing</Link></li>
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-semibold">Support</h3>
                                <ul className="mt-4 space-y-2">
                                    <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition">Documentation</Link></li>
                                    <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition">API Status</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold">Company</h3>
                                <ul className="mt-4 space-y-2">
                                    <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition">About</Link></li>
                                    <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition">Blog</Link></li>
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-semibold">Legal</h3>
                                <ul className="mt-4 space-y-2">
                                    <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition">Privacy</Link></li>
                                    <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition">Terms</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="my-8 border-muted" />

                {/* Bottom Section */}
                <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                    <p className="text-xs text-muted-foreground">
                        &copy; {new Date().getFullYear()} Brand Inc. All rights reserved.
                    </p>

                    <div className="flex items-center space-x-4">
                        <div className="flex space-x-2">
                            <Button variant="ghost" size="icon" asChild>
                                <Link href="https://github.com"><Github className="h-4 w-4" /></Link>
                            </Button>
                            <Button variant="ghost" size="icon" asChild>
                                <Link href="https://twitter.com"><Twitter className="h-4 w-4" /></Link>
                            </Button>
                            <Button variant="ghost" size="icon" asChild>
                                <Link href="mailto:hello@example.com"><Mail className="h-4 w-4" /></Link>
                            </Button>
                        </div>
                        <div className="h-6 w-px bg-muted" />
                    </div>
                </div>
            </div>
        </footer>
    );
}

