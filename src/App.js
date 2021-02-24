import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, useHistory } from 'react-router-dom';
import AuthContext from './Components/Authentication/AuthContext';
import Navbar from './Components/Navbar/Navbar';

import _ from "lodash";

const App = (props) => {

  const history = useHistory();

  

  const [state, setState] = useState({
    auth : {
      username : '',
      authenticated : false,
      role : null
    }
  })

  useEffect(() => {

    if(localStorage.getItem('authenticated') === null) {
      localStorage.setItem('username', '');
      localStorage.setItem('role', null);
      localStorage.setItem('authenticated', false)
    } else {
      let tempState = _.cloneDeep(state);
      tempState.auth['username'] = localStorage.getItem('username');
      tempState.auth['authenticated'] = localStorage.getItem('authenticated');
      tempState.auth['role'] = localStorage.getItem('role');
      setState(tempState);
    }
  }, [])

  const authenticate = (email, role, status = true) => { 
    let tempState = _.cloneDeep(state);
    tempState.auth['username'] = email;
    tempState.auth['authenticated'] = status;
    tempState.auth['role'] = role;

    localStorage.setItem('username', email);
    localStorage.setItem('role', role);
    localStorage.setItem('authenticated', status)
    setState(tempState);
  }

  const logout = () => {

    localStorage.clear(['username', 'role', 'authenticated']);

    let tempState = _.cloneDeep(state);
    tempState.auth['username'] = '';
    tempState.auth['authenticated'] = false;
    tempState.auth['role'] = null;
    setState(tempState);
  }



  return ( 
    <>
      <AuthContext.Provider value={{state, setState, history, authenticate, logout }}>
            <Navbar />
      </AuthContext.Provider>
    </>
   );
}
 
export default App;