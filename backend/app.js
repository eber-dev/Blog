import express from 'express';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import methodOverride from 'method-override';
import pool from './db/pool.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'El servidor está funcionando correctamente',
    });
});

app.get('/api/db-test', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM users;');

        return res.status(200).json(rows);
    } catch (error) {
        console.error('Error en la consulta:', error.message);
        return res
            .status(500)
            .json({ error: 'Error al obtener los productos' });
    }
});

app.listen(3000, () => {
    console.log('Servidor ejecutándose en http://localhost:3000');
});
