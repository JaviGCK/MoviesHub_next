// app/api/auth/[auth0]/route.js
import { handleAuth, handleLogin, handleLogout } from '@auth0/nextjs-auth0';

export const GET = handleAuth({
    login: handleLogin({
        returnTo: '/home'
    }),
    logout: handleLogout({
        returnTo: '/'
    }),
});