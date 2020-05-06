import React, {Component} from 'react';
import Categorybar from "../categorybar/Categorybar";
import {Link} from "react-router-dom";

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }

    componentDidMount() {
        this.fetchAllProducts()
    }

    fetchAllProducts() {
        fetch('http://localhost:9000/product')
            .then(response => response.json())
            .then(data => this.setState({products: data}));
    }

    fetchProductsWithCategoryId(id) {
        fetch('http://localhost:9000/category/' + id + '/product')
            .then(response => response.json())
            .then(data => this.setState({products: data}));
    }

    changeCategory(id) {
        console.log(id);
        (id < 0) ? this.fetchAllProducts() : this.fetchProductsWithCategoryId(id);
    }


    render() {
        let items = this.state.products.map(item => {
            return (
                <div className="card" key={item.id}>
                    <div className="card-image">
                        <Link to={"/product/" + item.id}>
                            <img src={item.imageUrl} alt={item.name}/>
                        </Link>
                        <span className="btn-floating halfway-fab waves-effect waves-light red"><i
                            className="material-icons">add</i></span>
                    </div>

                    <div className="card-content">
                        <Link to={"/product/" + item.id}>
                            <p className="card-title">{item.name}</p>
                            <p><b>Cena: {item.price} PLN</b></p>
                        </Link>
                    </div>
                </div>
            )
        });
        return (
            <div>
                <Categorybar categoryClicked={this.changeCategory.bind(this)}/>
                <div className="container">
                    <h3 className="center">Przedmioty</h3>
                    <div className="box">
                        {items}
                    </div>
                </div>
            </div>
        )
    }
}

export default Products
