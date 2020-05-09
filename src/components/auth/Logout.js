import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

class Logout extends Component {
  componentWillMount() {
    // this.props.addSuccessAlert("You have successfully disconnected your wallet.");
    
    this.props.onLogout();
    this.props.explandContentArea();
      
  }

  render() {
    return <Redirect to="/login" />;
  }
};

export default Logout;