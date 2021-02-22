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


    // ******************************* Utility Methods ****************************************************

    setAlert = (setter) => {
            let alertSetting = {
                isAlertThere : setter.alert,
                alertMessage : setter.alertMessage,
                success : setter.success
            }
            this.setState({alert : alertSetting});

        return setter;
    }

    closeAlert = () => {
        let alertState = {...this.state.alert};
        alertState.isAlertThere = false;
        alertState.alertMessage = '';
        alertState.success = false;
        this.setState({alert : alertState});
    }

    // ******************************* Utility Methods End ****************************************************

    onChangeHandler = (event) => {

        const tempCredentials = {...this.state.credentials};
        const name = event.target.getAttribute('id');
        const value = event.target.value;

        tempCredentials[name] = value;
        this.setState({credentials : tempCredentials})
    }

    componentDidMount() {
        
    }

    onSubmitHandler = async (event) => {
        event.preventDefault();
        this.setState({loading : true})

        await axios.post('http://localhost:8080/login', this.state.credentials)
        .then(res => {
            
            if(res.data) {
                this.setState({loading : false});
                this.props.toggleAuth(true, this.state.credentials.email);
                this.setAlert({alert : true, alertMessage : "User successfully Logged in", success : true});
            } else {
                this.setState({loading : false});
                this.setAlert({alert : true, alertMessage : "Bad credentials", success : false});
            }

            
        })
        .catch(err => {
            console.log(err);
            this.setState({loading : false});
            this.setAlert({alert : true, alertMessage : "Something went wrong", success : false});
        });
        
    }

    render() {

        
        const loader = <Spinner />

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
