import React, {Component} from 'react';
import {Link} from 'react-router-dom'

class Categorybar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:9000/category')
            .then(response => response.json())
            .then(data => this.setState({categories: data}));
    }

    render() {
        const categoriesList = this.state.categories.map(category => <li key={category.id} className="tab"
                                                                         onClick={() => this.props.categoryClicked(category.id)}>
            <Link to="">{category.name}</Link></li>);
        return (
            <nav className="nav-wrapper">
                <div className="container">
                    <ul className="tabs tabs-transparent">
                        <li className="tab" onClick={() => this.props.categoryClicked(-1)}>
                            <Link to="" className="active">WSZYSTKIE</Link>
                        </li>
                        {categoriesList}
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Categorybar
