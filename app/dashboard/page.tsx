"use client"

import { useState, useMemo, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { GridBackground } from "@/components/grid-bg"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
    ContextMenuSeparator,
    ContextMenuShortcut,
} from "@/components/ui/context-menu"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    MoreVertical,
    Trash2,
    Edit,
    FolderKanban,
    PauseCircle,
    PlayCircle,
    PlusIcon,
    Search,
    Calendar as CalendarIcon,
    Filter,
    Ghost,
    Zap,
    TrendingUp,
    CheckCircle2,
    BarChart3,
    Sparkles,
    Pin,
    Copy,
    ArrowUpRight,
    Target,
} from "lucide-react"
import { useRouter } from "next/navigation"

type Status = "active" | "paused" | "completed"
type Priority = "low" | "medium" | "high"

export type Project = {
    id: string
    name: string
    description: string
    status: Status
    createdAt: string
    priority: Priority
    progress: number
    tags: string[]
    pinned: boolean
    dueDate?: string
}

const priorityConfig = {
    low: { color: "text-sky-400", bg: "bg-sky-400/10 border-sky-400/20", label: "Low" },
    medium: { color: "text-amber-400", bg: "bg-amber-400/10 border-amber-400/20", label: "Medium" },
    high: { color: "text-rose-400", bg: "bg-rose-400/10 border-rose-400/20", label: "High" },
}

const statusConfig = {
    active: { color: "text-emerald-400", dot: "bg-emerald-400", glow: "shadow-emerald-500/50" },
    paused: { color: "text-slate-400", dot: "bg-slate-400", glow: "shadow-slate-500/50" },
    completed: { color: "text-violet-400", dot: "bg-violet-400", glow: "shadow-violet-500/50" },
}


// Stat card with glowing border
function StatCard({ icon: Icon, label, value, color, sub }: {
    icon: any, label: string, value: string | number, color: string, sub?: string
}) {
    return (
        <div className={`relative rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-sm p-4 overflow-hidden group hover:border-white/10 transition-all duration-300`}>
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${color} blur-2xl`} />
            <div className="relative flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-white/5 ${color.replace("from-", "text-").split(" ")[0]}`}>
                    <Icon className="h-4 w-4" />
                </div>
                <div>
                    <p className="text-xs text-white/40 font-medium tracking-wide uppercase">{label}</p>
                    <p className="text-2xl font-bold text-white mt-0.5">{value}</p>
                    {sub && <p className="text-xs text-white/30 mt-0.5">{sub}</p>}
                </div>
            </div>
        </div>
    )
}

export default function Dashboard() {
    const [projects, setProjects] = useState<Project[]>([])
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState<Status | "all">("all")
    const [priorityFilter, setPriorityFilter] = useState<Priority | "all">("all")
    const [open, setOpen] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [sortBy, setSortBy] = useState<"createdAt" | "name" | "priority" | "progress">("createdAt")
    const [tagInput, setTagInput] = useState("")
    const [mounted, setMounted] = useState(false)

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        priority: "medium" as Priority,
        progress: 0,
        tags: [] as string[],
        dueDate: "",
    })

    const router = useRouter()

    useEffect(() => {
        setMounted(true)
        const saved = localStorage.getItem("projects_v2")
        if (saved) setProjects(JSON.parse(saved))
    }, [])

    useEffect(() => {
        if (mounted) localStorage.setItem("projects_v2", JSON.stringify(projects))
    }, [projects, mounted])

    // Keyboard shortcut
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "n") {
                e.preventDefault()
                setOpen(true)
            }
        }
        window.addEventListener("keydown", handler)
        return () => window.removeEventListener("keydown", handler)
    }, [])

    const handleNavigate = (project: Project) => {
        const params = new URLSearchParams({
            id: project.id,
            name: project.name,
            description: project.description,
            status: project.status,
            createdAt: project.createdAt
        })
        router.push(`/project?${params.toString()}`)
    }

    const resetForm = () => {
        setFormData({ name: "", description: "", priority: "medium", progress: 0, tags: [], dueDate: "" })
        setTagInput("")
        setEditingId(null)
    }

    const handleOpenChange = (isOpen: boolean) => {
        setOpen(isOpen)
        if (!isOpen) resetForm()
    }

    const startEdit = (project: Project, e?: React.MouseEvent) => {
        e?.stopPropagation()
        setEditingId(project.id)
        setFormData({
            name: project.name,
            description: project.description,
            priority: project.priority,
            progress: project.progress,
            tags: project.tags,
            dueDate: project.dueDate || "",
        })
        setOpen(true)
    }

    const handleSave = (e?: React.FormEvent) => {
        e?.preventDefault()
        if (!formData.name.trim()) return

        if (editingId) {
            setProjects(prev => prev.map(p => p.id === editingId ? { ...p, ...formData } : p))
        } else {
            const newProject: Project = {
                id: String(Date.now()),
                status: "active",
                createdAt: new Date().toISOString(),
                pinned: false,
                ...formData,
            }
            setProjects(prev => [newProject, ...prev])
        }
        handleOpenChange(false)
    }

    const deleteProject = (id: string, e?: React.MouseEvent) => {
        e?.stopPropagation()
        setProjects(prev => prev.filter(p => p.id !== id))
    }

    const toggleStatus = (id: string, e?: React.MouseEvent) => {
        e?.stopPropagation()
        setProjects(prev => prev.map(p =>
            p.id === id ? { ...p, status: p.status === "active" ? "paused" : p.status === "paused" ? "active" : p.status } : p
        ))
    }

    const markComplete = (id: string, e?: React.MouseEvent) => {
        e?.stopPropagation()
        setProjects(prev => prev.map(p => p.id === id ? { ...p, status: "completed", progress: 100 } : p))
    }

    const togglePin = (id: string, e?: React.MouseEvent) => {
        e?.stopPropagation()
        setProjects(prev => prev.map(p => p.id === id ? { ...p, pinned: !p.pinned } : p))
    }

    const duplicateProject = (project: Project, e?: React.MouseEvent) => {
        e?.stopPropagation()
        const dup: Project = {
            ...project,
            id: String(Date.now()),
            name: `${project.name} (copy)`,
            createdAt: new Date().toISOString(),
            pinned: false,
        }
        setProjects(prev => [dup, ...prev])
    }

    const addTag = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && tagInput.trim()) {
            e.preventDefault()
            if (!formData.tags.includes(tagInput.trim())) {
                setFormData(prev => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }))
            }
            setTagInput("")
        }
    }

    const removeTag = (tag: string) => {
        setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }))
    }

    // Stats
    const stats = useMemo(() => ({
        total: projects.length,
        active: projects.filter(p => p.status === "active").length,
        completed: projects.filter(p => p.status === "completed").length,
        avgProgress: projects.length ? Math.round(projects.reduce((a, p) => a + p.progress, 0) / projects.length) : 0,
    }), [projects])

    // Filtered & sorted
    const filteredProjects = useMemo(() => {
        let result = projects.filter(p => {
            const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
            const matchesStatus = statusFilter === "all" || p.status === statusFilter
            const matchesPriority = priorityFilter === "all" || p.priority === priorityFilter
            return matchesSearch && matchesStatus && matchesPriority
        })

        result.sort((a, b) => {
            if (a.pinned !== b.pinned) return a.pinned ? -1 : 1
            if (sortBy === "name") return a.name.localeCompare(b.name)
            if (sortBy === "priority") {
                const order = { high: 0, medium: 1, low: 2 }
                return order[a.priority] - order[b.priority]
            }
            if (sortBy === "progress") return b.progress - a.progress
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        })

        return result
    }, [projects, searchQuery, statusFilter, priorityFilter, sortBy])

    return (
        <TooltipProvider>
            <GridBackground />

            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

                * { font-family: 'Outfit', sans-serif; }
                .mono { font-family: 'JetBrains Mono', monospace; }

                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.6; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.05); }
                }
                @keyframes pulse-slow-delay {
                    0%, 100% { opacity: 0.4; transform: scale(1.05); }
                    50% { opacity: 0.8; transform: scale(1); }
                }
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-6px); }
                }
                @keyframes glow-pulse {
                    0%, 100% { box-shadow: 0 0 20px rgba(99,102,241,0.2); }
                    50% { box-shadow: 0 0 40px rgba(99,102,241,0.4), 0 0 80px rgba(99,102,241,0.1); }
                }
                @keyframes slide-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
                .animate-pulse-slow-delay { animation: pulse-slow-delay 5s ease-in-out infinite; }
                .animate-float { animation: float 3s ease-in-out infinite; }
                .animate-glow-pulse { animation: glow-pulse 2s ease-in-out infinite; }
                .animate-slide-up { animation: slide-up 0.4s ease-out forwards; }
                .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }

                .card-enter {
                    animation: slide-up 0.4s ease-out forwards;
                }
                .card-enter:nth-child(1) { animation-delay: 0ms; }
                .card-enter:nth-child(2) { animation-delay: 60ms; }
                .card-enter:nth-child(3) { animation-delay: 120ms; }
                .card-enter:nth-child(4) { animation-delay: 180ms; }
                .card-enter:nth-child(5) { animation-delay: 240ms; }
                .card-enter:nth-child(6) { animation-delay: 300ms; }

                .shimmer-btn::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
                    animation: shimmer 2s infinite;
                }

                .project-card {
                    position: relative;
                    background: rgba(255,255,255,0.02);
                    border: 1px solid rgba(255,255,255,0.06);
                    backdrop-filter: blur(12px);
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .project-card:hover {
                    border-color: rgba(99,102,241,0.3);
                    background: rgba(99,102,241,0.04);
                    transform: translateY(-2px);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(99,102,241,0.1), inset 0 1px 0 rgba(255,255,255,0.05);
                }

                .priority-high { border-left: 3px solid #f87171; }
                .priority-medium { border-left: 3px solid #fbbf24; }
                .priority-low { border-left: 3px solid #38bdf8; }

                ::-webkit-scrollbar { width: 4px; }
                ::-webkit-scrollbar-track { background: transparent; }
                ::-webkit-scrollbar-thumb { background: rgba(99,102,241,0.3); border-radius: 2px; }

                .glass-input {
                    background: rgba(255,255,255,0.03) !important;
                    border-color: rgba(255,255,255,0.08) !important;
                    color: white !important;
                }
                .glass-input::placeholder { color: rgba(255,255,255,0.25) !important; }
                .glass-input:focus { border-color: rgba(99,102,241,0.5) !important; box-shadow: 0 0 0 2px rgba(99,102,241,0.1) !important; }
            `}</style>

            <div className="min-h-screen">
                <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-end animate-slide-up">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="h-2 w-2 bg-indigo-400 rounded-full animate-pulse" />
                                <span className="text-xs text-indigo-400/70 tracking-[0.2em] uppercase mono font-medium">Project Manager</span>
                            </div>
                            <h1 className="text-4xl font-bold text-white tracking-tight">
                                Dashboard
                                <span className="inline-block ml-3 text-2xl animate-float">⚡</span>
                            </h1>
                            <p className="text-white/35 text-sm">
                                {stats.total} project{stats.total !== 1 ? "s" : ""} · {stats.active} active · {stats.completed} completed
                            </p>
                        </div>

                        <div className="flex items-center gap-2 w-full md:w-auto">
                            {/* Search */}
                            <div className="relative flex-1 md:w-72">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/30" />
                                <Input
                                    placeholder="Search projects, tags..."
                                    className="glass-input pl-9 h-9 text-sm rounded-lg"
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                />
                            </div>

                            {/* Sort */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm" className="h-9 border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white text-xs">
                                        <BarChart3 className="h-3.5 w-3.5 mr-1.5" />
                                        Sort
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="bg-[#0f1629] border-white/10">
                                    <DropdownMenuLabel className="text-white/40 text-xs">Sort By</DropdownMenuLabel>
                                    <DropdownMenuSeparator className="bg-white/5" />
                                    {(["createdAt", "name", "priority", "progress"] as const).map(s => (
                                        <DropdownMenuItem key={s} onClick={() => setSortBy(s)}
                                            className={`text-sm cursor-pointer ${sortBy === s ? "text-indigo-400" : "text-white/70"}`}>
                                            {s === "createdAt" ? "Date Created" : s.charAt(0).toUpperCase() + s.slice(1)}
                                            {sortBy === s && <CheckCircle2 className="h-3.5 w-3.5 ml-auto text-indigo-400" />}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>

                            {/* Filter */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="icon" className="h-9 w-9 border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white">
                                        <Filter className="h-3.5 w-3.5" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="bg-[#0f1629] border-white/10 w-52">
                                    <DropdownMenuLabel className="text-white/40 text-xs">Filter Status</DropdownMenuLabel>
                                    <DropdownMenuSeparator className="bg-white/5" />
                                    {(["all", "active", "paused", "completed"] as const).map(s => (
                                        <DropdownMenuItem key={s} onClick={() => setStatusFilter(s)}
                                            className={`text-sm cursor-pointer capitalize ${statusFilter === s ? "text-indigo-400" : "text-white/70"}`}>
                                            {s === "all" ? "All Statuses" : s}
                                            {statusFilter === s && <CheckCircle2 className="h-3.5 w-3.5 ml-auto text-indigo-400" />}
                                        </DropdownMenuItem>
                                    ))}
                                    <DropdownMenuSeparator className="bg-white/5" />
                                    <DropdownMenuLabel className="text-white/40 text-xs">Filter Priority</DropdownMenuLabel>
                                    <DropdownMenuSeparator className="bg-white/5" />
                                    {(["all", "high", "medium", "low"] as const).map(p => (
                                        <DropdownMenuItem key={p} onClick={() => setPriorityFilter(p)}
                                            className={`text-sm cursor-pointer capitalize ${priorityFilter === p ? "text-indigo-400" : "text-white/70"}`}>
                                            {p === "all" ? "All Priorities" : p}
                                            {priorityFilter === p && <CheckCircle2 className="h-3.5 w-3.5 ml-auto text-indigo-400" />}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>

                            {/* New Project */}
                            <Dialog open={open} onOpenChange={handleOpenChange}>
                                <DialogTrigger asChild>
                                    <Button className="h-9 relative overflow-hidden bg-indigo-600 hover:bg-indigo-500 text-white border-0 rounded-lg shimmer-btn text-sm font-medium shadow-lg shadow-indigo-500/20">
                                        <PlusIcon className="h-3.5 w-3.5 mr-1.5" /> New Project
                                    </Button>
                                </DialogTrigger>

                                <DialogContent className="bg-[#0c1120] border-white/10 text-white sm:max-w-[540px] shadow-2xl">
                                    <DialogHeader>
                                        <DialogTitle className="text-lg font-semibold text-white flex items-center gap-2">
                                            <Sparkles className="h-4 w-4 text-indigo-400" />
                                            {editingId ? "Edit Project" : "Create Project"}
                                        </DialogTitle>
                                    </DialogHeader>

                                    <form onSubmit={handleSave} className="space-y-5 py-2">
                                        <div className="space-y-1.5">
                                            <Label className="text-white/60 text-xs uppercase tracking-wide">Project Name *</Label>
                                            <Input value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                placeholder="e.g. Q4 Marketing Sprint"
                                                className="glass-input rounded-lg"
                                                autoFocus />
                                        </div>

                                        <div className="space-y-1.5">
                                            <Label className="text-white/60 text-xs uppercase tracking-wide">Description</Label>
                                            <Textarea value={formData.description}
                                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                                placeholder="Add project details..."
                                                className="glass-input rounded-lg h-20 resize-none" />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <Label className="text-white/60 text-xs uppercase tracking-wide">Priority</Label>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="outline" className="w-full justify-between glass-input h-10 text-sm border rounded-lg">
                                                            <span className={priorityConfig[formData.priority].color + " capitalize"}>{formData.priority}</span>
                                                            <Filter className="h-3 w-3 opacity-40" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent className="bg-[#0f1629] border-white/10">
                                                        {(["low", "medium", "high"] as Priority[]).map(p => (
                                                            <DropdownMenuItem key={p} onClick={() => setFormData({ ...formData, priority: p })}
                                                                className={`capitalize ${priorityConfig[p].color} cursor-pointer`}>
                                                                {p}
                                                            </DropdownMenuItem>
                                                        ))}
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>

                                            <div className="space-y-1.5">
                                                <Label className="text-white/60 text-xs uppercase tracking-wide">Due Date</Label>
                                                <Input type="date" value={formData.dueDate}
                                                    onChange={e => setFormData({ ...formData, dueDate: e.target.value })}
                                                    className="glass-input rounded-lg h-10 text-sm" />
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <Label className="text-white/60 text-xs uppercase tracking-wide flex justify-between">
                                                <span>Progress</span>
                                                <span className="text-indigo-400 mono">{formData.progress}%</span>
                                            </Label>
                                            <input type="range" min={0} max={100} value={formData.progress}
                                                onChange={e => setFormData({ ...formData, progress: Number(e.target.value) })}
                                                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                                                style={{
                                                    background: `linear-gradient(to right, #6366f1 ${formData.progress}%, rgba(255,255,255,0.1) ${formData.progress}%)`
                                                }} />
                                        </div>

                                        <div className="space-y-1.5">
                                            <Label className="text-white/60 text-xs uppercase tracking-wide">Tags (press Enter)</Label>
                                            <Input value={tagInput}
                                                onChange={e => setTagInput(e.target.value)}
                                                onKeyDown={addTag}
                                                placeholder="e.g. design, backend, urgent"
                                                className="glass-input rounded-lg" />
                                            {formData.tags.length > 0 && (
                                                <div className="flex flex-wrap gap-1.5 mt-2">
                                                    {formData.tags.map(tag => (
                                                        <span key={tag} onClick={() => removeTag(tag)}
                                                            className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/20 cursor-pointer hover:bg-rose-500/20 hover:text-rose-300 hover:border-rose-500/20 transition-all">
                                                            {tag} ×
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <DialogFooter className="gap-2 pt-2">
                                            <Button type="button" variant="outline"
                                                onClick={() => handleOpenChange(false)}
                                                className="border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white">
                                                Cancel
                                            </Button>
                                            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white border-0">
                                                <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                                                {editingId ? "Update" : "Create"} Project
                                            </Button>
                                        </DialogFooter>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>

                    {/* Stats Row */}
                    {projects.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 animate-slide-up" style={{ animationDelay: "100ms" }}>
                            <StatCard icon={FolderKanban} label="Total" value={stats.total} color="from-indigo-500/10 to-transparent" />
                            <StatCard icon={Zap} label="Active" value={stats.active} color="from-emerald-500/10 to-transparent" sub="in progress" />
                            <StatCard icon={CheckCircle2} label="Done" value={stats.completed} color="from-violet-500/10 to-transparent" />
                            <StatCard icon={TrendingUp} label="Avg Progress" value={`${stats.avgProgress}%`} color="from-amber-500/10 to-transparent" />
                        </div>
                    )}

                    {/* Active Filters Display */}
                    {(statusFilter !== "all" || priorityFilter !== "all" || searchQuery) && (
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs text-white/30">Filtered:</span>
                            {statusFilter !== "all" && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/20">
                                    Status: {statusFilter}
                                    <button onClick={() => setStatusFilter("all")} className="ml-1 hover:text-white">×</button>
                                </span>
                            )}
                            {priorityFilter !== "all" && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/20">
                                    Priority: {priorityFilter}
                                    <button onClick={() => setPriorityFilter("all")} className="ml-1 hover:text-white">×</button>
                                </span>
                            )}
                            {searchQuery && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs rounded-full bg-white/5 text-white/50 border border-white/10">
                                    "{searchQuery}"
                                    <button onClick={() => setSearchQuery("")} className="ml-1 hover:text-white">×</button>
                                </span>
                            )}
                            <span className="text-xs text-white/20">· {filteredProjects.length} result{filteredProjects.length !== 1 ? "s" : ""}</span>
                        </div>
                    )}

                    {/* Main Grid */}
                    {filteredProjects.length > 0 ? (
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredProjects.map((project, i) => (
                                <ContextMenu key={project.id}>
                                    <ContextMenuTrigger>
                                        <div
                                            onClick={() => handleNavigate(project)}
                                            className={`project-card rounded-xl cursor-pointer card-enter priority-${project.priority}`}
                                            style={{ animationDelay: `${i * 60}ms`, opacity: 0 }}
                                        >
                                            {/* Pinned indicator */}
                                            {project.pinned && (
                                                <div className="absolute top-3 left-3 z-10">
                                                    <Pin className="h-3 w-3 text-amber-400 fill-amber-400" />
                                                </div>
                                            )}

                                            {/* Completion overlay shimmer for completed */}
                                            {project.status === "completed" && (
                                                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-500/5 to-transparent pointer-events-none" />
                                            )}

                                            <div className="p-4 pb-3">
                                                {/* Top Row */}
                                                <div className="flex items-start justify-between gap-2 mb-3">
                                                    <div className="flex items-center gap-2 min-w-0">
                                                        <div className={`p-1.5 rounded-lg ${project.status === "active" ? "bg-indigo-500/15" :
                                                            project.status === "completed" ? "bg-violet-500/15" : "bg-white/5"
                                                            }`}>
                                                            <FolderKanban className={`h-3.5 w-3.5 flex-shrink-0 ${project.status === "active" ? "text-indigo-400" :
                                                                project.status === "completed" ? "text-violet-400" : "text-white/30"
                                                                }`} />
                                                        </div>
                                                        <h3 className="text-sm font-semibold text-white/90 truncate leading-tight">
                                                            {project.name}
                                                        </h3>
                                                    </div>

                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="icon"
                                                                onClick={e => e.stopPropagation()}
                                                                className="h-7 w-7 flex-shrink-0 text-white/30 hover:text-white hover:bg-white/10 rounded-lg">
                                                                <MoreVertical className="h-3.5 w-3.5" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end" className="bg-[#0f1629] border-white/10 w-52">
                                                            <DropdownMenuItem onClick={e => { e.stopPropagation(); startEdit(project) }}
                                                                className="text-white/70 hover:text-white cursor-pointer text-sm">
                                                                <Edit className="h-3.5 w-3.5 mr-2" /> Edit Details
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={e => togglePin(project.id, e)}
                                                                className="text-white/70 hover:text-white cursor-pointer text-sm">
                                                                <Pin className="h-3.5 w-3.5 mr-2" /> {project.pinned ? "Unpin" : "Pin"} Project
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={e => duplicateProject(project, e)}
                                                                className="text-white/70 hover:text-white cursor-pointer text-sm">
                                                                <Copy className="h-3.5 w-3.5 mr-2" /> Duplicate
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator className="bg-white/5" />
                                                            <DropdownMenuItem onClick={e => toggleStatus(project.id, e)}
                                                                className="text-white/70 hover:text-white cursor-pointer text-sm">
                                                                {project.status === "active" ?
                                                                    <><PauseCircle className="h-3.5 w-3.5 mr-2" /> Pause</> :
                                                                    <><PlayCircle className="h-3.5 w-3.5 mr-2" /> Resume</>}
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={e => markComplete(project.id, e)}
                                                                className="text-violet-400 hover:text-violet-300 cursor-pointer text-sm">
                                                                <CheckCircle2 className="h-3.5 w-3.5 mr-2" /> Mark Complete
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator className="bg-white/5" />
                                                            <DropdownMenuItem onClick={e => deleteProject(project.id, e)}
                                                                className="text-rose-400 hover:text-rose-300 cursor-pointer text-sm">
                                                                <Trash2 className="h-3.5 w-3.5 mr-2" /> Delete
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>

                                                {/* Description */}
                                                {project.description && (
                                                    <p className="text-xs text-white/35 line-clamp-2 mb-3 leading-relaxed pl-8">
                                                        {project.description}
                                                    </p>
                                                )}

                                                {/* Tags */}
                                                {project.tags.length > 0 && (
                                                    <div className="flex flex-wrap gap-1 mb-3 pl-8">
                                                        {project.tags.slice(0, 3).map(tag => (
                                                            <span key={tag} className="px-2 py-0.5 text-[10px] rounded-full bg-white/5 text-white/40 border border-white/5">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                        {project.tags.length > 3 && (
                                                            <span className="px-2 py-0.5 text-[10px] rounded-full bg-white/5 text-white/30">
                                                                +{project.tags.length - 3}
                                                            </span>
                                                        )}
                                                    </div>
                                                )}

                                                {/* Progress */}
                                                <div className="space-y-1.5 pl-8">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-[10px] text-white/25 uppercase tracking-wide">Progress</span>
                                                        <span className="text-[10px] mono text-white/40">{project.progress}%</span>
                                                    </div>
                                                    <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                                                        <div
                                                            className={`h-full rounded-full transition-all duration-700 ${project.status === "completed" ? "bg-violet-500" :
                                                                project.progress >= 75 ? "bg-emerald-500" :
                                                                    project.progress >= 40 ? "bg-indigo-500" : "bg-indigo-500/60"
                                                                }`}
                                                            style={{ width: `${project.progress}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Footer */}
                                            <div className="px-4 py-2.5 border-t border-white/5 flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    {/* Status */}
                                                    <div className={`flex items-center gap-1.5 ${statusConfig[project.status].color}`}>
                                                        <div className={`h-1.5 w-1.5 rounded-full ${statusConfig[project.status].dot} ${project.status === "active" ? "animate-pulse" : ""}`} />
                                                        <span className="text-[10px] capitalize font-medium tracking-wide">{project.status}</span>
                                                    </div>

                                                    {/* Priority badge */}
                                                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full border ${priorityConfig[project.priority].bg} ${priorityConfig[project.priority].color} capitalize`}>
                                                        {project.priority}
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-2 text-white/20">
                                                    {project.dueDate && (
                                                        <Tooltip>
                                                            <TooltipTrigger>
                                                                <div className="flex items-center gap-1">
                                                                    <Target className="h-3 w-3" />
                                                                    <span className="text-[10px] mono">
                                                                        {new Date(project.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                                                                    </span>
                                                                </div>
                                                            </TooltipTrigger>
                                                            <TooltipContent className="bg-[#0f1629] border-white/10 text-white/70 text-xs">
                                                                Due {new Date(project.dueDate).toLocaleDateString()}
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    )}
                                                    <div className="flex items-center gap-1">
                                                        <CalendarIcon className="h-3 w-3" />
                                                        <span className="text-[10px] mono">
                                                            {new Date(project.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                                                        </span>
                                                    </div>
                                                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400" />
                                                </div>
                                            </div>
                                        </div>
                                    </ContextMenuTrigger>

                                    <ContextMenuContent className="bg-[#0f1629] border-white/10 w-52">
                                        <ContextMenuItem onClick={() => handleNavigate(project)} className="text-white/70 hover:text-white cursor-pointer text-sm">
                                            <ArrowUpRight className="h-3.5 w-3.5 mr-2" /> Open Project
                                        </ContextMenuItem>
                                        <ContextMenuItem onClick={e => startEdit(project, e as any)} className="text-white/70 hover:text-white cursor-pointer text-sm">
                                            <Edit className="h-3.5 w-3.5 mr-2" /> Edit
                                            <ContextMenuShortcut>⌘E</ContextMenuShortcut>
                                        </ContextMenuItem>
                                        <ContextMenuItem onClick={e => duplicateProject(project, e as any)} className="text-white/70 hover:text-white cursor-pointer text-sm">
                                            <Copy className="h-3.5 w-3.5 mr-2" /> Duplicate
                                        </ContextMenuItem>
                                        <ContextMenuItem onClick={e => togglePin(project.id, e as any)} className="text-white/70 hover:text-white cursor-pointer text-sm">
                                            <Pin className="h-3.5 w-3.5 mr-2" /> {project.pinned ? "Unpin" : "Pin"}
                                        </ContextMenuItem>
                                        <ContextMenuSeparator className="bg-white/5" />
                                        <ContextMenuItem onClick={e => markComplete(project.id, e as any)} className="text-violet-400 hover:text-violet-300 cursor-pointer text-sm">
                                            <CheckCircle2 className="h-3.5 w-3.5 mr-2" /> Mark Complete
                                        </ContextMenuItem>
                                        <ContextMenuItem onClick={e => deleteProject(project.id, e as any)} className="text-rose-400 hover:text-rose-300 cursor-pointer text-sm">
                                            <Trash2 className="h-3.5 w-3.5 mr-2" /> Delete
                                            <ContextMenuShortcut>⌫</ContextMenuShortcut>
                                        </ContextMenuItem>
                                    </ContextMenuContent>
                                </ContextMenu>
                            ))}
                        </div>
                    ) : (
                        <ContextMenu>
                            <ContextMenuTrigger>
                                <div className="flex flex-col items-center justify-center h-[55vh] rounded-2xl border border-dashed border-white/10 bg-white/[0.01] text-center group cursor-default relative overflow-hidden">
                                    {/* Background grid accent */}
                                    <div className="absolute inset-0 opacity-30"
                                        style={{
                                            backgroundImage: `linear-gradient(rgba(99,102,241,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.1) 1px, transparent 1px)`,
                                            backgroundSize: "30px 30px"
                                        }} />

                                    <div className="relative z-10 space-y-4">
                                        <div className="mx-auto w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center animate-float">
                                            <FolderKanban className="h-7 w-7 text-white/20" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-white/50">
                                                {searchQuery || statusFilter !== "all" ? "No results found" : "No projects yet"}
                                            </h3>
                                            <p className="text-sm text-white/25 mt-1 max-w-xs mx-auto leading-relaxed">
                                                {searchQuery ? "Try adjusting your search or filters." : "Right-click to see options, or create your first project below."}
                                            </p>
                                        </div>
                                        <Button onClick={() => setOpen(true)}
                                            className="bg-indigo-600/80 hover:bg-indigo-600 text-white border-0 text-sm">
                                            <PlusIcon className="h-3.5 w-3.5 mr-1.5" /> Create Project
                                        </Button>
                                    </div>
                                </div>
                            </ContextMenuTrigger>
                            <ContextMenuContent className="bg-[#0f1629] border-white/10 w-52">
                                <ContextMenuItem onClick={() => setOpen(true)} className="text-white/70 hover:text-white cursor-pointer text-sm">
                                    <PlusIcon className="h-3.5 w-3.5 mr-2" /> New Project
                                    <ContextMenuShortcut>⌘N</ContextMenuShortcut>
                                </ContextMenuItem>
                                <ContextMenuSeparator className="bg-white/5" />
                                <ContextMenuItem onClick={() => { setSearchQuery(""); setStatusFilter("all"); setPriorityFilter("all") }}
                                    className="text-white/70 hover:text-white cursor-pointer text-sm">
                                    <Ghost className="h-3.5 w-3.5 mr-2" /> Clear All Filters
                                </ContextMenuItem>
                            </ContextMenuContent>
                        </ContextMenu>
                    )}

                    {/* Footer hint */}
                    <div className="flex items-center justify-center gap-1.5 text-white/15 text-xs mono pb-4">
                        <span>⌘N</span><span className="text-white/10">to create</span>
                        <span className="mx-2 text-white/5">·</span>
                        <span>Right-click</span><span className="text-white/10">for context menu</span>
                    </div>
                </div>
            </div>
        </TooltipProvider>
    )
}

