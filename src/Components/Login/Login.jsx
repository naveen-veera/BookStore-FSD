import React, { Component } from 'react';
import axios from "axios";
import Spinner from '../UI/Spinner/Spinner';
import Alert from '../UI/Alert/Alert';
import WithContext from '../hoc/WithContext';
import { Link, Redirect, Router, useHistory, withRouter  } from 'react-router-dom';

class Login extends Component {

    state = {
        credentials : {
            email : '',
            password : ''
        },
        alert : {
            isAlertThere : false,
            alertMessage : '',
            success : true
        },
        isLoggedIn : false,
        loading : false
    }

    onChangeHandler = (event) => {

        const tempCredentials = {...this.state.credentials};
        const name = event.target.getAttribute('id');
        const value = event.target.value;

        tempCredentials[name] = value;
        this.setState({credentials : tempCredentials})
    }

    componentDidMount() {
        
    }

    closeAlert = () => {
        let alertState = {...this.state.alert};
        alertState.isAlertThere = false;
        alertState.alertMessage = '';
        alertState.success = false;
        this.setState({alert : alertState});
    }

    onSubmitHandler = async (event) => {
        event.preventDefault();
        console.log(this.state.credentials);
        this.setState({loading : true})

        setTimeout(async () => {
            await axios.post('http://localhost:8080/login', this.state.credentials)
            .then(res => {
                this.props.toggleAuth(true, this.state.credentials.email);
                console.log(res.data);
                if(res.data) {
                    this.setState({alert : {
                            isAlertThere : true,
                            alertMessage : 'User successfully Logged In',
                            success : true
                        },
                        loading : false
                    }, () => {
                        let pathname = this.props.history.location.state.from.pathname;
                        return <Redirect to={pathname} />
                        
                    });

                } else {
                    this.setState({alert : {
                        isAlertThere : true,
                        alertMessage : 'Incorrect Credentials',
                        false : true
                    },
                    loading : false
                });
                }
            })
            .catch(err => {
                console.log(err);
                this.setState({loading : false})
            });
        }, 500)

        
    }

    render() {

        const loaderStyle = {
            width : "10rem",
            height : "10rem"
        }

        const loader = <Spinner style={loaderStyle} />

        const form = (
            <div className="container p-4 rounded bg-light shadow border-2 border-primary w-50">
                    <form method="post" onSubmit={this.onSubmitHandler}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" required className="form-control" value={this.state.credentials.email} onChange={this.onChangeHandler} required id="email" aria-describedby="emailHelp"/>
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" required minLength='3' value={this.state.credentials.password} onChange={this.onChangeHandler} className="form-control" id="password"/>
                        </div>
                        <button type="submit" id="submit" className="btn btn-primary mr-2">Login</button>
                        <Link id="singup" className="btn btn-primary mx-1" to="/signup">Signup</Link>
                    </form> 
                </div>
        )

        const alreadyAuthenticated = (
            <div className="container">
                <h1>Already authenticated</h1>
            </div>
        )


        return (
            <>
                <h1 className="p-4 text-center">Login</h1>
                {
                    this.state.alert.isAlertThere 
                    && <Alert 
                            alertMessage={this.state.alert.alertMessage} 
                            success={this.state.alert.success}
                            click={this.closeAlert} 
                        />
                }
                {this.state.loading ? loader : form }
                
            </>
        );
    }
}

export default WithContext(withRouter(Login));
