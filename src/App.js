import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import './App.css';
import Products from "./components/products/Products";
import Product from "./components/product/Product";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Navbar/>

                    <Switch>
                        <Route exact path="/" component={Products}/>
                        <Route path="/product/:id" component={Product}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
