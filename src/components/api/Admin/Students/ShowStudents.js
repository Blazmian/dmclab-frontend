import { CDBContainer, CDBTable, CDBTableBody, CDBTableHeader } from "cdbreact"
import { useState } from "react"
import ShowInfoStudent from "./ShowInfoStudent"

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
        <>   <ShowInfoStudent show={show} handleClose={handleClose} handleUpdateStudent={handleUpdateStudents} student={student} />
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
                                <tr key={student.control_number} style={{ textAlign: 'center' }} onClick={() => handleClick(student)}>
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