import { BetterAuthOptions } from 'better-auth';
import { redis } from './redis';
import { bearer, openAPI, deviceAuthorization } from 'better-auth/plugins';
import { passkey } from '@better-auth/passkey'
import 'dotenv/config';
import { jwtPlugin } from './jwt.plugin';


// In here User delete is disabled
// Currently add redis for session only
// we have to make custom adapter for jwt cache for redis
// jwt expirationTime is set for 7 days
// cookieCache has 30 minuite expirationTime
// import openAPI to use

export const betterAuthOptions: BetterAuthOptions = {
    appName: 'Auth',

    basePath: '/api/auth',
    trustedOrigins: [
        process.env.ORIGIN!,
    ],

    secondaryStorage: {
        get: async (key) => {
            return await redis.get(key);
        },
        set: async (key, value, ttl) => {
            if (ttl) await redis.set(key, value, {
                ex: ttl
            });
            else await redis.set(key, value);
        },
        delete: async (key) => {
            await redis.del(key);
        },
    },

    plugins: [
        // openAPI is disabled by default
        openAPI(),
        jwtPlugin,
        bearer(),
        deviceAuthorization({
            verificationUri: "/device"
        }),
        passkey()
    ],
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 30 * 60,
        },
    },
    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,

        },
    },
};
