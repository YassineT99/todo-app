import React, { useEffect, useRef } from 'react';
import { NavLink, useLocation } from "react-router-dom";
import gsap from "gsap";
import "./navbar.css";

export default function Navbar() {
    return (
        <nav className="navbar">
            <ul className="navbar_links">
                <li>
                    <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/todos" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        To do's
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/about" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        About
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}