import React, {Component} from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import PageHeader from './components/PageHeader/PageHeader';
import Menu from './components/MainMenu/Menu';
import Login from './components/auth/Login';
import Logout from './components/auth/Logout';
import Inbox from './containers/Inbox/Inbox';
import Message from './containers/message/Message';
import NewMessage from './containers/message/NewMessage';
import MessageReply from './containers/message/MessageReply';
import SearchPage from './containers/Search/SearchPage';
import getMessages, {getName, getSentMessages} from './components/Message/helpers';
import arweave from './arweave-config';
import Notifier from "react-desktop-notification";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

class App extends Component {
  state = {
    isAuthenticated: null,
    contentToggled: false,
    contentStyle: {marginLeft: '0px'},
    balance: 0,
    wallet_address: null,
    aside_classes: "aside-start aside-primary font-weight-light aside-hide-xs d-flex flex-column h-auto",
    aside_open: false,
    messages: [],
    sent_messages: []
  }

  interval = null;

  constructor(props) {
    super(props);

    this.toggleAside.bind(this);
    this.addErrorAlert.bind(this);
    this.addSuccessAlert.bind(this);
    this.setMessages.bind(this);
  } 

  componentDidMount() {
    const wallet_address = sessionStorage.getItem('AR_Wallet', null);
    const jwk = JSON.parse(sessionStorage.getItem('AR_jwk', null));  
    
    if(jwk !== null) {
      this.setState({isAuthenticated: true, wallet_address: wallet_address, jwk: jwk});
      this.loadWallet(wallet_address);
    }

    const isAuthenticated = sessionStorage.getItem('isAuthenticated');

    this.setState({isAuthenticated: isAuthenticated === 'true' ? true : false});

    const that = this;
    this.interval = setInterval(async function() {
      const messages = await getMessages();

      if(messages.length > that.state.messages.length && that.state.messages.length > 0) {
        const new_count = messages.length - that.state.messages.length;
        that.addSuccessAlert("You have " + new_count + " new messages")
      }

      that.setState({messages: messages});   
    }, 30 * 1000);
  }

  componentDidUpdate(prevProps) {
    if(this.props.isAuthenticated !== undefined && this.props.isAuthenticated !== prevProps.isAuthenticated) {
      this.setState({isAuthenticated: this.props.isAuthenticated});

      if(this.props.isAuthenticated && !this.props.expand_content_area) {
        this.setState({contentStyle: {marginLeft: '0px'}});
      }
    }
  }

  componentWillUnmount() {
    if(this.interval) {
      clearInterval(this.interval);
    }
  }

  async loadWallet(wallet_address) {
    const that = this;

    if(wallet_address) {
        arweave.wallets.getBalance(wallet_address).then((balance) => {
            let ar = arweave.ar.winstonToAr(balance);

            const state = {balance: ar};

            that.setState(state);
        }); 

        const messages = await getMessages();

        
        if(messages.length > this.state.messages.length && this.state.messages.length > 0) {
          const new_count = messages.length - this.state.messages.length;
          this.addSuccessAlert("You have " + new_count + " new messages");
        }

        const sent_messages = await getSentMessages();

        that.setState({messages: messages});     
        

        getName(wallet_address).then((username) => {
          that.setState({username: username});
        });
    }     
  }

  newMessages(messages) {
    const new_messages = [];

    for(let i in messages) {
      const message = messages[i];

      const old_message = this.state.messages.find((msg) => msg.id == message.id);

      if(!old_message) {
        new_messages.push(message)
      }
    }

    return new_messages;
  }

  setWalletAddress(wallet_address_files) {
      const that = this;

      const reader = new FileReader();
      reader.onload = function() {
          const text = reader.result;
          const jwk = JSON.parse(text);

          arweave.wallets.jwkToAddress(jwk).then((wallet_address) => {                
              that.setState({wallet_address: wallet_address, jwk: jwk});
              sessionStorage.setItem('AR_Wallet', wallet_address);
              sessionStorage.setItem('AR_jwk', JSON.stringify(jwk));
          
              that.loadWallet(wallet_address);

              that.setState({isAuthenticated: true});
              sessionStorage.setItem('isAuthenticated', true);

              that.addSuccessAlert("You have successfully connected.");
          });
          
      }
      reader.readAsText(wallet_address_files[0]);

  }

  addSuccessAlert(message)  {
    toast(message, { type: toast.TYPE.SUCCESS });     
  }

  addErrorAlert(message) {
    toast(message, { type: toast.TYPE.ERROR });  
  }

  disconnectWallet() {
      sessionStorage.removeItem('AR_Wallet');
      sessionStorage.removeItem('AR_jwk');
      sessionStorage.removeItem('isAuthenticated');
      sessionStorage.removeItem('exchange');
      sessionStorage.removeItem('coinpair');

      this.setState({isAuthenticated: false, wallet_address: null, jwk: null, balance: 0});

      this.addSuccessAlert("Your wallet is now disconnected");
  }

  toggleAside() {
    if(this.state.aside_open) {
      this.setState({
        aside_classes: "aside-start aside-primary font-weight-light aside-hide-xs d-flex flex-column h-auto",
        aside_open: false
      });
    } else {
      this.setState({
        aside_classes: "aside-start aside-primary font-weight-light aside-hide-xs d-flex flex-column h-auto js-aside-show",
        aside_open: true
      })
    }
  }

  setMessages(messages) {
    this.setState({messages: messages});
    debugger;
  }

  render() {
    let header = (
    
      <header id="header">
        <PageHeader 
          isAuthenticated={this.state.isAuthenticated} 
          history={this.props.history} 
          current_balance={this.state.balance}
          wallet_address={this.state.wallet_address}
          username={this.state.username}
          toggleAside={() => this.toggleAside() }
          />
      </header>
    );
    
    let side_menu = (<aside id="aside-main" className={this.state.aside_classes}>
      <Menu {...this.props} toggleAside={() => this.toggleAside() }/>
    </aside>);

    let routes = [
      <Route key='inbox' path="/" exact component={() => <Inbox messages={this.state.messages} wallet_address={this.state.wallet_address} jwk={this.state.jwk} />} />,
      <Route key='sent' path="/sent" exact component={() => <Inbox messages={this.state.sent_messages} showSent={true} wallet_address={this.state.wallet_address} jwk={this.state.jwk} />} />,
      <Route key='archive' path="/archived" exact component={() => <Inbox messages={this.state.messages} showArchived={true} wallet_address={this.state.wallet_address} jwk={this.state.jwk} />} />,
      <Route key='message-detail' path="/message-detail/:id" exact component={() => <Message 
                                                                      wallet_address={this.state.wallet_address} 
                                                                      jwk={this.state.jwk} 
                                                                      location={this.props.location}
                                                                      messages={this.state.messages}
                                                                      />} />,
      <Route key='new-message' path='/message/new' exact component={() => <NewMessage 
                                                                            wallet_address={this.state.wallet_address} 
                                                                            jwk={this.state.jwk}
                                                                          />} />,
      <Route key='reply-message' path='/message/reply/:id' exact component={() => <MessageReply
                                                                            wallet_address={this.state.wallet_address} 
                                                                            jwk={this.state.jwk}
                                                                            messages={this.state.messages}
                                                                          />} />,
      <Route key='search' path="/search" exact component={() => <SearchPage wallet_address={this.state.wallet_address} jwk={this.state.jwk} />} />,
      <Route key='logout' path="/logout" exact component={() => <Logout onLogout={this.disconnectWallet.bind(this)} addSuccessAlert={this.addSuccessAlert} explandContentArea={() => this.explandContentArea} />} />
    ];

    if(!this.state.isAuthenticated) {
      routes = [
        <Route key='login' path="/login" exact component={() => <Login explandContentArea={() => this.explandContentArea} setWalletAddress={this.setWalletAddress.bind(this)} />} />,
      ];
      if(this.props.location !== '/login') routes.push(<Redirect key='redirect-to-login' to='/login' />);
      header = null;
      side_menu = null;
    }

    if(this.state.isAuthenticated && this.props.location.pathname === '/login') {
      routes = (
        <>
        <Redirect to='/' />
        </>
      );
    }

    return (
      
      <div id="wrapper" className="d-flex align-items-stretch flex-column">
        <ToastContainer />
        {header}
        <div id="wrapper_content" className="d-flex flex-fill">
          {side_menu}
          <div id="middle" className="flex-fill">
          {routes}
          </div>
        </div>
      </div>
    );
  }
  
}

export default withRouter(App);
