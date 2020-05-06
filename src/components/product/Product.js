import React, {Component} from 'react';
import Comment from "../comment/Comment";

export default class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: [],
            count: 1,
            productId: this.props.match.params.id
        }
    }

    componentDidMount() {
        const id = this.state.productId;
        fetch("http://localhost:9000/product/" + id)
            .then(response => response.json())
            .then(data => this.setState({product: data}));
    }

    handleChange(event) {
        const newCount = (event.target.validity.valid) ? event.target.value : this.state.count;
        this.setState({count: newCount})
    }

    addToCart(event) {
        console.log("Asdasd")
    }

    render() {
        let product = this.state.product;
        return (
            <div className="container">
                <div>
                    <h2>{product.name}</h2>
                    <div className="row">
                        <div className="col s6">
                            <img src={product.imageUrl} alt={product.name}/>
                        </div>
                        <div className="col s6">
                            <div>Marka: {product.brand}</div>
                            <div>Kategoria: {product.category}</div>
                            <div>{product.description}</div>
                            <div>
                                <form onSubmit={this.addToCart}>
                                    <label>
                                        Ilość:
                                        <input type="text" pattern="[0-9]*"
                                               onChange={this.handleChange.bind(this)} value={this.state.count}/>
                                    </label>
                                    <button className="btn waves-effect waves-light" type="submit" name="action">Dodaj
                                        do koszyka
                                        <i className="material-icons right">send</i>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <Comment p={this.state.productId}/>
            </div>
        );
    }
}
