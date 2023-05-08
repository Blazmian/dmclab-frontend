import { CDBBox } from "cdbreact"
import { useContext, useEffect, useState } from "react"
import { Button, Container, Spinner } from "react-bootstrap"
import { ApiUrls } from "../../ApiUrls"
import axios from "axios"
import DataVerified from "./DataVerified"
import Swal from "sweetalert2"

const LoadSheetData = ({ sheetData, sheetNames }) => {

    const urls = useContext(ApiUrls)
    const [isVerifying, setIsVerifying] = useState(true)
    const [students, setStudents] = useState([])
    const [studentValidation, setStudentValidation] = useState(null)
    const [career, setCareer] = useState([])
    const [careerValidation, setCareerValidation] = useState(null)
    const [enrolled, setEnrolled] = useState([])
    const [enrolledValidation, setEnrolledValidation] = useState(null)
    const [teachers, setTeachers] = useState([])
    const [teacherValidation, setTeacherValidation] = useState(null)
    const [subjects, setSubjects] = useState([])
    const [subjectValidation, setSubjectValidation] = useState(null)

    useEffect(() => {
        if (Object.keys(sheetData).length > 0 && sheetNames.length > 0 && isVerifying) {
            collectData()
        }
    }, [sheetData])

    const collectData = () => {
        for (let index = 0; index < sheetNames.length; index++) {
            let sheetName = sheetNames[index]
            if (sheetName === 'Alumnos') {
                handleChangeColumnNamesStudent(sheetData.Alumnos)
            } else if (sheetName === 'Carreras') {
                handleChangeColumnNamesCareer(sheetData.Carreras)
            } else if (sheetName === 'Inscritos') {
                handleChangeColumnNamesEnrolled(sheetData.Inscritos)
            } else if (sheetName === 'Maestros') {
                handleChangeColumnNamesTeacher(sheetData.Maestros)
            } else if (sheetName === 'Materias') {
                handleChangeColumnNamesSubject(sheetData.Materias)
            }
        }
        setIsVerifying(false)
    }

    useEffect(() => {
        if (career.length > 0) {
            validateCareers()
        }
    }, [career])

    const validateCareers = async () => {
        const res = await axios.post(urls.validateCareers, career)
        setCareerValidation(res.data)
    }

    const handleChangeColumnNamesCareer = (careers) => {
        const newCareer = careers.map((career) => {
            const newObject = {}
            Object.keys(career).forEach((key) => {
                switch (key.toLowerCase()) {
                    case "id":
                        newObject.id = career[key]
                        break;

                    case "carrera":
                        newObject.career = career[key]
                        break;
                }
            })
            return newObject
        })
        setCareer(newCareer)
    }

    useEffect(() => {
        if (teachers.length > 0) {
            validateTeachers()
        }
    }, [teachers])

    const validateTeachers = async () => {
        const res = await axios.post(urls.validateTeachers, teachers)
        setTeacherValidation(res.data)
    }

    const handleChangeColumnNamesTeacher = (teachers) => {
        const newTeachers = teachers.map((teacher) => {
            const newObject = {}
            Object.keys(teacher).forEach((key) => {
                switch (key.toLowerCase()) {
                    case "numero de control":
                        newObject.control_number = teacher[key]
                        break;

                    case "nombres":
                        newObject.name = teacher[key]
                        break;

                    case "primer apellido":
                        newObject.first_last_name = teacher[key]
                        break;

                    case "segundo apellido":
                        newObject.second_last_name = teacher[key]
                        break;

                    case "rfc":
                        newObject.rfc = teacher[key]
                        break;

                    case "pin":
                        newObject.pin = teacher[key]
                        break;
                }
            })
            return newObject
        })

        setTeachers(newTeachers)
    }

    useEffect(() => {
        if (students.length > 0) {
            validateStudents()
        }
    }, [students])

    const validateStudents = async () => {
        const res = await axios.post(urls.validateStudents, students)
        setStudentValidation(res.data)
    }

    const handleChangeColumnNamesStudent = (students) => {
        const newStudents = students.map((student) => {
            const newObject = {}
            Object.keys(student).forEach((key) => {
                switch (key.toLowerCase()) {
                    case "numero de control":
                        newObject.control_number = student[key]
                        break;

                    case "nombres":
                        newObject.name = student[key]
                        break;

                    case "primer apellido":
                        newObject.first_last_name = student[key]
                        break;

                    case "segundo apellido":
                        newObject.second_last_name = student[key]
                        break;

                    case "semetre":
                        newObject.semester = student[key]
                        break;

                    case "pin":
                        newObject.pin = student[key]
                        break;

                    case "activo":
                        newObject.active = student[key]
                        break;

                    case "id carrera":
                        newObject.career = student[key]
                        break;
                }
            })
            return newObject
        })

        const changeStatus = newStudents.map((item) => {
            if (item.active === "Si") {
                return { ...item, active: true };
            } else if (item.active === "No") {
                return { ...item, active: false };
            } else {
                return item;
            }
        });

        setStudents(changeStatus)
    }

    useEffect(() => {
        if (subjects.length > 0) {
            validateSubjects()
        }
    }, [subjects])

    const validateSubjects = async () => {
        const res = await axios.post(urls.validateSubjects, subjects)
        setSubjectValidation(res.data)
    }

    const handleChangeColumnNamesSubject = (subjects) => {
        const newSubject = subjects.map((subject) => {
            const newObject = {}
            Object.keys(subject).forEach((key) => {
                switch (key.toLowerCase()) {
                    case "id":
                        newObject.id = subject[key]
                        break;

                    case "materia":
                        newObject.subject = subject[key]
                        break;

                    case "id carrera":
                        newObject.career = subject[key]
                        break;

                    case "id maestros":
                        newObject.teacher = subject[key]
                        break;
                }
            })
            return newObject
        })
        setSubjects(newSubject)
    }

    useEffect(() => {
        if (enrolled.length > 0) {
            validateEnrolleds()
        }
    }, [enrolled])

    const validateEnrolleds = async () => {
        const res = await axios.post(urls.validateEnrolleds, enrolled)
        setEnrolledValidation(res.data)
    }

    const handleChangeColumnNamesEnrolled = (enrolleds) => {
        const newEnrolled = enrolleds.map((enrolled) => {
            const newObject = {}
            Object.keys(enrolled).forEach((key) => {
                switch (key.toLowerCase()) {
                    case "id":
                        newObject.id = enrolled[key]
                        break;

                    case "numero de control":
                        newObject.student = enrolled[key]
                        break;

                    case "id materia":
                        newObject.subject = enrolled[key]
                        break;
                }
            })
            return newObject
        })
        setEnrolled(newEnrolled)
    }

    const confirmSubmitNewSemester = () => {
        const totalNoExistentData = (careerValidation.noExist.length +
            teacherValidation.noExist.length + studentValidation.noExist.length +
            subjectValidation.noExist.length + enrolledValidation.noExist.length)
        Swal.fire({
            title: '¿Deseas insertas los nuevos datos del semestre?',
            text: 'Se insertarán ' + totalNoExistentData + ' datos',
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Subir Datos',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        }).then((response) => {
            if (response.isConfirmed) {
                handleSubmitNewSemester()
            }
        })
    }

    const handleSubmitNewSemester = () => {
        console.log(careerValidation.noExist)
        if (careerValidation) {
            submitCareer()
        }
    }

    const submitCareer = async () => {
        const res = await axios.post(urls.addCareers, careerValidation.noExist)
        console.log(res.data)
    }



    return (
        <>
            <Container className="mt-5">
                {isVerifying ? (
                    <CDBBox display="flex" flex="fill">
                        <Spinner animation="border" variant="dark" />
                        <h3 className="ms-3">Cargando datos</h3>
                    </CDBBox>
                ) : (
                    <Container>
                        <CDBBox display="flex" flex="fill" alignItems="center">
                            <h3 className="mb-0">Datos Recibidos</h3>
                            <CDBBox display="flex" flex="fill" justifyContent="end">
                                <Button variant="success" size="lg" onClick={confirmSubmitNewSemester}>Subir Contenido</Button>
                            </CDBBox>
                        </CDBBox>
                        {studentValidation ? (<DataVerified data={students} dataVerified={studentValidation} title={'Alumnos'} />) : (<></>)}
                        {teacherValidation ? (<DataVerified data={teachers} dataVerified={teacherValidation} title={'Maestros'} />) : (<></>)}
                        {subjectValidation ? (<DataVerified data={subjects} dataVerified={subjectValidation} title={'Materias'} />) : (<></>)}
                        {enrolledValidation ? (<DataVerified data={enrolled} dataVerified={enrolledValidation} title={'Inscritos'} />) : (<></>)}
                        {careerValidation ? (<DataVerified data={career} dataVerified={careerValidation} title={'Carreras'} />) : (<></>)}
                    </Container>
                )}
            </Container>
        </>
    )
}


export default LoadSheetData