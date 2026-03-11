"use client"

import {
    Key,
    Smartphone,
    LogOut,
    Trash2,
    ShieldCheck,
    Bell,
    Globe
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { GridBackground } from "@/components/grid-bg"
import AppBar from "@/components/web/appbar"

export default function SettingsPage() {
    return (
        <div className='w-full h-full '>
            <GridBackground />
            <AppBar />



            <div className="grid gap-8 p-2">
                {/* Profile Section */}
                <section className="grid gap-6">
                    <Card className='dark:bg-white/1 backdrop-blur-xl border border-white/10 shadow-xl rounded-2x'>
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                            <CardDescription>Update your photo and personal details.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input id="name" placeholder="John Doe" defaultValue="Alex Rivera" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" type="email" placeholder="alex@example.com" disabled />
                                <p className="text-xs text-muted-foreground">Email cannot be changed manually.</p>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Save Changes</Button>
                        </CardFooter>
                    </Card>
                </section>

                {/* Security & Authentication */}
                <section className="grid gap-6">
                    <Card className='dark:bg-white/1 backdrop-blur-xl border border-white/10 shadow-xl rounded-2x'>
                        <CardHeader>
                            <CardTitle>Security</CardTitle>
                            <CardDescription>Secure your account with passkeys and multi-factor auth.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <div className="flex items-center gap-2">
                                        <Key className="w-4 h-4 text-primary" />
                                        <Label className="text-base">Passkeys</Label>
                                    </div>
                                    <p className="text-sm text-muted-foreground">Sign in faster using biometrics or your device passcode.</p>
                                </div>
                                <Button variant="outline">Add Passkey</Button>
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <div className="flex items-center gap-2">
                                        <Smartphone className="w-4 h-4 text-primary" />
                                        <Label className="text-base">Two-Factor Authentication</Label>
                                    </div>
                                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
                                </div>
                                <Switch />
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* Sessions Management */}
                <section>
                    <Card className='dark:bg-white/1 backdrop-blur-xl border border-white/10 shadow-xl rounded-2x'>
                        <CardHeader>
                            <CardTitle>Active Sessions</CardTitle>
                            <CardDescription>Manage the devices where you are currently logged in.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/50">
                                <div className="flex items-center gap-3">
                                    <ShieldCheck className="w-5 h-5 text-green-500" />
                                    <div>
                                        <p className="text-sm font-medium">MacBook Pro - Chrome (Current)</p>
                                        <p className="text-xs text-muted-foreground">London, UK • 192.168.1.1</p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="sm" disabled>Current</Button>
                            </div>
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Smartphone className="w-5 h-5" />
                                    <div>
                                        <p className="text-sm font-medium">iPhone 15 Pro</p>
                                        <p className="text-xs text-muted-foreground">London, UK • 192.168.1.4</p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="sm" className="text-destructive">Revoke</Button>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* Appearance & Prefs */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className='dark:bg-white/1 backdrop-blur-xl border border-white/10 shadow-xl rounded-2x'>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Bell className="w-4 h-4" />
                                <CardTitle className="text-lg">Notifications</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label>Email Updates</Label>
                                <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label>Marketing</Label>
                                <Switch />
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* Danger Zone */}
                <section className="pt-6">
                    <Card className="border-destructive/50 dark:bg-white/1 backdrop-blur-xl border border-white/10 shadow-xl rounded-2x">
                        <CardHeader>
                            <CardTitle className="text-destructive">Danger Zone</CardTitle>
                            <CardDescription>Irreversible actions related to your account.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Logout</p>
                                    <p className="text-sm text-muted-foreground">Sign out of your account on this device.</p>
                                </div>
                                <Button variant="outline" className="gap-2">
                                    <LogOut className="w-4 h-4" /> Logout
                                </Button>
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Delete Account</p>
                                    <p className="text-sm text-muted-foreground">Permanently delete your account and all data.</p>
                                </div>
                                <Button variant="destructive" className="gap-2">
                                    <Trash2 className="w-4 h-4" /> Delete Account
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </section>
            </div>
        </div>
    )
}

