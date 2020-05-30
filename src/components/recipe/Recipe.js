import React, {Component} from 'react'
import {connect} from 'react-redux'
import M from 'materialize-css';
import Cookies from "js-cookie";

//import { addShipping } from './actions/cartActions'
class Recipe extends Component {

    constructor(props) {
        super(props);
        this.state = {
            payments: [],
            shipments: [],
            shipmentPrice: 0,
            shipment: null,
            payment: null,
            coupon: "",
            couponId: 1,
            orderPercentage: 1.0
        }
    }

    componentDidMount() {
        fetch('http://localhost:9000/shipment_type')
            .then(response => response.json())
            .then(data => {
                    this.setState({shipments: data});
                }
            );
        fetch('http://localhost:9000/payment_type')
            .then(response => response.json())
            .then(data => {
                    this.setState({payments: data});
                }
            );

    }

    handlePaymentChecked = (e) => {
        this.setState({payment: e.currentTarget.value});
    };

    handleShipmentChecked = (e) => {
        const id = e.currentTarget.value;
        this.setState({shipment: id});

        const shipment = this.state.shipments.find(s => s.id === Number(id));
        this.setState({shipmentPrice: shipment.price})
    };

    handleCouponChange = (e) => {
        this.setState({coupon: e.currentTarget.value})
    };

    handleCoupon = () => {
        fetch('http://localhost:9000/coupon/' + this.state.coupon)
            .then(respone => respone.json())
            .then(data => {
                    if (data == null) {
                        M.toast({html: 'Błędny kod '});
                        this.setState({orderPercentage: 1.0});
                        this.setState({couponId: 1});
                    } else {
                        const p = 1.0 - data.percentage;
                        this.setState({orderPercentage: p});
                        this.setState({couponId: data.id});
                        M.toast({html: data.description});
                    }
                }
            )
    };

    handleOrder() {
        const isLogged = Cookies.get("csrfToken");
        if (!isLogged) {
            M.toast({html: 'Przed zakupem proszę się zalogować'})
        } else {
            const ship = this.state.shipment;
            const pay = this.state.payment;
            const coupon = this.state.couponId;
            if (this.props.addedItems.length < 1) {
                M.toast({html: 'Dodaj coś do koszyka'})
            } else if (pay == null) {
                M.toast({html: 'Wybierz formę zapłaty'})
            } else if (ship == null) {
                M.toast({html: 'Wybierz sposób dostawy'})
            } else {

                const headers = new Headers();
                headers.append('Content-Type', 'application/json');
                headers.append("Csrf-Token", Cookies.get("csrfToken"));
                const requestOptions = {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({
                        shipmentType: Number(ship),
                        paymentType: Number(pay),
                        coupon: Number(coupon)
                    })
                };
                const request = new Request('http://localhost:9000/order', requestOptions);
                fetch(request, {credentials: "include"})
                    .then(response => response.json())
                    .then(data => {
                        const id = data.id;
                        const items = this.props.addedItems.map(x => {
                            return {order: Number(id), product: Number(x.id), quantity: Number(x.quantity)}
                        });
                        const r = {
                            method: 'POST',
                            headers: headers,
                            body: JSON.stringify(items)
                        };
                        const req = new Request('http://localhost:9000/order_item', r);
                        fetch(req, {credentials: "include"})
                            .then(_ => {
                                    M.toast({html: 'Zamówienie zostało zapisane '});
                                    this.props.clear();
                                }
                            )
                    });
            }
        }
    }

    render() {
        const shipment = this.state.shipments.map(s => {
            return <li className="collection-item" key={s.id}>
                <label>
                    <input type="radio" name="shipment" ref="shipping" onChange={this.handleShipmentChecked}
                           value={s.id}/>
                    <span>{s.name} ({s.price} PLN)</span>
                </label>
            </li>
        });
        const payment = this.state.payments.map(s => {
            return <li className="collection-item" key={s.id}>
                <label>
                    <input type="radio" ref="payment" name="payment" onChange={this.handlePaymentChecked} value={s.id}/>
                    <span>{s.name}</span>
                </label>
            </li>
        });
        const total = this.props.total + this.state.shipmentPrice;
        const totalDiscount = this.props.total * this.state.orderPercentage + this.state.shipmentPrice;
        const t = (total === totalDiscount) ? <li className="collection-item"><b>Total: {total} PLN</b></li> :
            <li className="collection-item"><b>Suma:</b><b
                className="line_through"> {total} PLN</b><b>  {totalDiscount} PLN</b></li>;
        return (
            <div className="container">
                <div>
                    <ul className="collection with-header">
                        <li className="collection-header"><h5>Kupon</h5></li>
                        <input type="text" ref="coupon" name="coupon" onChange={this.handleCouponChange}/>
                        <button className="waves-effect waves-light btn" onClick={this.handleCoupon.bind(this)}>zastosuj
                            kupon
                        </button>
                        <li className="collection-header"><h5>Sposób zapłaty</h5></li>
                        {payment}
                        <li className="collection-header"><h5>Sposób dostawy</h5></li>
                        {shipment}
                        {t}
                    </ul>
                </div>
                <div className="checkout">
                    <button className="waves-effect waves-light btn" onClick={this.handleOrder.bind(this)}>Zamów
                    </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        addedItems: state.addedItems,
        total: state.total
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addShipping: () => {
            dispatch({type: 'ADD_SHIPPING'})
        },
        substractShipping: () => {
            dispatch({type: 'SUB_SHIPPING'})
        },
        clear: () => {
            dispatch({type: 'CLEAR_ALL'})
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipe)
