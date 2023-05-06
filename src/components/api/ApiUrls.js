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
    validateCareers: 'http://localhost:8000/career/validate/',
})