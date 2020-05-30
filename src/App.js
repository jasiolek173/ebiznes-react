import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import './App.css';
import Products from "./components/products/Products";
import Product from "./components/product/Product";
import Cart from "./components/cart/Cart"
import LoginForm from "./components/loginform/LoginForm";
import RegistrationForm from "./components/registrationForm/RegistrationForm";
import Orders from "./components/orders/orders";
import Order from "./components/order/Order";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Navbar/>
                    <Switch>
                        <Route exact path="/" component={Products}/>
                        <Route path="/product/:id" component={Product}/>
                        <Route path="/cart" component={Cart}/>
                        <Route path="/loginform" component={LoginForm}/>
                        <Route path="/registration" component={RegistrationForm}/>
                        <Route path="/orders" component={Orders}/>
                        <Route path="/order/:id" component={Order}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
