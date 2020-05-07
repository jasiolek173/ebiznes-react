import React, {Component} from 'react';

export default class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            productId: this.props.p,
            owner: "",
            comment: ""
        }
    }

    componentDidMount() {
        console.log(this.state.productId);
        fetch("http://localhost:9000/product/" + this.state.productId + "/comment")
            .then(response => response.json())
            .then(data => this.setState({comments: data}));

    }

    handleOwnerChange(event) {
        this.setState({owner: event.target.value})
    }

    handleCommentChange(event) {
        this.setState({comment: event.target.value})
    }

    submitComment(event) {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({owner: this.state.owner, product: Number(this.state.productId), content:this.state.comment})
        };
        fetch('http://localhost:9000/comment', requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));
    }

    render() {
        let comments = this.state.comments.map(comment => {
            return (<li className="collection-item" key={comment.id}>
                <div>{comment.content}<span className="secondary-content">{comment.owner}</span>
                </div>
            </li>)
        });
        return (
            <div>
                <ul className="collection with-header">
                    <li className="collection-header"><h4>Opinie</h4></li>
                    {comments}
                </ul>
                <div className="borderform">
                    <h4>
                        Zostaw nam swoją opinię o produkcie!
                    </h4>
                    <form>
                        <label>
                            Użytkownik:
                            <input type="text" value={this.state.owner} onChange={this.handleOwnerChange.bind(this)}/>
                        </label>
                        <label>
                            opinia:
                            <textarea value={this.state.comment}
                                      onChange={this.handleCommentChange.bind(this)}>Tutaj wpisz swoją opinię</textarea>
                        </label>
                        <button className="btn waves-effect waves-light" onClick={this.submitComment.bind(this)}>Dodaj
                            Wyślij
                            <i className="material-icons right">send</i>
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}
