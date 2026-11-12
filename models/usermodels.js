import pool from '../config/db.js';

// INSERT
export const insert = async (name, email, password) => {
    const [result] = await pool.query(
        "INSERT INTO user(name, email, password) VALUES(?, ?, ?)",
        [name, email, password]
    );

    return result.affectedRows;
};

// VALIDATION
export const findUserByEmail = async (email) => {
    const [rows] = await pool.query(
        "SELECT * FROM user WHERE email = ?",
        [email]
    );

    return rows;
};