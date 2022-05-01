import React, { useRef } from 'react'
import { useForm } from '../hooks/useForm'
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2'

export const Contacto = () => {

	const form = useRef()
	const initialForm = {
		name: "",
		email: "",
		subject: "",
		message: ""
	}

	const [formValues, handleInputChange, reset] = useForm(initialForm)
	const { name, email, subject, message } = formValues

	const handleSubmit = (e) => {
		e.preventDefault()

		emailjs.sendForm('service_jsoxdxp', 'template_j5p2xs5', form.current, 'L31NnIe7EpQGWEmwL')
			.then((result) => {
				console.log(result.text);
				Swal.fire('Enviado', 'Correo enviado', 'success')
			}, (error) => {
				console.log(error.text);
				Swal.fire('Error', 'Correo no enviado', 'error')
			});
		reset(initialForm)
	}

	return (<div className='dark'>

		<div className="contact1">
			<div className="container-contact1">
				<div className="contact1-pic js-tilt" t>
					<img src='../assets/img/img-01.png' alt="IMG" />
				</div>

				<form ref={form} onSubmit={handleSubmit} className="contact1-form validate-form" >
					<span className="contact1-form-title">
						<h3>Contact us</h3>
					</span>

					<div className="wrap-input1 ">
						<input className="input1" type="text" name="name" value={name} onChange={handleInputChange} placeholder="Nombre" />

					</div>

					<div className="wrap-input1 validate-input" >
						<input className="input1" type="email" name="email" value={email} onChange={handleInputChange} placeholder="Email" />
					</div>

					<div className="wrap-input1 validate-input" >
						<input className="input1" type="text" name="subject" value={subject} onChange={handleInputChange} placeholder="Asunto" />
					</div>

					<div className="wrap-input1 validate-input">
						<textarea className="input1" name="message" value={message} onChange={handleInputChange} placeholder="Mensaje"></textarea>
					</div>

					<div className="container-contact1-form-btn">
						<button type='submit' className="contact1-form-btn">
							<span>
								Send email
								<i className="fa fa-long-arrow-right" aria-hidden="true"></i>
							</span>
						</button>
					</div>
				</form>

			</div>


		</div>
		<div class="text-center mt-4">

			<h4 className='findeme'>Find me...</h4>
			<ul className='social'>
				<li><a target="_blank" rel="noopener" href="https://www.linkedin.com/in/juan-lia/"
					className="icon brands bi bi-linkedin"><span className="label">LinkedIn</span></a></li>
				<li><a target="_blank" rel="noopener" href="https://github.com/sadstorman" className="icon brands bi bi-github"><span
					className="label">Github</span> </a></li>

			</ul>

		</div>

	</div>



	)
}
