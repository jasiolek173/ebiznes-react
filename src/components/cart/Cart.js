import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {removeItem, addQuantity, subtractQuantity} from '../actions/cartActions'
import Recipe from '../recipe/Recipe'

class Cart extends Component {

    handleRemove = (id) => {
        this.props.removeItem(id);
    };

    handleAddQuantity = (id) => {
        this.props.addQuantity(id);
    };

    handleSubtractQuantity = (id) => {
        this.props.subtractQuantity(id);
    };

    render() {

        let addedItems = this.props.items.length ?
            (
                this.props.items.map(item => {
                    return (

                        <li className="collection-item avatar" key={item.id}>
                            <div className="item-img">
                                <img src={item.imageUrl} alt={item.imageUrl} className=""/>
                            </div>

                            <div className="item-desc">
                                <span className="title">{item.title}</span>
                                <p>{item.desc}</p>
                                <p><b>Cena: {item.price} PLN</b></p>
                                <p>
                                    <b>ilość: {item.quantity}</b>
                                </p>
                                <div className="add-remove">
                                    <Link to="/cart"><i className="material-icons" onClick={() => {
                                        this.handleAddQuantity(item.id)
                                    }}>arrow_drop_up</i></Link>
                                    <Link to="/cart"><i className="material-icons" onClick={() => {
                                        this.handleSubtractQuantity(item.id)
                                    }}>arrow_drop_down</i></Link>
                                </div>
                                <button className="waves-effect waves-light btn pink remove" onClick={() => {
                                    this.handleRemove(item.id)
                                }}>Usuń
                                </button>
                            </div>

                        </li>

                    )
                })
            ) :

            (
                <p>Dodaj coś do koszyka</p>
            );
        return (
            <div className="container">
                <div className="cart">
                    <h5>Twoje zamówienie</h5>
                    <ul className="collection">
                        {addedItems}
                    </ul>
                </div>
                <Recipe/>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        items: state.addedItems,
        //addedItems: state.addedItems
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeItem: (id) => {
            dispatch(removeItem(id))
        },
        addQuantity: (id) => {
            dispatch(addQuantity(id))
        },
        subtractQuantity: (id) => {
            dispatch(subtractQuantity(id))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
