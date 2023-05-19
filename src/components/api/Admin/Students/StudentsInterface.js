import axios from "axios";
import { CDBBox, CDBBtn, CDBContainer, CDBIcon, CDBInput } from "cdbreact";
import React, { useContext, useEffect, useState } from "react";
import { Collapse } from "react-bootstrap";
import NavBarAdmin from "../NavBarAdmin";
import ShowStudents from "./ShowStudents";
import { ApiUrls } from "../../ApiUrls";
import CreateStudent from "./CreateStudent";

const Students = () => {

    const urls = useContext(ApiUrls)

    // Data of users table
    const [students, setStudents] = useState([])

    useEffect(() => {
        getStudents()
    }, [])

    async function getStudents() {
        try {
            const res = await axios.get(urls.students)
            setStudents(res.data)
        } catch (error) {
            console.error('Error:', error)
        }
    }

    // For collapse component
    const [open, setOpen] = useState(false)

    // For Add User Modal
    const [show, setShow] = useState(false);
    const handleShow = () => {
        setShow(true)
    }
    const handleClose = () => {
        setShow(false)
    }

    const handleUpdateStudents = () => {
        getStudents()
    }

    return (
        <>
            <NavBarAdmin icon={'user-graduate'} title={'Alumnos'} />
            <CreateStudent show={show} handleClose={handleClose} handleAddStudent={handleUpdateStudents} />
            <CDBContainer className="mt-5 mb-3">
                <CDBBox display="flex">

                    <CDBBox display="flex" flex="fill" justifyContent="end">
                        <CDBInput style={{ borderRadius: '12px' }} placeholder="Buscar alumnos" className="mx-3 w-50" icon={<i className="fa fa-search text-dark"></i>} />
                        <CDBBtn style={{ borderRadius: '12px' }} color="dark" onClick={() => setOpen(!open)} aria-controls="example-collapse-text" aria-expanded={open} >
                            <CDBIcon icon="filter" className="me-2" />
                            Filtrar
                        </CDBBtn>
                    </CDBBox>

                </CDBBox>
                <Collapse in={open} className='mt-3'>
                    <CDBContainer fluid>
                        <CDBBox display="flex">
                            <CDBBox display="flex" justifyContent="start">
                                <h6>Tipo de usuarios</h6>
                            </CDBBox>
                            <CDBBox display="flex" flex="fill" justifyContent="end">
                                <h6>Por nombre</h6>
                            </CDBBox>
                        </CDBBox>
                    </CDBContainer>
                </Collapse>
            </CDBContainer>
            <ShowStudents students={students} setStudents={setStudents} handleUpdateStudents={handleUpdateStudents} />
        </>
    )
}

export default Students