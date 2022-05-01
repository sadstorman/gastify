import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { startLogOut } from '../actions/auth'
import { tradeLogOut } from '../actions/trades'


export const Navbar = () => {
    const { name } = useSelector(state => state.auth)

    const dispatch = useDispatch()

    const logOut = () => {
        dispatch(startLogOut())
        dispatch(tradeLogOut())
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark ">

            <div className="container-fluid ">

                <button className=" navbar-toggler navBarToggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon "></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <div className="navbar-nav text-center">
                            <Link
                                className="navbar-brand hidden-xs mx-1"
                                to="/"
                            >
                                Home
                            </Link>

                            <NavLink
                                activeclassname="active"
                                className="nav-item nav-link"
                                exact
                                to="/contacto"
                            >
                                Contact
                            </NavLink>
                            <ul className='mt-1'>
                            <span className='text-white '>{name} <button className='btn btn-outline-danger ' onClick={logOut}>Logout <i className='fas fa-sign-out-alt'> </i></button></span>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </nav>
    )
}