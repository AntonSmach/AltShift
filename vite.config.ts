import {defineConfig} from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

export default defineConfig({
    plugins: [tailwindcss(), react(), svgr()],
    resolve: {
        alias: {
            '@assets': path.resolve(__dirname, 'src/assets'),
            '@components': path.resolve(__dirname, 'src/shared/components'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@models': path.resolve(__dirname, 'src/shared/models'),
            '@hooks': path.resolve(__dirname, 'src/hooks'),
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@helpers': path.resolve(__dirname, 'src/helpers'),
            '@store': path.resolve(__dirname, 'src/store'),
            '@context': path.resolve(__dirname, 'src/context'),
        },
    },
});
