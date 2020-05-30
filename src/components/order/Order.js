import React, {Component} from "react";
import Cookies from "js-cookie";

class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderItems: [],
            order: [],
            orderId: this.props.match.params.id
        }
    }

    componentDidMount() {
        const headers = new Headers();
        headers.append("Csrf-Token", Cookies.get("csrfToken"));
        const options = {
            method: "GET",
            headers
        };
        const request = new Request("http://localhost:9000/order/" + this.state.orderId, options);
        fetch(request, {credentials: "include"})
            .then(response => response.json())
            .then(data => {
                    this.setState({order: data});
                    this.setState({orderItems: data.orderItems});
                }
            );
    }

    render() {
        let items = this.state.orderItems.map(item => {
            return (
                <tr key={item.id}>
                    <td><img src={item.imageUrl} alt={"GOOGLE"} className="imgsize"/></td>
                    <td>{item.name}</td>
                    <td>{item.categoryName}</td>
                    <td>{item.brandName}</td>
                    <td>{item.quantity}</td>
                    <td>{item.priceUnit}</td>
                </tr>
            )
        });
        const cont = (<div>
            <table className="highlight">
                <thead>
                <tr>
                    <th>zdjęcie</th>
                    <th>nazwa</th>
                    <th>kategoria</th>
                    <th>marka</th>
                    <th>ilość</th>
                    <th>cena jednostkowa</th>
                </tr>
                </thead>
                <tbody>
                {items}
                </tbody>
            </table>
        </div>);
        return (<div className="container">
            <h3 className="center">Zamówienie {this.state.orderId}</h3>
            <div className="box">
                {cont}
            </div>
        </div>)
    }

}


export default Order
