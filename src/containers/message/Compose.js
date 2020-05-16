import React from 'react';
import useForm from '../../components/forms/useForm';


const MessageForm = (props) => {
    let message = {...this.props.messages};

    const [message_values, handleChange] = useForm({...message});

    return (<>
        <div class="form-label-group mb-4">
            <input placeholder="Subject" id="message_subject" name="subject" type="text" value={message_values.to} onChange={handleChange} class="form-control" />
            <label for="message_subject">Subject</label>
        </div>
        <div class="form-label-group mb-4">
            <input placeholder="Subject" id="message_subject" name="subject" type="text" value={message_values.subject} onChange={handleChange} class="form-control" />
            <label for="message_subject">Subject</label>
        </div>
        <div class="medium-editor bg-white border rounded p-3 w-100 min-h-300 js-mediumified medium-editor-element">
            <textarea 
                class="medium-editor bg-white border rounded p-3 w-100 min-h-300 js-mediumified medium-editor-hidden" 
                placeholder="Type your message..." 
                value={message_values.body} onChange={handleChange}
                >										
            </textarea>
        </div>
    </>);
}

export default MessageForm;