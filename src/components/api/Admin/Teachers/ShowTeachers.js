import { CDBContainer, CDBTable, CDBTableBody, CDBTableHeader } from "cdbreact"
import { useState } from "react"

const ShowTeachers = ({ teachers, setTeachers, handleUpdateTeachers }) => {

    const [teacher, setTeacher] = useState([])

    // For modal component
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleClick = (teacher) => {
        setTeacher(teacher)
        handleShow()
    }

    return (
        <>
            <CDBContainer>
                <div style={{ borderRadius: '10px', overflow: 'hidden' }}>
                    <CDBTable striped hover responsive maxHeight="70vh" scrollY borderless className="mb-0">
                        <CDBTableHeader>
                            <tr style={{ textAlign: 'center', backgroundColor: '#1D3A69', color: 'white' }}>
                                <th>No.Control</th>
                                <th>Nombres</th>
                                <th>Primer Apellido</th>
                                <th>Segundo Apellido</th>
                                <th>RFC</th>
                            </tr>
                        </CDBTableHeader>
                        <CDBTableBody>
                            {teachers.map((teacher) => (
                                <tr key={teacher.control_number} style={{ textAlign: 'center' }}>
                                    <td >{teacher.control_number}</td>
                                    <td>{teacher.name}</td>
                                    <td>{teacher.first_last_name}</td>
                                    <td>{teacher.second_last_name}</td>
                                    <td>{teacher.rfc}</td>
                                </tr>
                            ))}
                        </CDBTableBody>
                    </CDBTable>
                </div>
            </CDBContainer>
        </>
    )
}

export default ShowTeachers