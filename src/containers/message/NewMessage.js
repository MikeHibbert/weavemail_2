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
    let { id } = useParams();

    const message = {
        to: '',
        mail: {
            subject: '',
            body: ''
        }
    }

    return (
        <MessageForm message={message} />
    )
}

export default NewMessage;