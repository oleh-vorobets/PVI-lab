import { StudentType } from '../types/studentTypes.js';
import { StudentGender, StudentGroup } from '../types/studentTypes.js';

export function isStudentValid(student: StudentType): Boolean {
    if (!Object.values(StudentGroup).includes(student.group as StudentGroup)) {
        return false;
    }
    if (
        !Object.values(StudentGender).includes(student.gender as StudentGender)
    ) {
        return false;
    }
    if (
        !/^[A-Z]/.test(student.first_name) ||
        !/^[A-Z]/.test(student.last_name)
    ) {
        return false;
    }
    const birthday = new Date(student.birthday);
    birthday.setFullYear(birthday.getFullYear() + 18);
    const today = new Date();
    if (today < birthday) {
        return false;
    }
    return true;
}
