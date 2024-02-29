import { StudentType } from '../types/studentTypes.js';
import { StudentGender, StudentGroup } from '../types/studentTypes.js';

export function isStudentValid(student: StudentType): string {
    const validationErrors = [];
    if (!Object.values(StudentGroup).includes(student.group as StudentGroup)) {
        validationErrors.push('invalid group');
    }
    if (
        !Object.values(StudentGender).includes(student.gender as StudentGender)
    ) {
        validationErrors.push('invalid gender');
    }
    if (!/^[A-Z][a-z\-\']{1,10}/.test(student.first_name)) {
        validationErrors.push('invalid name');
    }
    if (!/^[A-Z][a-z\-\']{1,10}/.test(student.last_name)) {
        validationErrors.push('invalid surname');
    }

    const birthday = new Date(student.birthday);
    const today = new Date();
    const minBirthDate = new Date('1955-01-01');
    const minValidBirthDate = new Date();
    minValidBirthDate.setFullYear(minValidBirthDate.getFullYear() - 18);

    if (
        birthday > today ||
        birthday < minBirthDate ||
        birthday > minValidBirthDate
    ) {
        validationErrors.push('invalid birth date');
    }

    return concatString(validationErrors);
}

function concatString(arrayOfStrings: string[]): string {
    if (arrayOfStrings.length === 0) return '';

    let errorMessage = arrayOfStrings.join(', ');

    const lastIndex = errorMessage.lastIndexOf(',');

    if (lastIndex !== -1) {
        errorMessage =
            errorMessage.substring(0, lastIndex) +
            ' and' +
            errorMessage.substring(lastIndex + 1);
    }
    console.log(errorMessage);

    return errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1);
}
