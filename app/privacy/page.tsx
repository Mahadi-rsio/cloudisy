import fs from "fs/promises"
import path from "path"
import ReactMarkdown from "react-markdown"
import type { Metadata } from "next"
import { GridBackground } from "@/components/grid-bg"

export const dynamic = "force-static"

export const metadata: Metadata = {
    title: "Privacy Policy | Cloudisy",
    description:
        "Read the Cloudisy privacy policy to understand how we collect, use, and protect your information when using our platform.",
    robots: {
        index: true,
        follow: true
    },
    openGraph: {
        title: "Privacy Policy | Cloudisy",
        description:
            "Learn how Cloudisy handles user data, privacy, and security.",
        type: "article",
        url: "https://cloudisy.top/privacy",
        siteName: "Cloudisy"
    },
    twitter: {
        card: "summary",
        title: "Privacy Policy | Cloudisy",
        description:
            "Learn how Cloudisy protects your data and privacy."
    }
}

async function getPrivacyContent() {
    const filePath = path.join(process.cwd(), "public/privacy.md")
    const content = await fs.readFile(filePath, "utf8")
    return content
}

export default async function PrivacyPage() {
    const content = await getPrivacyContent()

    return (
        <main className="max-w-4xl mx-auto px-6 py-20">
            <GridBackground />
            <img src='/logo.png' className="h-16 mx-auto" alt="Cloudisy" />
            <article className="prose prose-neutral dark:prose-invert max-w-none mt-2">
                <ReactMarkdown>{content}</ReactMarkdown>
            </article>
        </main>
    )
}
