import React, {Component} from 'react';
import Categorybar from "../categorybar/Categorybar";
import {Link} from "react-router-dom";
import {connect} from 'react-redux'
import {addToCart, setProducts} from "../actions/cartActions";
import Cookies from 'js-cookie';

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
        const headers=new Headers();
        headers.append("Csrf-Token",Cookies.get("csrfToken"));
        const options = {
            method: "GET",
            headers
        };
        const request = new Request("http://localhost:9000/product", options);
        fetch(request)
            .then(response => response.json())
            .then(data => {
                    this.setState({products: data});
                    this.props.setProducts(data);
                }
            );
    }

    fetchProductsWithCategoryId(id) {
        fetch('http://localhost:9000/category/' + id + '/product')
            .then(response => response.json())
            .then(data => this.setState({products: data}));
    }

    filterListByCategoryId(id) {
        const products = this.props.items.filter(p => p.category === id);
        this.setState({products: products})
    }

    changeCategory(id) {
        (id < 0) ? this.fetchAllProducts() : this.filterListByCategoryId(id);
    }

    handleClick = (id) => {
        this.props.addToCart(id);
    };

    render() {
        let items = this.state.products.map(item => {
            return (
                <div className="card" key={item.id}>
                    <div className="card-image">
                        <Link to={"/product/" + item.id}>
                            <img src={item.imageUrl} alt={item.name} className="responsive-img" />
                        </Link>
                        <span className="btn-floating halfway-fab waves-effect waves-light red" onClick={() => {
                            this.handleClick(item.id)
                        }}>
                            <i className="material-icons">add</i>
                        </span>
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

const mapStateToProps = (state) => {
    return {
        items: state.items
    }
};
const mapDispatchToProps = (dispatch) => {

    return {
        addToCart: (id) => {
            dispatch(addToCart(id,1))
        },
        setProducts: (products) => {
            dispatch(setProducts(products))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Products)
