import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://cloudisy.top' // Ensure this matches your robots.txt URL

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly', // Home page changes often during early launch
            priority: 1,              // Highest priority for search engines
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1

        },
        {
            url: `${baseUrl}/login`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/privacy`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1
        },
        {
            url: `${baseUrl}/terms`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },

    ]
}

