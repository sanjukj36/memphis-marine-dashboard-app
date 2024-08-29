import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginAPI } from '../services/allAPI';
import { Form, Button, Container } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginSuccess, setAdmin } from '../store/Actions/authActions';

function LoginForm() {
    const [f_userName, setUsername] = useState("");
    const [f_Pwd, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginAPI({ f_userName, f_Pwd });
            console.log(response);

            if (response && response.token) {
                dispatch(loginSuccess(response.token));
                localStorage.setItem("token", response.token);
                if (response.userType === 'admin') {
                    dispatch(setAdmin(true));
                } else {
                    dispatch(setAdmin(false));
                }
                setTimeout(() => {
                    navigate("/dashboard");
                }, 2000);
                toast.success('Login successful!');
            } else {
                throw new Error('Token not found in response');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.error || error.message;
            toast.error(`Login failed: ${errorMessage}`);
        }
    };

    return (
        <div className="login-background d-flex align-items-center justify-content-center min-vh-100">
            <Container className="p-4 bg-dark rounded shadow" style={{ maxWidth: '400px' }}>
                <h1 className="text-white mb-4 text-center">Login</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label className="text-white">Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter username"
                            value={f_userName}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="text-white">Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            value={f_Pwd}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100">
                        Login
                    </Button>
                </Form>

                <p className="mt-3 text-center text-white">
                    Don't have an account? <Link to="/register" className="text-primary">Register here</Link>
                </p>

                <ToastContainer position="top-center" autoClose={2000} />
            </Container>
        </div>
    );
}

export default LoginForm;
