import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";
import MessageForm from './Compose';

const NewMessage = (props) => {
    const message = {
        to: '',
        mail: {
            subject: '',
            body: ''
        },
        tokens: 0
    }

    return (<div className="row gutters-sm">
                <div className="col-12 col-lg-9 col-xl-12">
                    <div className="portlet">
                        <div className="portlet-header border-bottom">
                            
                            <span className="d-block text-muted text-truncate font-weight-medium pt-1">
                                New Message
                            </span>
                        </div>
                        <div className="portlet-body pt-0">
                            <MessageForm message={message} />
                        </div>
                    </div>
                    
                </div>
            </div>);
}

export default NewMessage;