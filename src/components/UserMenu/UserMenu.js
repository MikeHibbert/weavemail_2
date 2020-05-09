import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserMenu extends Component {
  state = {
    opened: false,
    navClasses: ['prefix-link-icon', 'prefix-icon-dot', 'dropdown-menu', 'dropdown-menu-clean#',
     'dropdown-menu-navbar-autopos', 'dropdown-menu-invert', 'dropdown-click-ignore', 'p-0', 'mt--18', 'fs--15', 'w--300'],
    wallet_address: null,
    current_balance: 0
  }

  componentDidMount() {

    // console.log(this.props);
    this.unlisten = this.props.history.listen((location, action) => {
      if(this.state.opened === true) {
        this.setState({navClasses: ['prefix-link-icon', 'prefix-icon-dot', 'dropdown-menu', 'dropdown-menu-clean#',
        'dropdown-menu-navbar-autopos', 'dropdown-menu-invert', 'dropdown-click-ignore', 'p-0', 'mt--18', 'fs--15', 'w--300', 'show'], opened: false});
      }
    });
  }

  componentDidUpdate(prevProps) {
    if(this.props.wallet_address !== undefined && this.props.wallet_address !== prevProps.wallet_address) {
      this.setState({wallet_address: this.props.wallet_address});
    }

    if(this.props.currrent_balance !== undefined && this.props.current_balance !== prevProps.current_balance) {
      this.setState({current_balance: this.props.current_balance});
    }
  }

  componentWillUnmount() {
      this.unlisten();
  }

  handleMenuToggle() {
    this.setState({opened: !this.state.opened});

    if(this.state.opened !== true) {
      this.setState({navClasses: ['prefix-link-icon', 'prefix-icon-dot', 'dropdown-menu', 'dropdown-menu-clean#',
      'dropdown-menu-navbar-autopos', 'dropdown-menu-invert', 'dropdown-click-ignore', 'p-0', 'mt--18', 'fs--15', 'w--300', 'show']});
    } else {
      this.setState({navClasses: ['prefix-link-icon', 'prefix-icon-dot', 'dropdown-menu', 'dropdown-menu-clean#',
      'dropdown-menu-navbar-autopos', 'dropdown-menu-invert', 'dropdown-click-ignore', 'p-0', 'mt--18', 'fs--15', 'w--300']});
    }
  }

  render() {
    return (<>
      <nav>
            <ul className="nav pull-right">
                    <li className={this.state.navClasses.join(' ')}>

                            <a onClick={this.handleMenuToggle.bind(this)}  className="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
                                    <div className="user-avatar" alt="" src="assets/images/noavatar.jpg" height="34" >
                                      <i className="fa fa-user"></i>
                                    </div>
                                    <span className="user-name" style={{lineHeight: "48px", paddingLeft: "10px"}}>
                                            <span onClick={this.handleMenuToggle.bind(this)}  className="hidden-xs">
                                                    {this.props.wallet_address} <i className="fa fa-angle-down"></i>
                                            </span>
                                    </span>
                            </a>
                            <ul className="dropdown-menu hold-on-click">
                                    <li>
                                        <a>Balance: {this.props.current_balance} AR</a>
                                    </li>
                                    <li className="divider"></li>

                                    <li>
                                            <Link to='/logout'><i className="fa fa-power-off"></i> Log Out</Link>
                                    </li>
                            </ul>
                    </li>
            </ul>
        </nav>
        <ul class="list-inline list-unstyled mb-0 d-flex align-items-end">

        <li class="list-inline-item ml--6 mr--6 dropdown">

          <a onClick={this.handleMenuToggle.bind(this)} class="btn btn-sm btn-light dropdown-toggle btn-pill pl--12 pr--12" data-toggle="dropdown" aria-expanded="false" aria-haspopup="true">
            
            <span class="group-icon m-0">
              <i class="fi w--15 fi-user-male"></i>
              <i class="fi w--15 fi-close"></i>
            </span>

            <span class="fs--14 d-none d-sm-inline-block font-weight-medium">{this.props.wallet_address}</span>
          </a>

          <div  className={this.state.navClasses.join(' ')} >
            
          <div class="dropdown-header fs--14 py-4">
            <div class="w--60 h--60 rounded-circle bg-light bg-cover float-start" style={{backgroundImage:"url('images/icons/user80.png')"}}></div>
 
            <span class="d-block text-muted font-weight-medium text-truncate">{this.props.wallet_address}</span>
            <small class="d-block text-muted margin-bottom-20"><b>Last Login:</b> 2019-09-03 01:48</small>
            <br />
            </div>

            <div class="dropdown-divider"></div>

            <a href="#!" class="dropdown-item text-truncate font-weight-medium">
            Account Settings
            <small class="d-block text-muted">profile, password and more...</small>
            </a>

            <div class="dropdown-divider mb-0"></div>

            <Link to='/logout' className="prefix-icon-ignore dropdown-footer dropdown-custom-ignore font-weight-medium pt-3 pb-3"><i className="fi fi-power float-start"></i> Log Out</Link>
 
    </div>

    </li>

  </ul>
   </> );
  }
}

export default UserMenu;
