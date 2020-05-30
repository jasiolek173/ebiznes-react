import React, {Component} from "react";
import Cookies from "js-cookie";
import {Link} from "react-router-dom";

class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: []
        }
    }

    componentDidMount() {
        const headers = new Headers();
        headers.append("Csrf-Token", Cookies.get("csrfToken"));
        const options = {
            method: "GET",
            headers
        };
        const request = new Request("http://localhost:9000/order", options);
        fetch(request, {credentials: "include"})
            .then(response => response.json())
            .then(data => {
                    this.setState({orders: data});
                    console.log(data)
                }
            );
    }

    render() {
        let items = this.state.orders.map(item => {
            return (

                <tr key={item.id}>
                    <td><Link to={"/order/" + item.id}>{item.id}</Link></td>
                    <td><Link to={"/order/" + item.id}>{item.shipment}</Link></td>
                    <td><Link to={"/order/" + item.id}>{item.payment}</Link></td>
                    <td><Link to={"/order/" + item.id}>{item.coupon}</Link></td>
                </tr>
            )
        });
        const cont = (this.state.orders.length > 0) ? (<div>
            <table className="highlight">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Sposób dostawy</th>
                    <th>Sposób zapłaty</th>
                    <th>Kupon</th>
                </tr>
                </thead>
                <tbody>
                {items}
                </tbody>
            </table>
        </div>) : (<div><h6>Masz {this.state.orders.length} zamówień!</h6></div>);
        return (<div className="container">
            <h3 className="center">Zamówienia</h3>
            <div className="box">
                {cont}
            </div>
        </div>)
    }

}


export default Orders
