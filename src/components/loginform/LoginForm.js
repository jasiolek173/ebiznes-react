import React, {useState} from 'react';
import {Link, withRouter} from "react-router-dom";

function LoginForm() {
    const [state, setState] = useState({
        email: "",
        password: "",
        successMessage: null
    });
    const handleChange = (e) => {
        const {id, value} = e.target;
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    };

    const navigateToGoogle = () => {
        window.location.assign("http://localhost:9000/authenticate/google")
    };
    const navigateToFacebook = () => {
        window.location.assign("http://localhost:9000/authenticate/facebook")
    };
    const navigateToHome = () => {
        window.location.assign("http://localhost:3000/")
    };


    const handleSubmitClick = (e) => {
        e.preventDefault();
        const payload = {
            "email": state.email,
            "password": state.password,
        };
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        const options = {
            method: "POST",
            headers,
            body: JSON.stringify(payload)
        };
        const request = new Request("http://localhost:9000/sign_in", options);
        fetch(request, {credentials: "include"})
            .then(function (response) {
                console.log(response);
                if (response.status === 200) {
                    setState(prevState => ({
                        ...prevState,
                        'successMessage': 'Login successful. Redirecting to home page..'
                    }));
                    navigateToHome();
                    console.log("logged in")
                } else {
                    setState(prevState => ({
                        ...prevState,
                        'successMessage': 'Credentials error'
                    }));
                }
            });
    };
    return (
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center eight">
            <form className="formsize">
                <h4>Logowanie:</h4>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email"
                           className="form-control"
                           id="email"
                           aria-describedby="emailHelp"
                           placeholder="Enter email"
                           value={state.email}
                           onChange={handleChange}
                    />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password"
                           className="form-control"
                           id="password"
                           placeholder="Password"
                           value={state.password}
                           onChange={handleChange}
                    />
                </div>
                <div className="form-check">
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >Submit
                </button>
            </form>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none'}}
                 role="alert">
                {state.successMessage}
            </div>
            <div className="registerMessage">
                <span>Dont have an account? </span>
                <Link to={"/registration"}> <span className="loginText">Register</span></Link>
            </div>

            <div>
                <h4>Logowanie poprzez aplikacje:</h4>
                <img src={"https://www.designbust.com/download/28/png/google_logo_icon256.png"} alt={"GOOGLE"}
                     className="imgsize" onClick={navigateToGoogle}/>
                <img
                    src={"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRvyhpG5UE12QpeP2OpEncHT-fVWzZ3pKCeH1lXwonxqT4s26-7&usqp=CAU"}
                    alt={"FACEBOOK"} className="imgsize" onClick={navigateToFacebook}/>
            </div>
        </div>


    )
}

export default withRouter(LoginForm);
