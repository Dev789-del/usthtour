import { defineConfig } from 'vite'
import restart from 'vite-plugin-restart'

export default defineConfig({
    root: 'src/', // Sources files (typically where index.html is)
    publicDir: '../static/', // Path from "root" to static assets (files that are served as they are)
    server:
    {
        allowedHosts: [ 'usthtour3d.com', 'localhost', 'usthtour3D.com'], // Allowed hosts
        host: 'localhost', // Host to use and set server custom domain
        open: !('SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env), // Open if it's not a CodeSandbox
        host: 'usthtour3D.com', // Custom domain to use
        port: 3000, // Port to use
        
    },
    build:
    {
        outDir: '../dist', // Output in the dist/ folder
        emptyOutDir: true, // Empty the folder first
        sourcemap: true // Add sourcemap
    },
    plugins:
    [
        restart({ restart: [ '../static/**', ] }) // Restart server on static file change
    ],
});