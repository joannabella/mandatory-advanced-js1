import React, { Component } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from './message';
const io = require('socket.io-client');

function getTime(timestamp) {
  return new Date(timestamp).toLocaleString('sv-SE');
}

class Chat extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      username: props.username,
      message: '',
      infoMessage: '',
      messages: [
    
      ],
    }
    this.onChange = this.onChange.bind(this);
    this.onSend = this.onSend.bind(this);
  }

  componentDidMount() {
    this.socket = io('http://ec2-13-53-66-202.eu-north-1.compute.amazonaws.com:3000');
    this.socket.on('connect', function(){
    });

    this.socket.on('messages', (messageArray) => {
      this.setState({ messages: messageArray });
    });

    this.socket.on('new_message', message => {
      this.setState({messages: [...this.state.messages, message] });
    });

  }

  componentWillUnmount() {
    this.socket.disconnect();
    this.socket = null;
  }

  onChange(event) {
    this.setState({ message: event.target.value, infoMessage: '' });
  }

  onSend = (event) => {
    event.preventDefault();
    if (this.state.message.length > 200) {
      this.setState({ infoMessage: 'Your message can only be between 1-200 characters long' })
      return;
    }
    else if (this.state.message.length === 0) {
      this.setState({ infoMessage: 'Field is empty :-)' });
      return;
    } 
    else if (this.state.message.length > 0) {
      this.setState({ message: '' });
    }

    this.socket.emit('message', {
      username: this.state.username,
      content: this.state.message,  
    }, (response) => {
      this.setState({ messages: [...this.state.messages, response.data.newMessage] });
    });
  }

   render() {
    return (
      <div className='container'>
        <div className='chat-window'>
          <header className='chat-header'>
            <h1 className='chat-header-title'>Talkative</h1>
          </header>
          <button className='logout-button' onClick={this.props.onLogout}>Logout</button>
            <ScrollToBottom className='chat-scrollBottom'>
              <ul className='chat-list'>
                {this.state.messages.map(message => {
                  return <Message myUsername={this.state.username} username={message.username} timestamp={getTime(message.timestamp)} content={message.content} key={message.id} tail={message.tail} /> 
                })}
              </ul>
            </ScrollToBottom>
            <form onSubmit={this.onSend}>
              <p className='infoMessage' style={{ color: this.state.color }}>{this.state.infoMessage}</p>
              <input className='inputfield' name='sendmessage' onChange={this.onChange} value={this.state.message} placeholder='Enter your message here' spellCheck='false'></input>
              <label className='sendinput' htmlFor='sendmessage'></label>  
              <button className='send-button' type='submit'>Send</button> 
            </form>
        </div>
      </div>
     );
   }
 }


export default Chat;