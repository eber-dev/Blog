import pool from '../db/pool.js';

export async function findUserByEmail(email) {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [
        email,
    ]);

    return rows[0];
}

export async function createUser(username, email, passwordHash, role) {
    const result = await pool.query(
        'INSERT INTO users (username, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING *;',
        [username, email, passwordHash, role],
    );

    return result.rows[0];
}
