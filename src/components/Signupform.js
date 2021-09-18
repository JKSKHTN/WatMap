import React, { useRef, useState } from 'react'
import Navigation from './Navigation'
import { Form, Button, Container, Alert } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import LogOut from './Logout';
import { useAuth } from "../contexts/AuthContext.js";
import { navigate } from "@reach/router"

export default function LogInForm() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const {currentUser, signup} = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();
        const email = emailRef.current.value
        const pwd = passwordRef.current.value
        const pwdconfirm = passwordConfirmRef.current.value

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match!");
        }

        if (emailRef.current.value.split('@')[1] !== 'uwaterloo.ca') {
            return setError("Valid UWaterloo email required!")
        }

        try {
            setError("");
            setLoading(true);
            await signup(email, pwd);
            navigate('/dashboard')
          } catch {
            setError("Failed to create an account");
          }
          setLoading(false);


        console.log('submitting..')
    }

    function testfunc() {
        console.log()
    }

    

    return (
        <div>
            <Container className="auth-container my-5 d-flex justify-content-center">
            <div>
                {error && <Alert variant="danger">
                    {error}
                </Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email" className="mb-3 form-floating" onClick={testfunc}>
                        <Form.Control
                            type="email"
                            ref={emailRef}
                            className="form-control"
                            placeholder="name@uwaterloo.ca"
                            id="InputEmail"
                            aria-describedby="email"
                            required
                        />
                        <Form.Label
                            for="InputEmail"
                            className="form-label floatingInput"
                        >
                            Email Address
                        </Form.Label>
                        <Form.Text className="text-muted">
                        UWaterloo Emails only
                        </Form.Text>
                    </Form.Group>
                    <Form.Group id="password" className="mb-3 form-floating">
                        <Form.Control
                            type="password"
                            ref={passwordRef}
                            className="form-control"
                            id="InputPassword"
                            aria-describedby="password"
                            required
                        />
                        <Form.Label
                            for="InputPassword"
                            className="form-label floatingInput"
                        >
                            Password
                        </Form.Label>
                        <Form.Text className="text-muted">
      Password must be at least 6 characters long
    </Form.Text>
                    </Form.Group>
                    <Form.Group id="password-confirm" className="mb-3 form-floating">
                        <Form.Control
                            type="password"
                            ref={passwordConfirmRef}
                            className="form-control"
                            id="InputPasswordConfirm"
                            aria-describedby="password confirm"
                            required
                        />
                        <Form.Label
                            for="InputPasswordConfirm"
                            className="form-label floatingInput"
                        >
                            Confirm Password
                        </Form.Label>
                    </Form.Group>
                    <Button
                        className="auth-btn"
                        type="submit"
                        disabled={loading}
                        variant="primary"
                    >
                        Sign Up
                    </Button>
                </Form>
            </div>
            </Container>
        </div>
    )
}
