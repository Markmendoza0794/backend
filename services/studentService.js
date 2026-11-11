import * as studentModel from '../models/studentModel.js';
import ValidationError from '../utils/ValidationError.js';

export const fetchAllstudents = async () => {
    const students = await studentModel.fetchAllstudents();
    return students;
};

// CHECK 
const doesStudentExist = async (student) => {
    let existing;

    if (Object.hasOwn(student, 'id')) {
        existing = await studentModel.findStudentById(student.id);
    } else {
        existing = await studentModel.findStudentBySrcode(student);
    }

    if (existing.length > 0) {
        return true;
    }

    return false;
};

// INSERT
export const createStudent = async (student) => {
    if (!student.name || !student.srcode || !student.program) {
        throw new ValidationError(
            404,
            'Name, SR code, and program are required!'
        );
    }

    const existing = await doesStudentExist(student);

    if (existing) {
        throw new ValidationError(409, 'Student already exists!');
    }

    const studentId = await studentModel.insert(student);
    return studentId;
};

// UPDATE
export const updateStudent = async (student) => {
    if (!student.name || !student.srcode || !student.program) {
        throw new ValidationError(
            404,
            'Name, SR code, and program are required!'
        );
    }

    const existing = await doesStudentExist(student);

    if (!existing) {
        throw new ValidationError(404, 'Student does not exist!');
    }

    const affectedRows = await studentModel.update(student);
    return affectedRows;
};

// DELETE
export const deleteStudent = async (id) => {
    const student = { id };
    const existing = await doesStudentExist(student);

    if (!existing) {
        throw new ValidationError(404, 'Student does not exist!');
    }

    const affectedRows = await studentModel.remove(id);
    return affectedRows;
};