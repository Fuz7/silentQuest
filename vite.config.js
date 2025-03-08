import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react()
    ],
    resolve:{
        alias:{
            '@': '/resources/js',
            '@images': '/resources/assets/images',
            '@fonts': '/resources/assets/fonts',
            '@vendor': '/vendor'
        }
    },
    server: {
        host: '0.0.0.0',  // Allows connections from Docker network
        port: 5173,       // Matches Docker exposed port
        strictPort: true, // Ensures it uses the assigned port
        hmr: {
            clientPort: 5173, // Hot Module Reloading uses correct port
        },
    }
});
