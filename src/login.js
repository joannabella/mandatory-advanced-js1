import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      infoMessage: '',
      color: 'black',
    };
    this.onChange = this.onChange.bind(this);
    this.login = this.login.bind(this);
  }

  onChange(event) {
    this.setState({ username: event.target.value, infoMessage: '' });
  }

  login(event) {
    event.preventDefault();

    let regex = /^[\s\wÅÄÖåäö-]{1,12}$/;
    if (regex.test(this.state.username)) {
      this.props.onLogin({ username: this.state.username });
    }
    else if (this.state.username === '') {
      this.setState({ infoMessage: 'Please provide a username :-)', color: 'red' });
    }
    else {
      this.setState({ infoMessage: 'The username should be between 1-12 characters (or numbers) long and may contain "-" or "_"', color: 'red' });
    }
  }

   render() {
     return (
     <div className='login-window login-tail'>  
        <form className='login-form'>
          <h1 className='login-welcome'>Talkative</h1>
          <label className='login-title' htmlFor='username'>Pick your username:</label>  
          <p className='login-error' style={{ color: this.state.color }}>{this.state.infoMessage}</p>
          <input className='userfield' name='pickusername' onChange={this.onChange} value={this.state.username} name='username' placeholder='Username' spellCheck='false'></input>  
          <label className='userinput' htmlFor='pickusername'></label>  
          <button className='loginButton' type='submit' onClick={this.login}>Login</button>
        </form>
     </div>
     )
   }
 }


export default Login;