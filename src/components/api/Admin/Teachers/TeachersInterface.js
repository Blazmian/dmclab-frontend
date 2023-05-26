import axios from "axios";
import { CDBBox, CDBBtn, CDBContainer, CDBIcon, CDBInput } from "cdbreact";
import React, { useContext, useEffect, useState } from "react";
import { Collapse } from "react-bootstrap";
import NavBarAdmin from "../NavBarAdmin";
import ShowStudents from "./ShowTeachers";
import { ApiUrls } from "../../ApiUrls";


const Teachers = () => {

    const urls = useContext(ApiUrls)

    // Data of users table
    const [teachers, setTeachers] = useState([])

    useEffect(() => {
        getTeachers()
    }, [])

    async function getTeachers() {
        try {
            const res = await axios.get(urls.teachers)
            setTeachers(res.data)
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

    const handleUpdateTeachers = () => {
        getTeachers()
    }

    return (


<<<<<<< Updated upstream
        <>
        <div><script async src="https://www.googletagmanager.com/gtag/js?id=G-EV6GHP7VHP"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments)}
  gtag('js', new Date());

  gtag('config', 'G-EV6GHP7VHP');
</script></div>
=======
        <><div>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-EV6GHP7VHP"></script>
<script>
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments)}
gtag('js', new Date());

gtag('config', 'G-EV6GHP7VHP');
</script>
        </div>
>>>>>>> Stashed changes
            <NavBarAdmin icon={'user-graduate'} title={'Docentes'} />
            <div><script async src="https://www.googletagmanager.com/gtag/js?id=G-EV6GHP7VHP"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments)}
  gtag('js', new Date());

  gtag('config', 'G-EV6GHP7VHP');
</script></div>
            <CDBContainer className="mt-5 mb-3">
                <CDBBox display="flex">
                    <CDBBox display="flex" flex="fill" justifyContent="end">
                        <CDBInput style={{ borderRadius: '12px' }} placeholder="Buscar docente" className="mx-3 w-50" icon={<i className="fa fa-search text-dark"></i>} />
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
                                <h6></h6>
                            </CDBBox>
                            <CDBBox display="flex" flex="fill" justifyContent="end">
                                <h6></h6>
                            </CDBBox>
                        </CDBBox>
                    </CDBContainer>
                </Collapse>
            </CDBContainer>
            <ShowStudents teachers={teachers} setTeachers={setTeachers} handleUpdateTeachers={handleUpdateTeachers} />
        </>
    )
}

export default Teachers