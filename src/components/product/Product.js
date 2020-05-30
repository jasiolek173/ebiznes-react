import React, {Component} from 'react';
import Comment from "../comment/Comment";
import {addToCart} from "../actions/cartActions";
import {connect} from 'react-redux'

class Product extends Component {
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

    addToCart() {
        this.props.addToCart(Number(this.state.productId), this.state.count);
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
                                    <label>
                                        Ilość:
                                        <input type="text" pattern="[0-9]*"
                                               onChange={this.handleChange.bind(this)} value={this.state.count}/>
                                    </label>
                                    <button className="btn waves-effect waves-light" onClick={this.addToCart.bind(this)}> Dodaj do koszyka
                                        <i className="material-icons right">send</i>
                                    </button>
                            </div>
                        </div>
                    </div>
                </div>
                <Comment p={this.state.productId}/>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        addToCart: (id, quantity) => {
            dispatch(addToCart(id, quantity))
        }
    }
};

export default connect(null,mapDispatchToProps)(Product)
