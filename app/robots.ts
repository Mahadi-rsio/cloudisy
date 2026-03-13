import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: [
                '/',
                '/login',
                "/about",
                "/privacy",
                "/terms",
                "pricing",
                "/blogs"
            ],
            disallow: ['/dashboard', '/settings', "/profile", "/projects"],
        },
        sitemap: 'https://cloudisy.top/sitemap.xml',
    }
}

