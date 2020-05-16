import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

function InboxMessage(props) {
    const sent = new Date(parseInt(props.message.unixTime) * 1000);

    const link_url = "message-detail/" + props.message.id;

    return (
        <tr id="message_id_2" className="text-muted">
            <td>

                <Link id={props.message.id} to={link_url} message={props.message} className="font-weight-medium text-muted mx-2 m-0-xs">
                    {props.message.mail.subject}
                </Link>
            </td>

            <td className="hidden-lg-down text-truncate">
                <Link id={props.message.id} to={link_url} message={props.message} className="font-weight-medium text-muted mx-2 m-0-xs">
                    {props.message.from}
                </Link>
            </td>

            <td className="hidden-lg-down">
                <Link id={props.message.id} to={link_url} message={props.message} className="font-weight-medium text-muted mx-2 m-0-xs">
                    <Moment fromNow >{sent}</Moment>
                </Link>
            </td>

        </tr>
    );
}

export default InboxMessage;