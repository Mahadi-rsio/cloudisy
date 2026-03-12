import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

// const poppins = Poppins({
//     subsets: ['latin'],
//     display: 'swap',
//     weight: ['400', '700'],
// });
//

export const metadata: Metadata = {
    title: "Cloudisy – Fast Static & Next.js Hosting Platform for Developers in Bangladesh",
    description: "Cloudisy is a modern cloud hosting platform for developers, startups, and students. Deploy static websites and Next.js apps with Git integration, CI/CD pipelines, and local payment via bKash, Nagad, and Upay.",
    metadataBase: new URL('https://cloudisy.top'), // Replace with your actual domain
    alternates: {
        canonical: '/',
    },
    keywords: [

        "cloudisy hosting", "cloudisy platform", "static website hosting", "nextjs hosting platform", "deploy nextjs app", "deploy static website", "git based hosting", "auto scaling hosting", "ci cd hosting platform", "developer hosting platform", "startup hosting platform", "modern web hosting platform", "fast website hosting", "vercel alternative hosting", "netlify alternative", "cheap hosting for students", "developer cloud hosting", "bangladesh hosting platform", "hosting for bangladesh developers", "hosting with bkash", "hosting with nagad", "hosting with upay", "student friendly hosting", "easy deploy hosting", "git deployment hosting", "cloud hosting for developers", "static site deployment", "nextjs deployment platform", "bangladesh developer hosting", "affordable cloud hosting",

        "react app hosting", "tailwind css deployment", "vite project hosting", "astro framework hosting", "nuxt js cloud", "gatsby site deployment", "hugo static site", "jekyll hosting", "github actions hosting", "gitlab ci cd", "bitbucket deployment", "headless cms hosting", "ssr hosting", "isomorphic app hosting", "edge computing platform", "serverless functions", "api hosting", "node js backend hosting", "pwa deployment", "web vitals optimization",

        "hosting with bkash payment", "nagad payment hosting", "upay web hosting", "bangladesh cloud server", "best hosting in dhaka", "hosting for bd developers", "bdix cloud hosting", "local currency web hosting", "hosting for bangladeshi startups", "cse student project hosting", "final year project hosting", "web app hosting bd", "low latency hosting bangladesh", "affordable hosting for bangladeshis", "domain and hosting bkash",

        "saas hosting platform", "ecommerce nextjs hosting", "portfolio site hosting", "blog hosting service", "fast deployment for startups", "scalable infrastructure", "managed cloud hosting", "enterprise static hosting", "reliable web hosting", "secure cloud deployment", "high uptime hosting", "custom domain hosting", "free ssl hosting", "automated web deployment", "continuous deployment platform",

        "best vercel alternative 2026", "cheaper netlify alternative", "digitalocean alternative for students", "heroku replacement for apps", "modern web infrastructure", "cloud hosting for beginners", "easy web hosting bangladesh", "professional cloud services", "web app scaling solutions", "cloudisy cloud features", "deploying web apps 2026", "nextjs 15 hosting", "nextjs 16 hosting", "optimized react hosting", "jamstack hosting platform"
    ],
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon-16x16.png',
    },
};





export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`antialiased`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
}
