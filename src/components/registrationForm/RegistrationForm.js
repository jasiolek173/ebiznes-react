import React, {useState} from 'react';
import axios from 'axios';
import {withRouter} from "react-router-dom";
import M from "materialize-css";

function RegistrationForm(props) {
    const [state, setState] = useState({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: "",
        successMessage: null
    });
    const handleChange = (e) => {
        const {id, value} = e.target;
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    };
    const sendDetailsToServer = () => {
        if (state.email.length && state.password.length) {
            const payload = {
                "email": state.email,
                "password": state.password,
                "firstName": state.firstName,
                "lastName": state.lastName,
            };
            axios.post('http://localhost:9000/sign_up', payload)
                .then(function (response) {
                    if (response.status === 200) {
                        M.toast({html: 'Zarejestrowano'});
                        redirectToHome();
                    } else if (response.status === 409) {
                        M.toast({html: 'Podany adres email już ma konto!'})
                    } else {
                        console.log(response);
                        M.toast({html: 'Niepoprawne dane'})
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            M.toast({html: 'Pola formularza nie mogą być puste'})
        }

    };
    const redirectToHome = () => {
        props.history.push('/home');
    };
    const redirectToLogin = () => {
        props.history.push('/loginform');
    };
    const handleSubmitClick = (e) => {
        e.preventDefault();
        if (state.password === state.confirmPassword) {
            sendDetailsToServer()
        } else {
            M.toast({html: 'Hasła muszą się zgadzać'})
        }
    };
    return (
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputEmail1">Email</label>
                    <input type="email"
                           className="form-control"
                           id="email"
                           aria-describedby="emailHelp"
                           placeholder="Podaj email"
                           value={state.email}
                           onChange={handleChange}
                    />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputEmail1">Imię</label>
                    <input type="email"
                           className="form-control"
                           id="firstName"
                           aria-describedby="emailHelp"
                           placeholder="Wpisz swoje imie"
                           value={state.firstName}
                           onChange={handleChange}
                    />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputEmail1">Nazwisko</label>
                    <input type="email"
                           className="form-control"
                           id="lastName"
                           aria-describedby="emailHelp"
                           placeholder="Wpisz swoje nazwisko"
                           value={state.lastName}
                           onChange={handleChange}
                    />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Hasło</label>
                    <input type="password"
                           className="form-control"
                           id="password"
                           placeholder="Hasło"
                           value={state.password}
                           onChange={handleChange}
                    />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Potwierdź hasło</label>
                    <input type="password"
                           className="form-control"
                           id="confirmPassword"
                           placeholder="Hasło"
                           value={state.confirmPassword}
                           onChange={handleChange}
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >
                    Zarejestruj
                </button>
            </form>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none'}}
                 role="alert">
                {state.successMessage}
            </div>
            <div className="mt-2">
                <span>Masz już konto? </span>
                <span className="loginText" onClick={() => redirectToLogin()}>Zaloguj się </span>
            </div>

        </div>
    )
}

export default withRouter(RegistrationForm);
