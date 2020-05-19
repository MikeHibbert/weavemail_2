import React from 'react';
import useForm from '../../components/forms/useForm';
import { sendMessage } from '../../components/Message/helpers';
import { toast } from 'react-toastify';


const MessageForm = (props) => {
    let message = {...props.message};

    const [message_values, handleChange] = useForm({...message});

    function validForm() {
        if(message_values.to.length > 0) {
            if(message_values.mail.subject.length > 0) {
                if(message_values.mail.body.length > 0) {
                    return true;
                }
            }
        }

        return false;
    }

    async function handleSend() {
        if(validForm()) {
            await sendMessage(message_values);
        } else {
            toast("Please fill in all fields before sending your email.", { type: toast.TYPE.ERROR });
        }
        
    }

    return (<div className="container">
        <div className="form-label-group mb-4" style={{marginTop: "20px"}}>
            <input placeholder="To" id="message_subject" name="to" type="text" value={message_values.to} onChange={handleChange} className="form-control" />
            <label for="message_subject">To</label>
        </div>
        <div className="form-label-group mb-4">
            <input placeholder="Subject" id="message_subject" name="subject" type="text" value={message_values.mail.subject} onChange={handleChange} className="form-control" />
            <label for="message_subject">Subject</label>
        </div>
        <div>
            <textarea 
                className="medium-editor bg-white border rounded p-3 w-100 min-h-300 js-mediumified medium-editor-hidden" 
                placeholder="Type your message..." 
                value={message_values.mail.body} onChange={handleChange}
                >										
            </textarea>
        </div>
        <div className="form-label-group mb-4">
            <input placeholder="Tokens to send" id="message_subject" name="tokens" type="text" value={message_values.tokens} onChange={handleChange} className="form-control" />
            <label for="message_subject">Subject</label>
        </div>
        <div class="clearfix container my-5">

            <a  class="btn btn-sm btn-primary btn-pill" onClick={() => { handleSend ()}}>
                <i class="fi fi-check"></i>
                Send message
            </a>

        </div>
    </div>);
}

export default MessageForm;