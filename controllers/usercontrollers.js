import * as userservices from '../services/userservices.js';

// SIGN UP
export const createaccount = async (req, res) => {
    try {
        const { name, email, password } = req.body || {};
        const user = { name, email, password };

        const result = await userservices.createaccount(user);

        res.status(200).json({
            success: true,
            message: result
        });
    } catch (e) {
        console.log(e);

        res.status(e.statusCode || 500).json({
            error: e.statusCode ? e.message : 'Internal Server Error'
        });
    }
};

// LOGIN
export const login = async (req, res) => {
    try {
        const { email, password } = req.body || {};
        const user = { email, password };

        const result = await userservices.login(user);

        res.status(200).json({
            success: true,
            message: result
        });
    } catch (e) {
        console.log(e);

        res.status(e.statusCode || 500).json({
            error: e.statusCode ? e.message : 'Internal Server Error'
        });
    }
};