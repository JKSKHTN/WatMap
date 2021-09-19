import React, { useRef, useState } from 'react'
import Navigation from './Navigation'
import { Form, Button, Container, Alert } from "react-bootstrap";
// import 'bootstrap/dist/css/bootstrap.min.css';
import LogOut from './Logout';
import { useAuth } from "../contexts/AuthContext.js";
import { navigate } from "@reach/router"

export default function LogInForm() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const {currentUser, login} = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();
        const email = emailRef.current.value
        const pwd = passwordRef.current.value

        try {
            setError("");
            setLoading(true);
            await login(email, pwd);
            navigate('/home')
          } catch {
            setError("Failed to log in");
          }
          setLoading(false);

        console.log('submitting..')
    }

    return (
        <div>
            <Container className="auth-container my-5 d-flex justify-content-center">
            <div>
                {error && <Alert variant="danger">
                    {error}
                </Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email" className="mb-3 form-floating">
                    <Form.Label
                            for="InputEmail"
                            className="form-label floatingInput"
                            style={{color: '#fff'}}
                        >
                            Email Address
                        </Form.Label>
                        <Form.Control
                            type="email"
                            ref={emailRef}
                            className="form-control"
                            placeholder="Email Address"
                            id="InputEmail"
                            aria-describedby="email"
                            required
                        />
                        
                    </Form.Group>
                    <Form.Group id="password" className="mb-3 form-floating">
                    <Form.Label
                            for="InputPassword"
                            className="form-label floatingInput"
                            style={{color: '#fff'}}x
                        >
                            Password
                        </Form.Label>
                        <Form.Control
                            type="password"
                            ref={passwordRef}
                            className="form-control"
                            id="InputPassword"
                            aria-describedby="password"
                            placeholder="Password"
                            required
                        />
                        
                    </Form.Group>
                    <div className="d-flex justify-content-center">
                        <Button
                            className="auth-btn w-100 mt-2"
                            bsPrefix="uw-yellow"
                            type="submit"
                            disabled={loading}
                            variant="primary"
                        >
                            Login
                        </Button>
                    </div>
                </Form>
            </div>
            </Container>
        </div>
    )
}
