import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import authRoutes from './server/routes/authRoutes.js';
import healthRoutes from './server/routes/healthRoutes.js';
import careerRoutes from './server/routes/careerRoutes.js';
import sosRoutes from './server/routes/sosRoutes.js';
import legalRoutes from './server/routes/legalRoutes.js';
import ragRoutes from './server/routes/ragRoutes.js';
import mlRoutes from './server/routes/mlRoutes.js';
dotenv.config();
async function startServer() {
    const app = express();
    const PORT = 3000;
    // Global Middlewares
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    // API Routes
    app.get('/api/health', (req, res) => {
        res.json({
            status: 'ok',
            platform: 'AROGYINI Holistic Women Empowerment & Safety Platform',
            version: '1.0.0',
            timestamp: new Date().toISOString(),
        });
    });
    app.use('/api/auth', authRoutes);
    app.use('/api/health', healthRoutes);
    app.use('/api/career', careerRoutes);
    app.use('/api/sos', sosRoutes);
    app.use('/api/legal', legalRoutes);
    app.use('/api/rag', ragRoutes);
    app.use('/api/ml', mlRoutes);
    // Vite middleware for development vs Static serving for production
    if (process.env.NODE_ENV !== 'production') {
        const vite = await createViteServer({
            server: { middlewareMode: true },
            appType: 'spa',
        });
        app.use(vite.middlewares);
    }
    else {
        const distPath = path.join(process.cwd(), 'dist');
        app.use(express.static(distPath));
        app.get('*', (req, res) => {
            res.sendFile(path.join(distPath, 'index.html'));
        });
    }
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`[AROGYINI SERVER] Running on http://0.0.0.0:${PORT}`);
    });
}
startServer().catch((err) => {
    console.error('[AROGYINI SERVER ERROR]', err);
});
