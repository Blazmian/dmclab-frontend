import axios from "axios"
import { CDBBox } from "cdbreact"
import { useContext, useState } from "react"
import { Button, Modal } from "react-bootstrap"
import { toast } from "react-toastify"
import Swal from "sweetalert2"
import { ApiUrls } from "../../ApiUrls"
import ModifyStudent from "./ModifyStudent";

const ShowInfoStudent = ({ show, handleClose, handleUpdateStudents, student }) => {
    const showModal = false;
    const urls = useContext(ApiUrls)
    const [isEditMode, setIsEditMode] = useState(false);
    const toggleEditMode = () => {
        setIsEditMode(!isEditMode);
    };
    const handleModalClose = () => {
        setIsEditMode(false); // Restablecer el estado a false al cerrar el modal
        handleClose();
    };

    const confirmDeleteStudent = () => {
        Swal.fire({
            title: '¿Estas seguro de eliminar el usuario ' + student.name + '?',
            text: "Esto no se podrá revertir",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Borrar usuario',
            confirmButtonColor: '#f53333',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        }).then((response) => {
            if (response.isConfirmed) {
                deleteStudent(student.id)
            }
        })
    }
    const handleUpdateStudent = () => {
        handleUpdateStudents();  // Llama a la función de actualización en el padre
    };
  
    const deleteStudent = async (id) => {
        const res = await axios.delete(urls.deleteStaff + id)
        if (res.data.affected === 1) {
            toast.info('Usuario eliminado con exito')
            handleUpdateStudents()
            handleClose()
        } else {
            toast.error('No se pudo eliminar el usuario')
        }
    }

    return (
        <Modal show={show} onHide={handleModalClose} aria-labelledby="contained-modal-title-vcenter" centered>
            {isEditMode ? ( // Mostrar EditUser cuando isEditMode es true
                <>
                    <Modal.Header closeButton>
                        <Modal.Title>Modificar Alumno</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {isEditMode ? (
                            <ModifyStudent student={student} showModal={isEditMode} handleClose={() => setIsEditMode(false)} />
                        ) : (
                            <ShowInfoStudent show={showModal} handleClose={handleClose} handleUpdateStudents={handleUpdateStudents} student={student} />
                        )}<ModifyStudent student={student} showModal={showModal} handleClose={handleClose} handleUpdateStudent={handleUpdateStudent} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </>
            ) : (<>
                <Modal.Header closeButton>
                    <Modal.Title>{student.name + " " + student.first_last_name + " " + student.second_last_name}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {isEditMode ? (
                        <ModifyStudent student={student} showModal={isEditMode} handleClose={() => setIsEditMode(false)} />
                    ) : (
                        <CDBBox>
                            <h6>Número de control</h6>
                            <label>{student.control_number}</label>
                            <h6>Semestre</h6>
                            <label>{student.semester}</label>
                            <h6>Carrera</h6>
                            <label>{student && student.career && student.career.career}</label>
                        </CDBBox>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <CDBBox display="flex" flex="fill" alignItems="center">
                        <CDBBox display="flex" justifyContent="start">
                            <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
                        </CDBBox>
                        <CDBBox display="flex" flex="fill" justifyContent="end">
                            <Button variant="outline-danger" className="me-2" onClick={() => confirmDeleteStudent()}>Eliminar Usuario</Button>
                            <Button variant="primary" onClick={toggleEditMode}>
                                Modificar Usuario
                            </Button>
                        </CDBBox>
                    </CDBBox>
                </Modal.Footer>
            </>
            )}

        </Modal >
    )
}

export default ShowInfoStudent