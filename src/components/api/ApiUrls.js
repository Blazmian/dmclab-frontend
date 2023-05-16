import { createContext } from "react";

export const ApiUrls = createContext({
    // Staff
    staff: 'http://localhost:8000/staff/all/',
    obtainStaff: 'http://localhost:8000/staff/one/',
    obtainStaffPhoto: 'http://localhost:8000/staff/one/photo/',
    addStaff: 'http://localhost:8000/staff/',
    deleteStaff: 'http://localhost:8000/staff/delete/',

    // Users
    addUser: 'http://localhost:8000/user/',
    deleteUser: 'http://localhost:8000/user/delete/',

    // Equipment
    equipment: 'http://localhost:8000/equipment/all',
    addEquipment: 'http://localhost:8000/equipment/',
    obtainEquipmentPhoto: 'http://localhost:8000/equipment/one/photo/',
    changeDamaged: 'http://localhost:8000/equipment/damaged/',
    deleteEquipment: 'http://localhost:8000/equipment/delete/',

    // Career
    addCareers: 'http://localhost:8000/career/create_many/',
    validateCareers: 'http://localhost:8000/career/validate/',

    // Teacher
    validateTeachers: 'http://localhost:8000/teacher/validate/',
    teachers: 'http://localhost:8000/teachers/all/',

    // Students
    validateStudents: 'http://localhost:8000/student/validate/',
    students: 'http://localhost:8000/student/all/',
    addStudent: 'http://localhost:8000/student/',

    // Subjects
    validateSubjects: 'http://localhost:8000/subject/validate/',

    // Enrolled
    validateEnrolleds: 'http://localhost:8000/enrolled/validate/',

    //Requests
    equipmentRequests: 'http://localhost:8000/solicitar-equipo/'
})