import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { useForm } from '../../hooks/useForm';
import '../.././styles/login.css';
import { startLogin, startRegister } from '../../actions/auth';

export const LoginScreen = () => {

  const dispatch = useDispatch()

  const initialFormLogin = {
    correoLogin: '',
    passwordLogin: '',
  }

  const [formValuesLogin, handleInputChange] = useForm(initialFormLogin)
  const { correoLogin, passwordLogin } = formValuesLogin

  const initialFormRegister = {
    nombreRegister: '',
    correoRegister: '',
    passwordRegister: '',
    passwordRegister2: ''
  }

  const [formValuesRegister, handleInputChangeRegister] = useForm(initialFormRegister)
  const { nombreRegister, correoRegister, passwordRegister, passwordRegister2 } = formValuesRegister

  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(startLogin(correoLogin.toLowerCase(), passwordLogin.toLowerCase()))
  }

  const handleRegister = (e) => {
    e.preventDefault()

    if (passwordRegister !== passwordRegister2) {
      return Swal.fire('Error', 'Las contraseñas deben ser iguales', 'error')
    } else {
      dispatch(startRegister(correoRegister.toLowerCase(), passwordRegister.toLowerCase(), nombreRegister.toLowerCase()))
    }
  }

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1 animate__animated animate__backInLeft">
          <h3>Login</h3>
          <form onSubmit={handleLogin} className="">
            <div className="input-group mb-3">
              <input
                
                name="correoLogin"
                value={correoLogin}
                onChange={handleInputChange}
                type="email"
                className="form-control"
                placeholder="Email"
                
              />
            </div>
            <div className="input-group mt-3">
              <input
                name="passwordLogin"
                value={passwordLogin}
                onChange={handleInputChange}
                type="password"
                className="form-control"
                placeholder="Password"
              />
            </div>
            <div className="input-group mt-3">
              <input
                type="submit"
                className="btnSubmit"
                value="Login"
              />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2 animate__animated animate__backInRight">
          <h3>Register</h3>
          <form onSubmit={handleRegister} className="">
            <div className=" input-group mb-3 ">
              <input
                value={nombreRegister}
                name='nombreRegister'
                onChange={handleInputChangeRegister}
                type="text"
                className="form-control"
                placeholder="Name"
              />
            </div>
            <div className="input-group">
              <input
                value={correoRegister}
                name='correoRegister'
                onChange={handleInputChangeRegister}
                type="email"
                className="form-control"
                placeholder="Email"
              />
            </div>
            <div className="input-group mt-3">
              <input
                value={passwordRegister}
                name='passwordRegister'
                onChange={handleInputChangeRegister}
                type="password"
                className="form-control"
                placeholder="Password"
              />
            </div>

            <div className="input-group mt-3">
              <input
                value={passwordRegister2}
                name='passwordRegister2'
                onChange={handleInputChangeRegister}
                type="password"
                className="form-control"
                placeholder="Confirm password"
              />
            </div>

            <div className="input-group mt-3">
              <input
                type="submit"
                className="btnSubmit"
                value="Register" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}