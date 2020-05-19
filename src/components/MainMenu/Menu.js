import React, { Component } from 'react';
import MenuItem from './MenuItem';


class Menu extends Component {
  render() {
    return (
      <>
      <div className="aside-wrapper scrollable-vertical scrollable-styled-light align-self-baseline h-100 w-100">
        <nav className="nav-deep nav-deep-dark nav-deep-hover fs--15 pb-5 js-ajaxified">
        <ul id="nav_responsive" className="nav flex-column">
              <MenuItem icon='home' name='Inbox' url='/' {...this.props}/>
              <MenuItem icon='arrow-end' name='Sent' url='/sent' {...this.props}/>
              <MenuItem icon='arrow-end' name='Archive' url='/archived' {...this.props}/>
        </ul>
        </nav>
      </div>
    </>
    );
  }
}

export default Menu;
