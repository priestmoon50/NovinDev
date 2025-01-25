import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            manifest: {
                name: 'My Professional Website',
                short_name: 'MySite',
                description: 'وب‌سایت حرفه‌ای طراحی شده با React و TypeScript',
                theme_color: '#ffffff',
                icons: [
                    {
                        src: '/Nexa2.png',
                        sizes: '192x192',
                        type: 'image/png',
                    },
                    {
                        src: '/Nexa.png',
                        sizes: '512x512',
                        type: 'image/png',
                    },
                ],
            },
            devOptions: {
                enabled: true,
            },
        }),
    ],
});
