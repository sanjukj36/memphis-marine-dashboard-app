import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerAPI } from '../services/allAPI';
import { useDispatch } from 'react-redux';
import { Form, Button, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginSuccess, setAdmin } from '../store/Actions/authActions';

function RegistrationForm() {
    const [f_userName, setUsername] = useState("");
    const [f_Pwd, setPassword] = useState("");
    const [userType, setUserType] = useState("user");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await registerAPI({ f_userName, f_Pwd, userType });
            console.log(response.data.userType);
            if (response.data.userType === 'admin') {
                dispatch(setAdmin(true));
                console.log("admin is");
            } else {
                dispatch(setAdmin(false));
                console.log("admin not");
            }

            if (response && response.data && response.data.token) {
                console.log("Token received:", response.data.token);
                dispatch(loginSuccess(response.data.token));
                localStorage.setItem("token", response.data.token);
                setTimeout(() => {
                    navigate("/dashboard");
                }, 2000);
                toast.success('Registration successful!');
            } else {
                throw new Error('Token not found in response');
            }
        } catch (error) {
            if (error.response) {
                const apiError = error.response.data.error || 'An unknown error occurred';
                toast.error(`Registration failed: ${apiError}`);
            } else {
                toast.error(`Registration failed: ${error.message}`);
            }
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center min-vh-100" style={{ backgroundImage: 'url(/path/to/your/background-image.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <Container className="p-4 bg-dark rounded shadow" style={{ maxWidth: '500px' }}>
                <h1 className="text-center mb-4">Register</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter username"
                            value={f_userName}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            value={f_Pwd}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>User Type</Form.Label>
                        <Form.Select
                            value={userType}
                            onChange={(e) => setUserType(e.target.value)}
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </Form.Select>
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100">
                        Register
                    </Button>
                </Form>

                {/* <p className="mt-3 text-center">
                    Have an account? <Link to="/login">Login here</Link>
                </p> */}
                <p className="mt-3 text-center text-white">
                Have an account?  <Link to="/login" className="text-primary">Login heree</Link>
                </p>

                <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            </Container>
        </div>
    );
}

export default RegistrationForm;
