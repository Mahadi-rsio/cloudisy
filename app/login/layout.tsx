

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login | Cloudisy – Login To Cloudisy",
    description:
        "Securely sign in to your Cloudisy account. Manage your Next.js apps, static sites, and view your deployment history",
    keywords: [
        "cloudisy login",
        "cloudisy account",
        "developer dashboard login",
        "hosting login bangladesh",
        "nextjs hosting"
    ],

    authors: [{ name: "Cloudisy Team" }],
    creator: "Cloudisy",

    openGraph: {
        title: "Cloudisy — Modern Hosting Platform",
        description:
            "Deploy static sites and Next.js apps instantly. Built for developers, students, and startups in Bangladesh.",
        url: "https://cloudisy.top",
        siteName: "Cloudisy",
        locale: "en_US",
        type: "website",
    },

    twitter: {
        card: "summary_large_image",
        title: "Cloudisy Hosting Platform",
        description:
            "Deploy static and Next.js apps instantly. Hosting built for developers in Bangladesh.",
    },

    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },

    icons: {
        icon: "/logo.png",
    },
};

export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {children}
        </>
    );
}

