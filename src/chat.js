import React, { Component } from 'react';
import Message from './message';
const io = require('socket.io-client');

function getTime(timestamp) {
  return new Date(timestamp).toLocaleString('sv-SE');
}

class Chat extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    
    this.state = {
      username: props.username,
      message: '',
      messages: [
    
      ],
    }
    this.onChange = this.onChange.bind(this);
    this.onSend = this.onSend.bind(this);
  }

  componentDidMount() {
    this.socket = io('http://ec2-13-53-66-202.eu-north-1.compute.amazonaws.com:3000');
    this.socket.on('connect', function(){
      console.log('you are connected');
    });

    this.socket.on('messages', (messageArray) => {
      this.setState({ messages: messageArray });
    });

    this.socket.on('new_message', message => {
      this.setState({messages: [...this.state.messages, message] });
      console.log(message);
      console.log(this.state.messages);
    });

  }

  componentWillUnmount() {
    this.socket.disconnect();
    this.socket = null;
  }

  onChange(event) {
    this.setState({ message: event.target.value });
  }

  onSend = () => {
    this.socket.emit('message', {
      username: this.state.username,
      content: this.state.message,  
    }, (response) => {
      this.setState({ messages: [...this.state.messages, response.data.newMessage] });
      console.log(response);
      
    });
  }

   render() {
    return (
      <div className='container'>
        <div className='chat-window'>
          <header className='chat-header'>
            <h1 className='chat-header-title'>Chat Title</h1>
          </header>
            <button onClick={this.props.onLogout}>Logout</button>
            <input onChange={this.onChange} placeholder='Write message..'></input>
            <button onClick={this.onSend}>Send</button> 
            <ul className='chat-list'>
              {this.state.messages.map(message => {
                return <Message username={message.username} timestamp={getTime(message.timestamp)} content={message.content} key={message.id} tail={message.tail} /> 
              })}
            </ul> 
        </div>
      </div>
     );
   }
 }


export default Chat;