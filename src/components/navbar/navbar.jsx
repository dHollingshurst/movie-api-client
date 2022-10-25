
import React from "react";
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Redirect, Routes, Route, Redirect, Link } from 'react-router-dom';
import './navbar.scss';

export function Menubar({ user }) {

    const onLoggedOut = () => {
        localStorage.clear();
        window.open("/", "_self");
    }

    const isAuth = () => {
        if (typeof window == "undefined") {
            return false;
        }
        if (localStorage.getItem("token")) {
            return localStorage.getItem("token");
        } else {
            return false;
        }
    };

    return (

        <Navbar className="main-nav" sticky="top" expand="lg" variant="light">
            <Container>
                <Navbar.Brand className="navbar-logo" href="/">myFlixCinema</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        {isAuth() && (
                            <Nav.Link className="profile-link" href={`/users/${user}`}>{user}</Nav.Link>
                        )}
                        {isAuth() && (
                            <Button className="log-out-button" variant="primary" onClick={onLoggedOut}>Logout</Button>
                        )}
                        {!isAuth() && (
                            <Nav.Link href="/">Sign-in</Nav.Link>
                        )}
                        {!isAuth() && (
                            <Nav.Link href="/register">Sign-up</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
