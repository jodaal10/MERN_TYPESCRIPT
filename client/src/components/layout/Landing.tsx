import React from 'react'
import { Link } from 'react-router-dom'

export const Landing = () => {
    return (
        <section className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                <h1 className="x-large">Follow-up to career plan</h1>
                <p className="lead">
                We facilitate the follow-up in the evolution of the career plan for each user.
                </p>
                <div className="buttons">
                    <Link to="/register" className="btnn btn-primarys">Sign Up</Link>
                    <Link to="/login" className="btnn btn-light">Login</Link>
                </div>
                </div>
            </div>
        </section> 
    )
}
