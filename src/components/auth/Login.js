import React, { Component } from 'react';

class Auth extends Component {
  componentWillMount() {
    this.props.explandContentArea();
  }

  inputChangedHandler(event, inputIdentifier) {
    const updatedLoginForm = {
      ...this.state.LoginForm,
      [inputIdentifier]: {
        ...this.state.LoginForm[inputIdentifier],
        value: event.target.value,
        valid: this.checkValidity(event.target.value, this.state.LoginForm[inputIdentifier].validation),
        touched: true
      }
    }

    this.setState({LoginForm: updatedLoginForm});
  }

  LoginHandler(event) {
    event.preventDefault();

    this.props.onAuth(this.state.LoginForm.email.value, this.state.LoginForm.password.value);
  }

  onChange(event) {
    const wallet_address_files = event.target.files;
    // this.setState({wallet_address: wallet_address});
    
    this.props.setWalletAddress(wallet_address_files);
  }   

  render() {

    let form = <input type="file" name="keyfile" className="btn btn-default " onChange={(e) => this.onChange(e)} />;

    if(this.props.loading) {
      form = <span>Loading your wallet ...</span>
    }

    return (
      <div className="padding-15">

			<div className="login-box">


				<form onSubmit={(event) => this.LoginHandler(event)} className="sky-form boxed">
					<header><i className="fa fa-cloud-download"></i>  Connect Your AR Wallet</header>
                    
                    
					<fieldset>
                        <section>Please select your <strong>AR wallet</strong> file to connect and start using <strong>The Arweave Crypto Technical Analysis Portal</strong></section>
						{form}

					</fieldset>

					<footer>
						<div className="forgot-password pull-left">
                             <a href="https://tokens.arweave.org/" target="_blank">Need some AR tokens?</a>
                        </div>
					</footer>
				</form>


			</div>

		</div>
    );
  }
}


export default Auth;
