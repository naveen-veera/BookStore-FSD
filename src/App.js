import React, { Component } from "react";
import AddProduct from "./Components/AddProduct/AddProduct";
import AuthContext from "./Components/Authentication/AuthContext";
import Login from "./Components/Login/Login";
import Navbar from "./Components/Navbar/Navbar";
import Product from "./Components/Products/Product/Product";
import Signup from "./Components/Signup/Signup";



class App extends Component {

  state = {
    isAuthenticated : false,
    toggleAuth : (currentAuthStatus, authUser) => {
      this.setState({isAuthenticated : currentAuthStatus, authUsername : authUser})
    },
    logout : () => {
      this.setState({isAuthenticated : false, authUsername : null});
      localStorage.setItem('isAuthenticated', false);
      localStorage.setItem('authUsername', null);
    },
    authUsername : null
  }

  componentDidMount() {

    localStorage.setItem('isAuthenticated', false);
    localStorage.setItem('authUsername', null);

    this.setState({
      isAuthenticated : localStorage.getItem('isAuthenticated'),
      authUsername : localStorage.getItem('authUsername')
    });

  }

  render() {

    

    return (
      <>
        <AuthContext.Provider value={this.state}>
          <Navbar />
        </AuthContext.Provider>
        
      </>
    )
  }
}

export default App;