"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Settings, UserIcon, LogOut, Wallet, Bell } from "lucide-react"
import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"

export default function AppBar() {
    const balance = 1250.75
    const [isScrolled, setIsScrolled] = useState(false)
    const [notifications, setNotifications] = useState(3)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <>
            <style>{`
                @keyframes border-beam {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(400%); }
                }
                .beam-line::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 70%;
                    height: 1px;
                    background: linear-gradient(
                        90deg,
                        transparent 0%,
                        #6366f1 20%,
                        #a855f7 50%,
                        #06b6d4 80%,
                        transparent 100%
                    );
                    animation: border-beam 2.4s ease-in-out infinite;
                    filter: blur(0.5px);
                    border-radius: 9999px;
                }
                .appbar-transition {
                    transition: background 0.15s ease, backdrop-filter 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
                }
                .balance-badge {
                    background: linear-gradient(135deg, #6366f1, #a855f7);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
            `}</style>

            <header
                className={`sticky top-0 z-50 w-full appbar-transition relative overflow-hidden
                    ${isScrolled
                        ? "bg-black/40 backdrop-blur-md border-b border-white/10 shadow-sm beam-line"
                        : "bg-transparent border-b border-transparent"
                    }`}
            >
                <div className="flex h-16 items-center justify-between px-4 md:px-8">

                    {/* Left Section */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 cursor-pointer select-none">
                            <img src="/logo.png" className="h-10" alt="Logo" />
                        </div>

                        {/* Nav links — visible on md+ */}
                        <nav className="hidden md:flex items-center gap-1 ml-2">
                            {["Markets", "Portfolio", "Trade"].map((item) => (
                                <button
                                    key={item}
                                    className="px-3 py-1.5 rounded-md text-sm font-medium text-foreground/80"
                                >
                                    {item}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-2">

                        {/* Profile Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="flex items-center gap-1.5 rounded-full ">
                                    <Avatar>
                                        <AvatarImage src="/" />
                                        <AvatarFallback className="text-xs font-bold bg-gradient-to-br from-indigo-500 to-purple-600 text-white">MR</AvatarFallback>
                                    </Avatar>
                                </button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end" className="w-60">
                                <DropdownMenuLabel>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-9 w-9">
                                            <AvatarImage src="/profile.jpg" />
                                            <AvatarFallback className="text-xs font-bold bg-gradient-to-br from-indigo-500 to-purple-600 text-white">MR</AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-sm">Mohammad Rafi</span>
                                            <span className="text-xs text-muted-foreground font-normal">rafi@example.com</span>
                                        </div>
                                    </div>
                                </DropdownMenuLabel>

                                <DropdownMenuSeparator />

                                {/* Balance */}
                                <div className="px-2 py-2 mx-1 mb-1 rounded-md bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground flex items-center gap-1.5">
                                            <Wallet className="h-3.5 w-3.5" />
                                            Available Balance
                                        </span>
                                        <span className="font-bold text-indigo-500">৳ {balance.toLocaleString("en-BD", { minimumFractionDigits: 2 })}</span>
                                    </div>
                                </div>

                                <DropdownMenuSeparator />

                                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                                    <UserIcon className="h-4 w-4" />
                                    Profile
                                </DropdownMenuItem>

                                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                                    <Wallet className="h-4 w-4" />
                                    Add Balance
                                </DropdownMenuItem>

                                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                                    <Bell className="h-4 w-4" />
                                    Notifications
                                    {notifications > 0 && (
                                        <Badge variant="destructive" className="ml-auto h-5 px-1.5 text-[10px]">
                                            {notifications}
                                        </Badge>
                                    )}
                                </DropdownMenuItem>

                                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                                    <Settings className="h-4 w-4" />
                                    Settings
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />

                                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-red-500 focus:text-red-500 focus:bg-red-500/10">
                                    <LogOut className="h-4 w-4" />
                                    Logout
                                </DropdownMenuItem>

                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </header>
        </>
    )
}

