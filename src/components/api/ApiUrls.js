import { createContext } from "react";

const host = "https://dmclab.onrender.com"

export const ApiUrls = createContext({
    // Staff
    staff: host + '/staff/all/',
    obtainStaff: host + '/staff/one/',
    obtainStaffPhoto: host + '/staff/one/photo/',
    addStaff: host + '/staff/',
    deleteStaff: host + '/staff/delete/',
    modifyStaff: host + '/staff/update/',

    // Users
    addUser: host + '/user/',
    obtainInfoUserLogged: host + '/user/one/',
    deleteUser: host + '/user/delete/',
    loginUser: host + '/auth/login',

    // Equipment
    equipment: host + '/equipment/all',
    addEquipment: host + '/equipment/',
    obtainEquipmentPhoto: host + '/equipment/one/photo/',
    changeDamaged: host + '/equipment/damaged/',
    deleteEquipment: host + '/equipment/delete/',
    obtainEquipmentOrder: host + '/equipment/equipment-order/',
    obtainProjectorOrder: host + '/equipment/projector-order/',
    modifyEquipment: host + '/equipment/update/',

    // Career
    addCareers: host + '/career/create_many/',
    validateCareers: host + '/career/validate/',

    // Teacher
    addTeachers: host + '/teacher/create_many/',
    validateTeachers: host + '/teacher/validate/',
    teachers: host + '/teacher/all/',

    // Students
    addStudents: host + '/student/create_many/',
    validateStudents: host + '/student/validate/',
    students: host + '/student/all/',
    addStudent: host + '/student/',
    loginStudent: host + '/student/login/',
    updateStudent: host + '/student/update/',

    // Subjects
    addSubjects: host + '/subject/create_many/',
    validateSubjects: host + '/subject/validate/',
    getTeacherSubject: host + '/subject/teacher/',

    // Enrolled
    addEnrolleds: host + '/enrolled/create_many/',
    validateEnrolleds: host + '/enrolled/validate/',

    //Requests
    equipmentRequests: host + '/solicitar-equipo/',

    // Loan
    orderEquipment: host + '/loan/',
    obtainNotDeliveredLoan: host + '/loan/not-delivered/',
    deliverLoan: host + '/loan/deliver-loan/',
    obtainNotReturnedLoan: host + '/loan/not-returned/',
    returnLoan: host + '/loan/return-loan/',
})