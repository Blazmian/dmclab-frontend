import { Button, Container, Form } from "react-bootstrap"
import LogoITH from '../img/ITH.png'
import MainNavBar from "./MainNavBar"

const Login = () => {
    return (
        <>
            <div className='header-main'>
                <MainNavBar />
            </div>
            <Container id="main-container" className="d-grid h-100  mx-10">
                <Form id="sign_in_form" className="text-center w-100">
                    <img
                        className="mb-4 logo-ith-login"
                        src={LogoITH}
                        alt="Logo de Tecnológico Nacional de México Campus Hermosillo"
                    />
                    <Form.Control type="text" placeholder="Número de control" />
                    <Form.Control type="password" placeholder="Nip" />
                    <Button>Solicitar Material</Button>
                </Form>
            </Container>
        </>
    )
}

export default Login