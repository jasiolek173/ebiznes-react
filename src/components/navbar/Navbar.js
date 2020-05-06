import React, {Component} from 'react';
import {Link} from 'react-router-dom'

class Navbar extends Component {
    render() {
        return (
            <nav className="nav-wrapper">
                <div className="container">
                    <Link to="/" className="brand-logo">KOM-KOM</Link>

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
