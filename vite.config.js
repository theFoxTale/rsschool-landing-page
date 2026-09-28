import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
    base: './',
    build: {
        rollupOptions: {
            input: {
                main: resolve(process.cwd(), 'index.html'),
                catalog: resolve(process.cwd(), 'catalog.html'),
            },
        },
    },
});
