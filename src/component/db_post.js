// ** create-user.component.js ** //
import React, { Component } from 'react';
import axios from 'axios';
export default class CreateUser extends Component {
    constructor(props) {
        super(props)
        this.onChangeindex = this.onChangeindex.bind(this);
        this.onChangeurl = this.onChangeurl.bind(this);
        this.onChangeans = this.onChangeans.bind(this);
        this.onChangehint = this.onChangehint.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            index: '',
            url: '',
            ans: '',
            hint: ''
        }
    }
    onChangeindex(e) {
        this.setState({ index: e.target.value })
    }
    onChangeurl(e) {
        this.setState({ url: e.target.value })
    }
    onChangeans(e) {
        this.setState({ ans: e.target.value })
    }
    onChangehint(e) {
        this.setState({ hint: e.target.value })
    }
    onSubmit(e) {
        e.preventDefault()
        const userObject = {
            index: this.state.index,
            url: this.state.url,
            ans: this.state.ans,
            hint: this.state.hint
        };
        axios.post('http://localhost:4000/quizdb/create', userObject)
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            });
        /*this.setState({ 
            index: '',
            url: '',
            ans: '',
            hint: '' 
        })*/
    }

    render() {
        return (
            <div className="wrapper">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Add index</label>
                        <input type="text" value={this.state.index} onChange={this.onChangeindex} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Add url</label>
                        <input type="text" value={this.state.url} onChange={this.onChangeurl} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Add ans</label>
                        <input type="text" value={this.state.ans} onChange={this.onChangeans} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Add hint</label>
                        <input type="text" value={this.state.hint} onChange={this.onChangehint} className="form-control" />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="add Music" className="btn btn-success btn-block" />
                    </div>
                </form>
            </div>
        )
    }
}