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
})