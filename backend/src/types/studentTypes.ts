export enum StudentGroup {
    PZ21 = 'PZ-21',
    PZ22 = 'PZ-22',
    PZ23 = 'PZ-23',
    PZ24 = 'PZ-24',
    PZ25 = 'PZ-25',
    PZ26 = 'PZ-26',
    PZ27 = 'PZ-27',
}

export enum StudentGender {
    Male = 'Male',
    Female = 'Female',
}

export type StudentType = {
    student_id?: number;
    group: string;
    first_name: string;
    last_name: string;
    gender: string;
    birthday: Date;
};
