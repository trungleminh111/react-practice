import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../assets/logo192.png'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';


const Header = (props) => {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/")
        toast.success("logout success!")
    }
    return (<>
        <Navbar expand="lg" className="bg-body-tertiary bg-light">
            <Container>
                <Navbar.Brand href="/">
                    <img src={logo} alt=""
                        width="30" height="30"
                        className='d-inline-block align-top'
                    />
                    <span> React-Bootstrap</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto" >

                        <NavLink to="/" className="nav-link">Home</NavLink>


                        <NavLink to="/users" className="nav-link">Manage Users</NavLink>
                    </Nav>
                    <Nav>
                        <NavDropdown title="Setting" id="basic-nav-dropdown">
                            <NavDropdown.Item >
                                <NavLink to="/login" className="nav-link">Login</NavLink>
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={() => handleLogout()}>
                                Logout
                            </NavDropdown.Item>

                        </NavDropdown>
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>)
}
export default Header;