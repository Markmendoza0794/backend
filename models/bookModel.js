
import pool from '../config/db.js';

// READ
export const fetchAllBooks = async () => {
  const [rows] = await pool.query('SELECT * FROM book');
  return rows;
};

// CHECK
export const findBookByNameAndAuthor = async (book) => {
  const [rows] = await pool.query(
    'SELECT * FROM book WHERE name = ? AND author = ?',
    [book.name, book.author]
  );

  return rows;
};
 export const findBookById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM book WHERE id = ?',
    [id]
  );

  return rows;
};

export const deleteBookIdb = async (id) => {
  const [rows] = await pool.query("DELETE FROM bookWHERE id = ?", 
    [id]
  );
  return rows;
};

// INSERT
export const insert = async (book) => {
  const [result] = await pool.query(
    'INSERT INTO book (name, author) VALUES (?, ?)',
    [book.name, book.author]
  );

  return result.insertId;
};

// UPDATE
export const update = async (book) => {
  const [result] = await pool.query(
    'UPDATE book SET name = ?, author = ? WHERE id = ?',
    [book.name, book.author, book.id]
  );

  return result.affectedRows;
};

// DELETE
export const remove = async (id) => {
  const [result] = await pool.query(
    'DELETE FROM book WHERE id = ?',
    [id]
  );

  return result.affectedRows;
};
