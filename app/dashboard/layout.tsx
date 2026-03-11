import AppBar from "@/components/web/appbar"
import Footer from "@/components/web/footer"
import React from "react"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <AppBar />
            {children}
            <Footer />
        </div>
    )
}
