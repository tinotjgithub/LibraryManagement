import React, { Component, Fragment } from "react";
import './login.css';
import { Card } from 'primereact/card';
import { loginDetails } from "../../constant";
import { FaCheck } from 'react-icons/fa';
import { Growl } from 'primereact/growl';

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginDetails: [],
            username: null
        };

        this.userNameCheck = this.userNameCheck.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
        this.password = React.createRef();
    }

    componentDidMount() {
        this.setState({ loginDetails: loginDetails });
    }

    userNameCheck(username = "") {
        const index = this.state.loginDetails.findIndex(loginDetail => {
            return loginDetail.username === username;
        });

        (index > -1) ? this.setState({ username: username }) :
            this.setState({ username: null });

    }

    formSubmit(e) {
        if (e.keyCode === 13 || e.type === "click" ) {
            const passWord = this.password.current.value;
            if (this.state.username && passWord.length > 0) {
                let userData = this.state.loginDetails.find((loginDetail => {
                    return loginDetail.username === this.state.username;
                }));
                const isLoggedIn = (userData.password === passWord);
                const loginInfo = {
                    username: this.state.username,
                    isLoggedIn: isLoggedIn
                };
                this.props.onLogin(loginInfo);
            } else {
                this.growl.show({ severity: 'error', summary: '', detail: 'Invalid Username/Password' });
            }
        }
    }


    render() {

        let checkVisibility = "hidden";

        if (this.state.username) {
            checkVisibility = "inherit";
        }
        return (
            <Fragment>
                <Growl ref={el => { this.growl = el }} />
                <div className="login">
                    <Card
                        title="Welcome to E-LiB"
                        subTitle="login to proceed"
                        className="card"
                    >
                        <div className="form">
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <FaCheck className="check"
                                    style={{ visibility: checkVisibility }}
                                />
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    placeholder="Username"
                                    onChange={(input) => { this.userNameCheck(input.target.value) }}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Password"
                                    ref={this.password}
                                    onKeyUp={this.formSubmit}
                                />
                            </div>
                            <button id="submit-btn" className="btn btn-primary" onClick={this.formSubmit}>Submit</button>
                        </div>
                    </Card>
                </div>
            </Fragment>
        )
    }

}
