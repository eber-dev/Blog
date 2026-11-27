import bcrypt from 'bcryptjs';
import { createUser } from '../model/userModel.js';

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username?.trim() || !email?.trim() || !password?.trim()) {
        return res.status(400).json({
            error: 'Faltan datos',
        });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await createUser(
            username,
            email,
            hashedPassword,
            'user',
        );

        const { password_hash, ...userWithoutPassword } = newUser;

        return res.status(201).json({
            message: 'Usuario registrado correctamente',
            user: userWithoutPassword,
        });
    } catch (error) {
        if (error.code === '23505') {
            return res.status(400).json({
                error: 'El email ya está registrado',
            });
        }

        console.error('Error al registrar usuario:', error);

        return res.status(500).json({
            error: 'Error interno del servidor',
        });
    }
};
