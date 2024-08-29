import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../images/memphis-logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/Actions/authActions';
import { toast, ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';

function NavBar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAdmin = useSelector(state => state.auth.isAdmin);

    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(logout());
        setTimeout(() => {
            navigate("/login");
        }, 2000);
        toast.success('Logged out successfully!');
    };

    return (
        <Navbar expand="lg" bg="primary" variant="dark">
            <Container fluid>
                <Navbar.Brand href="#">
                    <img
                        src={logo}
                        width="100"
                        height="80"
                        className="d-inline-block align-top"
                        alt="Logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/crypto-coins">Cryptocurrency Coins</Nav.Link>
                        <Nav.Link as={Link} to="/weather">Weather Data</Nav.Link>
                        {isAdmin && (<Nav.Link as={Link} to="/user-list">List of users</Nav.Link>)}
                    </Nav>
                    <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
                </Navbar.Collapse>
                <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            </Container>
        </Navbar>
    );
}

export default NavBar;
