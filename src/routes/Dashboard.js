import React, { Suspense, useEffect } from 'react'
import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { startCheking } from '../actions/auth';
import { LoginScreen } from '../components/auth/LoginScreen';
import { Contacto } from '../components/Contacto';
import { GastifyScreen } from '../components/GastifyScreen';
import { Navbar } from '../components/Ui';
import { SpinnerCheck } from '../components/ui/SpinnerCheck';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const DashboardRoutes = () => {


    const dispatch = useDispatch();
    const { checking, uid } = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(startCheking());
    }, [dispatch])

    if (checking) {
        return (<SpinnerCheck/>)
    }

    return (

        <Router>
            <div>
                <Routes>
                    <Route exact path='/login' element={
                        <PublicRoute uid={uid} >
                            <LoginScreen />
                        </PublicRoute>
                    }
                    />
                    <Route exact path='/'
                        element={
                            <PrivateRoute uid={uid}>
                                <Navbar />
                                <GastifyScreen />
                            </PrivateRoute>
                        }
                    />
                    <Route exact path='/contacto'
                        element={
                            <PrivateRoute uid={uid}>
                                <Navbar />
                                <Contacto />
                            </PrivateRoute>
                        }
                    />

                </Routes>
            </div>
        </Router>
    )
}