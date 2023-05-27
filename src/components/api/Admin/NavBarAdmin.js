import { CDBIcon } from "cdbreact"
import { Container, Navbar } from "react-bootstrap"

const NavBarAdmin = (props) => {
    return (
        <>
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-EV6GHP7VHP"></script>
            <script>
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-EV6GHP7VHP');
            </script>
            <Navbar style={{ backgroundColor: '#1D3A69' }} variant="dark">
                <Container>
                    <Navbar.Brand>
                        <CDBIcon icon={props.icon} />{'    '}
                        <strong>{props.title}</strong>
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </>
    )
}

export default NavBarAdmin