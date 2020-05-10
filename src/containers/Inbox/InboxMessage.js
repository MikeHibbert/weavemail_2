import React from 'react';
import Moment from 'react-moment';

function InboxMessage(props) {
    const sent = new Date(parseInt(props.message.unixTime) * 1000);

    debugger;
    return (
        <tr id="message_id_2" class="text-muted">
            <td>

                <a href="message-detail.html" class="font-weight-medium text-muted mx-2 m-0-xs">
                    {props.message.mail.subject}
                </a>
            </td>

            <td class="hidden-lg-down text-truncate">
                {props.message.from}

            </td>

            <td class="hidden-lg-down">
                <Moment fromNow >{sent}</Moment>
            </td>

        </tr>
    );
}

export default InboxMessage;