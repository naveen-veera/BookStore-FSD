import React, { Component } from 'react';
import { Link, Route, Switch, useHistory } from 'react-router-dom';
import AddProduct from '../AddProduct/AddProduct';
import WithContext from '../hoc/WithContext';
import Login from "../Login/Login";
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import Product from '../Products/Product/Product';
import Products from "../Products/Products";
import Signup from '../Signup/Signup';

class Navbar extends Component {
    state = { 

     }

     
    render() { 

        

        return ( 
            <>
                <nav className="navbar navbar-expand-lg sticky-top navbar-light bg-primary text-white p-1 mb-2">
                    <div className="container-fluid">
                        <a className="navbar-brand fs-3 fw-bold text-white" href="#">Book <span className="text-warning">Store</span></a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse d-flex" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item mx-1">
                                    <Link className="nav-link text-white active" aria-current="page" to="/">Home</Link>
                                </li>
                                <li className="nav-item mx-1">
                                    <Link className="nav-link text-white active" to="/login">Login</Link>
                                </li>
                                <li className="nav-item mx-1">
                                    <Link className="nav-link text-white active" to="/signup">Signup</Link>
                                </li>
                             <li className="nav-item mx-1">
                                    <Link className="nav-link text-white active" to="/products">Products</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/cart">
                                        <div className="rounded bg-white py-1 px-2 ">
                                            <i className="fa fa-md text-dark fa-shopping-cart" aria-hidden="true"></i>
                                        </div>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>


                <Switch>
                    <Route path='/login' component={Login} />
                    <Route path="/signup" component={Signup}/>
                    <PrivateRoute path="/products" isAuth={this.props.isAuthenticated} component={Products}/>
                    <PrivateRoute path="/addproduct" isAuth={this.props.isAuthenticated} component={AddProduct} />
                    <Route exact path="/">
                        <h1>Nothing ... Just home</h1>
                    </Route>
                </Switch>
            </>
         );
    }
}
 
export default WithContext(Navbar);
