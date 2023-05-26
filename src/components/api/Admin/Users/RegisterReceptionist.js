import axios from "axios"
import { CDBBox, CDBIcon } from "cdbreact"
import { useContext, useEffect, useState } from "react"
import { Button, Container, Form, Navbar } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { validUserName } from "../../../../tools/InputValidator"
import { ApiUrls } from "../../ApiUrls"

const RegisterReceptionist = ({id}) => {

    const [user, setUser] = useState(null)
    const navigate = useNavigate()
    const urls = useContext(ApiUrls)

    useEffect(() => {
        getUser()
    }, [])

    const getUser = async () => {
        const res = await axios.get(urls.obtainStaff + id)
        setUser(res.data)
    }

    const CreateReceptionist = () => {
        const [form, setForm] = useState({})
        const [errors, setErrors] = useState({})
        const setField = (field, value) => {
            setForm({
                ...form,
                [field]: value
            })

            if (!!errors[field])
                setErrors({
                    ...errors,
                    [field]: null
                })
        }

        const validateForm = () => {
            const { username, password } = form
            const newErrors = {}

            if (!username || username === '') {
                newErrors.username = 'Por favor introduzca un nombre de usuario'
            } else if (!validUserName(username)) {
                newErrors.username = 'Solo se aceptan letras, números, "." y "_"'
            }
            if (!password || password === '') {
                newErrors.password = 'Por favor introduzca una contraseña'
            } else if (password.length < 6) {
                newErrors.password = 'La contraseña debe ser mínimo de 6 caracteres'
            }

            return newErrors
        }

        const handleSubmit = e => {
            e.preventDefault()
            const formErrors = validateForm()

            if (Object.keys(formErrors).length > 0) {
                setErrors(formErrors)
            } else {
                createReceptionist()
            }
        }

        const createReceptionist = async () => {
            const res = await axios.post(urls.addUser + id + '/receptionist',
                {
                    username: form.username,
                    password: form.password
                }
            )
            if (res.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Tu registro ha sido exitoso',
                    text: '¡Ahora podrás disfrutar los beneficios de ser un casetero! Procede a iniciar sesión para comenzar',
                }).then(response => {
                    navigate('/')
                })
            } else if (res.data === 'Duplicated Username') {
                Swal.fire({
                    icon: 'error',
                    title: 'Ups...',
                    text: 'Parece ser que este usuario ya se encuentra existente.'
                })
            }
        }

        return (
            <>
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand>
                            <strong>Registro</strong>
                        </Navbar.Brand>
                    </Container>
                </Navbar>
                <div><script async src="https://www.googletagmanager.com/gtag/js?id=G-EV6GHP7VHP"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments)}
  gtag('js', new Date());

  gtag('config', 'G-EV6GHP7VHP');
</script></div>
                <Container style={{ height: '60vh', width: '50%' }}>
                    <CDBBox display="flex" justifyContent="center" style={{ height: '100%' }} alignItems='center'>
                        <CDBBox>
                            <CDBBox display="flex" alignItems="center" className="mb-5">
                                <CDBIcon icon="envelope" className="me-3" size="lg" />
                                <h6 style={{ margin: '0' }}>Usted ha sido invitado a formar parte del grupo de caseteros. Por favor, llene los siguientes datos para completar su registro</h6>
                            </CDBBox>
                            <CDBBox display="flex" justifyContent="center">
                                <Form style={{ width: '80%' }}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Usuario</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            maxLength={10}
                                            placeholder="Introduzca su nombre de usuario"
                                            value={form.username}
                                            onChange={(e) => setField('username', e.target.value)}
                                            isInvalid={!!errors.username}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.username}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label>Contraseña</Form.Label>
                                        <Form.Control
                                            required
                                            type="password"
                                            maxLength={15}
                                            placeholder="Introduzca su contraseña"
                                            value={form.password}
                                            onChange={(e) => setField('password', e.target.value)}
                                            isInvalid={!!errors.password}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.password}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <CDBBox display="flex" justifyContent="center">
                                        <Button type="submit" variant="primary" onClick={handleSubmit}>Registrarse</Button>
                                    </CDBBox>
                                </Form>
                            </CDBBox>
                        </CDBBox>
                    </CDBBox>
                </Container>
            </>
        )
    }

    const ReceptionistAlreadyCreated = () => {
        Swal.fire({
            icon: 'error',
            title: 'Casetero existente',
            text: 'Este usuario ya ha sido registrado anteriormente como casetero. Prueba iniciando sesión',
        }).then(response => {
            navigate('/')
        })
    }

    return (
        <>
            {user && (user.receptionist ? <ReceptionistAlreadyCreated /> : <CreateReceptionist />)}
        </>
    )
}

export default RegisterReceptionist