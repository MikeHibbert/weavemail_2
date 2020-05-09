import React, { Component } from 'react';
import arweave from '../../arweave-config';
import settings from '../../app-config';
import Spinner from '../../components/Spinner/Spinner';
import getMessages from '../../components/Message/helpers';

class Inbox extends Component {

  state = {
    current_balance: 0.0,
    measure_enabled: false,
    account: null,
    my_messages: [],
    latest_messages: [],
    loading: true
  }

  async componentDidMount() {
    this.arqlSearchmessages(
        {
            op: "and",
            expr1: {
                op: "equals",
                expr1: "from",
                expr2: this.props.wallet_address
            },
            expr2: {
                op: "equals",
                expr1: "app",
                expr2: settings.APP_TAG
            }
        },
        "my_messages"
    )

    this.arqlSearchmessages(
        {
            op: "equals",
            expr1: "app",
            expr2: settings.APP_TAG
        },
        "latest_messages",
        true
    )
  }  

  async arqlSearchmessages(search, state_name, ends_process=false) {
    const txids = await arweave.arql(search);

    if(txids.length === 0) {
        if(ends_process) {
            this.setState({loading: false});
        }
    }

    const messages = await getMessages(txids);

    const state = {};

    state[state_name] = messages;
    
    if(ends_process) {
      state['loading'] = false;  
    } 
    
    this.setState(state);
  }

  render() {
    let my_messages = [];
    let latest_messages = [];

    if(this.state.loading) {
        my_messages = [<Spinner key={1} />];
        latest_messages = [<Spinner key={2} />];
    }

    const now = new Date();
    const a_week_ago = now.setDate(now.getDate() - 7);



    return ( <>
        <header id="page-header">
            <h1>Home</h1>
        </header>
        <div className="col-md-6 padding-20">
            <section className="panel panel-default">
                <header className="panel-heading">
                    <h2 className="panel-title elipsis">
                        <i className="fa fa-info-circle"></i> My messages
                    </h2>
                </header>
                <div className="panel-body noradius padding-10" style={{minHeight: "700px"}}>
                    <div className="row profile-activity">
                        {my_messages}
                    </div>
                </div>
            </section>
        </div>
        <div className="col-md-6 padding-20">
            <section className="panel panel-default">
                <header className="panel-heading">
                    <h2 className="panel-title elipsis">
                        <i className="fa fa-rss"></i> Latest messages 
                    </h2>
                </header>
                <div className="panel-body noradius padding-10" style={{minHeight: "700px"}}>
                    <div className="row profile-activity">
                        {latest_messages}
                    </div>
                </div>
            </section>
        </div>
    </>);
  }

}

export default Inbox;