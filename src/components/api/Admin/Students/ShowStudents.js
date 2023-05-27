import { CDBContainer, CDBTable, CDBTableBody, CDBTableHeader } from "cdbreact"
import { useState } from "react"

const ShowStudents = ({ students, setStudents, handleUpdateStudents }) => {


    const [student, setStudent] = useState([])

    // For modal component
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleClick = (student) => {
        setStudent(student)
        handleShow()
    }

    return (
        <><script async src="https://www.googletagmanager.com/gtag/js?id=G-EV6GHP7VHP"></script>
            <script>
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-EV6GHP7VHP');
            </script>
            <CDBContainer>
                <div style={{ borderRadius: '10px', overflow: 'hidden' }}>
                    <CDBTable striped hover responsive maxHeight="70vh" scrollY borderless className="mb-0">
                        <CDBTableHeader>
                            <tr style={{ textAlign: 'center', backgroundColor: '#1D3A69', color: 'white' }}>
                                <th>No.Control</th>
                                <th>Nombres</th>
                                <th>Primer Apellido</th>
                                <th>Segundo Apellido</th>
                                <th>Carrera</th>
                                <th>Semestre</th>
                            </tr>
                        </CDBTableHeader>
                        <CDBTableBody>
                            {students.map((student) => (
                                <tr key={student.control_number} style={{ textAlign: 'center' }}>
                                    <td>{student.control_number}</td>
                                    <td>{student.name}</td>
                                    <td>{student.first_last_name}</td>
                                    <td>{student.second_last_name}</td>
                                    <td>{student.career.career}</td>
                                    <td>{student.semester}</td>
                                </tr>
                            ))}
                        </CDBTableBody>
                    </CDBTable>
                </div>
            </CDBContainer>
        </>
    )
}

export default ShowStudents