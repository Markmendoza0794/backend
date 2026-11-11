import pool from '../config/db.js';

export const fetchAllstudents = async () => {
    const [rows] = await pool.query("SELECT * FROM student");
    return rows;
};
//insert
export const insert = async (student) => {
    const [result] = await pool.query("INSERT INTO student(name, srcode, program)VALUES(?, ?, ?)",
        [student.name, student.srcode, student.program]
    );
    return result.insertId;
}

export const update = async (student) => {
    const [result] = await pool.query (
        "UPDATE student SET name= ?, srcode= ?, program= ? WHERE id= ? ",
        [student.name, student.srcode, student.program, student.id]
    );
    return result.affectedRows;
}

//delete

export const remove = async (id) => {
    const [result] = await pool.query(
        "DELETE FROM student WHERE id= ?",
        [id]
    );
    return result.affectedRows;
}
// CHECK
export const findStudentBySrcode = async (student) => {
    const [rows] = await pool.query(
        'SELECT * FROM student WHERE srcode = ?',
        [student.srcode]
    );

    return rows;
};

export const findStudentById = async (id) => {
    const [rows] = await pool.query(
        'SELECT * FROM student WHERE id = ?',
        [id]
    );

    return rows;
};