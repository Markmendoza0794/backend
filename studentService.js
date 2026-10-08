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