import { createAuthClient } from "better-auth/react"
import { passkeyClient } from '@better-auth/passkey/client'
import { jwtClient } from 'better-auth/client/plugins'

export const {
    getSession,
    signIn,
    signOut,
    token,
    refreshToken

} = createAuthClient({
    plugins: [
        passkeyClient(),
        jwtClient()
    ]
})
