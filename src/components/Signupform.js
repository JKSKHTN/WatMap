import React, { useRef, useState } from 'react'
import Navigation from './Navigation'
import { Form, Button, Container, Alert } from "react-bootstrap";
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
            navigate('/home')
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
                        <Form.Text className="text-muted">
                        UWaterloo Emails only
                        </Form.Text>
                        
                    </Form.Group>
                    <Form.Group id="password" className="mb-3 form-floating">
                    <Form.Label
                            for="InputPassword"
                            className="form-label floatingInput"
                            style={{color: '#fff'}}
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
                        <Form.Text className="text-muted">
      Password must be at least 6 characters long
    </Form.Text>
                        
                            
                        
                    </Form.Group>
                    <Form.Group id="password-confirm" className="mb-3 form-floating">
                    <Form.Label
                            for="InputPasswordConfirm"
                            className="form-label floatingInput"
                            style={{color: '#fff'}}
                        >
                            Confirm Password
                        </Form.Label>
                        <Form.Control
                            type="password"
                            ref={passwordConfirmRef}
                            className="form-control"
                            id="InputPasswordConfirm"
                            placeholder="Confirm Password"
                            aria-describedby="password confirm"
                            required
                        />
                        
                    </Form.Group>
                    <div className="d-flex justify-content-center">
                    <Button
                        className="auth-btn w-100 mt-2"
                        type="submit"
                        disabled={loading}
                        bsPrefix="uw-yellow"
                    >
                        Sign Up
                    </Button>
                    </div>
                </Form>
            </div>
            </Container>
        </div>
    )
}
