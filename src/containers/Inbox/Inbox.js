import React, { Component } from 'react';
import settings from '../../app-config';
import Spinner from '../../components/Spinner/Spinner';
import getMessages from '../../components/Message/helpers';
import InboxMessage from './InboxMessage';


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
    const messages = await getMessages();
    
    this.setState({my_messages: messages, loading: false});
  }  

  render() {
    let my_messages = [];
    let latest_messages = [];

    if(this.state.loading) {
        my_messages = [<Spinner key={1} />];
    } else {
        const messages = this.state.my_messages.map(message => {
            return <InboxMessage message={message} />;
        })

        my_messages = <div className="portlet-body pt-0">
                            <div class="table-responsive">

                                <table class="table table-align-middle border-bottom mb-6">

                                    <thead>
                                        <tr class="text-muted fs--13">
                                            <th>
                                                <span class="px-2 p-0-xs">
                                                    SUBJECT
                                                </span>
                                            </th>
                                            <th class="w--200 hidden-lg-down">SENDER</th>
                                            <th class="w--200 hidden-lg-down">DATE</th>
                                            <th class="w--60">&nbsp;</th>
                                        </tr>
                                    </thead>

                                    <tbody id="item_list">
                                        {messages}
                                    </tbody>
                                </table>
                            </div>
                        </div>;
    }

    const now = new Date();
    const a_week_ago = now.setDate(now.getDate() - 7);



    return ( <>
    <div className="row gutters-sm">
        <div className="col-12 col-lg-9 col-xl-12">
            <div className="portlet">
                <div className="portlet-header border-bottom">

                    <div className="float-end">

                        <a href="message-write.html" className="btn btn-sm btn-primary btn-pill px-2 py-1 fs--15 mt--n3">
                            + write
                        </a>

                    </div>

                    <span className="d-block text-muted text-truncate font-weight-medium pt-1">
                        Inbox
                    </span>
                </div>

                {my_messages}
            </div>
        </div>
    </div>
    </>);
  }

}

export default Inbox;