import React, { Component } from 'react';
import axios from "axios";
import Alert from '../UI/Alert/Alert';
import { Link, Redirect } from 'react-router-dom';
import Spinner from '../UI/Spinner/Spinner';

class Signup extends Component {

    state = {
        credentials : {
            email : '',
            username : '',
            mobileNumber : '',
            role : '',
            password : '',
            confirmpassword : ''
        }, 
        alert : {
            isAlertThere : false,
            alertMessage : '',
            success : true
        },
        loading : false
    }

    // ******************************* Utility Methods ****************************************************

    checkvalidity = () => {

        const { email, password, confirmpassword, username, mobileNumber, role } = this.state.credentials;
        let valid = true;

        if(email === '' || password === '' || confirmpassword === '' || username === '' || mobileNumber === '' || role === '' ) {
            this.setAlert({alert : true, alertMessage : "Please fill all the fields", success : false});
            valid = false;
        }

        if (this.state.credentials.password !== this.state.credentials.confirmpassword) {
            this.setAlert({alert : true, alertMessage : "Passwords do not match !", success : false});
            valid = false;
        }
        return valid;
    }

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
        this.setState({credentials : tempCredentials});
    }

    onSubmitHandler = async(e) => {
        e.preventDefault();
        if(!this.checkvalidity())
            return;
        else {
            this.setState({loading : true})
            await axios.post('http://localhost:8080/signup', this.state.credentials, {
                headers: {"Access-Control-Allow-Origin": "*"}
            })
            .then(res => {
                this.setState({loading : false});
                this.setAlert({alert : true, alertMessage : "User successfully Signed Up", success : true});
            })
            .catch(err => {
                this.setState({loading : false});
                console.log(err);
                this.setAlert({alert : true, alertMessage : "Something went wrong", success : false});
            })
        }
        
    }

    render() {

        const loader = <Spinner />;

        const form = (
            <div className="container p-4 rounded  bg-light shadow w-50 my-4">
                    <form method="post" onSubmit={this.onSubmitHandler}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" required value={this.state.credentials.email} id="email" onChange={this.onChangeHandler} aria-describedby="emailHelp"/>
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type="text" className="form-control" required value={this.state.credentials.username} id="username" onChange={this.onChangeHandler} aria-describedby="emailHelp"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="mobileNumber" className="form-label">Mobile Number</label>
                            <input type="text" className="form-control" required value={this.state.credentials.mobileNumber} onChange={this.onChangeHandler} id="mobileNumber"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="role" className="form-label">Role</label>
                            <select className="form-select" required id="role" value={this.state.credentials.role} onChange={this.onChangeHandler} aria-label="Default select example">
                                <option value=""> Select a Role</option>
                                <option value="USER">User</option>
                                <option value="ADMIN">Admin</option>
                            </select>
                        </div>  
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" required minLength="3" className="form-control" value={this.state.credentials.password} onChange={this.onChangeHandler} id="password"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="confirmpassword" className="form-label">Comfirm Password</label>
                            <input type="password" required minLength="3" className="form-control" value={this.state.credentials.confirmpassword} onChange={this.onChangeHandler} id="confirmpassword"/>
                        </div>
                        <button type="submit" id="submit" className="btn btn-primary">Signup</button>
                        <Link id="submit" className="btn btn-primary mx-1" to="/login">Login</Link>
                    </form> 
                </div>
        )

        return (
            <>
                <h1 className="p-2 text-center">Signup</h1>
                {
                    this.state.alert.isAlertThere 
                    && <Alert 
                            alertMessage={this.state.alert.alertMessage} 
                            success={this.state.alert.success}
                            click={this.closeAlert} 
                        />
                }
                {this.state.loading ? loader : form} 
            </>
        );
    }
}

export default Signup;
