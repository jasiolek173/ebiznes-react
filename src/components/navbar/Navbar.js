import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie';

class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            logged: false
        }
    }

    signout() {

        const headers = new Headers();
        headers.append("Csrf-Token", Cookies.get("csrfToken"));
        const options = {
            method: "GET",
            headers
        };
        const request = new Request("http://localhost:9000/sign_out", options);
        fetch(request, {credentials: "include"})
            .then(response => {
                    if (response.status === 200) {
                        this.setState({logged: false});
                    }
                }
            )
    }


    render() {
        const isLogged = Cookies.get("authenticator");
        const log = isLogged ? (<li><Link to="/" onClick={() => this.signout()}>wyloguj</Link></li>) : (
            <li><Link to="/loginform">zaloguj</Link></li>);
        let left = "";
        if (isLogged)
            left = (<li><Link to="/orders">zamówienia</Link></li>);
        return (
            <nav className="nav-wrapper">
                <div className="container">
                    <Link to="/" className="brand-logo">KOM-KOM</Link>
                    <ul className="left">
                        {log}
                        {left}
                    </ul>
                    <ul className="right">
                        <li><Link to="/cart">koszyk</Link></li>
                        <li><Link to="/cart"><i className="material-icons">shopping_cart</i></Link></li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Navbar
