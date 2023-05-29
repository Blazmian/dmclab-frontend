import { CDBBox } from "cdbreact"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { Button, Container, Spinner } from "react-bootstrap"
import { ApiUrls } from "../../ApiUrls"
import axios from "axios"
import DataVerified from "./DataVerified"
import Swal from "sweetalert2"
import ConfirmSubmit from "./ConfirmSubmit"

const LoadSheetData = ({ sheetData, sheetNames }) => {

    const urls = useContext(ApiUrls)
    const navigate = useNavigate()
    const [noExistTotal, setNoExistTotal] = useState(0)
    const [existTotal, setExistTotal] = useState(0)
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
        if (res.data.noExist.length > 0) {
            setNoExistTotal(prevTotal => prevTotal + res.data.noExist.length)
        }

        if (Object.keys(res.data.existWithChanges).length) {
            setExistTotal(prevTotal => prevTotal + Object.keys(res.data.existWithChanges.new).length)
        }
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
        if (res.data.noExist.length > 0) {
            setNoExistTotal(prevTotal => prevTotal + res.data.noExist.length)
        }

        if (Object.keys(res.data.existWithChanges).length) {
            setExistTotal(prevTotal => prevTotal + Object.keys(res.data.existWithChanges.new).length)
        }
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
        if (res.data.noExist.length > 0) {
            setNoExistTotal(prevTotal => prevTotal + res.data.noExist.length)
        }

        if (Object.keys(res.data.existWithChanges).length) {
            setExistTotal(prevTotal => prevTotal + Object.keys(res.data.existWithChanges.new).length)
        }
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

                    case "semestre":
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
        if (res.data.noExist.length > 0) {
            setNoExistTotal(prevTotal => prevTotal + res.data.noExist.length)
        }

        if (Object.keys(res.data.existWithChanges).length) {
            setExistTotal(prevTotal => prevTotal + Object.keys(res.data.existWithChanges.new).length)
        }
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
        if (res.data.noExist.length > 0) {
            setNoExistTotal(prevTotal => prevTotal + res.data.noExist.length)
        }

        if (Object.keys(res.data.existWithChanges).length) {
            setExistTotal(prevTotal => prevTotal + Object.keys(res.data.existWithChanges.new).length)
        }
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

    const [show, setShow] = useState(false);
    const handleShow = () => {
        setShow(true)
    }
    const handleClose = () => {
        setShow(false)
    }

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmitNewSemester = async () => {
        setIsSubmitting(true)
        const errors = []

        if (careerValidation) {
            const career = await submitCareer()
            if (career) {

            } else {
                errors.push('Carreras')
            }
        }

        await delay(3000)
        if (teacherValidation) {
            const teacher = await submitTeacher()
            if (teacher) {

            } else {
                errors.push('Maestros')
            }
        }

        await delay(3000)
        if (studentValidation) {
            const student = await submitStudent()
            if (student) {

            } else {
                errors.push('Alumnos')
            }
        }

        await delay(3000)
        if (subjectValidation) {
            const subject = await submitSubject()
            if (subject) {

            } else {
                errors.push('Materias')
            }
        }

        await delay(3000)
        if (enrolledValidation) {
            const enrolled = await submitEnrolled()
            if (enrolled) {

            } else {
                errors.push('Inscritos')
            }
        }

        if (errors.length === 0) {
            handleClose()
            Swal.fire({
                title: 'Movimiento exitoso',
                text: "Datos actualizados correctamente",
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then((response) => {
                navigate('/admin/reportes')
            })
        }
    }

    const submitCareer = async () => {
        const data = []
        if (careerValidation.noExist.length > 0) {
            for (let index = 0; index < careerValidation.noExist.length; index++) {
                data.push(careerValidation.noExist[index])
            }
        }

        if (careerValidation.existWithChanges.new.length > 0) {
            for (let index = 0; index < Object.keys(careerValidation.existWithChanges.new).length; index++) {
                data.push(careerValidation.existWithChanges.new[index])
            }
        }

        const res = await axios.post(urls.addCareers, data)
        return res.data
    }

    const submitTeacher = async () => {
        const data = []
        if (teacherValidation.noExist.length > 0) {
            for (let index = 0; index < teacherValidation.noExist.length; index++) {
                data.push(teacherValidation.noExist[index])
            }
        }

        if (teacherValidation.existWithChanges.new.length > 0) {
            for (let index = 0; index < Object.keys(teacherValidation.existWithChanges.new).length; index++) {
                data.push(teacherValidation.existWithChanges.new[index])
            }
        }

        const res = await axios.post(urls.addTeachers, data)
        return res.data
    }

    const submitStudent = async () => {
        const data = []
        if (studentValidation.noExist.length > 0) {
            for (let index = 0; index < studentValidation.noExist.length; index++) {
                data.push(studentValidation.noExist[index])
            }
        }

        if (studentValidation.existWithChanges.new.length > 0) {
            for (let index = 0; index < Object.keys(studentValidation.existWithChanges.new).length; index++) {
                data.push(studentValidation.existWithChanges.new[index])
            }
        }

        const res = await axios.post(urls.addStudents, data)
        return res.data
    }

    const submitSubject = async () => {
        const data = []
        if (subjectValidation.noExist.length > 0) {
            for (let index = 0; index < subjectValidation.noExist.length; index++) {
                data.push(subjectValidation.noExist[index])
            }
        }

        if (subjectValidation.existWithChanges.new.length > 0) {
            for (let index = 0; index < Object.keys(subjectValidation.existWithChanges.new).length; index++) {
                data.push(subjectValidation.existWithChanges.new[index])
            }
        }

        const res = await axios.post(urls.addSubjects, data)
        return res.data
    }

    const submitEnrolled = async () => {
        const data = []
        if (enrolledValidation.noExist.length > 0) {
            for (let index = 0; index < enrolledValidation.noExist.length; index++) {
                data.push(enrolledValidation.noExist[index])
            }
        }

        if (enrolledValidation.existWithChanges.new.length > 0) {
            for (let index = 0; index < Object.keys(enrolledValidation.existWithChanges.new).length; index++) {
                data.push(enrolledValidation.existWithChanges.new[index])
            }
        }


        const res = await axios.post(urls.addEnrolleds, data)
        return res.data
    }

    return (
        <>
            <ConfirmSubmit show={show} handleClose={handleClose} exist={existTotal} noExist={noExistTotal} submitMethod={handleSubmitNewSemester} isSubmitting={isSubmitting} />
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
                                <Button variant="success" size="lg" onClick={handleShow}>Subir Contenido</Button>
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