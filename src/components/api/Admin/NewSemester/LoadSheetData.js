import { CDBBox } from "cdbreact"
import { useContext, useEffect, useState } from "react"
import { Container, Spinner } from "react-bootstrap"
import { ApiUrls } from "../../ApiUrls"
import axios from "axios"
import DataVerified from "./DataVerified"

const LoadSheetData = ({ sheetData, sheetNames }) => {

    const urls = useContext(ApiUrls)
    const [isVerifying, setIsVerifying] = useState(true)
    const [students, setStudents] = useState([])
    const [career, setCareer] = useState([])
    const [careerValidation, setCareerValidation] = useState(null)
    const [enrolled, setEnrolled] = useState([])
    const [teachers, setTeachers] = useState([])
    const [subjects, setSubjects] = useState([])

    useEffect(() => {
        if (Object.keys(sheetData).length > 0 && sheetNames.length > 0 && isVerifying) {
            collectData()
        }
    }, [sheetData])

    const collectData = () => {
        for (let index = 0; index < sheetNames.length; index++) {
            let sheetName = sheetNames[index]
            if (sheetName === 'Alumnos') {
                setStudents(sheetData.Alumnos)
            } else if (sheetName === 'Carreras') {
                setCareer(sheetData.Carreras)
            } else if (sheetName === 'Inscritos') {
                setEnrolled(sheetData.Inscritos)
            } else if (sheetName === 'Maestros') {
                setTeachers(sheetData.Teachers)
            } else if (sheetName === 'Materias') {
                setSubjects(sheetData.Materias)
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
                        <CDBBox display="flex" flex="fill">
                            <h3>Datos Recibidos</h3>
                        </CDBBox>
                        {careerValidation ? (<DataVerified data={career} dataVerified={careerValidation} title={'Carreras'} />) : (<></>)}
                    </Container>
                )}
            </Container>
        </>
    )
}

export default LoadSheetData