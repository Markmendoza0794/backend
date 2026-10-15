import * as studentModel from '../models/studentModel.js';

export const fetchAllstudents = async () => {
    const students = await studentModel.fetchAllstudents();
    return students;
};
//insert
export const createStudent = async (student) => {
    const studentId = await studentModel.insert(student);
    return studentId;
}

export const updateStudent = async (student) => {
    const affectedRows = await studentModel.update(student);
    return affectedRows;
}

export const deleteStudent = async (id) => {
    const affectedRows = await studentModel.remove(id);
    return affectedRows;
}