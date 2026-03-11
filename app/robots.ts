import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: ['/', '/login'], // Allow the beautiful pages
            disallow: ['/dashboard', '/settings'], // Hide the "under construction" parts
        },
        sitemap: 'https://cloudisy.top/sitemap.xml',
    }
}

